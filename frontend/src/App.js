import React, { useEffect } from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import "./App.css"
import Header2 from './components/header/Header2'
import Home from './components/home/Home'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import ChangePassword from './components/password/ChangePassword'
import ForgotPassword from './components/password/ForgotPassword'
import ResetPassword from './components/password/ResetPassword'
import Profile from './components/profile/Profile'
import {useDispatch, useSelector} from "react-redux"
import toast, { Toaster } from 'react-hot-toast';
import { getProfileAction } from './components/redux/actions/userAction'
import ChangeProfile from './components/profile/ChangeProfile'
import ProductDetail from './components/product/ProductDetail'
import Footer from './components/footer/Footer'
import Cart from './components/cart/Cart'
import Shipping from './components/shipping/Shipping'
import Orders from './components/order/Orders'
import PaymentFail from './components/payment/PaymentFail'
import PaymentSuccess from './components/payment/PaymentSuccess'
import CreateProduct from './components/product/CreateProduct'
import UpdateProduct from './components/product/UpdateProduct'
import Dashboard from './components/admin/Dashboard'
import AllUsers from './components/admin/AllUsers'
import AllOrders from './components/admin/AllOrders'
import Order from './components/admin/Order'
import { AllProducts } from './components/admin/AllProducts'
import SingleOrder from './components/order/SingleOrder'
import ErrorPage from './components/ErrorPage'
import Product from './components/product/Product'
import ProtectedRoute from './components/protected/ProtectedRoute'

const App = () => {

  const dispatch = useDispatch()
  const {isAuthenticated,user} = useSelector(state=>state.user) 


  useEffect(() => {
     dispatch(getProfileAction()) 
  }, [dispatch,isAuthenticated])
  

  return (



    <BrowserRouter>
        <Header2 isAuthenticated={isAuthenticated} src={user ? user.profile.url:""}/>
         <Routes>


            <Route path="/" element={<Home/>}/>
            <Route path="/products" element={<Product/>}/>
            <Route path="/productdetail/:id" element={<ProductDetail/>}/> 
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/password/change" element={ <ProtectedRoute role={user ? user.role:""}> <ChangePassword/></ProtectedRoute>}/>
            <Route path="/updateprofile" element={<ProtectedRoute role={user ? user.role:""}><ChangeProfile/></ProtectedRoute>}/>
            <Route path="/forgotpassword" element={<ForgotPassword/>}/>
            <Route path="/passwordreset/:token" element={<ResetPassword/>}/>
            <Route path="/profile" element={<ProtectedRoute role={user ? user.role:""} ><Profile  src={user ? user.profile.url:""} /></ProtectedRoute>}/>
            <Route path="/cart" element={<ProtectedRoute isAuthenticated={isAuthenticated} role={user ? user.role:""}><Cart/></ProtectedRoute>}/>
            <Route path="/shipping/:id/:index" element={<ProtectedRoute role={user ? user.role:""}><Shipping/></ProtectedRoute>}/>
            <Route path="/orders" element={<ProtectedRoute role={user ? user.role:""}><Orders/></ProtectedRoute>}/>
            <Route path="/order/:id" element={<ProtectedRoute role={user ? user.role:""}><SingleOrder/></ProtectedRoute>}/>
            <Route path="/paymentfail" element={<PaymentFail/>}/> 
            <Route path="/paymentsuccess" element={<PaymentSuccess/>}/> 


            <Route path="/createproduct" element={ <ProtectedRoute isAdmin={true} role={user && user.role}><CreateProduct/></ProtectedRoute>}/> 
            <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} role={user && user.role}><UpdateProduct/></ProtectedRoute>}/> 
            <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} role={user && user.role}><AllProducts/></ProtectedRoute>}/>                    
            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin={true} role={user && user.role}><Dashboard/></ProtectedRoute>}/>                   
            <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} role={user && user.role}><AllUsers/></ProtectedRoute>}/>                   
            <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} role={user && user.role}><AllOrders/></ProtectedRoute>}/>                   
            <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} role={user && user.role}><Order/></ProtectedRoute>}/>                   
            <Route path="*" element={<ErrorPage/>}/>                   

        </Routes>
        <Toaster/>
         <footer style={{width:'100%'}} >
                 <div className="footer">
                 <Footer/>
                 </div>
        </footer>
    </BrowserRouter>
   

   
  )
}

export default App




// user order payment 
// dashboard 
// cart detail