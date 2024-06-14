const {pool}=require('../config/db')
const nodemailer =require('nodemailer')

const sendMessage=async (req, res,next)=>{
    const {firstName,lastName,object,senderEmail,senderMessage}=req.body
    console.log(`firstName => ${firstName}`)
    const transporter=nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:process.env.MAILUSER,
            pass:process.env.MAILPASSWORD
        }
    })

    const mailOptions={
        from: 'thomas.saiag@gmail.com',
        to: 'thomas.saiag@gmail.com',
        subject:object,
        text: `message from ${firstName} ${lastName} : ${senderMessage}`
    }

    try
    {  await transporter.sendMail(mailOptions)
        res.status(200).send({message: 'Email sent successfuly'})
    }

    catch(error){
        console.error('Error sending email',error)
        res.status(400).send({message: 'Email not sent'})
    }
}


const subscribeToMailingList= async(req,res, next)=>{
    const {email}=req.body
    console.log(`contactEmail=>${email}`)
    // console.log(`contactEmail keys=>${Object.keys(email)}`)
    try{
        const existingEmail= await pool.query(
            'SELECT * FROM newsletter_contact WHERE email=$1',[email]
        )
        console.log(existingEmail.rowCount)
        if (existingEmail.rowCount>0){
            console.log('email présent')
            return res.status(400).json({message:'email already exists'})
        }
        else{
            console.log('email absent')
            await pool.query(
                'INSERT INTO newsletter_contact (email) VALUES($1)',[email]
                )
            return res.status(200).json({message:'Email submitted successfully'})
        }
    }
    catch(err){
        console.error('Error adding newCollection', err)
        res.status(500).json({message:'Server Error'})
    }
}


module.exports={sendMessage,subscribeToMailingList}