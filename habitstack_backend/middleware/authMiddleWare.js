require('dotenv').config()
const jwt = require('jsonwebtoken')

function authMiddleWare(req, res, next){
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' })
    }
}

module.exports = { authMiddleWare }