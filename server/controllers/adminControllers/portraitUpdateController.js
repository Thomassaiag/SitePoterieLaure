const {pool}=require('../../config/db')


//update Portrait picture & text
const updatePortrait=async(req, res, next)=>{
    const {portraitText}=req.body
    const portraitPictureUrl=`/images/Collections/${req.file.originalname}`
    const portraitPictureAlt=`Portrait Picture`

    console.log(portraitPictureUrl)
    try{
        const updatePortrait=await pool.query(
            `UPDATE portrait
            set portrait_picture_alt=$1, portrait_description=$2, portrait_picture_url=$3`,
            [portraitPictureAlt, portraitText,portraitPictureUrl]
        )
        // console.log(updatePortrait)
        if (updatePortrait.rowCount>0){
            res.status(204).json({message: "portrait successfully updated"})
        } else {
            res.status(404).json({message: "portrait couldn't be updated"})
        }
    }
    catch (error){
        return res.status(500).send('Server Error updating portrait')

    }

}


//update Portrait Text only
const updatePortraitText=async(req, res, next)=>{
    const {portraitText}=req.body

    try{
        const updatePortraitText=await pool.query(
            `UPDATE portrait
            set portrait_description=$1`,
            [portraitText]
        )
        console.log(updatePortraitText)
        if (updatePortraitText.rowCount>0){
            res.status(204).json({message: "portrait Text successfully updated"})
        } else {
            res.status(404).json({message: "portrait Text couldn't be updated"})
        }
    }
    catch (error){
        return res.status(500).send('Server Error updating portrait')

    }

}


module.exports={updatePortrait, updatePortraitText}