import React, { useEffect } from 'react'
import './Orders.css'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getOwnAllOrders } from '../redux/actions/orderAction'
import "../admin/allOrders.css"
import { Link } from 'react-router-dom'

const Orders = () => {
  
  const dispatch = useDispatch()
  const {orders,error} = useSelector(state=>state.order);

  useEffect(() => {
    if(error){
       toast.error(error)
    }
    dispatch(getOwnAllOrders())
    }, [dispatch,toast])
  

  return (
      <div className="orders">
              {orders && <div className="order">
                    {orders.length > 0 ? <>
                        
                     {orders &&  orders.map((order)=>(
                           <div className="singleOrderUser" key={order._id}>
                              <div>
                                <p>Name: {order.user.name}</p>
                                <p>Email: {order.user.email}</p>
                                <p>Order Reference:  {order._id}</p>
                              </div>
                              <div>
                                <p>Product Reference: {order.productItem.product}</p>
                                <p>Prouct: {order.productItem.name}</p>
                                <p>Amount: {order.productItem.price}</p>
                              </div>
                             <p className='status'><span>{order.orderStatus}</span><Link to={`/order/${order._id}`} style={{textDecoration:'none'}} ><button className='button'>Order Details</button></Link> </p>
                           </div>
                     ))}
                      
                    </> : <h1> No Orders</h1>}
             </div>}
      </div>
  )
}

export default Orders