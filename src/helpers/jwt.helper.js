const jwt = require('jsonwebtoken');
const {setJWT,getJWT} =require("./redis.helper")
const {storeRefreshJWT}=require("./../model/user/User.model")



const createAccessJWT=async(email,_id)=>{
    
    try{
        const accessJWT=jwt.sign({email},process.env.JWT_ACCESS_SECRET,{expiresIn:'45m'})
        const result=await setJWT(accessJWT,_id)
    
        return new Promise((resolve,reject)=>{resolve(accessJWT)})

    }
    catch(error)
    {
        
    return new Promise((resolve,reject)=>{reject(error)})
      
    }
   

}
const createRefreshJWT=async(email,_id)=>{

    try{
        const refreshJWT = jwt.sign({email},process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'}  )
await storeRefreshJWT(_id,refreshJWT)
return new Promise((resolve,reject)=>{resolve(refreshJWT)})

    }
    catch(error)
    {
        console.log(error)
        return Promise((resolve,reject)=>{reject(error)})
    }

}

const verifyAccessJWT=(userJWT)=>{
    try{
        return Promise.resolve(jwt.verify(userJWT,process.env.JWT_ACCESS_SECRET))
        



    }
    catch(error)
    {
        return Promise.resolve(error)
    }


}
const verifyRefreshJWT=async(userJWT)=>{
    try{
        const result = await jwt.verify(userJWT,process.env.JWT_REFRESH_SECRET)
        
        return new Promise((resolve,reject)=>{
            resolve(result)
        })
        



    }
    catch(error)
    {
        return new Promise((resolve,reject)=>{
            reject(error)
        })
    }


}

module.exports={
    createAccessJWT,
    createRefreshJWT,
    verifyAccessJWT,
    verifyRefreshJWT}
