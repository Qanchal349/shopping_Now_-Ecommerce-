import axios from 'axios'



// create new order 
export const orderAction = (form)=>async(dispatch)=>{
     try {


        dispatch({type:'createNewOrderRequest'})
        const config = {
             headers:{
                 'Content-Type':'application/json'
             }
        }
        const {data} = await axios.post(`/api/v1/order/new`,form,config)
        dispatch({type:'createNewOrderSuccess',payload:data.newOrder})
        
     } catch (error) {
         console.log(error.response.data)
         dispatch({type:"createNewOrderFail",payload:error.response.data.message})
     }
}



// checkout 
export const checkoutAction = (productsPrice) =>async(dispatch)=>{
       try {
        dispatch({type:"checkoutRequest"})
         const config = {
            headers:{
                'Content-Type':'application/json'
            }
         }

        const {data} = await axios.post(`/api/v1/checkout`,{productsPrice},config) 

        dispatch({type:'checkoutSuccess',payload:data.info})

       } catch (error) {
        dispatch({type:"checkoutFail",payload:error.response.data.message})
       }
}



// get all orders 
export const getOwnAllOrders = () =>async(dispatch)=>{
    try {
     dispatch({type:"getAllOwnOrdersRequest"})
     const {data} = await axios.get(`/api/v1/orders`) 
     dispatch({type:'getAllOwnOrdersSuccess',payload:data.orders})
   
    } catch (error) {
     dispatch({type:"getAllOwnOrdersFail",payload:error.response.data.message})
    }
}


// get single order  
export const getOwnSingleOrder = (id) =>async(dispatch)=>{
    try {

     dispatch({type:"getSingleOwnOrderRequest"})
     const {data} = await axios.get(`/api/v1/order/${id}`)  
     dispatch({type:'getSingleOwnOrderSuccess',payload:data.order})

    } catch (error) {
     dispatch({type:"getSingleOwnOrderFail",payload:error.response.data.message})
    }
}