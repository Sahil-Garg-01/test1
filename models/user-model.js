const mongoose=require("mongoose")
const {Product}=require("./product-model")

const userschema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true,
        minlength:3,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    image:String,
    contact:{
        type:Number,
        
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },],
    orders:{
        type:Array,
        default:[]
    }
})



const user= mongoose.model("User",userschema)

module.exports={
    user,
}