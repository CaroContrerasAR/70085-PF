import express from 'express'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import './db.js'

import productRouter from './routes/products.routes.js'
import cartRouter from './routes/carts.routes.js'
import viewsRouter from './routes/views.routes.js'
import sessionRouter from './routes/session.router.js'
import initializePassport from './config/config.js'
import {configObject} from './config/config.js'

import ProductManager from './dao/db/productsManager.db.js'
const manager = new ProductManager()

const app = express()
const { sessionSecret, PORT } = configObject;

if (!sessionSecret) {
    console.error('Error: sessionSecret is not defined!');
    process.exit(1);  // Evitar que el servidor se ejecute sin un `sessionSecret`
}

//Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("./src/public"))
app.use(cookieParser())
app.use(cors())

initializePassport()
app.use(passport.initialize())
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*1000, httpOnly: true, secure: false}
}))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)
app.use('/', viewsRouter)

//Listen
const httpServer = app.listen(PORT, () => {
    console.log(`Server Listening on Port ${PORT}`); 
})

//Websockets:
import SocketManager from './sockets/socket.manager.js'
new SocketManager(httpServer)