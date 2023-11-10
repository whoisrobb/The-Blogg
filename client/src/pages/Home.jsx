import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl, categories } from '../utils/exports'


const Home = () => {
    const navigate = useNavigate()
    const [posts, setPosts] = useState(null)
    const [cat, setCat] = useState('')
    const [pageValue, setPageValue] = useState(1)

    useEffect(() => {
        fetchPosts(cat)
    }, [cat])
    
    const fetchPosts = async (cat) => {
        try {
            fetch(`${apiUrl}/users/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category: cat })
            })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then((data) => {
                setPosts(data)
            })
        } catch (err) {
            console.error(err)
        }
    }

    const handleCreateButtonClick = () => {
        const isLoggedIn = !!localStorage.getItem('accessToken')

        if (isLoggedIn) {
            navigate('/create')
        } else {
            navigate('/login')
        }
    }

  return (
    <section id='home'>
        <div className="wrap">
            <div className="intro">
                <h1>Vitality, Vocation, Voyages, Vision & Vehicles</h1>
            </div>
            <div className="categories">
                <button onClick={() => setCat('')} className="cat">all</button>
                {categories.map((cat) => (
                    <button onClick={() => setCat(cat)} className='cat' key={cat}>{cat}</button>
                ))}
            </div>
            <div className="posts">
                {posts && posts.map((post) => (
                    <div key={post._id} className="post-item">
                        <Link className='image' to={`/post/${post._id}`}>
                            <div className="item"><img src={`${apiUrl}/uploads/${post.imageUrl}`} alt="" /></div>
                        </Link>
                        <h1 className='title'><Link to={`/post/${post._id}`}>{post.title}</Link></h1>
                        <div className="details">
                            <Link to={'#'}>By {post.author.username}</Link>
                            <p>{format(new Date(post.createdAt),  'MMMM dd, yyyy')}</p>
                        </div>
                        <p className='summary'><Link to={`/post/${post._id}`}>{post.summary}</Link></p>
                    </div>
                ))
                }
            </div>
            {/* <div className="pagination-wrap">
                <div className="pagination">
                    <button onClick={() => setPageValue(preValue => (preValue > 1 ? preValue - 1 : 1))}>
                        <i className="uil uil-angle-left"></i>
                    </button>
                    <div className="page-value">{pageValue}</div>
                    <button onClick={() => setPageValue(preValue => preValue + 1)}>
                        <i className="uil uil-angle-right"></i>
                    </button>
                </div>
            </div> */}
        </div>
        <button onClick={handleCreateButtonClick} className="absolute-btn create">
            <i className="uil uil-plus"></i>
        </button>
    </section>
  )
}

export default Home