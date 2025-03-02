const {Schema,model}=require("mongoose")

const productschema=new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0,
    },
    productimage:{
        type:String,
    },
    textcolor:{
        type:String,
    },
    bgcolor:{
        type:String,
    },
    panelcolor:{
        type:String,
    }
})


module.exports= model("Product",productschema)