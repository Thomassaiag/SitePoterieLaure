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

//creation of collection element attributes, right after collection creation
const createCollectionElement = async(req, res,next)=>{
    try {
        console.log('body =>',req.body)
        let {descriptionToCreate, emailToCreate, cookingToCreate, recommandationToCreate, collectionUID,collectionTitle}=req.body

        let collectionElementAttributesToCreate=await pool.query(
            `INSERT INTO collection_element
            (collection_element_description, collection_element_email, collection_element_recommandation,collection_element_cooking, collection_uid, collection_element_title)
            VALUES ($1, $2, $3, $4,$5, $6)
            `,[descriptionToCreate,emailToCreate, recommandationToCreate,cookingToCreate, collectionUID,collectionTitle]
        )

        if (collectionElementAttributesToCreate){
            res.status(200).json({message: `Collection Element attributes for collection ${collectionUID}, successfully created`})        
            console.log('Collection Element Attributes Created')
        }
        else res.status(201).json({message: `collection Element for collection ${collectionUID} NOT created` })
    } catch (error) {
        await pool.query('ROLLBACK')
        console.error(`error ceating collection element attributes=> ${error} `)
        return res.status(400).json({message:"error ceating collection element attributes"})
    }

}

const createCollectionElementInformations=async(req, res,next)=>{
    try {
        console.log('informations to Create => ',req.body)
        let {informationsToCreate,collectionUID}=req.body

        await pool.query('BEGIN')
        if (informationsToCreate.length>0){

            for (let informationToCreate of informationsToCreate){
                const {informationInputText}=informationToCreate
            let collectionElementInformationToCreate=await pool.query(
                `INSERT INTO collection_element_informations
                (collection_uid, collection_element_information_text)
                VALUES ($1, $2)
                `,[collectionUID,informationInputText]
            )
            if(collectionElementInformationToCreate.rowCount===0){
                console.log(`collection information was NOT created for collection_uid ${collectionUID}`)
            }
            else console.log(`collection information for collection_uid ${collectionUID}, created successfully`)
            }

            await pool.query('COMMIT')
            res.status(200).json({message: 'collection element informations were created successfully'})
        }
        else console.log('No information was received')

    } catch (error) {
        await pool.query('ROLLBACK')
        console.error(`error ceating collection element informations=> ${error} `)
        return res.status(400).json({message:"Creation for collection Element informations wasn't completed due to an error"})
    }

}

module.exports={createNewCollection, createCollectionElement, createCollectionElementInformations}
