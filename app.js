require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors=require("cors")
const helmet= require("helmet")
const morgan = require("morgan")
const mongoose = require("mongoose")
const port =process.env.PORT || 3001;
app.use(cors())
mongoose.connect("mongodb://localhost:27017/CRM_Database",{})
if(process.env.NODE_ENV!=="production")
{const mdB=mongoose.connection;
    mdB.on("open",()=>{
        console.log("Mongo Db is connected")
    })
    mdB.on("error",()=>{
        console.log("error")
    })

}




//Error Handler
const handleError=require("./utils/errorHandler")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//Load Routers
const userRouter = require("./src/routers/user.router")
const ticketRouter = require("./src/routers/ticket.router")
const tokensRouter=require("./src/routers/tokens.router")

//Use Routers
app.use("/v1/user",userRouter)

app.use("/v1/ticket",ticketRouter)

app.use("/v1/tokens",tokensRouter)

app.use((req,res,next)=>{
    const error = new Error("Resource Not found")
    error.status=404
    next(error)
})


app.use((error,req,res,next)=>{
   handleError(error,res)

})




//API Security
// app.use(helmet())

// //Handle CORS error
// app.use(cors())

//Logger
// app.use(morgan("tiny"))

//Set body parser



//Routers



app.listen(port,()=>{
    console.log(`API is ready on http://localhost:${port}`)
})