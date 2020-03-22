const mysqlHelper = require('../MySQLHelper.js')

exports.readComments = function(commentQuery, err) {

    let query
    let args

    if (commentQuery.user_id) {
        if (commentQuery.comment_level == 0) {
            //form query and args by joining the vote table
        } else if (commentQuery.comment_level == 1) {
            //form query and args by joining the vote table
        } else {
            console.err(new Error("invalid comment_level in commentQuery: " + JSON.stringify(commentQuery)))
        }
    } else {
        args = commentQuery.comment_id
        if (commentQuery.comment_level == 0) {
            query = "SELECT * FROM parentComment WHERE commenID = ?"
        } else if (commentQuery.comment_level == 1) {
            query = "SELECT * FROM childComment WHERE commenID = ?"
        } else {
            console.err(new Error("invalid comment_level in commentQuery: " + JSON.stringify(commentQuery)))
        }
    }

    mysqlHelper.sqlQuery(query, args, (err, rows) => {
        if (err != null) {
            return err
        } else {
            let commentArray = []

            rows.forEach((comment) => {
                jsonObjects.push({
                    comment_id: comment.commentID,
                    author_user_id: comment.userID,
                    author_username: comment.username,
                    body: comment.commentContent,
                    time_stamp: comment.timeStamp,
                    vote_count: comment.voteCount,
                    child_count: comment.childCount,
                    user_vote: comment.userVote
                });
            })

            return commentArray
        }
    });

    //return array with child comments. Check if user_id is in commentQuery, if so make sure to include how the user voted on each comment being sent back
    //the format you return should be relavant to the microservice and doesn't neceserily have to adhere to the API doc. It is upto the API end point to format it
    //in accordance with the API contract
}