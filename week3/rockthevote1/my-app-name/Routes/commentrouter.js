const express = require ('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')


// Get All
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, allComments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allComments)
    })
})

// Get One
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.findOne((err, oneComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(oneComment)
    })
})

// Post One
commentRouter.post("/", (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

// Update One
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId}, 
        req.body, 
        {new: true}, 
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

// Delete One
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete({_id: req.params.commentId}, (err, deletedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedComment.commentcontents} from the database!`)
    })
})

module.exports = commentRouter