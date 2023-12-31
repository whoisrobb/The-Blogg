
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import authRoutes from './routes/auth.js'
import usersRoutes from './routes/users.js'


/* CONFIGURATIONS */
const app = express()

dotenv.config()

app.use(cors())
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.json())


/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', usersRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })
}).catch((err) => console.log(err))