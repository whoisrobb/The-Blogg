import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Navigate, useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()
    
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [success, setSuccess] = useState(false)

    const formData = { title, summary, content, category: selectedCategory }

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = async () => {
        try {
            const response = await fetch(`https://the-blogg-mocha.vercel.app/users/post/${id}`)
            // const response = await fetch(`http://localhost:3000/users/post/${id}`)
            const data = await response.json()
            setTitle(data.title)
            setSummary(data.summary)
            setSelectedCategory(data.category)
            setContent(data.content)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`https://the-blogg-mocha.vercel.app/users/delete/${id}`, {
            // const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
                method: 'DELETE',
            })
    
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
    
            // Redirect to another page upon success
            setSuccess(true)
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError(err.message); // Set the error state to display to the user
        }
    }    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`https://the-blogg-mocha.vercel.app/users/update/${id}`, {
            // const response = await fetch(`http://localhost:3000/users/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then((response) => {
                if (response.ok) {
                    setTitle('')
                    setSummary('')
                    setContent('')
                }
            })

            setSuccess(true)
        } catch (err) {
            console.error(err)
        }
    }


    if (success) return <Navigate to={'/'} />

  return (
    <div>
        <form onSubmit={handleSubmit}>
            
            <div className="title-input">
                <label>
                    <input
                        type="text"
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
                        name='summary'
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder='Summary'
                        required
                    />
                </label>
            </div>

            <div className='categories-input'>
                <label htmlFor="categories">Select a Category:</label>
                <select
                    id="categories"
                    name="categories"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="health">Health</option>
                    <option value="career">Career</option>
                    <option value="technology">Technology</option>
                    <option value="food">Food</option>
                    <option value="travel">Travel</option>
                </select>
            </div>

            <ReactQuill value={content} onChange={(value) => setContent(value)} />

            <button type='submit'>Edit Post</button>
            <button onClick={handleDelete}>Delete Post</button>
        </form>
    </div>
  )
}

export default EditPost