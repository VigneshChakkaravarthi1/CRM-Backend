const router = require("../src/routers/user.router")

const handleError =(error,res)=>{
    
  
    res.status(error.status||500) 
  
console.log(res) 
    res.json({
        message:error.message
    })
}


module.exports=handleError