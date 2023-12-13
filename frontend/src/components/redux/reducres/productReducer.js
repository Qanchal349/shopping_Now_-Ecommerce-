import { createReducer } from "@reduxjs/toolkit";


// get all products 
export const productReducer = createReducer({products:[]},{
      allProductRequest:(state)=>{
        state.loading=true;
      } ,
      allProductSuccess:(state,action)=>{
          state.loading=false;
          state.products = action.payload.products;
          state.count = action.payload.count 
      } ,

      allProductFail:(state,action)=>{
         state.loading=false;
         state.error=state.action
      },

      allProductClearError:(state)=>{
         state.error=null
      },
      
 })


 // get single product 
export const getSingleProduct=createReducer({product:{}},{

       getSingleProductRequest:(state)=>{
        state.loading=true;
     },

     getSingleProductSuccess:(state,action)=>{
        state.loading=false 
        state.product=action.payload
     },
     getSingleProductFail:(state,action)=>{
         state.loading=false;
         state.error = action.payload 
     },

     getSingleProductClearError:(state)=>{
         state.error=null
     }
})


// filter or search 