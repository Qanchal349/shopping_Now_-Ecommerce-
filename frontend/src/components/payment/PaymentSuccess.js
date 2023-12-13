import React from 'react'
import "./paymentResult.css" 
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'


const PaymentSuccess = () => {
  return (
       <div className="paymentSuccess">
             <div className="paymentDiv">
                     <h4>Payment Success <RiCheckboxCircleFill/></h4>
                     <Link to="/orders" className='paymentOrder'>See All Orders</Link>
             </div>
       </div>
  )
}

export default PaymentSuccess