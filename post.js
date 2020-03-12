//file for all post routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')
var commentMicroService = require('./comment-microservice.js')


const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()


router.post("/comment", jsonParser, authorization.authorizeUser, (req, res) => {

    commentMicroService.createCommentEvent(req.body, (err) => {
        if (err == null) {
            console.log("Comment Event created")
            return res.send("Comment posted")
        } else {
            console.log("Error creating Comment Event")
            console.log(err)
            return res.status(500).send("Couldn't post comment")
        }
    })

})

router.post("/vote", jsonParser, authorization.authorizeUser, (req, res) => {
    
    commentMicroService.createVoteEvent(req.body, (err) => {
        if (err == null) {
            console.log("Vote Submitted")
            return res.send("Comment posted")
        } else {
            console.log("Error Submitting Vote")
            console.log(err)
            return res.status(500).send("Couldn't Submit Vote")
        }
    })
})


module.exports = router //exports router out of this file 