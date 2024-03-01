const catchAsyncError = require("../middleware/catchAsyncError")
const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const ApiFeatures = require("../utils/apiFeatues")
const cloudinary = require('cloudinary')



// get allproducts 
exports.createNewProduct = catchAsyncError(async(req,res,next)=>{
    let images = []
    if(typeof req.body.images==='string'){
        images.push(req.body.images)
    }else{
        images = req.body.images 
    }

    const imagesLinks =[]
    for (let i = 0; i < images.length; i++) {
     const result = await cloudinary.v2.uploader.upload(images[i], {
       folder: "products",
     });

     imagesLinks.push({
       public_id: result.public_id,
       url: result.secure_url,
     });
   } 


    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
     await Product.create(req.body);
    res.status(200).json({
        status:true,
        message:"Product Created Successfully" 
    })
})

// get all products 
exports.getAllProducts= catchAsyncError(async(req,res,next)=>{
     const perPage=1;
     const count = await Product.countDocuments({})
     const apifeature = new ApiFeatures(Product.find(),req.query).search().filter(); 
     const products = await apifeature.query;
     return res.status(200).json({
        success:true,
        products,
        count
     })
})


// update product 
exports.updateProduct = catchAsyncError(async(req,res,next)=>{

       let product = await Product.findById(req.params.id) 

       if(!product)
          return next(new ErrorHandler("Product not found",404))

       let images = [];
       if (typeof req.body.images === "string") {
            images.push(req.body.images);
       } else {
            images = req.body.images;
       }     

      
       if (images !== undefined) {
          for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
          }
      
          const imagesLinks = [];
      
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
            });
      
            imagesLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
      
          req.body.images = imagesLinks;
       } 
       product = await Product.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true,
       useFindAndModify: false,
     }); 
    
     return res.status(200).json({
         success:true,
         message:"Product Updated Successfully" 
     }) 
})


// delete product 
exports.deleteProduct= catchAsyncError(async(req,res,next)=>{
     let product = await Product.findById(req.params.id) 

     if(!product)
     return next(new ErrorHandler("Product not found",404))

     // delete from cloudinary 
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

       await product.deleteOne();
    
    return res.status(200).json({
         success:true,
         message:"Product deleted sucessfully"
    })
})

// get single product 
exports.getSingleProduct = catchAsyncError(async(req,res,next)=>{
    
    const product = await Product.findById(req.params.id) 
    if(!product)
    return next(new ErrorHandler("Product not found",404))

    return res.status(200).json({
         success:true,
         product
    })
})



