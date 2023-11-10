import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { legalVars, linkVars } from '../utils/exports'
import LoggedInCard from './LoggedInCard'
import { jwtDecode } from 'jwt-decode'

const linkPages = ['bookmarks', 'about']
const legalInformation = ['terms of service', 'privacy policy', 'FAQs']

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)
    const [legalOpen, setLegalOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [loginStatus, setLoginStatus] = useState(!!localStorage.getItem('accessToken'))
    const [tokenData, setTokenData] = useState(null)

    useEffect(() => {
        if (loginStatus) {
            const data = jwtDecode(localStorage.getItem('accessToken'))
            setTokenData(data)
            console.log(tokenData)
        }
    }, [])

    useEffect(() => {
        handleLogStatus()
    }, [location.pathname])

    const handleLogStatus = () => {
        const accessToken = localStorage.getItem('accessToken')
        setLoginStatus(!!accessToken)
    }

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
    }

    function getFirstLetters(inputString) {
        const words = inputString.split(' ')
        const firstLetters = words.map((word) => word.charAt(0))
        const result = firstLetters.join('')
        return result
    }

  return (
    <div className='header'>
        <Link className='logo' to={'/'}>The Blogg</Link>
        {menuOpen && <nav>
            {linkPages.map((page, index) => (
                <Link to={`/${page}`} key={index}>{page}</Link>
            ))}
            <motion.div animate={ legalOpen ? 'open' : 'closed' } className="legals" onMouseLeave={() => {setLegalOpen(false)}}>
                <button onClick={() => setLegalOpen(prev => !prev)}>Legal Information
                <i
                    style={{
                        transform: `rotate(${legalOpen ? '180deg' : '0deg'})`,
                    }}
                    className="uil uil-angle-down"
                ></i>
                </button>
                <motion.ul
                variants={legalVars}
                initial={legalVars.closed}
                className="legals-modal">
                    {legalInformation.map((page, index) => (
                        <motion.li
                        key={index}
                        variants={linkVars}
                        >
                            <Link to={`/${page}`}>{page}</Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </nav>}
        <div className='end'>
            <div onMouseLeave={() => setLoginOpen(false)} className="profile">
                {loginStatus ?
                    <>
                        {tokenData && <button className='action' onClick={() => {setLoginOpen(prev => !prev); setMenuOpen(false);}}>{getFirstLetters(tokenData.username)}</button>}
                        {loginOpen && <LoggedInCard handleLogout={handleLogout} handleLogStatus={handleLogStatus} tokenData={tokenData} />}
                    </>
                    :
                    <button onClick={() => navigate('/login')}>Anonymous</button>
                }
            </div>
            <button onClick={() => {setMenuOpen(prev => !prev); setLoginOpen(false);}} className="action menu"><i className='uil uil-bars'></i></button>
        </div>
    </div>
  )
}

export default Header