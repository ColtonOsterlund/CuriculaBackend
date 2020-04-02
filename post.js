//file for all post routes

const express = require('express')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')
const em = require('./comment-microservice/').eventmanager
var cors = require('cors')

const router = express.Router()

router.use(cors()) //THIS IS SUPPOSED TO SOLVE CORS ISSUE BUT IS NOT WORKING - LOOK MORE INTO THIS
router.options('*', cors()) //cors preflight

// create application/json parser
var jsonParser = bodyParser.json()


router.post("/comments", jsonParser, authorization.authorizeUser, (req, res) => {
    em.generateEvent({
        type: req.body.mode,
        user_id: req.user._id,
        username: req.body.username,
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

})

router.post("/vote", jsonParser, authorization.authorizeUser, (req, res) => {
    em.generateEvent({
        type: "vote",
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