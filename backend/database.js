const Pool = require('pg').Pool

const pool = new Pool({
    host: "localhost",
    user: "kennedy",
    port: 5432,
    password: "beasty",
    database: "katiba",
})


module.exports = {
    pool,
}
