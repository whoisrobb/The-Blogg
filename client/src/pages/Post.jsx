import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import { apiUrl, legalVars, linkVars } from '../utils/exports'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import ScrollToTopButton from '../components/ScrollToTopButton'

const Post = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [postData, setPostData] = useState(null)
    const [actionsOpen, setActionsOpen] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    useEffect(() => {
        fetchPost(id)
    }, [])

    const fetchPost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/users/post/${postId}`)
            const data = await response.json()
            setPostData(data)
        } catch (err) {
            console.error(err)
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/users/delete/${postId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                navigate('/')
            }
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <section id='post'>
        <div className="wrapper">
            <div className="actions">
                <div className="back-button">
                    <BackButton />
                </div>
                <motion.div
                    animate={ actionsOpen ? 'open' : 'closed' }
                    // onMouseLeave={() => setActionsOpen(false)}
                    className="action-buttons"
                >
                    <button className='action share'>
                        <i className="uil uil-share"></i>
                    </button>
                    <button className='action bookmark'>
                        <i className="uil uil-bookmark"></i>
                    </button>
                    <button onClick={() => setActionsOpen(prev => !prev)} className='action ellipsis'>
                        <i className="uil uil-ellipsis-v"></i>
                    </button>
                    <motion.ul
                        variants={legalVars}
                        initial={legalVars.closed}
                        className="actions-modal"
                    >
                        <motion.li variants={linkVars} onClick={() => {setActionsOpen(false);}} className='option'><span><i className="uil uil-archive"></i></span>archive</motion.li>
                        <motion.li variants={linkVars} onClick={() => {setActionsOpen(false); navigate(`/edit/${id}`)}} className='option'><span><i className="uil uil-edit"></i></span>edit</motion.li>
                        <motion.li variants={linkVars} onClick={() => setConfirmDelete(true)} className='option'><span><i className="uil uil-trash-alt"></i></span>delete</motion.li>
                        {confirmDelete && <li onClick={() => deletePost(id)} className='option confirm'>confirm delete</li>}
                    </motion.ul>
                </motion.div>
            </div>
            <div className="post-item">
                {postData &&
                    <>
                        <h3 className="category">{postData.category}</h3>
                        <h1 className='title'>{postData.title}</h1>
                        <p className='summary'>{postData.summary}</p>
                        <div className="details">
                            <Link to={`#`}>Author: {postData.author.username}</Link>
                            <p>{format(new Date(postData.createdAt),  'MMMM dd, yyyy')}</p>
                        </div>
                        <div className="item"><img src={`${apiUrl}/uploads/${postData.imageUrl}`} alt="" /></div>
                        <div className='content' dangerouslySetInnerHTML={{ __html: postData.content }} />
                    </>
                }
            </div>
        </div>
        <ScrollToTopButton />
    </section>
  )
}

export default Post