const app = require("./app")
const dotenv = require("dotenv") 
const databse = require("./utils/database")
const cloudinary = require("cloudinary")
const Razorpay = require('razorpay')

dotenv.config({path:"api/config/config.env"})


cloudinary.config({
     cloud_name:process.env.CLOUDINARY_NAME,
     api_key:process.env.CLOUDINARY_KEY,
     api_secret:process.env.CLOUDINARY_SECRET,
})


//razorpay 
module.exports.instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET 
 })



// handling uncaught exception  ----- not define
process.on("uncaughtException",err=>{
      console.log(err.message)
      process.exit(1);
})

databse();
const port = process.env.PORT || 4000
const server = app.listen(port,()=>{
     console.log("server listen at 4000")
})



// unhandled promise rejection 
process.on("unhandledRejection",err=>{
      console.log(err.message)
      console.log('Server shutting down due to unhandle promise rejection')
      server.close(()=> process.exit(1))
})






