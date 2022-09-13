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

module.exports={insertTicket,getTickets}