// controllers/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../database');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


const registerUser = async (req, res) => {
    const client = await db.pool.connect();
    try {
        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const insertResult = await client.query(
            `INSERT INTO users (id, full_name, email, password, auth_provider) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [uuidv4(), req.body.full_name, req.body.email, hashedPassword, 'local']
        );


        await client.query("COMMIT");

        res.status(200).json(insertResult.rows[0]);
    } catch (e) {
        await client.query("ROLLBACK");
        console.error(e);
        res.status(500).send("Error registering user");
    } finally {
        client.release();
    }
};

const loginUser = async (req, res) => {
    const client = await db.pool.connect();
    try {
        const result = await client.query(`SELECT * FROM users WHERE email = $1`, [req.body.email]);

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "User Not Found." });
        }

        const user = result.rows[0];
        const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            accessToken: accessToken,
        });
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Error signing in" });
    } finally {
        client.release();
    }
};

const googleLogin = async (req, res) => {
    try {
        const { googleToken } = req.body;  // The token sent from the frontend

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,  // Ensure this matches your client ID
        });

        const payload = ticket.getPayload();
        const email = payload.email;
        const fullName = payload.name;

        // Check if the user exists in your database
        const clientDb = await db.pool.connect();
        const result = await clientDb.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (result.rows.length === 0) {
            // If the user doesn't exist, create a new user
            const dummyPassword = 'oauth_dummy_password'; // This should never be used for login

            const newUser = await clientDb.query(
                `INSERT INTO users (id, full_name, email, password, auth_provider) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [uuidv4(), fullName, email, dummyPassword, 'google']
            );


            const accessToken = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
                expiresIn: 86400, // 24 hours
            });

            return res.status(200).send({
                id: newUser.rows[0].id,
                full_name: fullName,
                email: email,
                auth_provider: result.rows[0].auth_provider,
                accessToken: accessToken,
            });
        }

        // If the user exists, generate a JWT access token
        const accessToken = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: 86400, // 24 hours
        });

        res.status(200).send({
            id: result.rows[0].id,
            full_name: result.rows[0].full_name,
            email: result.rows[0].email,
            auth_provider: result.rows[0].auth_provider,
            accessToken: accessToken,
        });

    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).send({ message: 'Error logging in with Google' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
};
