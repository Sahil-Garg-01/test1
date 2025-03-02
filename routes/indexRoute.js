const express=require("express")
const router=express.Router();
const loggedin=require("../middlewares/isloggedin")
const {product}=require("../models/product-model")

router.get("/",(req,res)=>{
    
    res.render("index", { 
        messages:  { error: null },

        alreadyloggedin: req.cookies.token?true:false,
        
    })
})

router.get("/shop",loggedin,async(req,res)=>{
    const products=await product.find() 
    // let success=req.flash("success","done")
    res.render("shop",{products})
})


module.exports=router;
