import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/create' element={<CreatePost />} />
    </Routes>
  )
}

export default App