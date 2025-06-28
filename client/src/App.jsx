import React from 'react'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { Route, Routes } from 'react-router-dom'
import SelectRole from './pages/SelectRole'

const App = () => {
  return (
    <Routes>
      <Route path='/' element = {<Home/>}/>
      <Route path='/auth' element = {<Auth/>}/>
      <Route path='/select-role' element = {<SelectRole/>}/>
    </Routes>
  )
}

export default App