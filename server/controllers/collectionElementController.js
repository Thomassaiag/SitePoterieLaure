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

//Get 1 collection element pictures

const getCollectionElementPictures=async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element_pictures WHERE collection_UID=$1 AND collection_element_pictures_deletionFlag=false`,[id]
        )
        if(rows){
            console.log(`Pictures for collection ${id} successfully retrieved`)
            res.status(200).json(rows) 
        }
    }
    catch (err) {
        console.error('Could\'t retrieve picture for collection',err)
        res.status(500).json({error:'Could\'t retrieve picture for collection'})
    }
}

module.exports={getCollectionElement, getCollectionElementPictures}