import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../redux/actions/userAction';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

 const dispatch  = useDispatch();
 const {loading,error,message} = useSelector(state=>state.user) 
 const [email, setEmail] = useState()


 useEffect(() => {
   if(error){
     toast.error(error)
     dispatch({type:'clearError'})
   }

   if(message){
      toast.success(message)
      dispatch({type:'clearMessage'})
   }
   
  
 }, [error,message,dispatch])
 

 const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(forgotPassword(email))
 }


  return (
    <section>
     <div className="forgotpassword">
           <form onSubmit={submitHandler} >
                 
                 <div className="input">
                   <label htmlFor="email">Email</label>
                   <input type="email" placeholder='abc@gmail.com' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                 </div> 
            
                 <button type='submit' disabled={loading?true:false} style={{fontSize:"1rem"}}>Send Link</button>
                  
           </form>
    </div>
</section>
  )
}

export default ForgotPassword