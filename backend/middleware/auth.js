// middleware/auth.js
const db = require('../database');

const checkDuplicateEmail = async (req, res, next) => {
    const client = await db.pool.connect();
    try {
        const result = await client.query(
            `SELECT id FROM users WHERE email = $1`,
            [req.body.email]
        );
        if (result.rows.length > 0) {
            return res.status(400).send("Email is already taken.");
        }
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send("An error occurred while checking the email.");
    } finally {
        client.release();
    }
};

const verifySignUp = {
    checkDuplicateEmail,
};

module.exports = verifySignUp;
