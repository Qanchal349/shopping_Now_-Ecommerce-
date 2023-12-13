import React from 'react'
import {RiShoppingBagFill} from "react-icons/ri"
import cart from "../assets/images/icons_cart.png"
import "./Header2.css"
import { Avatar, MenuItem, Select } from '@material-ui/core'
import { Link, useLocation} from 'react-router-dom' 
import {FaUserCheck} from "react-icons/fa"


const Header2 = ({isAuthenticated,src=""}) => {
  
  // change profile picture in header  
 
  const {pathname} = useLocation();


  return ( 
        
    (pathname!=='/signup' && pathname!=='/forgotpassword' && pathname!=='/login' && pathname!=='/password/reset/token') && <div className="header">
            <div className="logo"><h4>shopping<RiShoppingBagFill/>Now</h4></div>
             <div className="options">
                {!isAuthenticated && (
                   <div className="option">
                      <Link className='headerLink signIn' to="/login">Sign In</Link>
                      <Link className='headerLink' to="/products">Explore more</Link>
                      <Link className='headerLink' to="/" >Home</Link>
                   </div>
                )}

                {isAuthenticated && (
                  <div className="optionAuth">
                      <Link to='/profile' ><Avatar src={src} style={{width:"35px",height:"35px",cursor:"pointer"}}/></Link>
                      <Link to="/cart" className='hearderCart'><img src={cart} alt='Cart'/></Link>
                      <Link className='headerLink' to="/">Home</Link>
                      <Link className='headerLink' to="/products">More...</Link>
                 </div>
              )}
           
         </div>
       </div>
  )
}

export default Header2