const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({

    name:{
       type:String,
       required:[true,"Please Enter product name"],
       maxLength:[50,"Don't exceed than 50 char"] 
    } ,
    category:{
        type:String,
        required:[true,"Please provide category "]
    }  ,
    price:{
        type:Number,
        required:[true,"Please provide product price"]
    } ,
    color:{
        type:String,
        required:[true,"Please provide product color"]
    },
    description:{
         type:String,
         required:[true,"Please provide product description"]
    },

   stock:{
       type:Number,
       default:1,
       maxLength:[10,"Don't exceed more than 10"]
   },

    images:[
        {
            public_id:{
                type:String,
                required:[true,"Please provide public id"]
            },
            url:{
                type:String,
                required:[true,"please provide url"]
            }
        }
    ],

    reviews:[
        {   
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                default:0,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            }
        }
    ],

    user:{
         type:mongoose.Schema.ObjectId,
         ref:"User",
         required:true
    },

    totalReviews:{
        type:Number,
        default:0
    },

    aggregateRating:{
        type:Number,
        default:0
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

})


module.exports = mongoose.model("Product",productSchema);

