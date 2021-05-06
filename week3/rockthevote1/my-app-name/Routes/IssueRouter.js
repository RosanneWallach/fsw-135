const express = require ('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')


// Get All
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, allIssues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allIssues)
    })
})

// Get One
issueRouter.get("/:issueId", (req, res, next) => {
    Issue.findOne((err, oneIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(oneIssue)
    })
})

// Post One
issueRouter.post("/", (req, res, next) => {
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// Update One
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId}, 
        req.body, 
        {new: true}, 
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// Delete One
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId}, (err, deletedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedIssue.issuename} from the database!`)
    })
})

module.exports = issueRouter