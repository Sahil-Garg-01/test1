const {Product}=require("../models/product-model")



async function createproduct(req,res){
    
    try{const { name, price, discount, bgcolor, textcolor, panelcolor}=req.body;

    const aProduct= await Product.create({
        name, price, discount, bgcolor, textcolor, panelcolor,
        productimage:`/uploads/${req.file.filename}`,
    })
    
    req.flash("success","product created successfully")
    return res.redirect("/shop")
}

    catch(err){
        res.send(err.message);
    }

}


module.exports={createproduct}