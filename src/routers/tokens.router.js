const express = require("express")
const { deleteJWT } = require("../helpers/redis.helper")
const router = express.Router()
const {verifyRefreshJWT, createAccessJWT}=require("./../helpers/jwt.helper")
const {getUserByEmail}=require("./../model/user/User.model")
//Return refresh JWT
router.get("/",async(request,response,next)=>{
   const {authorization}=request.headers  // This is the token which must be matched with the token in DB
   const decoded=await verifyRefreshJWT(authorization)  //Checks if the token is a valid one,Like the refresh key is the same or not
   console.log("The decoded value is",decoded)
   try{
    if(decoded.email)
   {
    const userProfile = await getUserByEmail(decoded.email)
    
    if(userProfile._id)
    {
        let tokenExpiry=userProfile.refreshJWT.addedAt
        const dbRefreshToken = userProfile.refreshJWT.token
        
        tokenExpiry= tokenExpiry.setDate(tokenExpiry.getDate()+ +process.env.JWT_REFRESH_SECRET_EXPIRY_DAY) 
        const today = new Date();
        if(tokenExpiry>today&& dbRefreshToken!==authorization)
        {
            console.log("Access JWT token has been expired")
            return response.status(403).json({message:"Token has been expired"})
        }

        const accessJWT = await createAccessJWT(decoded.email,`${userProfile._id}`)
        
        return response.json({status:"Success",message:accessJWT})
       
       
      
    }
   }
   else{
    return response.json({message:"The entered Refresh JWT is invalid, and did not match the secret key"})
   }

   }
   catch(error)
   {
    console.log(error)
    return response.json({status:"403",error:error})
   }
   

//1.Make sure the token is valid
//2.Check if the JWT exists in database
// 3.Check if it not expired

   response.status(403).json({message:"Forbidden"})
 
})

module.exports=router