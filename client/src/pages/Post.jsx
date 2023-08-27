import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Post = () => {
    const [post, setPost] = useState('')
    const { id } = useParams()

    useEffect(() => {

      const fetchPost = async () => {
          try {
            const response = await fetch(`https://the-blogg-mocha.vercel.app/users/post/${id}`);
            // const response = await fetch(`http://localhost:3000/users/post/${id}`);
            const data = await response.json();
            setPost(data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
      }

      fetchPost()
    }, [])

    console.log(post)

  return (
    <div>
        {post ? (
          <>
            <h1 className='title'>{post.title}</h1>
            <p className='summary'>{post.summary}</p>
            <p>Author: {post.author.username}</p>
            {
              post.imageUrl && <img src={`https://the-blogg-mocha.vercel.app/uploads/${post.imageUrl}`} alt={post.title} />
              // post.imageUrl && <img src={`http://localhost:3000/uploads/${post.imageUrl}`} alt={post.title} />

            }
            <div className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
            <hr />
          </>
        ) : ''}
      </div>
  )
}

export default Post