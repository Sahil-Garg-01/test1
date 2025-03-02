const {Schema,model}=require("mongoose")

const ownerschema=new Schema({

    fullname:{
        type:String,
        required:true,
        minlength:3,
        trim:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:String,
    
    products:{
        type:Array,
        default:[]
    },
    gstin:Number,
})



const owner= model("Owner",ownerschema)

module.exports={
    owner,
}