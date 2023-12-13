import React from 'react'
import { RiGithubFill, RiMailFill, RiShoppingBagFill } from 'react-icons/ri'
import "./Footer.css"

const Footer = () => {
  return (
      <div className="footerSection">
           <p>shopping<RiShoppingBagFill/>Now </p>
           <div className="middle">
                   <div className="left">
                        <p>Customer Care </p>
                        <ul>
                            <li>FAQs</li>
                            <li>Returns & Exchange</li>
                            <li>Shipping & Handling</li>
                            <li>Terms of Service</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className="right">
                            <h5>Sign Up & get 10% off your next order</h5>
                            <RiGithubFill/>
                            <RiMailFill/>
                    </div>
            </div>
           <div className="bottom">
               <p>&copy;Copyright 2023</p> 
               <p>All Rights Reserved</p> 
           </div>

      </div>
  )
}

export default Footer