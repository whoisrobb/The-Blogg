import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ auth, logout }) => {

  return (
    <div>
      <div className="logo">
        <Link to={'/'}>The Blogg</Link>
      </div>
      <nav>
        <Link to={'/register'}>Register</Link>
        {
          auth ? 
          <div>
            <Link to={'/create'}>Create</Link>
            <button onClick={logout}>Logout</button>
          </div> :
          <Link to={'/login'}>Login</Link>
        }
      </nav>
    </div>
  )
}

export default Header