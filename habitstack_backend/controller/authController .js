const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')
const User = require('../models/userModel')

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const register = async (req, res) => {
    console.log("creation in process")
    console.log(req.body)
    const { userName, email, password } = req.body

    try {
        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] })
        if (existingUser) {
            console.log("user already exists")
            return res.status(400).json({ error: 'User already exists' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        })

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        console.log(user)
        console.log(token)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                userName: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.log("error",error)
        res.status(400).json({ error: error.message })
    }
}


const login = async (req, res) => {
    console.log("inside login backend")
    const { email, password } = req.body

    try {
        // Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            console.log("user does not exist")
            return res.status(400).json({ error: 'User does not exist' })
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            console.log("incorrect password")
            return res.status(401).json({ error: 'Incorrect password' })
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const googleAuth = async (req, res) => {
    try {
        console.log("google authintication in process");
        const { credential } = req.body
        
        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const { email, name, sub: googleId } = payload

        // Check if user exists
        let user = await User.findOne({ email })

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                name,
                email,
                googleId
            })
        }

        // Create token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email
            }
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    register,
    login,
    googleAuth
}