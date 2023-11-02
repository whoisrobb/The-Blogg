import Post from "../models/post.js"


/* GET ALL POSTS */
export const getAllPosts = async (req, res) => {
    try {
        const { category } = req.body
        
        const filter = category ? { category } : {};

        const posts = await Post.find(filter).populate('author', ['username'])
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}


/* CREATE POST */
export const createPost = async (req, res) => {
    try {
        const { title, summary, content, author, category } = req.body
        const image = req.file.filename
        const post = await Post({ title, summary, content, author, category, imageUrl: image })
        // const post = await Post({ title, summary, content, author, category })
        const savedpost = await post.save()
        res.status(201).json(savedpost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* GET ONE POST */
export const getSinglePost = async (req, res) => {
    try {
        const { id } = req.params
        res.status(200).json(await Post.findById(id).populate('author', ['username']))
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


/* UPDATING A POST */
export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id
        const { title, summary, categories, content } = req.body
        const newData = await Post.findById(postId)

        if (!newData) {
            return res.status(404).json({ message: 'Post not found' })
        }
        
        await newData.updateOne({ title, summary, categories, content })

        res.status(201).json(newData)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}



/* DELETE A POST */
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ message: 'Post not found' }) // Add return here
        }

        await post.deleteOne()
        res.status(200).json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}