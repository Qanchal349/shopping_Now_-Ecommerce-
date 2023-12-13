import React, {useState } from 'react'
import {FaPlus,FaMinus} from 'react-icons/fa'
import Image from '../assets/images/jeans3.jpg'
import "./CartItem.css"  
import { addCartItemction, deleteCartItemAction } from '../redux/actions/cartAction'
import { useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'



const CartItem = ({cart,id,index}) => {

 let [value, setValue] = useState(cart.quantity) 
 const dispatch = useDispatch(); 

 const decreaseTo=()=>{
    const decrese = true
    if(value > 1){
        setValue(--value)
        dispatch(addCartItemction(cart.id,value,decrese))
    }   
 }


 const addToCart=()=>{
    if(value<cart.stock){
        setValue(++value)
        dispatch(addCartItemction(cart.id,value)) 
    }
 }


 const removeFromCart=()=>{
    dispatch(deleteCartItemAction(cart.id))  
 }

 

  return (
       <div className="cart">
            <div className="image">
               
                <img src={cart.image} alt=""/>
                <p>Product Reference: {cart.id}</p>
            </div>
            <div className="cartInfo">
                <p>{cart.name}</p>
                <p style={{fontSize:"14px" ,fontWeight:'500',marginTop:"3px"}}>Quantity: {cart.quantity}</p> 
                <p>{cart.stock > 0 ? <p className='green'>InStock</p> : <p className='red'>Out of Stock</p>}</p>
            </div>
            <div className="total">
                <p>Toatal Price: {cart.price}*{cart.quantity} =  <span>₹{cart.price*cart.quantity}</span></p>
                <Link to={`/shipping/${id}/${index}`} className='proceedOrder'><button>Proceed Order</button></Link> 
            </div>
            <div className='actions'>
                <div className="increase">
                    <div onClick={addToCart}> <FaPlus/></div>
                        <p>{value}</p>
                    <div onClick={decreaseTo}><FaMinus/></div>
                </div>
                <button onClick={removeFromCart}>Remove</button>
            </div>
        </div>
  )
}

export default CartItem