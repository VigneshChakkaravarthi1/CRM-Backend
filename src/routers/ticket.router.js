const express = require("express")
const router=express.Router();
const {insertTicket}=require("./../model/ticket/Ticket.model")




router.all("/",(req,res,next)=>{
    // res.json({message:"return from ticket router"})

    next();
})

//1.Create URL endpoints

// 3.Authorize every request with jwt
// 4.Insert in mongoDb
// 5.Retrive all the ticket for the specific user 
// 6.Retrive single ticket from mongoDb
// 7. Update message conversation in the ticket details
// 8.Update ticket status//Close , operator response pending, client response pending
// Delete ticket from 

router.post("/",async(request,response)=>{
// 2.Reveive new ticket data
const {subject,sender,message}=request.body
const ticketObject={
    clientId:"6319ca98db3bc448725d1645",
    subject,
    
    conversation:[
        {
            sender,
            message
        }
    ]
}
try{
    const result = await insertTicket(ticketObject)

if(result._id)
{
    return response.json({status:"success",message:"New ticket has been created successfully"}) 
}
else
{
    return response.json({status:"failure",message:"Ticket has not been updated"})
}

}
catch(error)
{
console.log(error)
return response.json({status:"failure",error:error})
}


})

module.exports=router