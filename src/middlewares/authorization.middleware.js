const {verifyAccessJWT} =require("./../helpers/jwt.helper")
const {getJWT,deleteJWT}=require("./../helpers/redis.helper")



const userAuthorization = async(request,response,next)=>{
const {authorization}=request.headers

//1.Verify if JWT is valid
try{
    const decoded = await verifyAccessJWT(authorization)
    
  
    if(decoded.email)
    {
        const userID=await getJWT(authorization)

        
       
       if(!userID)
       {
        deleteJWT(authorization)
        response.json({status:404,message:"Login is forbidden"})
       }
    
       
       request.userID=userID

        return next()
    }
    else{
        await deleteJWT(authorization)
        return response.status(403).json({message:" Account is deleted ,Login is forbidden"})
        
    }

}
catch(error)
{
    console.log(error)
    return response.status(403).json({message:"Login is forbidden"})
    next()

}


//2. Click if JWT is exist in RedisFunctionFlags
// 3.Extract user id
// 4.Get user profile based upon user id






// response.json(authorization)
}
module.exports={userAuthorization}