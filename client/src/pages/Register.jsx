import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

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
      const response = await fetch('https://the-blogg-mocha.vercel.app/auth/register', {
      // const response = await fetch('http://localhost:3000/auth/register', {
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
  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>
        
        <label>
          <input
              type="text"
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              required
          />
        </label>

        <label>
          <input
              type="text"
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              required
          />
        </label>

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
              type="text"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-Mail'
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

export default Register