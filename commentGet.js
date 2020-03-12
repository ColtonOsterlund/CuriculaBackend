const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
const commentMSHelper = require('./commentMSHelper.js')
var bodyParser = require('body-parser')
const router = express.Router()
var jsonParser = bodyParser.json()



//obtain all comments from end point
router.get('/comment', jsonParser, (req, res) => {
	
	var commentID = req.query.commentID
	var childID = req.query.childID
	var parentID = req.query.parentID
	
	if(commentID == undefined && parentID == undefined && childID == undefined){ //NO QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM comment", null, (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
               rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			   })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if(commentID != undefined && parentID == undefined && childID == undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment WHERE commentID = ?", [commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID != undefined && parentID != undefined && childID == undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P WHERE C.commentID = P.parentID AND C.commentID = ? AND P.parentID = ?", [commentID, parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID == undefined && parentID != undefined && childID != undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P, childComment AS CC WHERE CC.childID = ? AND P.parentID = ? AND CC.childID = C.commentID AND P.parentID = C.commentID", [childID, parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID != undefined && parentID == undefined && childID != undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, childComment AS CC WHERE CC.childID = ? AND C.commentID = ? AND CC.childID = C.commentID", [childID, commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID == undefined && parentID == undefined && childID != undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, childComment AS CC WHERE CC.childID = ? AND CC.childID = C.commentID", [childID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID == undefined && parentID != undefined && childID == undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P WHERE P.parentID = ? AND P.parentID = C.commentID", [parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
	
	else if(commentID != undefined && parentID != undefined && childID != undefined){
		mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P, childComment AS CC WHERE CC.childID = ? AND P.parentID = ? AND C.commentID = ? AND CC.childID = C.commentID AND P.parentID = C.commentID", [childID, parentID, commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

			if(err != null){
				return console.log("ERROR : " + err)
			}

			if(objects[0] == undefined){ //childComment did not match - childComment not in database
				return res.send("Parent Comment ID is Incorrect")
			}
			
			var jsonObjects = []
					
			rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(comment);
			})

			return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
		});
	}
})

router.get('/comment/delete', jsonParser, (req, res) => {
	var commentID = req.query.commentID
	
	commentMSHelper.deleteCommentFromDataBase(commentID)
})