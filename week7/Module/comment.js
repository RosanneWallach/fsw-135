const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    comment:{
        type: String,
        required: true
    },
    dateSubmitted:{
        type: Date,
        default: Date.now
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    issue:{
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    }
})

module.exports = mongoose.model('Comment', commentSchema)