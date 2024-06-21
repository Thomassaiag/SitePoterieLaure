const {pool}=require('../../config/db')



const addNewCollectionElementPicture=async(req, res, next)=>{
    const {collectionUID}=req.body
    try{
        const collectionName=await pool.query(
            `SELECT collection_title FROM collection
            WHERE collection_uid=$1`,[collectionUID]
        )
        if (collectionName){
            const collectionDirectory=collectionName.rows[0].collection_title
            console.log('collection Directory =>',collectionDirectory)
            const collectionElementPictureAlt=`Image ${req.file.originalname}`
            const collectionElementPictureUrl=`/images/${req.file.originalname}`
            
            try{
                const newCollectionElementPicture=await pool.query(
                    'INSERT INTO collection_element_pictures (collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_pictures_deletionflag) VALUES ($1, $2, $3, $4) RETURNING *',
                    [collectionUID, collectionElementPictureUrl, collectionElementPictureAlt, false]
                )
                if(newCollectionElementPicture){
                    return res.status(200).json({message:newCollectionElementPicture.rows[0]})
                }
                else {
                    return res.status(201).json({message:"picture not added"})
                }
            }
            catch(error){
                console.error('Error adding newCollectionElemenPicture', error)
                return res.status(500).send('Server Error')
            }
        }
    }
    catch (error){
        console.error('Error getting Collection UID', error)
        return res.status(500).send('Server Error 2')

    }

}


const deleteCollectionElementPicture=async(req, res, next)=>{
    try {
        const {collectionElementPictureToDeleteID}=req.body
        console.log(`collectionElementPictureToDeleteID => ${collectionElementPictureToDeleteID}`)
        let collectionElementPictureToDelete=await pool.query(
            `UPDATE collection_element_pictures
            SET collection_element_pictures_deletionflag=true
            WHERE collection_element_picture_uid=$1`,[collectionElementPictureToDeleteID]
        )
        if(collectionElementPictureToDelete){
            console.log(`Picture ${collectionElementPictureToDeleteID} successfully deleted`)
            return res.status(200).json({message:`Picture ${collectionElementPictureToDeleteID} successfully deleted`})
        }
        else {
            return res.status(201).json({message:"Picture didn't deleted"})
        }
    } catch (err) {
        console.error('Error deleting collection Element Picture =>',err )
        return res.status(400).json({message:"Collection Element Picture Deletion wasn't completed due to an error"})
    }


}


module.exports={addNewCollectionElementPicture,deleteCollectionElementPicture}