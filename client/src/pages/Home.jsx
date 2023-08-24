import React, { useEffect, useState } from 'react'

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
                    <h1>{post.title}</h1>
                    <p>{post.summary}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Home