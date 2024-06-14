const {pool}=require('../../config/db')

// app.post('/admin/createCollection', upload.single('file')
const createNewCollection= async(req, res, next)=>{

    const {collectionTitle, collectionDescription}=req.body
    console.log(collectionTitle)
    const collectionPictureAlt=`Image ${collectionTitle}`
    const collectionPictureUrl=`/images/Collections/${req.file.originalname}`

    try{
        const newCollection=await pool.query(
            'INSERT INTO collection (collection_title, collection_description, collection_picture_url, collection_picture_alt, collection_deletionflag) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [collectionTitle, collectionDescription, collectionPictureUrl, collectionPictureAlt, false]
        )
        if(newCollection){
            console.log(`New collection successfully created`)
            res.status(200).json({message: newCollection.rows[0]})
        }
    }
    catch(err){
        console.error('Error Creating newCollection', err)
        res.status(500).send('Error Creating newCollection')
    }
}

module.exports={createNewCollection}
