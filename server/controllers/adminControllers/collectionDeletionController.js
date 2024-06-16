const {pool}=require('../../config/db')

const deleteCollection=async(req, res, next)=>{
    try {
        const {collectionUID}=req.body
        console.log(`collectionUID => ${collectionUID}`)
        let collectionToDelete=await pool.query(
            `UPDATE collection
            SET collection_deletionflag=true
            WHERE collection_uid=$1`,[collectionUID]
        )
        if(collectionToDelete){
            console.log(`Collection with id ${collectionUID} deleted`)
            return res.status(200).json({message:"collection deleted scucessfully"})
        }
        else {
            console.log("the collection didn't get deleted")
            return res.status(201).json({message:"collection didn't deleted"})
        }
    } catch (err) {
        console.error('error deleting collection =>',err )
        return res.status(400).json({message:"Deletion wasn't completed due to an error"})
    }
}

module.exports={deleteCollection}
