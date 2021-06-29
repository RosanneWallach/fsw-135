const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt =require('express-jwt')
require('dotenv').config()

const cors = require('cors')


app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

mongoose.connect(
    'mongodb://localhost:27017/politics_db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to politics_db '))

    
 
app.use('/auth', require('./routes/userRoutes'))
app.use('/api', expressJwt({secret:process.env.SECRET, algorithms:['HS256']}))
app.use('/api/post', require('./routes/issuesRoutes'))



app.use((err, req, res,next)=> {
  
    if(err.name === 'UnauthorizedError'){
        console.log(err.status)
        res.send(err.message)
    }
    return res.send({errMsg: err.message})
})


const port  = 8080;
app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})