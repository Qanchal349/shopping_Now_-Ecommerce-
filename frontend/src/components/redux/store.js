import {configureStore} from '@reduxjs/toolkit' 
import {userAuthReducer } from './reducres/userReducer';
import { getSingleProduct, productReducer } from './reducres/productReducer';
import { cartReducer, saveShippingInfo } from './reducres/cartReducer';
import { reviewReducer } from './reducres/reviewReducer';
import { modelsReducer } from './reducres/modelReducer';
import { orderReducer } from './reducres/orderReducer';
import { adminOrdersReducer, adminProductReducer, adminUsersReducer, getSingleAdminOrderReducer } from './reducres/adminReducer';


const store = configureStore({
    reducer:{
       user:userAuthReducer  ,
       product:getSingleProduct,
       products:productReducer,
       cart:cartReducer,
       review:reviewReducer,
       open:modelsReducer,
       shipping:saveShippingInfo,
       order:orderReducer,
       adminProduct:adminProductReducer,
       adminUsers:adminUsersReducer,
       adminOrders:adminOrdersReducer,
       adminSingleOrder:getSingleAdminOrderReducer
    }
})


export default store; 


