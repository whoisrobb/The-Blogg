import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../utils/url'
import { format } from 'date-fns'

const Home = ({ userId }) => {
    const [posts, setPosts] = useState('')

    const categories = ['Health', 'Career', 'Travel', 'Technology', 'Food']

    useEffect(() => {
        fetchPosts()
    }, [])

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

  return (
    <section id='home'>
        <div className="wrap">
        <div className="intro">
            <h1>voyages, vitals, ventures, victory & vittles</h1>
        </div>

        <div className="categories">
            <button>all</button>
            {
                categories.map((cat, index) => (
                    <button onClick={() => fetchPosts(cat)} key={index}>{cat}</button>
                ))
            }
        </div>
        
        <div className="posts">
            {
                posts && posts.map((post) => (
                    <div key={post._id} className='post'>
                        <Link to={`/post/${post._id}`}><img src={`${apiUrl}/uploads/${post.imageUrl}`} alt="" /></Link>
                        <Link to={`/post/${post._id}`}><h1>{post.title}</h1></Link>
                        <div className="details">
                            <Link to={'#'}>By {post.author.username}</Link>
                            <p>{format(new Date(post.createdAt),  'MMMM dd, yyyy, hh:mm a')}</p>
                        </div>
                        <p className='summary'>{post.summary}</p>
                        {
                            userId && userId == post.author._id ?
                                <Link className='edit' to={`/edit/${post._id}`}>edit</Link>
                            : null
                        }
                    </div>
                ))
            }
        </div>
            
        </div>
    </section>
  )
}

export default Home