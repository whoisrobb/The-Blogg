import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import Header from './components/Header'
import EditPost from './pages/EditPost'
import Post from './pages/Post'
import useAuth from './components/useAuth'

function App() {
  const [userId, setUserId] = useState(null)

  const [headerKey, setHeaderKey] = useState(0)
  const { auth, logout } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodeToken = jwtDecode(token)
      setUserId(decodeToken.id)
    }
  }, [])

  useEffect(() => {
    setHeaderKey(headerKey + 1)
  }, [auth])

  return (
    <>
      <Header key={headerKey} auth={auth} logout={logout} />

      <Routes>
        <Route path='/' element={<Home userId={userId} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post/:id' element={<Post />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/edit/:id' element={<EditPost />} />
      </Routes>
    </>
  )
}

export default App
