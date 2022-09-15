const mongoose=require("mongoose")
const Schema = mongoose.Schema

const TicketSchema = new Schema({
clientId:{
    type:Schema.Types.ObjectId,
    maxlength:100,
    required:true,
    default:""
},
subject:{
    type:String,
    maxlength:50,
    minlength:3,
    required:true,
},
openAt:{
    type:Date,
    required:true,
    default:Date.now()
},
status:{
type:String,
maxlength:30,
required:true,
default:"Pending Operator Response"

},
conversation:[
    {
        sender:{
            type:String,
            maxlength:50,
            required:true,
            default:""
        },
        message:{
            type:String,
            maxlength:1000,
            required:true,
            default:""
        },
        msgAt:{
            type:Date,
            default:Date.now(),
            required:true
        }
    }
]
})


module.exports={
    TicketSchema:mongoose.model("Ticket",TicketSchema)
}