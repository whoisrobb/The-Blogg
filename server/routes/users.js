import express from 'express'
// import { upload } from '../controllers/upload.js'
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/post.js"


const router = express.Router()


/* GET ALL POSTS */
router.get('/posts', getAllPosts)


/* CREATE POST */
router.post('/create',
    // upload.single('image'),
    createPost
)


/* GET ONE POST */
router.get('/post/:id', getSinglePost)


/* UPDATE A POST */
router.put('/update/:id', updatePost)


/* DELETE A POST */
router.delete('/delete/:id', deletePost)


/* GET POSTS CATEGORIES */
// router.get('/posts/cat', getPostCat)

export default router