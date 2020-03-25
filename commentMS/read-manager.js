const mysqlHelper = require('../MySQLHelper.js')

exports.readComments = function(commentQuery, callback) {

    let query
    let args

    if (commentQuery.user_id) {
        query = "SELECT C.commentID, author_userID, author_username, body, timestamp, vote_count ?, is_edited, IFNULL(vote, 0) AS vote " + 
            "FROM ? C " +
            "LEFT JOIN cms_aggregate_vote V " +
            "    ON C.commentID = V.commentID " +
            "    AND C.author_userID = ? " +
            "    AND ? = ?"
        if (commentQuery.comment_level == 0) {
            args = [', child_count', 'cms_aggregate_parentcomment', commentQuery.user_id, 'parent_videoID', commentQuery.comment_id]
        } else if (commentQuery.comment_level == 1) {
            args = ['', 'cms_aggregate_childcomment', commentQuery.user_id, 'parent_commentID', commentQuery.comment_id]
        } else {
            console.err(new Error("invalid comment_level in commentQuery: " + JSON.stringify(commentQuery)))
        }

    } else {
        args = commentQuery.comment_id
        if (commentQuery.comment_level == 0) {
            query = "SELECT * FROM cms_aggregate_parentcomment WHERE parent_videoID = ?"
        } else if (commentQuery.comment_level == 1) {
            query = "SELECT * FROM cms_aggregate_childcomment WHERE parent_commentID = ?"
        } else {
            console.err(new Error("invalid comment_level in commentQuery: " + JSON.stringify(commentQuery)))
        }
    }

    console.log(query)
    console.log(args)
    mysqlHelper.sqlQuery(query, args, (err, rows) => {
        if (err != null) {
            console.log("SQL query: " + query)
            console.log(args)
            callback(err)
        } else {
            let commentArray = []

            rows.forEach((comment) => {
                commentArray.push({
                    comment_id: comment.commentID,
                    author_user_id: comment.author_userID,
                    author_username: comment.author_username,
                    body: comment.body,
                    time_stamp: comment.timestamp,
                    vote_count: comment.vote_count,
                    child_count: comment.child_count,
                    user_vote: comment.vote
                });
            })

            callback(null, commentArray)
        }
    });

    //return array with child comments. Check if user_id is in commentQuery, if so make sure to include how the user voted on each comment being sent back
    //the format you return should be relavant to the microservice and doesn't neceserily have to adhere to the API doc. It is upto the API end point to format it
    //in accordance with the API contract
}