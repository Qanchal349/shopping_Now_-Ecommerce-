import React, { useEffect } from 'react'
import OrderItem from './OrderItem'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getOwnSingleOrder } from '../redux/actions/orderAction';

const SingleOrder = () => {

  const dispatch = useDispatch();
  const {order,error}  = useSelector(state=>state.order) 
  const params = useParams();

  console.log(params.id)
  useEffect(() => {
    if(error){
       toast.error(error) 
    }
     dispatch(getOwnSingleOrder(params.id))
  }, [dispatch,error])
  

  return (
      <OrderItem order={order} />
  )
}


export default SingleOrder