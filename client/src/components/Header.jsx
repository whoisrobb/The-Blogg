import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { legalVars, linkVars } from '../utils/exports'

const linkPages = ['bookmarks', 'about']
const legalInformation = ['terms of service', 'privacy policy', 'FAQs']

const Header = () => {
    const [legalOpen, setLegalOpen] = useState(false)

  return (
    <div className='header'>
        <Link className='logo' to={'/'}>The Blogg</Link>
        <nav>
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
        </nav>
        <div className="profile">
            <button>profile</button>
        </div>
    </div>
  )
}

export default Header