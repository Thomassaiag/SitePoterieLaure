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
            console.log('All Collection UIDs retrieved')
            res.status(200).json(rows)
        }
    } catch (error) {
        res.status(500).json({message: 'collectionUIDs couldn\'t be retrieved',error})
    }
}

//retrieve previous and next collection
const getPrevAndNextCollections=async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `WITH NextRow AS (
            SELECT collection_picture_url, collection_picture_alt, collection_uid
            FROM collection
            WHERE collection_uid > $1
            AND collection_deletionflag=false
            ORDER BY collection_uid ASC
            LIMIT 1
            ),
            PrevRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                WHERE collection_uid < $1
                AND collection_deletionflag=false
                ORDER BY collection_uid DESC
                LIMIT 1
            ),
            FirstRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                WHERE collection_deletionflag=false
                ORDER BY collection_uid ASC
                LIMIT 1
            ),
            LastRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                WHERE collection_deletionflag=false
                ORDER BY collection_uid DESC
                LIMIT 1
            )
            Select *
            FROM
            (
                SELECT * FROM PrevRow
                UNION ALL
                SELECT * FROM NextRow
                UNION ALL
                SELECT * FROM FirstRow WHERE NOT EXISTS (SELECT 1 FROM NextRow)
                UNION ALL
                SELECT * FROM LastRow WHERE NOT EXISTS (SELECT 1 FROM PrevRow)    
            ) AS CombinedRows
            ORDER BY
				CASE 
					WHEN $1 = (SELECT MIN (collection_uid) FROM collection WHERE collection_deletionflag=false)
					OR $1 = (SELECT MAX (collection_uid) FROM collection WHERE collection_deletionflag=false)
					THEN collection_uid*-1
					ELSE collection_uid
			END
            `,[id]
        )
        if(rows){
            console.log('next and prev collections extracted')
            res.status(200).json(rows) 
        }
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
}

module.exports={getAllCollectionUids, getPrevAndNextCollections}