import {createReducer} from '@reduxjs/toolkit'


// user orders 

export const orderReducer = createReducer({},{
    
    createNewOrderRequest:(state)=>{
         state.loading=true;
    },

    createNewOrderSuccess:(state,action)=>{
         state.loading=false ;
         state.newOrder=action.payload
    },

    createNewOrderFail:(state,action)=>{
        state.loading=false ;
         state.error=action.payload
    },

    checkoutRequest:(state)=>{
        state.loading =true;
    },

    checkoutSuccess:(state,action)=>{
       state.loading=false 
       state.info=action.payload
    },

    checkoutFail:(state,action)=>{
      state.loading=false;
      state.error = action.payload 
    },

    // get all orders 
        getAllOwnOrdersRequest:(state)=>{
          state.loading=true;
       },

      getAllOwnOrdersSuccess:(state,action)=>{
        state.loading=false;
        state.orders=action.payload;
      },

      getAllOwnOrdersFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
     },

    // get single order 
        getSingleOwnOrderRequest:(state)=>{
          state.loading=true;
      },

      getSingleOwnOrderSuccess:(state,action)=>{
        state.loading=false;
        state.order=action.payload;
      },

      getSingleOwnOrderFail:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },

    
      
    checkoutClearError:(state)=>{
      state.error = null
    },

    checkoutClearMesssage:(state)=>{
      state.message = null 
    }

})