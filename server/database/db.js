const Pool= require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:'10310026',
    host: "localhost",
    database: 'siteweblaure'
})


module.exports = pool