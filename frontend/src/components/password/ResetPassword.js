import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../redux/actions/userAction'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const Resetpassword = () => {

  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const dispatch = useDispatch();
  const {loading,error,message} = useSelector(state=>state.user) 
  const param = useParams();
  const navigate = useNavigate()



  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:'clearError'})
    }
 
    if(message){
       toast.success(message)
       dispatch({type:'clearMessage'})
       navigate('/login')
    } 
  
  }, [dispatch,error,message])
  

  const submitHandler=async(e)=>{
     e.preventDefault()
     await dispatch(resetPassword(password,confirmPassword,param.token))
     
  }
 

  return (
    <section>
    <div className="resetpassword">
         
           <form onSubmit={submitHandler} >
                 
                <div className="input">
                   <label htmlFor="password">New Password</label>
                   <input type="password" placeholder='...............' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                 </div> 
               
                 <div className="input">
                   <label htmlFor="password">Confirm Password</label>
                   <input type="password" placeholder='...............' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                 </div> 
                  
                 

                 <button type='submit' disabled={loading?true:false} >Update</button>
                  
           </form>
    </div>
</section>
  )
}

export default Resetpassword