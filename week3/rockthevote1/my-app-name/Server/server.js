const express = require('express')
const server = express()
require('dotenv').config()
const morgan =  require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')




server.use(express.json())
server.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/db-methods', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
},
() => console.log('mongoose connected'))

server.use('/auth', require('./routes/authRouter'))
server.use('/api', expressJwt({secret: process.env.SECRET}))
server.use('/user', require('./routes/userRouter.js'))
server.use('/api/issue', require('./routes/issueRouter.js'))
server.use('/api/comment', require('./routes/commentRouter.js'))

server.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

server.listen(9000, () => {
    console.log('server is running')
})