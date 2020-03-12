const express = require('express')
const commentMSHelper = require('./commentMSHelper.js')
const router = express.Router()
const authenticationRouter = require('./authorization.js')

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

router.post('/comment/create', jsonParser, authenticationRouter.authorizeUser, (req, res) => {
	
	console.log(req.body)

	var parentID = req.body.parentID
    var commentID = req.body.commentID
    var userID = req.body.userID
    var theText = req.body.theText
	
	commentMSHelper.insertCommentToDatabase(parentID, commentID, userID, theText)

 })