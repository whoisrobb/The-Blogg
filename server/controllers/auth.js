import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'


/* REGISTER */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({ firstName, lastName, username, email, password: hashedPassword })
        const savedUser = await user.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/* LOGIN */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (!user) {
            return res.status(404).message({ message: 'Invalid User!' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).message({ message: 'Invaid Credentials' })
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET
        )

        res.status(200).json({ token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}