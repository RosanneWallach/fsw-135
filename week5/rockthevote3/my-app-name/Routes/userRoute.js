const express = require('express')
const authRouter = express.Router()
const User = require('../module/Users')
const jwt = require('jsonwebtoken')

//get
authRouter.get('/user', (req,res) =>{
  User.find((err, user)=>{
    if(err)
    return res.status(500).send(err)
    if(user)
    return res.status(200).send(user)
  })
})

//Get one
authRouter.get('/', (req, res, next)=>{
  User.findOne({username: req.body.username}, (err,user)=>{
    if(err)
    return res.status(500).send(err)
    if(req.body.username !== user.username)
    return res.status(404).send(err)
    if(user)
    return res.status(200).send(user)

  })
})
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(req.body.username !== user.username){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
   user.checkPassword(req.body.password, (err, isMatch)=>{
     if(err){
       res.status(403)
       return next( new Error('Password incorrect'))
     }
     if(!isMatch){
       res.status(403)
       return next(new Error('Passwork incorrect'))
     }
   })
    const token = jwt.sign(user.omitPassword(), process.env.SECRET)
    return res.status(200).send({ token, user: user.omitPassword()})
  })
})


//Post
authRouter.post('/register', (req,res, next) =>{
  User.findOne({username: req.body.username.toLowerCase()}, (err, user) =>{
    if(err){
     
      res.status(500)
      return next(err)
    }
    if(user){
     
      res.status(403)
      return next(new Error('User Already Exist. Please choose a unique username'))
    }
    const newUser = new User(req.body)
    newUser.save((err, newUser) =>{
      if(err){
       
        const error = new Error("Could not create user")
      res.status(500)
      return next(error)
      } 
      const token = jwt.sign(newUser.omitPassword(), process.env.SECRET)
      return res.status(201).send({token, user: newUser.omitPassword})
      
    })
  })
  
})
//Update
authRouter.put('/', (req, res) =>{
  User.findByIdAndUpdate(
    req.param.username,
    req.body,
    {new: true},
     (err, savedUser)=>{
      if(err){
      return res.status(500).send(err)
      }
      return res.status(201).send(savedUser)
      
  })
})

//delete

// authRouter.delete('/', (res,req)=>{
//   User.findOneAndDelete
// })




module.exports = authRouter 