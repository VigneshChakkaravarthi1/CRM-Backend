const express = require("express")
const router=express.Router();
const {insertUser,getUserByEmail}=require("../model/user/User.model")
const {hashPassword,comparePassword}=require("../helpers/decrypt.helper");
const {createAccessJWT,createRefreshJWT}=require("./../helpers/jwt.helper")



router.all("/",(req,res,next)=>{
 
    // res.json({message:"return from user router"})
    next()
})


router.post("/",async(req,res,next)=>{
    const {name,company,address,phone,email,password}=req.body;

    try{
        console.log("The password is",password)

        const hashPass = await hashPassword(password)
        console.log(hashPass)
        const newUserObj={
            name,
            company,
            address,
            phone,
            email,
            password:hashPass
        }


        const result=await insertUser(newUserObj)
        console.log(result)
        res.json({message:"new user created",result})


    }
    catch (error){

        console.log(error)
        res.json({status:"erorr",message:error.message})

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
    if(user.email !=null)
    { 
        
        try{
            const result=await comparePassword(password,user.password)
            if(!result){return response.json({message:"User id or password is incorrect"})}
            const accessJWT =await createAccessJWT(user.email,user._id);
            const refreshJWT=await createRefreshJWT(user.email)
            response.json({message:"User logged in successfully",accessJWT:accessJWT,refreshJWT:refreshJWT})

        }
        catch (error){
            console.log(error)
        }
  
  
        

    

      
    }
    else{
        response.json({status:"error",message:"User or password is incorrect"})
    }
   
    
   
})

module.exports=router;