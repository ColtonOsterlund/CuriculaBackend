const express = require('express')
const router = express.Router()
const authenticationRouter = require('./authorization.js')
const mysqlHelper = require('../MySQLHelper.js')

var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()

router.post('/comment/create', jsonParser, authenticationRouter.authorizeUser, (req, res) => {
	
	console.log(req.body)

	var parentID = req.body.parentID
    var commentID = req.body.commentID
    var userID = req.body.userID
    var theText = req.body.theText
	
	if (parentID == null){//parent comment
		var query = "INSERT INTO parentComment(parentID) VALUES (?);";
		mysqlHelper.sqlQuery(query, [commentID], err_handler)
	} else{//child comment
		var query = "INSERT INTO childComment(childID, parentID) VALUES (?, ?);";
		mysqlHelper.sqlQuery(query, [commentID, parentID], err_handler)
	}
	

	//today code obtained from https://tecadmin.net/get-current-date-time-javascript/
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

	var query2 = "INSERT INTO comments (commentID, authorUser, datePosted, text, counter) VALUES (?, ?, ?, ?, ?);"; 
	 mysqlHelper.sqlQuery(query2, [commentID, userID, date, theText, counter], err_handler)
	
	//commentMSHelper.insertCommentToDatabase(parentID, commentID, userID, theText)

 })