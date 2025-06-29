import React from 'react'
import {useNavigate } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth";




const Home = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
    function handleClick(){
      if(isAuthenticated){
        navigate(`/${user.role}/dashboard`)
      }
      else{
         navigate("/auth")
      }
       
    }
  return (
    <div>
        <h1>Landing Page</h1>
        <button  className = "text-blue-700 bg-red-500 cursor-pointer" onClick={handleClick}>Get Started</button>
    </div>
  )
}

export default Home;