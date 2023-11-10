import React, { useState, useEffect } from 'react'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

  return (
    <div>
      {isVisible && (
        <button className="absolute-btn" onClick={scrollToTop}>
          <i className='uil uil-arrow-up'></i>
        </button>
      )}
    </div>
  )
}

export default ScrollToTopButton;