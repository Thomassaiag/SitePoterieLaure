const {pool}=require('../../config/db')


//Get All Collections for collection page
const getAllCollections=async (req, res, next)=>{
    console.log('getAllCollections')
    try {
        const {rows} = await pool.query(
            `SELECT * FROM collection
            WHERE collection_deletionflag=false
            ORDER BY collection_uid ASC`
        )
        if(rows){
            console.log('All Collections retrieved')
            res.status(200).json(rows)
        }
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'All Collections couldn\' be retrieved'})
    }
}

module.exports={getAllCollections}