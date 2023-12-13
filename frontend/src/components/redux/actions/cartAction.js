import axios from 'axios' 

export const addCartItemction=(id,quantity,decrese=false)=>async(dispatch,getState)=>{
     try {
         
        
         dispatch({type:"addCartItemRequest"})
         const {data} = await axios.get(`/api/v1/product/${id}`)
          const cart = {
            id:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity
         } 

         const payload = {
              message: decrese ? "Remove from 🛒" : "Added to 🛒",
              cart
         }
         dispatch({type:'addCartItemSuccess',payload})    
         localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
     } catch (error) {
         dispatch({type:"addCartItemRequest",payload:error.response.data.message})
     }
}

export const deleteCartItemAction = (id)=>async(dispatch,getState)=>{
     try {
         
       const payload = {
          id,message:'Remove From Cart'
       } 
        console.log(payload.id) 

        dispatch({type:'deleteItemFromCartSuccess',payload})
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
     } catch (error) {
        dispatch({type:"deleteItemFromCartFail",payload:error.response.data.message})
     }
}


// save shipping info 
export const saveShippingInfoAction = (data)=>async(dispatch)=>{
   
   dispatch({type:'saveShippingInformation',payload:data})
   localStorage.setItem('shipping',JSON.stringify(data)) 

}