import axios from 'axios' 

export const getAllReviews=(productId)=>async(dispatch)=>{
    try {
       dispatch({type:'getAllReviewRequest'})
       const {data} = await axios.get(`/api/v1/product/review/${productId}`)   
       dispatch({type:'getAllReviewSuccess',payload:data.reviews})

    } catch (error) {
       console.log(error)
       dispatch({type:'getAllReviewFail',payload:error.response.data.message})
    }
}



// create new review 
export const createNewReview =(productId,formData)=>async(dispatch)=>{
     try {
         dispatch({type:'createNewReviewRequest'}) 
         const config = {headers:{'Content-Type':'application/json'}} 
         const {data} = await axios.put(`/api/v1/product/review/${productId}`,formData,config) 
         dispatch({type:"createNewReviewSuccess",payload:data.message})
     } catch (error) {
         dispatch({type:'createNewReviewFail',payload:error.response.data.message})
     }
}



// delete review 
export const deleteReview = (productId,reviewId) =>async(dispatch)=>{
    try {
        dispatch({type:'deleteReviewRequest'})  
        const {data} = await axios.delete(`/api/v1/product/review/${productId}`,{reviewId}) 
        dispatch({type:"deleteReviewSuccess",payload:data.message})
    } catch (error) {
        dispatch({type:'deleteReviewFail',payload:error.response.data.message})
    }
}