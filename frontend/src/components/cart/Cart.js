import React, { useEffect, useState } from 'react'
import './Cart.css'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Cart = () => {

const dispatch = useDispatch();
const {cartItems,error,message} = useSelector(state=>state.cart)
const subTotal = cartItems.length > 0 ? cartItems.reduce((acc,item)=>(acc+=item.price*item.quantity),0):0


useEffect(() => {
     if(error){
        toast.error(error) 
        dispatch({type:'addItemClearError'}) 
     }
     if(message){
       toast.success(message)  
       dispatch({type:'addItemClearMessage'}) 
     }

}, [dispatch,error,message])


  return (
      <>   
            { 
                cartItems.length > 0 ? <>
                    
                    <div className="carts">
                    {
                        cartItems && cartItems.map((cart,index)=>(
                          <CartItem cart={cart} id={cart.id} index={index} key={index}  />
                        ))
                    }  
                      <hr />
                    <p>SubTotal: ₹{subTotal}</p>
                   </div> 

                </> : <div className="noProducts">
                      <h1>No Items In Your Cart</h1>
                      <Link to="/products" className='gotoAllProducts'>See All Products</Link>
                </div>
            }
      </>
     
  )
}

export default Cart