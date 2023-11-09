import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'

const LoggedInCard = ({ handleLogout, handleLogStatus, tokenData }) => {
    // const [userData, setUserData] = useState(null)

    // useEffect(() => {
    //     const tokenData = jwtDecode(localStorage.getItem('accessToken'))
    //     setUserData(tokenData)
    // }, [])

  return (
    <div className='login-card'>
        <p>{tokenData.username}</p>
        <button onClick={() => { handleLogout(); handleLogStatus(); }}>Logout</button>
    </div>
  )
}

export default LoggedInCard