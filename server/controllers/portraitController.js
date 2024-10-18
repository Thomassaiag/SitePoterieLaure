const {pool}=require('../config/db')


//Get All Collections for collection page
const getPortrait=async (req, res, next)=>{
    try {
        const {rows} = await pool.query(
            `SELECT * FROM portrait;
            `
        )
        if(rows){
            console.log('Portrait retrieved')
            console.log(rows)
            res.status(200).json(rows)
        }
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'Portrait Information couldn\' be retrieved'})
    }
}

module.exports={getPortrait}