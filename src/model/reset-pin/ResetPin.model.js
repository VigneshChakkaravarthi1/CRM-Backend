
const {ResetPinSchema}=require("./ResetPin.schema")
const  {randomPinNumber} =require("../../../utils/randomGenerator")

const setPasswordResetPin=(email)=>{


    const randPin=randomPinNumber()
const resetObj={
    email,
    resetPin:randPin
}
return new Promise((resolve,reject)=>{
    ResetPinSchema(resetObj).save().
    then(data=>resolve(data))
    .catch(error=>reject(error))
})
    
}

const getPinByEmail =(email,resetPin)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            ResetPinSchema.findOne({email,resetPin},(error,data)=>{
                if(error)
                {
                    console.log(error)
                    resolve(error)
                }
                resolve(data)
            })

        }
        catch(error)
        {
            console.log(error)
            reject(error)
            
        }

    })
  

}
const deletePin=(email,resetPin)=>{

return new Promise(async(resolve,reject)=>{

    try{
       await ResetPinSchema.findOneAndDelete({email,resetPin},(error,data)=>{
        if(error)
        {
            console.log(error)
            reject(error)
        }
        resolve(data)

       })
    }
    catch(error)
    {
console.log(error)
reject(error)
    }

})
  
}

module.exports={setPasswordResetPin,getPinByEmail,deletePin}