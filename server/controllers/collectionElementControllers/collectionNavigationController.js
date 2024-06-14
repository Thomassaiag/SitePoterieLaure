const {pool}=require('../../config/db')

//retrieve all collectionUID to navigate from 1 the other

const getAllCollectionUids=async(req, res, next)=>{
    try {
        const {rows}= await pool.query(
            `SELECT collection_uid
            FROM collection
            WHERE collection_deletionflag=false
            ORDER BY collection_uid ASC`
        )
        if(rows){
            res.status(200).json(rows)
        }
    } catch (error) {
        res.status(500).json({message: 'collectionUIDs couldn\'t be retrieved',error})
    }
}

module.exports={getAllCollectionUids}