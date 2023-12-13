import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrderAction, getAllOrdersAction } from '../redux/actions/adminAction';
import "./allOrders.css"
import {RiDeleteBin5Line} from "react-icons/ri"
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';



//change order status, delete order 

const AllOrders = () => {

  const dispatch = useDispatch();
  const {orders,error,message} = useSelector(state=>state.adminOrders) 

  // console.log(orders[0].shippingInfo)

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'orderClearMessage'})
   }
   if(message){
      toast.success(message)
      dispatch({type:'orderClearError'})
   }
    dispatch(getAllOrdersAction())
  }, [dispatch,error,message])
  

 
  const deleteHandle=(id)=>{
      dispatch(deleteOrderAction(id))
  }

  return (
     <div className="allOrders">
           {orders && orders.map((order)=>(
                 <div className="singleOrder">
                 <p>{order.user.name}</p>
                 <p>{order.user.email}</p>
                 <p>{order.productItem.name}</p>
                 <p className='status'><span>{order.orderStatus}</span><Link to={`/admin/order/${order._id}`} style={{textDecoration:'none'}} ><button className='button'>Change Status</button></Link> </p>
                 <p className='orderDelete' onClick={(e)=>deleteHandle(order._id)} ><RiDeleteBin5Line/></p>
                 </div>
           ))}
     </div>
  )
}

export default AllOrders