import Post from "../models/post.js"


/* GET ALL POSTS */
export const getAllPosts = async (req, res) => {
    try {
        const { category } = req.body
        
        const filter = category ? { category } : {};

        const posts = await Post.find(filter).populate('author', ['username']).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).send({ err: err.message })
    }
}

// export const getAllPosts = async (req, res) => {
//     try {
//         const { category } = req.query // Use req.query to get the query parameters
//         const page = parseInt(req.query.page) || 1 // Get the current page (default to page 1)
//         const pageSize = parseInt(req.query.pageSize) || 9 // Get the number of posts per page (default to 10)

//         // Create a filter object for the category
//         const filter = category ? { category } : {}

//         // Calculate the skip value based on the current page and page size
//         const skip = (page - 1) * pageSize

//         // Find the posts, limit the results to the page size, and skip the appropriate number of posts
//         const posts = await Post.find(filter)
//             .populate('author', ['username'])
//             .limit(pageSize)
//             .skip(skip)
//             .sort({ createdAt: -1 })

//         // Send the paginated posts to the client
//         console.log(page)
//         res.status(200).json(posts)
//     } catch (err) {
//         res.status(500).send({ err: err.message })
//     }
// }


/* CREATE POST */

export const createPost = async (req, res) => {
    try {
        const { title, summary, content, author, category } = req.body
        const image = req.file.filename
        const post = await Post({ title, summary, content, author, category, imageUrl: image })
        const savedpost = await post.save()
        const posts = await Post.find({}).sort({ createdAt: -1 })
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
        const { title, summary, category, content } = req.body
        const newData = await Post.findById(postId)

        if (!newData) {
            return res.status(404).json({ message: 'Post not found' })
        }
        
        await newData.updateOne({ title, summary, category, content })

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