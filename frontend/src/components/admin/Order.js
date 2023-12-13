import React, { useEffect, useState } from 'react'
import './order.css'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeOrderStatusAction, getSingleAdminOrder } from '../redux/actions/adminAction'
import toast from 'react-hot-toast'
import image from "../assets/images/jeans2.jpg"


const Order = () => {

 const params = useParams()
 const dispatch = useDispatch();
 const {order,loading,error} = useSelector(state=>state.adminSingleOrder) 




 useEffect(() => {
  if(error){
     toast.error(error)
  }
  dispatch(getSingleAdminOrder(params.id))
   
 }, [dispatch,error])
 

  return (
     <div className="orderInfo">
               { loading ? <h1>Loading....</h1> :  <div className="orderDetails">
                    {/* <img src={order.productItem && order?.productItem.image}/> */}
                       <img src={order?.productItem?.image}/> 
                       <p>Order Reference : {order._id}</p>
                       <p>{order?.productItem?.name}</p>
                        <div className="userDetail">
                             <p>Name: {order?.user?.name}</p>
                             <p>Email: {order?.user?.email}</p>
                             <p>Category : {order?.productItem?.category}</p>
                             <p>Price : ₹{order?.productItem?.price}</p>
                             <p>Quantity : {order?.productItem?.quantity}</p>
                             <h4>Address:  { order.shippingInfo && <p>  {order?.shippingInfo?.city}{order?.shippingInfo?.state}{order?.shippingInfo?.postal}{order?.shippingInfo?.apparment}</p> } </h4>
                             <h5>Status : <p>{order?.orderStatus}</p></h5>
                        </div>
                    </div> 
                }
           <div className="orderActions">
                <div className="selectOption">
                        <label htmlFor="">Change Status:</label>
                        <select name="changeStatus"  onChange={(e)=> dispatch(changeOrderStatusAction(e.target.value,params.id))}  >
                            <option>Canceled</option>
                            <option>Shipped</option>
                            <option>Pending</option>
                            <option>Delivered</option>
                        </select>
                </div>
                 
                <Link to="/admin/orders" className='orderLink' >View All Orders</Link> 
           </div>
     </div>
  )
}

export default Order