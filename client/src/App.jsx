import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import Header from './components/Header'
import EditPost from './pages/EditPost'
import Post from './pages/Post'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
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