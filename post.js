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
    console.log(req.user)
    commentMicroService.createCommentEvent(req.body)
    res.send(req.body.user);
})

router.post("/vote", jsonParser, authorization.authorizeUser, (req, res) => {
    console.log(req.user)
    commentMicroService.createVoteEvent(req.body)
    res.send(req.body.user);
})


module.exports = router //exports router out of this file 