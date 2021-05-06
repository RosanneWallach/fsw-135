const express = require('express')
const postRouter = express.Router()
const Issue = require('../module/Issues')




postRouter.get('/', ( req, res, next)=>{
    Issue.find( (err, issue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })   
})

postRouter.get('/user', ( req, res, next)=>{
    Issue.find({user: req.user._id} ,(err, issue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issue)
    })   
})


postRouter.post('/', (err, req, res, next) =>{
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    console.log(newIssue)
    newIssue.save((err, savedIssue) =>{   
        console.log(err)  
        if(err){
            const error = new Error('could not save issue')
            res.status(500)
            console.log(error)
            return next(error)
        }
        
        return res.status(201).send(savedIssue)
    })
})

postRouter.delete('/:issueId', (err, req, res, next) =>{
    Issue.findOneAndDelete(
        {_id: req.params.issueId, user: req.user._id},
        (err, deleteIssue) =>{
            if(err){
                res.status(500)
                 return next(err)
            }
            return res.status(200).send(`Issue Deleted from list: ${deleteIssue.title}`)
        }
         
    )
})

postRouter.put('/:issueId', (err, req,res,next)=>{
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.user._id},
        req.body,
        {new:true},
        (err, updatedIssue) =>{
            if(err){
                res.status(500)
                return next(err)
            } 
            return res.status(201).send(updatedIssue)
        }
    )
})


module.exports = postRouter