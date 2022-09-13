const Joi = require("joi")

const email= Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
const pin =Joi.number().min(6).max(6)
const newPassword=Joi.string().alphanum().min(1000000).max(10000000).required()
const shortStr=Joi.string().min(2).max(50)
const longStr=Joi.string().min(2).max(50)

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

    const createNewTicketValidation=(request,response,next)=>{
        const schema=Joi.object({
            subject:shortStr.required(),
            sender:shortStr.required(),
            message:longStr
            

        })
        const value=schema.validate(request.body)
        if(value.error)
        {
            return response.json({status:"error",message:value.error.message})
        }
        next()
    }
    const replyNewTicketValidation=(request,response,next)=>{
        const schema=Joi.object({

            sender:shortStr.required(),
            message:longStr.required()
            

        })
        const value=schema.validate(request.body)
        if(value.error)
        {
            return response.json({status:"error",message:value.error.message})
        }
        next()
    }

module.exports={
        resetPassRequestValidation,upadtePasswordValidation,
        createNewTicketValidation,replyNewTicketValidation}