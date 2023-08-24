import Post from "../models/post.js"


/* GET ALL POSTS */
export const getAllPosts = async (req, res) => {
    try {
        res.status(201).json(await Post.find())
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}


/* CREATE POST */
export const createPost = async (req, res) => {
    try {
        const { title, summary, content, category } = req.body
        const post = await Post({ title, summary, content, category })
        const savedpost = await post.save()
        res.status(201).json(savedpost)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}