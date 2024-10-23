// controllers/auth.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../database');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const registerUser = async (req, res) => {
    const client = await db.pool.connect();
    try {
        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const insertResult = await client.query(
            `INSERT INTO users (id, full_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
            [uuidv4(), req.body.full_name, req.body.email, hashedPassword]
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

module.exports = {
    registerUser,
    loginUser,
};
