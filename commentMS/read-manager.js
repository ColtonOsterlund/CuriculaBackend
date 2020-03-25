const mysqlHelper = require('../MySQLHelper.js')

exports.readComments = function(commentQuery, callback) {

    let query
    let args

    if (commentQuery.user_id) {
        if (commentQuery.comment_level == 0) {
            query = "SELECT C.commentID, author_userID, author_username, body, timestamp, vote_count, child_count, is_edited, IFNULL(vote, 0) AS vote " + 
            "FROM cms_aggregate_parentcomment C " +
            "LEFT JOIN cms_aggregate_vote V " +
            "    ON C.commentID = V.commentID " +
            "    AND V.userID = ? " +
            "    AND parent_videoID = ?"
            args = [commentQuery.user_id, commentQuery.comment_id]
        } else if (commentQuery.comment_level == 1) {
            query = "SELECT C.commentID, author_userID, author_username, body, timestamp, vote_count, is_edited, IFNULL(vote, 0) AS vote " + 
            "FROM cms_aggregate_childcomment C " +
            "LEFT JOIN cms_aggregate_vote V " +
            "    ON C.commentID = V.commentID " +
            "    AND V.userID = ? " +
            "    AND parent_commentID = ?"
            args = [commentQuery.user_id, commentQuery.comment_id]
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
}