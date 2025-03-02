const jwt=require("jsonwebtoken")
const {user}=require("../models/user-model")


const loggedin = async (req,res,next)=>{
    if(!req.cookies.token){
        req.flash("error:","Need to login first")
        return res.redirect("/");
    }

    try{
        const decoded=jwt.verify(req.cookies.token,process.env.JWT_KEY)
        const auser= await user
            .findOne({email: decoded.email})
            .select("-password")

    req.user=auser
    next();
    }
    
    catch(err){
        req.flash("error:","something went wrong")
        return res.redirect("/");
    }

}

module.exports=loggedin;