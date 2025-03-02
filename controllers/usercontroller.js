const {user}=require("../models/user-model")
const bcrypt=require("bcryptjs")
const generatetoken=require("../utils/generatetoken")



async function registeruser(req,res){
    try{
        const {fullname ,email, password} = req.body;

        const  auser= await user.findOne({ email : email })

        if (auser) {res.status(405).send("user already exist. please login");}
        

        bcrypt.genSalt(7,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err){ res.send(err.message); }
                else {
                    const newuser= await user.create({
                        fullname,
                        email,
                        password : hash,
                        });
                    const token = generatetoken(newuser);
                    res.cookie("token",token)
                    return res.status(201).send("user created")
                    }
                })
            })  
        }   
    catch(err){
        res.send(err.message)
    }
}



async function loginuser(req,res){
    const { email , password } = req.body;
    const auser=await user.findOne({email:email})
    if(!auser) {
        req.flash("messages","incorrect email")
        return res.redirect("/");
    };
    bcrypt.compare(password,auser.password,(err,result)=>{
        
        if(!result) {return res.status(400).send("incorrect password")}
        else{  
        const token=generatetoken(auser);
        res.cookie("token",token);
        return res.redirect("/shop")
        }
    })
}



async function logoutuser(req,res){
    res.cookie("token","")
    return res.redirect("/");
}



async function addtocart(req,res){
    try{
        const auser=req.user;
    if (!auser) {
        return res.redirect("/shop");
        }

    auser.cart.push(req.params.productid)
    await auser.save();
   
    return res.redirect("/shop")
    }

    catch (error) {
        
        return res.redirect("/shop");
    }
}



async function cart(req, res) {
    try {
      
      const auser = await user.findOne({ email: req.user.email }).populate('cart');
      
      if (!auser) {
        return res.redirect('/login');
      }
      
      return res.render("cart", { auser });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Server error");
    }
  }


module.exports={registeruser,loginuser,logoutuser,addtocart,cart};