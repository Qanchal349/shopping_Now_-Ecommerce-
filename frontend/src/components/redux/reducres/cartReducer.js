import {createReducer} from '@reduxjs/toolkit' 


export const cartReducer = createReducer({cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],},{
     addCartItemRequest:(state)=>{
         state.loading=true
     } ,

     addCartItemSuccess:(state,action)=>{
         state.loading=false;
         state.message=action.payload.message 
         const item = action.payload.cart;
         const isItemExist = state.cartItems.find((product)=>product.id===item.id)

         if(isItemExist){
             // replace 
           state.cartItems=state.cartItems.map((product)=>product.id===item.id?item:product)
         }else{
            state.cartItems=[...state.cartItems,item]
         }
     },

     addCartItemFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload 
     },

     addItemClearError:(state)=>{
         state.error=null
     },

    addItemClearMessage:(state)=>{
        state.message=null
    },


    // delete item fom cart 

   deleteItemFromCartSuccess:(state,action)=>{
      state.loading =false;
      state.message = action.payload.message;
      state.cartItems=state.cartItems.filter((product)=>product.id!==action.payload.id) 
   },

   deleteItemFromCartFail:(state,action)=>{
      state.loading = false;
      state.error=action.payload 
   },

   deleteItemFromCartClearError:(state)=>{
      state.error=null
   },

   deleteItemFromCartClearMessage:(state)=>{
     state.message=null;
   }


})


// save shipping info reducers 
export const saveShippingInfo = createReducer({shipping:localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')):{} },{
     saveShippingInformation:(state,action)=>{
          state.shipping=action.payload 
     }
})
