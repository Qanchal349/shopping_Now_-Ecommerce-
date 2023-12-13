const mongoose = require("mongoose")
const validator = require("validator") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
   
    name:{
         type:String,
         required:[true,"Please provide name"],
         maxLength:[30,"Don't exceed 30 char"],
         unique:true
    },

    email:{
         type:String,
         required:[true,"Please provide email"],
         validate:[validator.isEmail,"Please provide a valid email"],
         unique:true
    },

    password:{
        type:String,
        required:[true,"Please provide password "],
        minLength:[8,"pasword should atleast 8 char"],
        select:false
    },

    role:{
       type:String,
       default:"user"
    },

    profile:{
         public_id:{
             type:String,
             default:"random url"
        },
        url:{
             type:String,
             default:"random url "
         }
         
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken:String,

    resetPasswordExpire:Date

})


// bcrypt password 
userSchema.pre('save',async function(next){
    if(!this.isModified("password")) next()
    this.password = await bcrypt.hash(this.password,10);
})

// generate token for cookie-parser  
userSchema.methods.generateJwtToken = function(){
     
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.COOKIE_EXPIRE_DATE})
}

// compare password 
userSchema.methods.comparePassword = async function(enterPassword){
     return await bcrypt.compare(enterPassword,this.password)
}


// generate token for forgot password 
userSchema.methods.getResetPasswordToken = async function(){
      const token = crypto.randomBytes(20).toString("hex")
      this.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")
      this.resetPasswordExpire = Date.now()+15*60*1000;
      return token ;
}

module.exports = mongoose.model("User",userSchema) 