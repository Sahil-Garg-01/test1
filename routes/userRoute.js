const express=require("express")
const router=express.Router();
const{ registeruser,loginuser,logoutuser,addtocart,cart}=require("../controllers/usercontroller")
const loggedin=require("../middlewares/isloggedin")



router.get("/",(req,res)=>{
    console.log("function",addtocart)
    res.send("user")
})

router.post("/register",registeruser);

router.post("/login",loginuser)

router.get("/logout",logoutuser)

router.get("/addtocart/:productid",loggedin,addtocart)

router.get("/cart",loggedin,cart)


module.exports=router;