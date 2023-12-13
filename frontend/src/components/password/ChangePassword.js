import React, { useEffect, useState } from 'react'
import "./ChangePassword.css"
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword } from '../redux/actions/userAction';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

  const dispatch = useDispatch();
  const {loading,error,message} = useSelector(state=>state.user) 
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const navigate = useNavigate();

  const submithandler=async(e)=>{
     e.preventDefault();
     await dispatch(updatePassword(oldPassword,newPassword))
     navigate('/profile')

  }


  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
   }

   if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
   } 

  }, [error,message])
  

  return (
    <section>
    <div className="changePassword">
          <p>change password</p>
           <form onSubmit={submithandler}>
                 
                <div className="input">
                   <label htmlFor="password">Old Password</label>
                   <input type="password" placeholder='...............' name='oldPassword' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
                 </div> 
               
                 <div className="input">
                   <label htmlFor="password">New Password</label>
                   <input type="password" placeholder='...............' name='newPassword' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  />
                 </div> 
                  <button type='submit' disabled={loading?true:false} >Update</button>
                  
           </form>
    </div>
</section>
  )
}

export default ChangePassword