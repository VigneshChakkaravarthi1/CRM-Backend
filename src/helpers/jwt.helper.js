const jwt = require('jsonwebtoken');
const {setJWT,getJWT} =require("./redis.helper")



const createAccessJWT=async(email,_id)=>{
    
    try{
        const accessJWT=jwt.sign({email},process.env.JWT_ACCESS_SECRET,{expiresIn:'15m'})
        await setJWT(accessJWT,_id)
    
        return new Promise((resolve,reject)=>{resolve(accessJWT)})

    }
    catch(error)
    {
        
    return new Promise((resolve,reject)=>{reject(error)})
      
    }
   

}
const createRefreshJWT=(payload)=>{
const refreshJWT = jwt.sign({payload},process.env.JWT_REFRESH_SECRET,{expiresIn:'30d'}  )
return new Promise((resolve,reject)=>{resolve(refreshJWT)})
}

module.exports={createAccessJWT,createRefreshJWT}
