const {pool}=require("../config/db")


const login=async(req, res, next)=>{
    const{userEmail, userPassword}=req.body
    try {
        const userEmailDB= await pool.query(
            'SELECT user_email, admin_status, user_firstname FROM user_account WHERE user_email=$1;',[userEmail]
        )
        if(userEmailDB.rowCount>0){
            console.log("user exists")
            let adminStatus=userEmailDB.rows[0].admin_status
            let userFirstName=userEmailDB.rows[0].user_firstname
            const hashedPasswordDB= await pool.query(
                'SELECT user_password FROM user_account WHERE user_email=$1 ',[userEmail]
            )
            let hashedPassword=hashedPasswordDB.rows[0].user_password
            console.log(`hashedPassword=> ${hashedPassword}`)
            let doesPasswordMatch=await bcrypt.compare(userPassword,hashedPassword)
            console.log("test bcrypt "+ doesPasswordMatch)
            if(doesPasswordMatch){
                console.log("password matches")
                res.status(200).json({message: "password matches", adminStatus, userFirstName})
            }
            else{
                console.log("password doesn't match")
                res.status(400).json({message: "password doesn't match"})
            }
        }    
        else{
            console.log("user doesn't exist", userEmailDB)
            res.status(400).json({message: "no mail in DB"})
        }

    } catch (error) {
       console.log()
       res.status(400).json({message: 'Error Login, server side'}) 
    }
}


module.exports={login}