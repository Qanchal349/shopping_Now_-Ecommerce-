import React from 'react'
import { useSelector } from "react-redux";
import { Navigate} from 'react-router-dom';



const ProtectedRoute = ({children,isAdmin=false,role}) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
   if (loading) return null;
   
  
   if(!isAdmin)
     return isAuthenticated ? children : <Navigate to="/login" replace />;

   if(isAdmin && role==='admin')  
     return isAuthenticated ? children : <Navigate to="/login" replace />;

   if(isAdmin && role!=='admin')  
    return  <Navigate to="/" replace />

};




export default ProtectedRoute