export const apiUrl = 'https://the-blogg.onrender.com'
// export const apiUrl = 'http://localhost:3000'

export const categories = ['health', 'career', 'travel', 'technology', 'cars']

export const wrapperVars = {
    initial: {
        transform: 'scaleY(0)',
        transition: {
            duration: 0.2,
            staggerChildren: 0.2
        }
    }, 
    open: {
        transform: 'scaleY(1)',
        transition: {
            duration: 0.2,
            // staggerChildren: 0.2
        }
    },
    exit: {
        transform: 'scaleY(0)',
        transition: {
            duration: 0.2,
            delay: 0.3,
            staggerChildren: 0.2
        }
    }
}

export const itemVars = {
    initial: {
        y: '2rem',
        transition: {
            duration: 0.2,
        }
    }, 
    open: {
        y: 0,
        transition: {
            duration: 0.2,
            delay: 0.3,
        }
    },
    exit: {
        y: '2rem',
        transition: {
            duration: 0.2,
        }
    }
}

export const legalVars = {
    open: {
        scaleY: 1,
        transition: {
            duration: 0.2,
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    },
    closed: {
        scaleY: 0,
        transition: {
            duration: 0.2,
            when: 'afterChildren',
            staggerChildren: 0.1
        }
    }
}

export const linkVars = {
    open: {
        opacity: 1,
        y: 0,
    },
    closed: {
        opacity: 0,
        y: -15,
    }
  }  