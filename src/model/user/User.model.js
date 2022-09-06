
const {userSchema}=require("./User.schema")

const insertUser=(userObj)=>{
return new Promise((resolve,reject)=>{
    userSchema(userObj).save()
    .then(data=>resolve(data))
    .catch(error=>reject(error))
})
    
}

const getUserByEmail=(email)=>
{
    return new Promise((resolve,reject)=>{
        if(!email){reject(false)}

    userSchema.findOne({email},(error,data)=>{
        if(error)
        {
            reject(error)
        }
        resolve(data)
        
    })

    })
    
}

module.exports={insertUser,getUserByEmail}