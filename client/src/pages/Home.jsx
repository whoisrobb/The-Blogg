import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    const [posts, setPosts] = useState('')

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://the-blogg-mocha.vercel.app/users/posts')
            // const response = await fetch('http://localhost:3000/users/posts')
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
                    <Link to={`/edit/${post._id}`}>Edit</Link>
                    <hr />
                </div>
            ))
        }
    </div>
  )
}

export default Home