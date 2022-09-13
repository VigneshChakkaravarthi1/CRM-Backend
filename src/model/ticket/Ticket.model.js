const {TicketSchema} = require("./Ticket.schema")


const insertTicket=(ticketObject)=>{
   return new Promise((resolve,reject)=>{
        try{
             TicketSchema(ticketObject).save()
            .then(data=>resolve(data))
            .catch(error=>reject(error))

        }
        catch(error)
        {
            console.log(error)
            reject(error)
        }
    })
}
const getTickets=(userId)=>{
    return new Promise((resolve,reject)=>{
         try{
              TicketSchema.find({clientId:userId})
             .then(data=>resolve(data))
             .catch(error=>reject(error))
 
         }
         catch(error)
         {
             console.log(error)
             reject(error)
         }
     })
 }

 const getTicketById=(_id,userId)=>{
    return new Promise((resolve,reject)=>{
         try{
              TicketSchema.find({_id,clientId:userId})
             .then(data=>resolve(data))
             .catch(error=>reject(error))
 
         }
         catch(error)
         {
             console.log(error)
             reject(error)
         }
     })
 }
 const updateClientReply=(_id,message,sender)=>{
    
    return new Promise((resolve,reject)=>{
         try{
              TicketSchema.findOneAndUpdate(
                {_id},
                {status:"Pending operator response",
                $push:{
                    conversation:{sender,message}
                }},
                {new:true})
             .then(data=>resolve(data))
             .catch(error=>reject(error))
 
         }
         catch(error)
         {
             console.log(error)
             reject(error)
         }
     })
 }
 const updateStatusClose=(_id,clientId,staus)=>{
    
    return new Promise((resolve,reject)=>{
         try{
              TicketSchema.findOneAndUpdate(
                {_id,clientId},
                {
                    status:"Closed"
                },
                {new:true})
             .then(data=>resolve(data))
             .catch(error=>reject(error))
 
         }
         catch(error)
         {
             console.log(error)
             reject(error)
         }
     })
 }
 const deleteTicket=(_id,clientId,)=>{
    
    return new Promise((resolve,reject)=>{
         try{
              TicketSchema.findOneAndDelete(
                {_id,clientId})
             .then(data=>resolve(data))
             .catch(error=>reject(error))
 
         }
         catch(error)
         {
             console.log(error)
             reject(error)
         }
     })
 }
module.exports={insertTicket,getTickets,getTicketById,updateClientReply,updateStatusClose,deleteTicket}