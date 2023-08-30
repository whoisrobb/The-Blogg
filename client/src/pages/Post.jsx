import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiUrl } from '../utils/url'

const Post = () => {
    const [post, setPost] = useState('')
    const { id } = useParams()

    useEffect(() => {

      const fetchPost = async () => {
          try {
            const response = await fetch(`${apiUrl}/users/post/${id}`)
            const data = await response.json();
            setPost(data);
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
      }

      fetchPost()
    }, [])

  return (
    <section id='post'>
        {post ? (
          <div className='wrapper'>
            <h1 className='title'>{post.title}</h1>
            <p className='summary'>{post.summary}</p>
            <Link className='author' to={'#'}>Author: {post.author.username}</Link>
            {
              post.imageUrl && <img src={`${apiUrl}/uploads/${post.imageUrl}`} alt={post.title} />

            }
            <div className='content' dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ) : ''}
      </section>
  )
}

export default Post