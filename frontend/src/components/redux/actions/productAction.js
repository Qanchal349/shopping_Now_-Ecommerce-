import axios from 'axios' 


export const productsAction = (keyword='',price=[0,200000],rating=0,category='')=>async(dispatch)=>{
    
    try {
         console.log(price) 
        dispatch({type:'allProductRequest'})
        let link = `/api/v1/products?keyword=${keyword}&aggregateRating[gte]=${rating}&price[lte]=${price[1]}&price[gte]=${price[0]}`
        if(category)
          link = `/api/v1/products?keyword=${keyword}&category=${category}&aggregateRating[gte]=${rating}&price[lte]=${price[1]}&price[gte]=${price[0]}` 
        const {data} = await axios.get(link) 
        console.log(data)
        dispatch({type:'allProductSuccess',payload:data})

     } catch (error) {
        dispatch({type:"allProductFail",payload:error.response.data.message})
     }  
   }


export const getSingleProductAction=(id)=>async(dispatch)=>{
     try {
         dispatch({type:'getSingleProductRequest'})
         const {data} = await axios.get(`/api/v1/product/${id}`) 
         dispatch({type:'getSingleProductSuccess',payload:data.product})
     } catch (error) {
        dispatch({type:"getSingleProductFail",payload:error.response.data.message})
     } 

}