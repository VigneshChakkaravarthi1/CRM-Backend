const mongoose =require("mongoose")
const Schema = mongoose.Schema;
const userSchema =new Schema({
    name:{
        type:String,
        maxlength:50,
        required:true
    },
    company:{
        type:String,
        maxlength:50,
        required:true
    },
    address:{
        type:String,
        maxlength:100,
        required:true
    },
    phone:{
        type:String,
        maxlength:12,
       
    },
    email:{
        type:String,
        maxlength:50,
        required:true
    },
    password:{
        type:String,
        minlength:8,
        maxlength:200,
        required:true
    }



})

module.exports={
    userSchema:mongoose.model("User",userSchema)
}