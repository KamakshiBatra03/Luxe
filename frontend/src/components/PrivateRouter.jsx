import { Navigate,Outlet } from "react-router-dom";
import React from 'react'
const isAuthenticated=()=>!!localStorage.getItem("access_token")


function PrivateRouter({redirectTo='/login'}) {
  return isAuthenticated()?<Outlet/>:<Navigate to={redirectTo} replace/>
}

export default PrivateRouter