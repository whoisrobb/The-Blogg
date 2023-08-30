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
  
    const fiction = [
        // {
        //   "username": "Tony Stark",
        //   "email": "tony.stark@example.com",
        //   "password": "password123"
        // },
        // {
        //   "username": "Clark Kent",
        //   "email": "clark.kent@example.com",
        //   "password": "kryptonite123"
        // },
        // {
        //   "username": "Diana Prince",
        //   "email": "diana.prince@example.com",
        //   "password": "amazon123"
        // },
        // {
        //   "username": "Peter Parker",
        //   "email": "peter.parker@example.com",
        //   "password": "spidey123"
        // },
        {
          "username": "Bruce Wayne",
          "email": "bruce.wayne@example.com",
          "password": "bat123"
        },
        // {
        //   "username": "Steve Rogers",
        //   "email": "steve.rogers@example.com",
        //   "password": "shield123"
        // },
        // {
        //   "username": "Natasha Romanoff",
        //   "email": "natasha.romanoff@example.com",
        //   "password": "redroom123"
        // },
        //  {
        //   "username": "Arthur Curry",
        //   "email": "arthur.curry@example.com",
        //   "password": "aquaman123"
        //  },
        //  {
        //   "username": "Wanda Maximoff",
        //   "email": "scarlet.witch@example.com",
        //   "password": "scarletwitch123"
        //  }
      ]


  if (success) return <Navigate to={'/'} />

  return (
    <div>
      Login
      { JSON.stringify(fiction) }
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