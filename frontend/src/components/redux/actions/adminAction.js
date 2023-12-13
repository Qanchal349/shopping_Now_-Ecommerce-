import axios from 'axios'
 
// product
export const createProductAction = (formData)=>async(dispatch)=>{
      try {
          dispatch({type:'createProductRequest'})
          const config={
             headers:{
                 'Content-Type':"multipart/form-data"
             }
          }
          const {data} = await axios.post(`/api/v1/product`,formData,config)
          dispatch({type:'createProductSuccess',payload:data.message})
      } catch (error) {
          dispatch({type:'createProductFail',payload:error.response.data.message})
      }
}

export const updateProductAction = (id,formData)=>async(dispatch)=>{
     try {
         dispatch({type:'updateProductRequest'})
         const config={
            headers:{
                'Content-Type':"multipart/form-data"
            }
         }
         const {data} = await axios.put(`/api/v1/product/${id}`,formData,config)
         dispatch({type:'updateProductSuccess',payload:data.message})

     } catch (error) {
        dispatch({type:'updateProductFail',payload:error.response.data.message})
     }
}

export const deleteProductAction =(id)=>async(dispatch)=>{
     try {
         dispatch({type:'deleteProductRequest'})
         const {data} = await axios.delete(`/api/v1/product/${id}`)
         dispatch({type:'deleteProductSuccess',payload:data.message})

     } catch (error) {
        dispatch({type:'deleteProductFail',payload:error.response.data.message})
     }
}


// users 

export const getAllAdminUsersAction = ()=>async(dispatch)=>{
    try {
        dispatch({type:'getAllUsersRequest'})
        const {data} = await axios.get(`/api/v1/users`) 
        dispatch({type:'getAllUsersSuccess',payload:data.users})

    } catch (error) {
       dispatch({type:'getAllUsersFail',payload:error.response.data.message})
    }  
}


export const updateUserRoleAction=(id,name,email,role)=>async(dispatch)=>{
    try {
        dispatch({type:'changeRoleRequest'})
        console.log(name,email,role)
        const config={
            headers:{
                'Content-Type':"application/json"
            }
         }
        const {data} = await axios.put(`/api/v1/user/role/${id}`,{name,email,role},config)
        console.log(data.message)  
        dispatch({type:'changeRoleSuccess',payload:data.message})

    } catch (error) {
        console.log(error.response.data)
        dispatch({type:'changeRoleFail',payload:error.response.data.message})
    }    
}


export const deleteUserAction = (id)=>async(dispatch)=>{
    try {
        dispatch({type:'deleteUserRequest'})
        const {data} = await axios.delete(`/api/v1/user/${id}`) 
        dispatch({type:'deleteUserSuccess',payload:data.message})

    } catch (error) {
       dispatch({type:'deleteUserFail',payload:error.response.data.message})
    }
}


// orders 
export const getAllOrdersAction = ()=>async(dispatch)=>{
    try {
        dispatch({type:'getAllOrdersRequest'})
        const {data} = await axios.get(`/api/v1/admin/orders`) 
        dispatch({type:'getAllOrdersSuccess',payload:data})

    } catch (error) {
       dispatch({type:'getAllOrdersFail',payload:error.response.data.message})
    }
}


export const changeOrderStatusAction = (status,id) =>async(dispatch)=>{
    try {
        dispatch({type:'changeOrderStatusRequest'})
        console.log(status) 
        const config={
            headers:{
                'Content-Type':"application/json"
            }
         }
        const {data} = await axios.put(`/api/v1/admin/order/${id}`,{status},config) 
        dispatch({type:'changeOrderStatusSuccess',payload:data.message})

    } catch (error) {
        console.log(error.response.data) 
       dispatch({type:'changeOrderStatusFail',payload:error.response.data.message})
    }
}


export const deleteOrderAction=(id)=>async(dispatch)=>{
    try {
        dispatch({type:'deleteOrderRequest'}) 
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`) 
        dispatch({type:'deleteOrderSuccess',payload:data.message})

    } catch (error) {
       dispatch({type:'deleteOrderFail',payload:error.response.data.message})
    }  
}


// get single order  admin 
export const getSingleAdminOrder=(id)=>async(dispatch)=>{
     try {
        dispatch({type:'getSingleAdminOrderRequest'})
        const {data} = await axios.get(`/api/v1/admin/order/${id}`) 
        dispatch({type:'getSingleAdminOrderSuccess',payload:data.order})
     } catch (error) {
        dispatch({type:'getSingleAdminOrderFail',payload:error.response.data.message})
     }
}
