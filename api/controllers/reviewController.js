const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");


exports.createNewReview = catchAsyncError(async(req,res,next)=>{
    // fetch product 
    const product = await Product.findById(req.params.id) 
    const user = await User.findById(req.user.id) 
    const {rating,comment} = req.body;
    const isReviewed = product.reviews.find((review)=> review.user.toString()===req.user.id)
    
    if(isReviewed){
        product.reviews.forEach((review)=> {
            if(review.user.toString()===req.user.id){
                review.comment = comment;
                review.rating = rating
            }
        })
    }else{
        product.reviews.unshift({rating,comment,user:user.id,name:user.name})
        product.totalReviews=product.reviews.length;
    }
     
    let aggregateRating =0;
    product.reviews.map((review)=> aggregateRating+=review.rating) 
    product.aggregateRating=aggregateRating/product.reviews.length
    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        product
    })
})


// get all reviews 
exports.getAllReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id) 
    if(!product)
    return next(new ErrorHandler("No Product found",404))

    res.status(200).json({
        success:true,
        reviews:product.reviews
    })  
})


// delete own review 
exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.params.id)
    const isReviewed = product.reviews.find((review)=> review.user.toString()===req.user.id)
    if(!isReviewed)
    return next(new ErrorHandler("You can't delete this review",401))
    const reviews =  product.reviews.filter((review)=> review.user.toString()!==req.user.id)
    let aggregateRating =0;
    reviews.map((review)=> aggregateRating+=review.rating) 
    console.log(aggregateRating)
    product.aggregateRating = reviews.length===0 ? 0 : aggregateRating/reviews.length
    product.totalReviews=reviews.length;
    product.reviews=reviews;
    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message:"Review Deleted successfully"
    })
}) 