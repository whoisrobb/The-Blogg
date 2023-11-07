import React from 'react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <button onClick={() => navigate(-1)} className='action back'>
        <i className="uil uil-angle-left"></i>
    </button>
  )
}

export default BackButton