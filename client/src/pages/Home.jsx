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
            const response = await fetch(`${apiUrl}/users/posts`, {
                method: 'GET',
                mode: 'no-cors', // Change 'no-cors' to 'cors' to allow access to response data
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json(); // Await the response.json() method
    
            setPosts(data);
        } catch (err) {
            console.error(err);
        }
    }
    

    console.log(posts)

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