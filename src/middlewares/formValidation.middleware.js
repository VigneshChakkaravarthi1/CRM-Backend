const Joi = require("joi")
const email= Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const pin =Joi.number().min(6).max(6)
const newPassword=Joi.string().alphanum().min(1000000).max(10000000).required()
const resetPassRequestValidation=(request,response,next)=>{
    
    console.log("Inside validation")
        const schema= Joi.object({email})
       const value = schema.validate(request.body)
       if(value.error)
       {
        return response.json({status:"error",message:value.error.message})
       }
       
       next()
}
const upadtePasswordValidation=(request,response,next)=>{
    
       
            const schema= Joi.object({email,pin,newPassword})
           const value = schema.validate(request.body)
           if(value.error)
           {
            return response.json({status:"error",message:value.error.message})
           }
           
           next()
    }

module.exports={
        resetPassRequestValidation,upadtePasswordValidation}