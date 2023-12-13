import { Avatar, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { getProfileAction, logoutAction, updateProfileImage } from '../redux/actions/userAction'
import {RiEditBoxFill} from "react-icons/ri"

 const Profile = ({src=""}) => {
 const dispatch = useDispatch();
 const {loading,error,message,user} = useSelector(state=>state.user) 
 const navigate = useNavigate();
 const [avatar, setAvatar] = useState()
 const [imagePrev, setImagePrev] = useState() 



 useEffect(() => {
  if(error){
      toast.error(error)
      dispatch({type:'clearError'})
   }
 }, [loading,error,message,user])
 

 const logoutHandler=async(e)=>{
      e.preventDefault();
      await dispatch(logoutAction())
      navigate("/login")
 }

 const imageHandler=async(e)=>{
     e.preventDefault();
     const myForm = new FormData();
     myForm.set("avatar", avatar); 
    await dispatch(updateProfileImage(myForm))
    dispatch(getProfileAction())
 }

  
 const changeProfileImage = (e)=>{
     e.preventDefault()
     const reader = new FileReader();

     reader.onload = () => {
       if (reader.readyState === 2) {
         setImagePrev(reader.result);
         setAvatar(reader.result);
       }
     };
    reader.readAsDataURL(e.target.files[0]);
 }


  return (
       <div className="profile">
           
              
           {loading? <><h1><CircularProgress style={{color:"crimson"}} /></h1></>:(<>
               <div className="profileheader"></div> 
                     <Avatar className='avatar' src={imagePrev?imagePrev:src} />
                     <form onSubmit={imageHandler}>
                         <input type="file" onChange={changeProfileImage} name="avatar" accept='image/*'/> 
                         <button type='submit' className='profileedit' >edit</button>
                     </form>
                     
               
                    <div className="profileDetail">
                         <div className="name common" >
                         <p>Name : <span>{user?.name}</span></p>
                         <p>Email : <span>{user?.email}</span></p>
                    </div>
                         <div className="email common">
                               {user && user.role==='admin' && <Link to="/admin/dashboard" className='logout'>Dashboard</Link>}
                              <button onClick={logoutHandler} className='logout' >logout</button>
                         </div>
                         
                     <div className="button">
                              <Link to="/password/change"><button className='change seeorders' >Password<span><RiEditBoxFill/></span> </button></Link>
                              <Link to="/updateprofile"><button className='change' >Profile<span><RiEditBoxFill/></span></button></Link>
                     </div>
                       
                     <div className="button">
                              <Link to="/orders"><button className='change seeorders' >Orders</button></Link>
                              <Link to="/cart"><button className='change' > Cart </button></Link>
                     </div>

                    </div>
              </>)}


       </div>
  )
}

export default Profile