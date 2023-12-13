import React from 'react'
import { Link } from 'react-router-dom'
import "./paymentResult.css" 
import { RiErrorWarningFill } from 'react-icons/ri'
const PaymentFail = () => {

  return (
    <div className="paymentFail">
             <div className="paymentDiv">
                     <h5>Payment Fail<RiErrorWarningFill/></h5>
                     <Link to="/cart" className='paymentOrder' >Try Again</Link>
             </div>
       </div>
  )
}

export default PaymentFail