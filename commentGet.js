const express = require('express')
var bodyParser = require('body-parser')
const mysqlHelper = require('./MySQLHelper.js')
const router = express.Router()
var jsonParser = bodyParser.json()



//obtain all comments from end point
router.get('/comment', jsonParser, (req, res) => {
	
	var commentID = req.body.commentID
	var childID = req.body.childID
	var parentID = req.body.parentID
	
	if(commentID == undefined ){ //NO QUERY PARAMETERS
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

    else {
		mysqlHelper.sqlQuery("SELECT * FROM comment WHERE commentID = ?", [parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

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

module.exports = router;