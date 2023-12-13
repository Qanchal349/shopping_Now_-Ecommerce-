import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getProfileAction, updateProfileRequest } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const ChangeProfile = () => {

 const dispatch = useDispatch();
 const {loading,error,message,isAuthenticated,user}  = useSelector(state=>state.user) 
 const [name, setName] = useState(user?.name)
 const [email, setEmail] = useState(user?.email)
 const navigate = useNavigate();


  useEffect(() => {
   
    if(error){
       toast.error(error)
       dispatch({type:'clearError'})
    }

    if(message){
       toast.success(message);
       dispatch({type:'clearMessage'})
    }
 
  }, [dispatch,error,message,isAuthenticated,user])
 

  const submitHandler=async(e)=>{
     e.preventDefault()
     console.log(name,email)
     await dispatch(updateProfileRequest(name,email))
     await dispatch(getProfileAction())
     navigate('/profile')
  }

  return (
    <section>
     <div className="changePassword">
          <p>change profile</p>
           <form onSubmit={submitHandler} >
                 
                <div className="input">
                   <label htmlFor="name">Name</label>
                   <input type="name" 
                   placeholder={isAuthenticated?user.name:'Name'}
                    value={name} 
                    name='name'
                    onChange={(e)=>setName(e.target.value)}
                   />
                 </div> 
               
                 <div className="input">
                   <label htmlFor="email">Email</label>
                   <input type="email"
                    placeholder={isAuthenticated?user.email:'Email'}
                    value={email} 
                    name='email'
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                 </div> 
                  
                 

                 <button type='submit' disabled={loading?true:false} >Update</button>
                  
           </form>
      </div>
    </section>
  )
}

export default ChangeProfile