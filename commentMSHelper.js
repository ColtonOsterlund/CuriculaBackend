//commentMShelper.js

function insertCommentToDatabase(parentID, commentID, userID, theText, counter){
	
	if (parentID == null){//parent comment
		var query = "INSERT INTO parentComment(parentID) VALUES (" + commentID + ");";
	} else{//child comment
		var query = "INSERT INTO childComment(childID, parentID) VALUES ("+commentID+","+parentID+");";
	}
		
	//today code obtained from https://tecadmin.net/get-current-date-time-javascript/
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		
	var query2 = "INSERT INTO comment (commentID, authorUser, datePosted, text, counter) VALUES (" + commentID+ "," + userID + "," + date + "," + theText + "," + counter + ");"; 
		
		
	//Finally apply query 1 and 2 to database after user creates and after passign all necessary values
}


//create delete comment function deleting the comment from all places in db


	
	
module.exports.insertCommentToDatabase = insertCommentToDatabase
