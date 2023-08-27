import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { apiUrl } from '../utils/url'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [success, setSuccess] = useState(false)

  const formData = { username, password }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then((response) => {
        if (response.ok) {
          setSuccess(true)
          // console.log(response)
        }

        return response.json()
      })
      .then((data) => {
        setToken(data.token)
        localStorage.setItem('accessToken', data.token)
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (success) return <Navigate to={'/'} />

  return (
    <div>
      Login
      <form onSubmit={handleSubmit}>
        
        <label>
          <input
              type="text"
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
          />
        </label>

        <label>
          <input
              type="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
          />
        </label>

        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login