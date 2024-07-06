import React from 'react'
import {Navigate, Route,  Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import {HomePage,LoginPage, ExplorePage, LikesPage, SignUpPage } from './pages/index.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'


const App = () => {
  const {authUser, setAuthUser, loading} = useAuthContext(); 
  console.log("Authenticated User", authUser); 
  if(loading) return null; 
  return (
    <div className='flex text-white'>
       <Sidebar/>
       <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
          <Routes>
              <Route path = '/' element = {<HomePage/>} />
              <Route path = '/login' element = {!authUser? <LoginPage/>: <Navigate to={'/'}/>} />
              <Route path = '/signup' element = {!authUser?<SignUpPage/> : <Navigate to = {'/'}/>} />
              <Route path = '/explore' element = {authUser ? <ExplorePage/>:<Navigate to = {'/login'}/> } />
              <Route path = '/likes' element = {authUser ? <LikesPage/>: <Navigate to={"/login"} />} />
          </Routes>
          <Toaster />
       </div>
    </div>
  )
}

export default App
