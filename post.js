//file for all post routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')
var commentMicroService = require('./commentMS/comment-microservice.js')


const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()


router.post("/comment", jsonParser, authorization.authorizeUser, (req, res) => {
    console.log(req.body.comment_body)
    commentMicroService.generateEvent({
        type: req.body.mode,
        user_id: req.user._id,
        body: req.body.comment_body,
        comment_level: req.body.comment_level,
        parent_id: req.body.target_id
    }, (err) => {
        if (!err) {
            res.send('Comment Posted')
        } else {
            res.status(500).send("Couldn't submit comment")
        }
    })
    // commentMicroService.createCommentEvent(req.body, (err) => {
    //     if (err == null) {
    //         console.log("Comment Event created")
    //         return res.send("Comment posted")
    //     } else {
    //         console.log("Error creating Comment Event")
    //         console.log(err)
    //         return res.status(500).send("Couldn't post comment")
    //     }
    // })

})

router.post("/vote", jsonParser, authorization.authorizeUser, (req, res) => {
    commentMicroService.generateEvent({
        type: 'vote',
        user_id: req.user._id,
        comment_id: req.body.comment_id,
        vote: req.body.vote
    }, (err) => {
        if (!err) {
            res.send('Vote Posted')
        } else {
            res.status(500).send("Couldn't submit vote")
        }
    })
})


module.exports = router //exports router out of this file 