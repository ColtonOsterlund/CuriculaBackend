//comment.js
function comment(commentID, comment, userID, videoId, parentCommentID, timeStamp){
	this.commentID = commentID;
	this.comment = comment;
	this.userID = userID;
	this.videoID = videoID;
	this.parentCommentID = parentCommentID;
	this.timeStamp = timeStamp;
	
}


module.exports = comment;
