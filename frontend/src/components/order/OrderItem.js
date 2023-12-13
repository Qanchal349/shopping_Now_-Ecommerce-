import React from 'react'
import "./OrderItem.css"
import {Link} from "react-router-dom"

const OrderItem = ({order}) => {

     
     
  return (
       <div className="orderItem">
           
                <div className="image">
                    <img src= { order ? order.productItem.image : ""} alt="" width={'100%'} />
                </div>
                   {order &&  <div className="orderInfo">
                        <p>Order Date : <span>{order.createdAt.split("T")[0]}</span></p>
                        <p>Reference: <span>{order._id}</span></p>
                        <p>Product :  <span>{order.productItem.name}</span></p>
                         {order.deliveredAt && <p>Delivered Date : <span>{order.deliveredAt && order.deliveredAt.split("T")[0]}</span></p>}
                        <p>Amount: <span>₹{order.productsPrice}</span></p>
                        <p>Status: <span>{order.orderStatus}</span></p>
                        <p>Billing Address : <span>{order.shippingInfo.city}{order.shippingInfo.state}{order.shippingInfo.postal}</span></p>
                         <div className="link">
                           <Link to="/orders" className='otherLink' >All Orders</Link>
                           <Link to="/cart" className='otherLink'>Cart</Link>
                         </div>
                        
                  </div>}
              
       </div>
  )
}

export default OrderItem