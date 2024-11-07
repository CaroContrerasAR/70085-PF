import bcrypt from 'bcrypt'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import config, { configObject } from '../config/config.js'
const {jwtSecret} = configObject

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (password, user)=> bcrypt.compareSync(password, user.password)

const generateToken = (user)=>{
    return jwt.sign(user, jwtSecret, {expiresIn:'1h'})
}

const passportCall = (strategy) => {
    return async (req, res, next)=>{
        passport.authenticate(strategy, {session:false},(error, user, info) => {
            if( error){
               return next(error)    
            }
            if( !user ){
                res.status(401).send({error: info.message ? info.message : info.toString()})
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

const authorization = (role) => {
    return async (req, res, next) =>{
        if(req.user.role !== role){
            return res.status(403).send({message:'No tenes permiso de acceso'})
        }
        next()
    }
}

const Total = (products)=>{
    let total = 0
    products.forEach(element => {
        total += element.product.price * element.quantity
    })
    return total
}
export { createHash, isValidPassword, generateToken, passportCall, authorization, Total}