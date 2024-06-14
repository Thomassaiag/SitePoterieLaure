const {pool} = require('../config/db')


//Get 1 collection Element Description

const getCollectionElement=async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element WHERE collection_UID=$1`,[id]
        )
        if(rows){           
            console.log(`Collection Element retrieved successfully for collection ${id}`)
            res.status(200).json(rows)
        }
    }
    catch (err) {
        console.error(`couldn't get collection Element for Collection=>  ${err}`)
        res.status(500).json({error:'couldn\'t get collection Element for Collection'})
    }
}

module.exports={getCollectionElement}