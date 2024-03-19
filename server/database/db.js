const Pool= require("pg").Pool

const pool = new Pool({
    user:"postgres",
    password:'Marjorie01&',
    host: "localhost",
    database: 'siteweblaure'
})


module.exports = pool