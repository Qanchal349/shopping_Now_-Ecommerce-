const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    shippingInfo:{
          city:{
             type:String,
             required:true
          },
          country:{
             type:String, 
             required:true
          },
          state:{
             type:String,
             required:true
          } ,
          appartment:{
             type:Number,
             required:true
          },
          phone:{
            required:true,
            type:Number
          },
          postal:{
            type:Number,
            required:true
          }
     },

     productItem: {
            name:{
                 type:String,
                 required:true
            },
            price:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:'Product',
                required:true
            }
         } ,

     user:{
         type:mongoose.Schema.ObjectId ,
         ref:'User',
         required:true
     },

     paymentInfo:{
           id:{
            type:String,
            required:true 
           } ,
          status:{
             type:String,
             required:true
          }
     } ,  

     paidAt:{
        type:Date,
        required:true 
     },

    productsPrice:{
        type:Number,
        required:true
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingtaxPrice:{
        type:Number,
        required:true,
        default:0
    },
    productstaxPrice:{
        type:Number,
        required:true,
        default:0
    },
   
    orderStatus:{
         type:String,
         required:true,
         default:'Processing'
    },

    deliveredAt:Date,

    createdAt:{
        type:Date,
        default:Date.now
    }

})

module.exports = mongoose.model('Order',orderSchema) 