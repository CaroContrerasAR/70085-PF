import jwt from 'jsonwebtoken'
import {configObject} from '../config/config.js'
const {jwtSecret} = configObject

export function onlyAdmin(req, res, next){
    if (req.user.role === 'admin'){
        next()
    } else {
        res.status(403).send('<h2>Access denied</h2>')
    }   
}

export function onlyUser(req,res,next){
    if (req.user.role === 'user'){
        next()
    } else {
        res.status(403).send('<h2>Access denied</h2>')
    }   
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.coderCookieToken

    if (!token) {
        return res.status(403).send('Access Denied: No token provided');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).send('Invalid or expired token')
    }
}