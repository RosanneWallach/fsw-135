const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')



app.use(express.json())
app.use(morgan('dev'))


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

app.use((err, req, res,next)=> {
    return res.send({errMsg: err.message})
})


const port  = 6000;
app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})