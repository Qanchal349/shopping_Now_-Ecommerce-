const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require('../models/orderModel');
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel")
const razorpayInstance = require("../server") 
const crypto = require('crypto')


// checkout 
exports.checkout = catchAsyncError(async(req,res,next)=>{
    const {productsPrice} =  req.body;
    const {instance}  = razorpayInstance
    
    const options = {
        amount:Number(productsPrice),
        currency:"INR"
     }

     const info = await instance.orders.create(options) 
     res.status(200).json({
         success:true,
         info 
     })

})

// get key 
exports.getKey = catchAsyncError(async(req,res)=>{
     res.status(200).json({
         success:true,
         key:process.env.RAZORPAY_API_KEY
     })
})
 

// payment verification 
exports.paymentVerfication = catchAsyncError(async(req,res,next)=>{
    
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
    const body = razorpay_order_id+"|"+razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256',process.env.RAZORPAY_API_SECRET).update(body.toString()).digest('hex')
    const paymentInfo={
         id:razorpay_order_id,
         status:'created'
    }

    console.log(razorpay_order_id)

    const order = await Order.findOne({paymentInfo})  
  
    if(!order)
    res.redirect(`http://localhost:3000/paymentfail?reference=${razorpay_payment_id}`) 

    const isAuthentic = expectedSignature===razorpay_signature
    if(isAuthentic){
        order.paymentInfo={
             id:razorpay_payment_id,
             status:'created'
        }
        await order.save() 
        res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        res.status(200).json({
           success:true,
         })
          
    }else{
         await order.deleteOne();
         res.redirect(`http://localhost:3000/paymentfail?reference=${razorpay_payment_id}`)
    }
    
})



// create new order  
exports.createNewOrder = catchAsyncError(async(req,res,next)=>{
 
    const {shippingInfo,productItem,paymentInfo,productsPrice} = req.body;
    const newOrder = await Order.create({
        shippingInfo,paymentInfo,productItem,productsPrice,paidAt:Date.now(),user:req.user.id
    })

    res.status(201).json({
        success:true,
        newOrder
    })
})


// get single order 
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
     const order = await Order.findById(req.params.id).populate('user','name email')
     if(!order)
      return next(new ErrorHandler("Order not found",404))
    
      res.status(200).json({
         success:true,
         order
      })
})


// get my orders 
exports.getAllOwnOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user.id}).populate('user','name email') 
   
    res.status(200).json({
        success:true,
        orders
     })
})





// Admin Routes 

// get all orders 
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({}).populate('user','name email') 
    const orderCount = await Order.countDocuments({})
    res.status(200).json({
         success:true,
         orders,
         orderCount 
    })
})


// change status 
exports.changeOrderStatus = catchAsyncError(async(req,res,next)=>{
  
    const order = await Order.findById(req.params.id)
    if(order.orderStatus==='Delivered')
     return next(new ErrorHandler("You have already delivered this product",400))
    
    // update stock 
        if(order.orderStatus==='shipped')
         await updateStock(order.productItem.product,order.quantity)
    
    order.orderStatus=req.body.status 
   
    if(req.body.status==='Delivered') 
      order.deliveredAt=Date.now();

    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"status changed successfully"
    })
})


// get single order 
exports.getSingleAdminOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id).populate('user','name email')
    if(!order)
     return next(new ErrorHandler("Order Not Found",404)) 

   res.status(200).json(
      {
        success:true,
        order
      }
   )  
})


async function updateStock(id,qty){
  const product = await Product.findById(id) 
  if(!product)
    return next(new ErrorHandler("Product not found ",404))
 
  product.stock-=qty;
  await product.save({validateBeforeSave:false}); 
  
}


// delete order 
exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
 const order = await Order.findById(req.params.id) 
 if(!order)
 return next(new ErrorHandler("Order not found ",404))
 await order.deleteOne();
 res.status(200).json({
     success:true,
     message:"product deleted successfully"
 })      

})




