const express = require("express")
const router=express.Router();
const {insertTicket,getTickets,getTicketById,updateClientReply,updateStatusClose,deleteTicket}=require("./../model/ticket/Ticket.model")
const {userAuthorization}=require("./../middlewares/authorization.middleware")



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

router.post("/",userAuthorization,async(request,response)=>{
// 2.Reveive new ticket data

const {subject,sender,message}=request.body
const ticketObject={
    clientId:request.userID,
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


router.get("/",userAuthorization,async(request,response)=>{
    // 2.Reveive new ticket data

    try{
        const result = await getTickets(request.userID)
    
    if(result)
    {
        
        return response.json({status:"success",result:result}) 
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

    // Get a particular ticket id of a user

    router.get("/:_id",userAuthorization,async(request,response)=>{
        
    
        try{
            const {_id}=request.params;
 
            const result = await getTicketById(_id,request.userID)  
        if(result)
        {
            
            return response.json({status:"success",result:result}) 
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
        // Update message from client
        router.put("/:_id",userAuthorization,async(request,response)=>{
        
    
            try{
                const {message,sender}=request.body
                const {_id}=request.params;
                const result = await updateClientReply(_id,message,sender)  
                console.log("The result is ",result)
            if(result)
            {
                
                return response.json({status:"success",result:result}) 
            }
            else
            {
                return response.json({status:"failure",message:"Ticket conversation has been updated"})
            }
            
            }
            catch(error)
            {
            console.log(error)
            return response.json({status:"failure",error:error})
            }
            
            
            })
    
 // Update message from client
 router.patch("/close-ticket/:_id",userAuthorization,async(request,response)=>{
        
    
    try{
        
        const {_id}=request.params;
        const result = await updateStatusClose(_id,request.userID)  
        console.log("The result is ",result)
    if(result)
    {
        
        return response.json({status:"success",message:"Ticket has been closed successfully"}) 
    }
    else
    {
        return response.json({status:"failure",message:"Ticket status failed to update"})
    }
    
    }
    catch(error)
    {
    console.log(error)
    return response.json({status:"failure",error:error})
    }
    
    
    })
    router.delete("/:_id",userAuthorization,async(request,response)=>{
        
    
        try{
           
            const {_id}=request.params;
            const result = await deleteTicket(_id,request.userID)  
            
        if(result)
        {
            
            return response.json({status:"success",message:"Ticket has been successfully deleted"}) 
        }
        else
        {
            return response.json({status:"failure",message:"Ticket deletion did not happen"})
        }
        
        }
        catch(error)
        {
        console.log(error)
        return response.json({status:"failure",error:error})
        }
        
        
        })



module.exports=router