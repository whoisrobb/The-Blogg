import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Health')

    const formData = { title, summary, content, category: selectedCategory }
    console.log(formData)


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('https://the-blogg-mocha.vercel.app/users/create', {
            // const response = await fetch('http://localhost:3000/users/create', {
                method: 'POST',
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
        } catch (err) {
            console.error(err)
        }
    }

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

            <button type='submit'>Post</button>
        </form>
    </div>
  )
}

export default CreatePost