import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../utils/url'

const Home = () => {
    const [posts, setPosts] = useState('')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${apiUrl}/users/posts`)
            const data = await response.json()
            setPosts(data)
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <div>
        {
            posts && posts.map((post) => (
                <div key={post._id}>
                    <Link to={`/post/${post._id}`}><h1>{post.title}</h1></Link>
                    <p>{post.summary}</p>
                    <p>By: {post.author.username}</p>
                    <Link to={`/edit/${post._id}`}>Edit</Link>
                    <hr />
                </div>
            ))
        }
    </div>
  )
}

export default Home