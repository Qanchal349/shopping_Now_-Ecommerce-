import React, { useEffect } from 'react'
import {RiDeleteBin3Fill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getAllAdminUsersAction, updateUserRoleAction } from '../redux/actions/adminAction'
import "./AllUsers.css"
import toast from 'react-hot-toast'


// change role,  delete user
const AllUsers = () => {

  const dispatch = useDispatch()
  const {users,message,error} = useSelector(state=>state.adminUsers) 


  useEffect(() => {
    if(error){
       toast.error(error)
       dispatch({type:'adminUserClearError'})
    }
    if(message){
       toast.success(message)
       dispatch({type:'adminUserClearMessage'})
    }
    dispatch(getAllAdminUsersAction())
   
  }, [dispatch,error,message])

  
 const deleteUserHandler=(id)=>{
     dispatch(deleteUserAction(id))  
 }


 const changeUserRoleHandler=(id,name,email,role)=>{
    console.log(id,name)
    dispatch(updateUserRoleAction(id,name,email,role)) 
 }


  return (
       <div className="allUsers">
             {users && users.map((user=>(
               <div className="singleUser">
               <p>{user.name}</p>
               <p>{user.email}</p>
               <p>{user.role}</p>
               <div className="actionButton">
                  <button onClick={(e)=>changeUserRoleHandler(user._id,user.name,user.email,'admin')}>Change Role</button>
                  <RiDeleteBin3Fill onClick={(e)=>deleteUserHandler(user._id)}/>
               </div>
              </div>
             )))}
       </div>
  )
}               

export default AllUsers