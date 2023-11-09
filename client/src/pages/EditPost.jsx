import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { apiUrl, categories, itemVars, wrapperVars } from '../utils/exports'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Health')
    const [categoriesOpen, setCategoryOpen] = useState(false)

    useEffect(() => {
        fetchPost(id)
    }, [])

    const fetchPost = async (postId) => {
        try {
            const response = await fetch(`${apiUrl}/users/post/${postId}`)
            const data = await response.json()
            setTitle(data.title)
            setSummary(data.summary)
            setSelectedCategory(data.category)
            setContent(data.content)
        } catch (err) {
            console.error(err)
        }
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault()

      try {
        const response = await fetch(`${apiUrl}/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, summary, category: selectedCategory, content })
        })
        .then((response) => {
            if (response.ok) {
                navigate(`/post/${id}`)
            }
        })
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <section id='edit'>
        <div className="wrapper">
            
        <form onSubmit={handleSubmit}>
            
            <div className="title-input">
                <label>
                    <input
                        type="text"
                        className="text"
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        required
                    />
                </label>
            </div>

            <div className="summary-input">
                <label>
                    <input
                        type="text"
                        className="text"
                        name='summary'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder='Summary'
                        required
                    />
                </label>
            </div>

            <div className="cat-file">
            <div className='categories-input' onMouseLeave={() => setCategoryOpen(false)}>
              <div onClick={() => setCategoryOpen(prev => !prev)} className="select">
                {selectedCategory}
                <i className="uil uil-angle-down"></i>
              </div>
                <AnimatePresence>
                  {categoriesOpen &&
                    <motion.div
                      variants={wrapperVars}
                      initial='initial'
                      animate='open'
                      exit='exit'
                      className="input">
                      {categories.map((cat) => (
                        <div key={cat} style={{ overflow: 'hidden' }}>
                          <motion.div
                            variants={itemVars}
                            initial='initial'
                            animate='open'
                            exit='exit'
                            className='option' onClick={() => {setSelectedCategory(cat); setCategoryOpen(false)}}>{cat}</motion.div>
                        </div>
                      ))}
                  </motion.div>}
                </AnimatePresence>
            </div>

            {/* <div className="file-input-container">
                <input
                    type="file"
                    className='file-input'
                    id='file-input'
                    onChange={(e) => setFiles(e.target.files[0])}
                    aria-label="File browser example"
                />
                <label htmlFor='file-input' className="file-label">
                    <span className="file-label-text">
                        {files ? files.name : <div className='button'>Choose image</div>}
                    </span>
                </label>
            </div> */}

            </div>
            
            <ReactQuill value={content} onChange={(value) => setContent(value)} />

            <button className='submit' type='submit'>Edit</button>
        </form>
        </div>
    </section>
  )
}

export default EditPost