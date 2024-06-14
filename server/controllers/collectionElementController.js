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
        console.error('Could\'t retrieve pictures for collection Element',err)
        res.status(500).json({error:'Could\'t retrieve pictures for collection Element'})
    }
}

const getCollectionElementIndividualPicture=async (req, res, next)=>{
    try {
        const {id, pictureId}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element_pictures
                WHERE collection_UID=$1
                AND collection_element_picture_uid=$2
                AND collection_element_pictures_deletionFlag=false`,
                [id, pictureId]
        )
        if(rows){
            res.json(rows) 
            console.log(`Collection Element for Collection ${id} Individual picutre ${pictureId} successfully retrieved`)
        }
    }
    catch (err) {
        console.error('Could\'t retrieve individual picture for collection Element',err)
        res.status(500).json({error:'Could\'t retrieve individual picture for collection Element'})
    }
}

module.exports={getCollectionElement, getCollectionElementPictures, getCollectionElementIndividualPicture}