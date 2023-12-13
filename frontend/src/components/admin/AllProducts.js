import React, { useEffect } from 'react'
import "./allProducts.css" 
import { useDispatch, useSelector } from 'react-redux'
import { productsAction } from '../redux/actions/productAction';
import toast from 'react-hot-toast';
import {Link} from "react-router-dom"
import { deleteProductAction } from '../redux/actions/adminAction';


export const AllProducts = () => {

  const dispatch = useDispatch();
  const {products,loading} = useSelector(state=>state.products) 
  const {error,message} = useSelector(state=>state.adminProduct) 


  useEffect(() => {
    
   if(error){
      toast.error(error)
      dispatch({type:'productClearError'})
   } 
   if(message){
     toast.success(message) 
     dispatch({type:'productClearMessage'})
   }
   dispatch(productsAction())

  }, [error,message,dispatch])
  

 const deleteProductHandler=(id)=>{
     dispatch(deleteProductAction(id))
 }


  return (
       <div className="allAdminProducts">
             {loading ? <h1>Loading....</h1> : products && products.map((product)=>(
                     <div className="allAdminProductsDetailAndAction" key={product._id} >
                     <div className="div">
                           <p className='reference'>Product Reference : <span>{product._id}</span> </p>
                           <p className='midDetail'>{product.name}</p>
                           <p>Product Amount <span>₹{product.price}</span></p>
                     </div>
                     <div className='hiddenDetailDiv'>
                         <p>Category: <span>Wear</span></p>
                         <p className='midDetail'>{product.stock > 0 ? <p className='green'>InStock : {product.stock} </p> : <p className='red'>Out Of Stock</p> }</p>
                          {product.reviews.length>0 ? <p className='green'>Reviews : {product.reviews.length}</p> :<p>No Reviews</p> }
                     </div>
                     <div>
                         <p>Actions</p>
                         <button onClick={(e)=>deleteProductHandler(product._id)}>Delete</button>
                         <Link to={`/admin/product/${product._id}`}><button className='linkUpdateProduct'>Update</button></Link>
                     </div>
                   </div>
             ))}   
       </div>
  )
}
