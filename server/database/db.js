const Pool= require("pg").Pool
require('dotenv').config();


const pool = new Pool({
    user:"postgres",
    password: process.env.DBPASSWORD,
    host: "localhost",
    database: process.env.DBNAME,
})


module.exports = pool