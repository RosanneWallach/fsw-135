const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')


const userSchema = new Schema({

    username:{
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    admin:{
        type: Boolean,
        default: false
    }
})

userSchema.pre('save', function(next){
  const user = this
  if(!user.isModified('password')) return next()
  bcrypt.hash(user.password, 10, (err, hash)=>{
      if(err) return next(err)
      user.password = hash
      next()
  })
})

userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch)=>{
        if(err){
           return callback(err)
        } 
        return callback(null, isMatch)
    })
}

userSchema.methods.omitPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}


module.exports = mongoose.model('User', userSchema )