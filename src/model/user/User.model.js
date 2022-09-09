
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

const storeRefreshJWT=(_id,token)=>{
    return new Promise((resolve,reject)=>{
        try{
            userSchema.findOneAndUpdate({_id},{
                $set:{"refreshJWT.token":token,"refreshJWT.addedAt":Date.now()},
               
            }, {new:true}
            ).then(data=>{resolve(data)})
            .catch(error=>{
                console.log(error)
                reject(error)})

        }
        catch(error)
        {
            reject(error)
        }
    })

}
const getUserById=(_id)=>{
    return new Promise((resolve,reject)=>{
        if(!_id){reject(false)}

    userSchema.findOne({_id},(error,data)=>{
        if(error)
        {
            reject(error)
        }
        resolve(data)
        
    })

    })

    
}


module.exports={insertUser,
    getUserByEmail,
    storeRefreshJWT,
    getUserById}