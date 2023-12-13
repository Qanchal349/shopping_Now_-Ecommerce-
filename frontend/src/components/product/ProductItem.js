import React, { useEffect } from 'react'
import "./ProductItem.css"
import productImage from "../assets/images/jeans3.jpg"
import cart from "../assets/images/icons_cart.png"
import ReactStars from "react-rating-stars-component";
import {useDispatch, useSelector}  from "react-redux"
import toast from "react-hot-toast"
import { addCartItemction} from '../redux/actions/cartAction';
import { Link } from 'react-router-dom';

const ProductItem = ({product,link}) => {

 const dispatch = useDispatch();
 const {error,message} = useSelector(state=>state.cart) 
 
 const options={
   edit:false,
   zIndex:-22,
 }


  const addToCart=()=>{
     if(product.stock>0){
      dispatch(addCartItemction(product._id,1))  
     }else{
        toast.error("Item Out of Stock You can't buy")
     }
 }
 
  useEffect(() => {
     if(message){
       toast.success(message) 
       dispatch({type:'addItemClearMessage'})
     }
     if(error){
        toast.error(error) 
        dispatch({type:'addItemClearError'})
     }
  }, [dispatch,error,message])
  

  return (
       <Link to={link} className="productItem">
               

                {product && <>
                  <img src={product.images[0].url} alt="" />        
                   <h5>{product.name}</h5>
                   <p>{product.description}</p>
                  <div className="first">
                      <div className="color">
                      </div>
                   <p>price <span>₹{product.price}</span></p>
                   <p>Stock <span>{product.stock}</span></p>
                 </div>

                </>}

               <div className="second">
                  <ReactStars
                    {...options}
                    count={5}
                    value={product.aggregateRating}
                    size={30}
                    edit={false}
                    activeColor="#783B3E"
                    isHalf={true}
                    color="#F8CFD0"
                    zIndex={-22}
                  />
                    <img src={cart} onClick={addToCart} />
               </div>

       </Link>
  )
}

export default ProductItem