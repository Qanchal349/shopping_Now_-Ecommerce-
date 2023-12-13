import React, { useEffect, useState} from 'react'
import image from "../assets/images/jeans3.jpg"
import {FaShippingFast} from "react-icons/fa" 
import "./productDetail.css"
import ReactStars from "react-rating-stars-component";
import Review from './Review/Review';
import {FaPlus,FaMinus} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getSingleProductAction} from '../redux/actions/productAction';
import {useNavigate, useParams} from 'react-router-dom'
import { getAllReviews } from '../redux/actions/reviewAction';
import Model from './Model';
import { modelAction } from '../redux/actions/modelAction';
import { addCartItemction } from '../redux/actions/cartAction';
import { CircularProgress } from '@material-ui/core';

const ProductDetail = () => {

    const dispatch = useDispatch();
    const {loading,error,product} = useSelector(state=>state.product) 
    const {message,reviews} = useSelector(state=>state.review)
    const {open} = useSelector(state=>state.open)
    let [value, setValue] = useState(0) 
    const params = useParams();
    const  navigate = useNavigate()
 

    const dialogToggle=()=>{
        dispatch(modelAction(!open))  
    }


  
     useEffect(() => {
        if(error){
             toast.error(error) 
             dispatch({type:"getSingleProductClearError"})
        }
        
        dispatch(getSingleProductAction(params.id))
        dispatch(getAllReviews(params.id))  // product id 
     }, [dispatch,error,open])  

  
     const decreaseTo=()=>{
        const decrese = true
        if(value > 0){
            setValue(--value)
            dispatch(addCartItemction(product._id,value,decrese))
        }   
     }
    
    
     const addToCart=()=>{
        if(value<product.stock){
            setValue(++value)
            dispatch(addCartItemction(product._id,value)) 
        }
     }


     const gotoCart=()=>{
          navigate("/cart") 
     }

    

     

  return (

       <>
       
          <div className="productDetail">
                        
                        {loading ? <div className="loading"> <CircularProgress style={{color:"black"}} /> </div> : <>
                                    
                            {product &&   <div className="productInfo">
                                <div className="productImage">
                                    <img src={ product.images && product.images[0].url} alt="" />
                                </div>
                                <div className="productAction">
                                    <p className='description'>{product.description}</p> 
                                    <p className='reference'>Reference : {product._id}</p>
                                    <p style={{color:"gray",fontSize:'1.1rem'}}>{product.name}</p>
                                    <div className="rating">
                                        <ReactStars
                                        count={5}
                                        value={product.aggregateRating} 
                                        size={30}
                                        edit={false}
                                        activeColor="#783B3E"
                                        isHalf={true}
                                        color="#F8CFD0"
                                        />
                                        <p>{product.reviews && product.reviews.length} Reviews</p>
                                        <button onClick={dialogToggle}>Submit Review</button>
                                    </div>
                                    <h5>Price: ₹{product.price}</h5>
                                    <div className="color">
                                        <p>Color:  </p>
                                         <div style={{backgroundColor:`${product.color}`}}></div>
                                    </div>
                                    <div className="quantity">
                                       {product.stock >0 ? <p className='green'>InStock {product.stock} </p> : <p className='red'>Out Of Stock</p>}
                                    </div>
                                       <div className="increase">
                                          <div onClick={addToCart}> <FaPlus/></div>
                                            <p>{value}</p>
                                          <div onClick={decreaseTo}><FaMinus/></div>
                                       </div>
                                    <div className="button">
                                        <button onClick={addToCart}>Add To Cart</button>
                                        <button onClick={gotoCart}> Go To Cart</button>
                                    </div>
                                    <div className="orderShipping">
                                        <FaShippingFast/>
                                        <p>Free Shiping on Orders</p>
                                    </div>
                                </div>
                        </div>}

                  </> }

                 </div>
              

           <div className="reviews">
               
                {reviews.length > 0 ?  <>
                       {reviews.map((review)=><Review review={review}/>)}
                </> : <h1> No Reviews </h1> }

           </div>
          <Model dialogToggle={dialogToggle} id={product._id} />

      </> 
  )
}

export default ProductDetail