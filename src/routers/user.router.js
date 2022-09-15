const express = require("express")
const router=express.Router();
const {insertUser,getUserByEmail,getUserById,updatePassword}=require("../model/user/User.model")
const {hashPassword,comparePassword}=require("../helpers/decrypt.helper");
const {createAccessJWT,createRefreshJWT}=require("./../helpers/jwt.helper")
const {userAuthorization}=require("./../middlewares/authorization.middleware")
const {setPasswordResetPin,getPinByEmail,deletePin} =require("./../model/reset-pin/ResetPin.model")
const {emailProcessor}=require("../helpers/email.helper")
const {resetPassRequestValidation,upadtePasswordValidation}=require("./../middlewares/formValidation.middleware")
const {deleteJWT} = require("./../helpers/redis.helper")
const {storeRefreshJWT}=require("./../model/user/User.model")
router.all("/",(req,res,next)=>{
 
    // res.json({message:"return from user router"})
    next()
})

router.get("/",userAuthorization,async(request,response)=>{
    const _id = request.userID
    const userProfile = await getUserById(_id)
    return response.json({message:"Valid user id and password",user:userProfile})
  

})


router.post("/",async(req,res,next)=>{
    const {name,company,address,phone,email,password}=req.body;

    try{
       

        const hashPass = await hashPassword(password)
        const newUserObj={
            name,
            company,
            address,
            phone,
            email,
            password:hashPass
        }


        const result=await insertUser(newUserObj)
       
        return res.json({message:"new user created",result})


    }
    catch (error){

        console.log(error)
        return res.json({status:"erorr",message:error.message})

    }
 

})

router.post("/reset-password",resetPassRequestValidation,async(request,response)=>
{
const {email}=request.body
if(!email){return response.json({message:"User email is not entered"})}
const user = await getUserByEmail(email)
if(!user){return response.json({message:"If the mail Id exists we will generate and share you the pin shortly"})}

try{
    const setResetpin =await setPasswordResetPin(email)
    const result = await emailProcessor({email:email,pin:setResetpin.resetPin,type:"request-new-password"})
  
    if(result.messageId)
    {
        return response.json({
            status:"success",
            message:"If the email exists in our database, the password will be reset successfully",
            
        })
    }
    return response.json({
        status:"error",
        message:"If the mail exist in our database, the password reset pin will be sent shortly",
        
    })
   
   
}
catch(error)
{
    console.log(error)
    return response.json({error:error})
}



}


)

//1.Update password in debuggerReceive email, pin and new password
//2.Validate pin
//3.Encrypt new password
//4.Update password in debuggerSend email Notification

//5.Server side form validation
//6.Create middleware to validate form data

router.patch("/reset-password",upadtePasswordValidation,async(request,response)=>{
    
    const {email,pin,newPassword}=request.body
    const getPin = await getPinByEmail(email,pin)
    if(getPin._id)
    {
        const dbDate = getPin.addedAt
        const expiresIn= 1
        const expireDate = dbDate.setDate(dbDate.getDate()+expiresIn)
        const today = new Date()
        if(today>expireDate)
        {
           return  response.json({status:"error",message:"Invalid or expired pin"})
        }
        //encrypt new password

       const  encryptPassword=await hashPassword(newPassword)
       try{
        const result= await updatePassword(email,encryptPassword)
        if(result._id)
        {

            //Send email notification
            const emailSent= emailProcessor({email:email,type:"password-update-success"})

            ///Delete the pin from DB after password update
            

               await deletePin(email,pin)
            

         return response.json({message:"Your password Update has been successsful",result:result})
        }

       }
       catch(error)
       {
        console.log(error)
        return response.json({error:error})
       }
 
       
       

        
    }
 
})
//User sign in route
router.post("/login",async(request,response)=>{
    const {email,password}=request.body
    //Get user with email from DB
    //hash our password and compare with DB password

    if(!email || !password)
    {
       return response.json({status:"error",message:"Invalid form submission  "})
    }
    const user = await getUserByEmail(email)
    console.log(user.email)
    if(user.email !=null)
    { 
        
        try{
            const result=await comparePassword(password,user.password)
            if(!result){return response.json({error:"error",message:"User id or password is incorrect"})}
            const accessJWT =await createAccessJWT(user.email,`${user._id}`)
            const refreshJWT=await createRefreshJWT(user.email,`${user._id}`)
            return response.json({message:"User logged in successfully",accessJWT:accessJWT,refreshJWT:refreshJWT})

        }
        catch (error){
            console.log(error)
        }
  
  
        

    

      
    }
    else{
        response.json({status:"error",message:"User or password is incorrect"})
    }
   
    
   
})


router.delete("/logout",userAuthorization,async(request,response)=>{
    const {authorization}=request.headers
 
    try{
       await deleteJWT(authorization)//Delet JWT from Redis
    
       const _id = request.userID
        await storeRefreshJWT(_id,"")


return response.json({message:"user logout is successful"})
    }
    catch(error)
    {
console.log(error)
return response.json({error:error})
    }
    
    //Delete JWT from MongoDB
    
    return response.json({message:authorization})
})

module.exports=router;