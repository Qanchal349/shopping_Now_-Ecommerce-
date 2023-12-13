import React, {useEffect, useState } from 'react'
import img from  "../assets/images/jeans3.jpg"
import "./Shipping.css"
import {useDispatch, useSelector} from 'react-redux'
import {Country,State} from 'country-state-city'
import { saveShippingInfoAction } from '../redux/actions/cartAction'
import { checkoutAction, orderAction } from '../redux/actions/orderAction'
import toast from 'react-hot-toast'
import image from "../assets/images/img6.jpg"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { getSingleProductAction } from '../redux/actions/productAction'



const Shipping = () => {

  const dispatch = useDispatch()
  const params = useParams();
  const productId = params.id
  const index = params.index 



  const {shipping} = useSelector(state=>state.shipping)  
  const {product} = useSelector(state=>state.product)  
  const {info,error,message,newOrder} = useSelector(state=>state.order)  
  const {cartItems} = useSelector(state=>state.cart)


  const visible = shipping.city && product.stock > 0 ? true:false 
  const payment = info?.id && product.stock > 0 ? true:false  
  
  const [country, setCountry] = useState(shipping.country)
  const [state, setState] = useState(shipping.state)
  const [name, setName] = useState(shipping.name)
  const [email, setEmail] = useState(shipping.email)
  const [appartment, setAppartment] = useState(shipping.appartment)
  const [postal, setPostal] = useState(shipping.postal)
  const [city, setCity] = useState(shipping.city)
  const [phone, setPhone] = useState(shipping.phone)


  
  // first save 
  const submitHandler=(e)=>{  
    e.preventDefault()
    const newShippingInfo={
       country,state,name,email,appartment,postal,city,phone
    }
    dispatch(saveShippingInfoAction(newShippingInfo))
  }  
 

   // checkout  
   const checkout = async(e)=>{
      await dispatch(checkoutAction(product.price*cartItems[index].quantity*100)) 
   }

   const createNewOrder=async()=>{
        const shippingInfo = { city,country,state,appartment,phone,postal}
    
        const productItem={
        name:product.name,
        price:product.price,
        image:cartItems[index].image,
        quantity:cartItems[index].quantity,
        product:product._id
        }

        const paymentInfo={
        id:info?.id,
        status:"created"
        }

        const form = {
            shippingInfo,
            productItem,
            paymentInfo,
            productsPrice:product.price*cartItems[index].quantity
        }
        await dispatch(orderAction(form)) // create  new order 
   }

  const continueForPayment = async(e)=>{
     
      const {data} = await axios.get(`/api/v1/getkey`)
      await  createNewOrder() 

      if(info && data.key){
        const openPopUp = ()=>{
              const options = {
                  key:data.key,
                  amount:info.amount,
                  currency:"INR",
                  name:'Shopping Now',
                  description:'search for best brand',
                  image,
                  order_id:info.id,
                  callback_url:`/api/v1/paymentverification` ,
                  prefill:{
                      name:shipping.name, 
                      email:shipping.email,
                      contact:shipping.phone 
                  },
    
                notes:{
                    address:'Shopping Now'
                },
                theme:{
                    color:'#492222'
                }  
    
              };
              const razor = new window.Razorpay(options) 
              razor.open();  
            }
            openPopUp()
        } 
    }




   useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(message){
      toast.message(message)
    }
      dispatch(getSingleProductAction(productId))
    }, [dispatch,error,message,info,newOrder])
  


  return (
      <div className="shipping">
            <div className="shippingAddress">
                   <p>Shipping Details</p>
                 <form onSubmit={submitHandler} >
                     
                    <div className="address name">
                            <label htmlFor="">Country</label>
                            <select
                              required 
                              value={country}
                               onChange={(e)=>setCountry(e.target.value)} 
                             >  
                                 <option value=" " >Country</option>
                                 {Country && Country.getAllCountries().map((item)=>(
                                         <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                 ))}   
                            </select>
                         
                     </div>


                     <div className="address name">
                           {country && (
                               <>
                               <label htmlFor="">State</label>
                               <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                  <option value="">State</option>
                                   {State && State.getStatesOfCountry(country).map((item)=>(
                                         <option key={item.isoCode} value={item.isoCode} >{item.name}</option>
                                   ))}
                               </select>
                              </>
                           )}

                     </div>

                     <div className="address name">
                          <label htmlFor="">Name</label>
                          <input type="text"  placeholder='Name' value={name} name='name' onChange={(e)=>setName(e.target.value)} />
                     </div>
                     <div className="address name">
                          <label htmlFor="">Email</label>
                          <input type="text"  placeholder='Email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} />
                     </div>
                     <div className="address name">
                          <label htmlFor="">Apartment No.</label>
                          <input type="text" placeholder='Number' value={appartment} name='appartment' onChange={(e)=>setAppartment(e.target.value)} />
                     </div>

                     <div className="address name">
                          <label htmlFor="">Postal Code</label>
                          <input type="text" placeholder='Enter Your Postal Code' value={postal} name='postal' onChange={(e)=>setPostal(e.target.value)} />
                    </div>
                    <div className="address name">
                          <label htmlFor="">City</label>
                          <input type="text" placeholder='Enter Your City' value={city} name='city' onChange={(e)=>setCity(e.target.value)} />
                     </div>

                     <div className="address name">
                          <label htmlFor="">Phone</label>
                          <input type="number" placeholder='Enter Your Number' value={phone} name='phone' onChange={(e)=>setPhone(e.target.value)} />
                     </div>

                     <button className='save'>Save</button>
                 </form>
             </div>

              <div className="shipingInfo">
                  {product && <>
                    
                    <div className="items">
                        <img src={cartItems[index].image} alt="" width={'20%'} />
                    </div>
                    <p>{product.name}</p>
                    <p>Stock: <span>{product.stock>0 ? <p className='green'>InStock {product.stock}</p>:<p style={{color:'rgb(235, 34, 34)'}}>Out Of Stock</p>}</span></p>
                    <p>Quantity: <span>{cartItems[index].quantity}</span></p>
                    <p>Color: <span style={{backgroundColor:`${product.color}`,width:'20px',height:'15px',border:'1px solid gray'}}></span></p>
                    <p>Order SubTotal : <span>₹{cartItems[index].price*cartItems[index].quantity}</span></p>
                    <p>Tax : <span>₹2.00</span></p>
                    <p>Shipping : <span>₹0.00</span></p>
                    <p>Shipping Tax : <span>₹0.00</span></p>
                    <p>Order Total : <span>₹{cartItems[index].price*cartItems[index].quantity+2}</span></p> 
                   
                  </>}

                 {visible && <button className='payment' onClick={checkout}>Create Order</button>}
                 {payment && <button className='payment' onClick={continueForPayment}  style={{marginLeft:'5px'}}>Continue for payment </button>}
               
             </div>
      </div>
  )
}

export default Shipping