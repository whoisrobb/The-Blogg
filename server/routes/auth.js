import express from "express"
import { login, register } from "../controllers/auth.js"


const router = express.Router()


/* REGISTER ROUTE */
router.post('/register', register)


/* LOGIN ROUTE */
router.post('/login', login)


export default router