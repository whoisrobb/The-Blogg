import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreatePost />} />
      </Routes>
    </>
  )
}

export default App