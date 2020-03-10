//commentMShelper.js

const comment = require('../commentMS/comment.js');

//do whatever we need to do with comment here:
//Probably any and all functions that use comment

//sample of how to insert comment with query
	function insertCommentToDatabase(parentID, commentID, userID, text, counter){
	
		if (parent){//parent comment
			var query = "INSERT INTO parentComment(parentID) VALUES (" + commentID + ");";
		} else{//child comment
			var query = "INSERT INTO childComment(childID, parentID) VALUES (" + commentID + "," + parentID + ");";
		}
		
		//today code obtained from https://tecadmin.net/get-current-date-time-javascript/
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		
		String query2 = "INSERT INTO comment (commentID, authorUser, datePosted, text, counter) VALUES (" + commentID + "," + userID + "," + date + "," + text + "," + counter + ");"; 
		
		
		//Finally apply query 1 and 2 to database after user creates and after passign all necessary values
	}
	
	
	module.exports.insertCommentToDatabase = insertCommentToDatabase;
	
	
	
	