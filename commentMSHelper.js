//commentMShelper.js

const comment = require('../commentMS/comment.js');
const express = require('express')

const router = express.Router()

var jsonParser = bodyParser.json()

//do whatever we need to do with comment here:
//Probably any and all functions that use comment

//sample of how to insert comment with query
function insertCommentToDatabase(parentID, commentID, userID, theText, counter){
	
	if (parentID == null){//parent comment
		var query = "INSERT INTO parentComment(parentID) VALUES (" + commentID + ");";
	} else{//child comment
		var query = "INSERT INTO childComment(childID, parentID) VALUES ("+commentID+","+parentID+");";
	}
		
	//today code obtained from https://tecadmin.net/get-current-date-time-javascript/
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		
	String query2 = "INSERT INTO comment (commentID, authorUser, datePosted, text, counter) VALUES (" + commentID+ "," + userID + "," + date + "," + theText + "," + counter + ");"; 
		
		
	//Finally apply query 1 and 2 to database after user creates and after passign all necessary values
}
	
//maybe combine child and parent
	
//child from parent end
router.post('/comment/parent', jsonParser, (req, res) => {
	
	var parentID = req.body.parentID
	
	var object = mysqlHelper.sqlQuery("SELECT * FROM childComment WHERE parentID = ?", [parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

		if(err != null){
			return console.log("ERROR : " + err)
		}

		if(objects[0] == undefined){ //childComment did not match - childComment not in database
			return res.send("Parent Comment ID is Incorrect")
		}
		
		var jsonObjects = []
                
        rows.forEach(
			var commentObject = new comment(childComment.commentID, childComment.comment, childComment.userID, childComment.videoId, childComment.parentCommentID, childComment.timeStamp)

			jsonObjects.push(commentObject);
        )

		return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
	})
})

//parent from post end
router.post('/post/comment', jsonParser, (req, res) => {
	
	var parentID = req.body.parentID
	
	var object = mysqlHelper.sqlQuery("SELECT * FROM parentComment WHERE parentID = ?", [parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

		if(err != null){
			return console.log("ERROR : " + err)
		}

		if(objects[0] == undefined){ //childComment did not match - childComment not in database
			return res.send("Parent Comment ID is Incorrect")
		}
		
		var jsonObjects = []
                
        rows.forEach(
			var commentObject = comment(parentComment.commentID, parentComment.comment, parentComment.userID, parentComment.videoId, parentComment.parentCommentID, parentComment.timeStamp)

			jsonObjects.push(commentObject);
        )

		return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects

	})
	
})
	
	
module.exports.insertCommentToDatabase = insertCommentToDatabase;
	
	
	
	