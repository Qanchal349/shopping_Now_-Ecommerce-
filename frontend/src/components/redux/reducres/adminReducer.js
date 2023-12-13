import {createReducer} from '@reduxjs/toolkit' 


export const adminProductReducer = createReducer({},{
       
   createProductRequest:(state)=>{
      state.loading=true
   },
   createProductSuccess:(state,action)=>{
      state.loading=false;
      state.message=action.payload
   },
   createProductFail:(state,action)=>{
     state.loading=false;
     state.error=action.payload
   },

   // update product 

   updateProductRequest:(state)=>{
     state.loading=true
   },

   updateProductSuccess:(state,action)=>{
     state.loading=false;
     state.message=action.payload
   },

   updateProductFail:(state,action)=>{
      state.loading=false;
      state.error=action.payload
   },

   // delete product 
   deleteProductRequest:(state)=>{
     state.loading=true
   },

   deleteProductSuccess:(state,action)=>{
     state.loading =false
     state.message=action.payload
   },

   deleteProductFail:(state,action)=>{
      state.loading =false;
      state.error=action.payload
   },


   productClearError:(state)=>{
      state.error=null
   },

   productClearMessage:(state)=>{
      state.message=null
   }

})



// change role and delete user
export const adminUsersReducer = createReducer({users:[]},{

    getAllUsersRequest:(state)=>{
         state.loading=true
    }  ,

    getAllUsersSuccess:(state,action)=>{
         state.loading=false 
         state.users=action.payload
    },

    getAllUsersFail:(state,action)=>{
         state.loading=false;
         state.error=action.payload 
    },

    // change role 
    changeRoleRequest:(state)=>{
         state.loading=true;
    },
    changeRoleSuccess:(state,action)=>{
         state.loading=false;
         state.message=action.payload
    },
    changeRoleFail:(state,action)=>{
         state.loading=false;
         state.error=action.payload
    },

    // delete user 

    deleteUserRequest:(state)=>{
         state.loading=true
    } ,
    deleteUserSuccess:(state,action)=>{
         state.loading=false;
         state.message=action.payload
    },
    deleteUserFail:(state,action)=>{
        state.loading =false 
        state.error=action.payload 
    },

    adminUserClearError:(state)=>{
         state.error=null
    },

    adminUserClearMessage:(state)=>{
        state.message=null
    }


})


// change status and delete 
export const adminOrdersReducer = createReducer({orders:[]},{
     getAllOrdersRequest:(state)=>{
         state.loading =true
     },
     getAllOrdersSuccess:(state,action)=>{
         state.loading=false;
         state.orders=action.payload.orders
         state.orderCount=action.payload.orderCount
         
     },

     getAllOrdersFail:(state,action)=>{
         state.loading=false
         state.error=action.payload
     },

     // change order status 

     changeOrderStatusRequest:(state)=>{
         state.loading=true;
     },
     changeOrderStatusSuccess:(state,action)=>{
         state.loading=false;
         state.message=action.payload
     },

     changeOrderStatusFail:(state,action)=>{
         state.loading=false;
         state.error=action.payload 
     },

     // delete order 

     deleteOrderRequest:(state)=>{
         state.loading=true;
     },
     deleteOrderSuccess:(state,action)=>{
         state.loading=false;
         state.message=action.payload
     },
     deleteOrderFail:(state,action)=>{
         state.loading=false;
         state.error=action.payload 
     },

     orderClearError:(state)=>{
        state.error=null
    },
    orderClearMessage:(state)=>{
        state.message=null
    }
})


// get single admin order  reducers 

export const getSingleAdminOrderReducer = createReducer({order:{}},{
      // get single order 
      getSingleAdminOrderRequest:(state)=>{
        state.loading=true;
     },

     getSingleAdminOrderSuccess:(state,action)=>{
         state.loading =false;
         state.order=action.payload
     },

     getSingleAdminOrderFail:(state,action)=>{
         state.loading = false;
         state.error=action.payload
     },
})
