//commentMShelper.js
const mysqlHelper = require('./MySQLHelper.js')

function insertCommentToDatabase(parentID, commentID, userID, theText){
	var query
	
	if (parentID == null){//parent comment
		query = "INSERT INTO parentComment(parentID) VALUES (" + commentID + ");";
	} else{//child comment
		query = "INSERT INTO childComment(childID, parentID) VALUES ("+commentID+","+parentID+");";
	}
	
	mysqlHelper.sqlQuery(query, null, (err, rows) => {
        if(err != null){
            console.log("Error inserting child/parent comment in DB: " + err)
        }
        else{
            console.log("Successfully created and inserted child/parent comment in DB")
        }
	})
		
	//today code obtained from https://tecadmin.net/get-current-date-time-javascript/
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		
	var query2 = "INSERT INTO comment (commentID, authorUser, datePosted, text, counter) VALUES (" + commentID+ "," + userID + "," + date + "," + theText + ",0);"; 
		
	mysqlHelper.sqlQuery(query2, null, (err, rows) => {
        if(err != null){
            console.log("Error inserting comment in DB: " + err)
        }
        else{
            console.log("Successfully created and inserted comment in DB")
        }
	})
}


function deleteCommentFromDatabase(commentID){
	var query1 = "DELETE FROM parentComment WHERE parentID = " + commentID;
	mysqlHelper.sqlQuery(query2, null, (err, rows) => {
        if(err != null){
            console.log("Error deleting parentComment object in DB: " + err)
        }
        else{
            console.log("Successfully deleted object from parentComment table in DB")
        }
	})
	
	var query2 = "DELETE FROM childComment WHERE childID = " + commentID;
	mysqlHelper.sqlQuery(query2, null, (err, rows) => {
        if(err != null){
            console.log("Error deleting childComment object in DB: " + err)
        }
        else{
            console.log("Successfully deleted object from childComment table in DB")
        }
	})
	
	var query3 = "DELETE FROM comment WHERE commentID = " + commentID; 
	mysqlHelper.sqlQuery(query2, null, (err, rows) => {
        if(err != null){
            console.log("Error deleting comment object in DB: " + err)
        }
        else{
            console.log("Successfully deleted object from comment table in DB")
        }
	})	
}	
	
module.exports.insertCommentToDatabase = insertCommentToDatabase
module.exports.deleteCommentFromDatabase = deleteCommentFromDatabase