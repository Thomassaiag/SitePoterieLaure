const Pool= require("pg").Pool
require('dotenv').config()

const pool = new Pool({
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    host: process.env.DBHOST,
    database: process.env.DBNAME
})


const connectToDatabase=async()=>{
    try {
        const client=await pool.connect()
        console.log('Connected to database')
        client.release()
    } catch (error) {
        console.error('Database connection error', error.stack)
    }
}

module.exports = {pool, connectToDatabase}