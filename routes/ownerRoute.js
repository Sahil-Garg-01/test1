const express=require("express")
const router=express.Router()
const {owner}=require("../models/owner-model.js")
const {createproduct}=require("../controllers/productcontroller")
const {upload}=require("../config/imagemulter")

// console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV==="development"){
    router.post("/create",async (req,res)=>{
        let owners= await owner.find()
        if (owners.length>=1){
            res.status(501).send("owner already exists")
        }

        const {fullname, email, password}=req.body;

        const createowner=await owner.create({
            fullname,
            email,
            password
        })

        res.status(200).send(createowner)
    })
}


router.get("/",(req,res)=>{
    res.send("owner")
})


router.get("/createproduct",(req,res)=>{
    let success=req.flash("success")
    return res.render("createproduct",{success})
})


router.post("/createproduct",upload.single("productimage"),createproduct)


module.exports=router;