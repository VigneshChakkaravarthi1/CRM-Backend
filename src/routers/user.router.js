const express = require("express")
const router=express.Router();
const {insertUser,getUserByEmail,getUserById}=require("../model/user/User.model")
const {hashPassword,comparePassword}=require("../helpers/decrypt.helper");
const {createAccessJWT,createRefreshJWT}=require("./../helpers/jwt.helper")
const {userAuthorization}=require("./../middlewares/authorization.middleware")


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
            if(!result){return response.json({message:"User id or password is incorrect"})}
            const accessJWT =await createAccessJWT(user.email,`${user._id}`)
            const refreshJWT=await createRefreshJWT(user.email,`${user._id}`)
            console.log("accessJWT",accessJWT,"refreshJWT",refreshJWT,result)
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


module.exports=router;