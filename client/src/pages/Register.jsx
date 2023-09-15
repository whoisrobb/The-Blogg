import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { apiUrl } from '../utils/url'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const [token, setToken] = useState('')

  const formData = { firstName, lastName, username, email, password }
  // console.log(formData)

  const submit = async (submitData) => {
    try {
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      })
      .then((response) => {
        if (response.ok) {
          setSuccess(true)
        }

        return response.json()
      })
      .then((data) => {
        console.log(data.message)
      })
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    submit(formData)
  }

  if (success) return <Navigate to={'/'} />

    // const fiction = [
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
        // {
        //   "username": "Bruce Wayne",
        //   "email": "bruce.wayne@example.com",
        //   "password": "bat123"
        // },
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
      // ]

  return (
    <section id='register'>
      <form onSubmit={handleSubmit}>
        Register
        
        <div className="name">
        {/* <label> */}
          <input
              type="text"
              name='firstName'
              className='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              required
          />
        {/* </label> */}

        {/* <label> */}
          <input
              type="text"
              name='lastName'
              className='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              required
          />
        {/* </label> */}
        </div>

        {/* <label> */}
          <input
              type="text"
              name='username'
              className='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
          />
        {/* </label> */}

        {/* <label> */}
          <input
              type="text"
              name='email'
              className='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-Mail'
              required
          />
        {/* </label> */}

        {/* <label> */}
          <input
              type="password"
              name='password'
              className='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              required
          />
        {/* </label> */}

        <button type='submit'>submit</button>
      </form>
      
      <p>Already have an account?</p>
      <Link to={'/login'}>Login</Link>
    </section>
  )
}

export default Register