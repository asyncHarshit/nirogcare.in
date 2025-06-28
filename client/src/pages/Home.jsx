import React from 'react'
import {useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
    function handleClick(){
        navigate("/auth")

    }
  return (
    <div>
        <h1>Landing Page</h1>
        <button onClick={handleClick}>Get Started</button>
    </div>
  )
}

export default Home