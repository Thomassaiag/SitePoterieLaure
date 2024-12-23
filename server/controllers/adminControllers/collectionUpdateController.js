const {pool}=require('../../config/db')


//Add new picture to collection element pictures
const addNewCollectionElementPicture=async(req, res, next)=>{
    const {collectionUID}=req.body
    console.log('addNewCollectionElementPicture')
    try{
        const collectionName=await pool.query(
            `SELECT collection_title FROM collection
            WHERE collection_uid=$1`,[collectionUID]
        )
        if (collectionName){
            const collectionDirectory=collectionName.rows[0].collection_title
            const collectionElementPictureAlt=`Image ${req.file.originalname}`
            const collectionElementPictureUrl=`/images/Static_images/Collections/${req.file.originalname}`
            
            try{
                const newCollectionElementPicture=await pool.query(
                    'INSERT INTO collection_element_pictures (collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_pictures_deletionflag) VALUES ($1, $2, $3, $4) RETURNING *',
                    [collectionUID, collectionElementPictureUrl, collectionElementPictureAlt, false]
                )
                if(newCollectionElementPicture){
                    console.log('New picture')
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


//Delete picture from collection element

const deleteCollectionElementPicture=async(req, res, next)=>{
    console.log('DeleteCollectionElementPicture')
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
            console.log("Picture didn't get deleted")
            return res.status(201).json({message:"Picture didn't get deleted"})
        }
    } catch (err) {
        console.error('Error deleting collection Element Picture =>',err )
        return res.status(400).json({message:"Collection Element Picture Deletion wasn't completed due to an error"})
    }
}

//update Collection Attributes
const updateCollectionElementAttributes=async(req, res,next)=>{
    try {
        //We pass the paramater from the component and use it in the SQL Query
        let {descriptionToUpdate, emailToUpdate, cookingToUpdate, recommandationToUpdate, collectionUID}=req.body

        let collectionElementAttributesToUpdate=await pool.query(
            `UPDATE collection_element
            SET collection_element_description=$1,
                collection_element_email=$2,
                collection_element_recommandation=$3,
                collection_element_cooking=$4
            WHERE collection_UID=$5
            `,[descriptionToUpdate,emailToUpdate, recommandationToUpdate,cookingToUpdate, collectionUID]
        )

        if (collectionElementAttributesToUpdate){
            res.status(204).json({message: `collection ${collectionUID} Element Attribute successfully updated`})        
            console.log(`collection ${collectionUID} Element Attribute successfully updated`)
        }
        else res.status(404).json({message: `collection ${collectionUID} Element NOT updated` })
    } catch (error) {
        //if an error occur, we revert to the previous state of the query
        await pool.query('ROLLBACK')
        console.error(`Error updating collection Element Attribute=> ${error} `)
        return res.status(500).json({message:"Error updating collection Element Attribute"})
    }

}


const updateCollectionElementInformations=async(req,res,next)=>{
    try{
        const {informationsToUpdate}=req.body
        await pool.query('BEGIN')
        for (let informationToUpdate of informationsToUpdate) {
            let {collection_element_information_uid, collection_element_information_text}=informationToUpdate
            let result= await pool.query(
                `UPDATE collection_element_informations
                SET collection_element_information_text=$1
                WHERE collection_element_information_uid=$2
                AND collection_element_information_text<>$1;
                `,[collection_element_information_text,collection_element_information_uid]
            )
            if(result.rowCount===0){
                console.log(`No Update was done for uid ${collection_element_information_uid}`)
            }
            else {
                console.log(`Update for uid ${collection_element_information_uid} successfully done`)
            }
        }

        await pool.query('COMMIT')

        res.status(200).json({message: `All collection Element Informations successfully updated`})        
        console.log('All collection Element Informations successfully updated')

    } catch (error) {
        await pool.query('ROLLBACK')
        console.error(`Error updating collection Information=> ${error} `)
        return res.status(400).json({message:"Error updating collection Information"})
    }
}


const deleteCollectionElementInformationInput=async (req, res, next)=>{
    
    try{
        const {informationIdToDeleteList}=req.body
        await pool.query('BEGIN')

        for (let informationIdToDelete of informationIdToDeleteList){
            let {collectionElementInformationUID}=informationIdToDelete
            let informationToDelete=await pool.query(
                `DELETE FROM collection_element_informations
                WHERE collection_element_information_uid=$1
                `,[collectionElementInformationUID]
            )
            if(informationToDelete.rowCount===0){
                console.log(`information with ID ${collectionElementInformationUID} did't get deleted`)
            } else {
                console.log(`information with ID ${collectionElementInformationUID} was deleted`)
            }
        }
        await pool.query('COMMIT')
        res.status(200).json({message:`All information was deleted`})
        console.log(`All information was deleted`)
        
    } catch (error){
        await pool.query('ROLLBACK')
        console.log('something went wrong, information didn\' get deleted')
        res.status(400).json({message: 'information didn\'t get deleted'})
    }
}

module.exports={addNewCollectionElementPicture,deleteCollectionElementPicture, updateCollectionElementAttributes,updateCollectionElementInformations,deleteCollectionElementInformationInput}