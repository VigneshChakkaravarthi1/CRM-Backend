const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const ResetPinSchema =new Schema({
email:{
    type:String,
    required:true,
    maxlength:50
},
resetPin:{
    type:Number,
    maxlength:6,
    minlength:6

},
addedAt:{
    type:Date,
    required:true,
    default:Date.now()
}


})

module.exports={
    ResetPinSchema:mongoose.model("ResetPin",ResetPinSchema)
}