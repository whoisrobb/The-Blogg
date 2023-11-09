import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { jwtDecode } from 'jwt-decode'
import 'react-quill/dist/quill.snow.css'
import { apiUrl, categories, itemVars, wrapperVars } from '../utils/exports'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const access = localStorage.getItem('accessToken')

        if (!access) {
            navigate('/login')
        }
    }, [])

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [files, setFiles] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('Health')
  const [categoriesOpen, setCategoryOpen] = useState(false)

  useEffect(() => {
    const { id } = jwtDecode(localStorage.getItem('accessToken'))
    setAuthor(id)
  }, [])

  const handleSubmit = async (e) => {
      e.preventDefault()

      const formData = new FormData()
      formData.append('title', title)
      formData.append('summary', summary)
      formData.append('author', author)
      formData.append('content', content)
      formData.append('category', selectedCategory)
      formData.append('image', files)

      console.log(formData)

      try {
          const response = await fetch(`${apiUrl}/users/create`, {
              method: 'POST',
              mode: 'cors',
              body: formData
          })
          .then((response) => {
              if (response.ok) {
                  setTitle('')
                  setSummary('')
                  setContent('')
              }
          })
      } catch (err) {
          console.error(err)
      }
  }

  return (
    <section id='create'>
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

            <div className="file-input-container">
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
            </div>

            </div>

            
            <ReactQuill value={content} onChange={(value) => setContent(value)} />

            <button className='submit' type='submit'>Post</button>
        </form>
        </div>
    </section>
  )
}

export default CreatePost