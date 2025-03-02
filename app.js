const express=require("express")
const path=require("path")
const cookieParser=require("cookie-parser")
const db= require("./config/mongoose-connection")
const PORT=1000;
const ownerRouter=require("./routes/ownerRoute")
const userRouter=require("./routes/userRoute")
const productRouter=require("./routes/productRoute")
const indexRouter=require("./routes/indexRoute")
const expressSession=require("express-session")
const flash=require("connect-flash")
require("dotenv").config()

const passport = require("./utils/passport");
const authRoutes = require("./routes/googleauth");

const app=express()

app.use(express.static(path.join(__dirname,"public")))
app.use(flash()); 
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressSession({
    resave:false, 
    saveUninitialized:true,
    secret:"secret"}))


app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use("/googleauth", authRoutes);

app.use("/",indexRouter)
app.use("/owner",ownerRouter)
app.use("/user", userRouter)
app.use("/product",productRouter)


app.listen(PORT,()=>{console.log("server started")})