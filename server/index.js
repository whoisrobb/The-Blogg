import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import usersRoutes from './routes/users.js'


/* CONFIGURATIONS */
const app = express()
app.use(express.json())
dotenv.config()
app.use(cors({
    credentials: true,
    origin: 'https://the-blogg-d7ry.vercel.app',
}))


/* ROUTES */
app.use('/users', usersRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6000
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => { console.log(`http://localhost:${PORT}`) })
}).catch((err) => console.log(err))