import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = ({ auth, logout }) => {

  return (
    <div className='header'>
      <div className="logo">
        <Link to={'/'}>The Blogg</Link>
      </div>
      <nav>
        {
          auth ? 
          <div className='actions'>
            <Link to={'/create'}>Create</Link>
            <button onClick={logout}>Logout</button>
          </div> :
          <div className='actions'>
            <Link to={'/register'}>Register</Link>
            <Link to={'/login'}>Login</Link>
          </div>
        }
      </nav>
    </div>
  )
}

export default Header