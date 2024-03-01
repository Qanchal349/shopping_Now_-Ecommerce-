const User = require("../models/userModel")
const cloudinary = require("cloudinary")
const sendToken = require("../utils/sendToken")
const ErrorHandler = require("../utils/errorHandler")
const catchAsynError = require("../middleware/catchAsyncError")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")



// register a user 
exports.register = catchAsynError(async(req,res,next)=>{
  
    const {name,email,password} = req.body;
    if(!email || !password || !name)
        return next(new ErrorHandler("Enter required field",400))

    const user = await User.create({name,email,password})
    // send token 
    const token = user.generateJwtToken() 
    sendToken(token,201,res);

})

// login
exports.login = catchAsynError(async(req,res,next)=>{
  const {email,password} = req.body 
  if(!email || !password){
     return next(new ErrorHandler("Please enter email or password",400))
  }  
  const user = await User.findOne({email}).select("+password")
  if(!user)
     return next(new ErrorHandler("Please enter valid email or password",401))
  const isMatched = await user.comparePassword(password) 
  if(!isMatched)
     return next(new ErrorHandler("Please enter valid email or password",401))

   const token = user.generateJwtToken() 
   sendToken(token,200,res);

})


// logout 
exports.logout=catchAsynError(async(req,res,next)=>{
  
   res.cookie("token",null,{
      expire:new Date(Date.now),
      httpOnly:true
   })

   res.status(200).json({
      success:true,
      message:"Logout successfully"
   })

})


// get user or profile 
exports.getUser=catchAsynError(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    res.status(200).json({
      success:true,
      user
    })
})


//  update password 

exports.updatePassword = catchAsynError(async(req,res,next)=>{
  
  const {oldPassword,newPassword} = req.body 
  const user = await User.findById(req.user.id).select("+password")
  if(!oldPassword || !newPassword)
     return next(new ErrorHandler("Please Enter password ",400))
  
  const isMatch = await user.comparePassword(oldPassword);
  if(!isMatch)
   return next(new ErrorHandler("Enter valid old password ",401))   
  
  user.password = newPassword;
  await user.save({validateBeforeSave:false}) 
  
  res.status(200).json({
     success:true,
     message:"password updated successfully"
  })

})


// update profile 
exports.updateProfile = catchAsynError(async(req,res,next)=>{
    
   const user = await User.findById(req.user.id)
   if(!user)
     return next(new ErrorHandler("You are not authorized",401)) 
    
   const newData = {
     name:req.body.name,
     email:req.body.email
  }
    await User.findByIdAndUpdate(req.user.id,newData,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    })
  
  
    res.status(200).json({
    success:true,
    message:"Profile Update Successfully"
    })

})


// forgot password 
exports.forgotPassword = catchAsynError(async(req,res,next)=>{
  const user = await User.findOne({email:req.body.email})
  if(!user)
    return next(new ErrorHandler("Invalid Email ",400))  
  
  // generate token 
  const token = await user.getResetPasswordToken(); 
  await user.save({validateBeforeSave:false}) 

  //  change url for frontend 
  const resetPasswordUrl = `${process.env.BACKEND_URL}/passwordreset/${token}`
  const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it `;
  
   // send mail 
   try {

        await sendEmail({
          email:user.email,
          subject:"Password recovery",
          message
        })

      res.status(200).json({
         success:true,
         message:`Email sent successfully to ${user.email}`
      })
    
   } catch (error) {
      user.resetPasswordExpire=undefined
      user.resetPasswordToken=undefined
      await user.save({validateBeforeSave:false})
      return next(new ErrorHandler(error.message,500))
   }
  
})


exports.resetPassword = catchAsynError(async(req,res,next)=>{
   
      const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")  
      const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}}) 
      const {password ,confirmPassword} = req.body;
      if(!user)
        return next(new ErrorHandler("token is invalid or has been expired",400))
 
      if(!password || !confirmPassword)
        return next(new ErrorHandler("Please Enter password",400))
      
         
      if(password!==confirmPassword)
        return next(new ErrorHandler("Password doesn't match",400))

      user.password=password;
      user.resetPasswordExpire=undefined;
      user.resetPasswordToken=undefined;

      await user.save({validateBeforeSave:false});

      res.status(200).json({
        success:true,
        message:"password changed successfully"
      })

})



// update profile picture 
exports.updateProfileImage = catchAsynError(async(req,res,next)=>{
   const user = await User.findById(req.user.id)
  
   if(req.body.avatar==="" || req.body.avatar===undefined)
     return next(new ErrorHandler("Please Choose Profile Image",401))
  
   const imageId = user.profile.public_id;
   await cloudinary.v2.uploader.destroy(imageId);

   const cloud =  await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:'scale'
   })
  
  const profile = {
      public_id:cloud.public_id,
      url:cloud.secure_url 
  }  
  console.log(profile)
  await User.findByIdAndUpdate(req.user.id,{profile},{
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
     
     res.status(200).json({
        success:true,
        message:"Profile updated successfully"
     })
})



// get all user ----Admin
exports.getAllUser=catchAsynError(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
       success:true,
       users
    })
})

// get single user by ---Admin

exports.getSingleUser = catchAsynError(async(req,res,next)=>{
    const user = await User.findById(req.params.id) 
    if(!user)
      return next(new ErrorHandler("User not found",404))

    res.status(200).json({
      success:true,
      user
    })

})

// delete single user by ----Admin

exports.deleteUser = catchAsynError(async(req,res,next)=>{
   const user = await User.findById(req.params.id)
  
   if(!user)
     return next(new ErrorHandler("User not found",404))
   
   await user.deleteOne()  
   res.status(200).json({
     success:true,
     message:"user deleted successfully"
   })
})


// change admin role ------Admin
exports.changeRole=catchAsynError(async(req,res,next)=>{
  
   const {name,email,role} = req.body;
   if(!name || !email || !role)
     return next(new ErrorHandler("Please provide name or email or role",400))
  
   const user = await User.findByIdAndUpdate(req.params.id,{name,email,role},{new:true,runValidators:true,useFindAndModify:false})
   res.status(200).json({
     success:true,
     message:"Role changed successfully"
   })

})




 

