import express from 'express'
import { createPost, getAllPosts } from "../controllers/post.js"


const router = express.Router()


/* GET ALL POSTS */
router.get('/posts', getAllPosts)


/* CREATE POST */
router.post('/create', createPost)


export default router