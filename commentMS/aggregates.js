const mysqlHelper = require('../MySQLHelper.js')

//one table per aggregate
exports.parentCommentAggregate = function (event) {
    let args
    let query

    if (event.comment_level == 1) {
        args = [event.comment_id]
        query = 'UPDATE cms_aggregate_parentcomment SET child_count = child_count + 1 WHERE commentID = ?'
    } if (event.type == 'create') {
        args = [event.comment_id, event.user_id, event.username, event.body, event.time_stamp.toISOString()]
        query = 'INSERT INTO cms_aggregate_parentcomment (commentID, author_userID, author_username, body, timestamp) VALUES (?, ?, ?, ?, ?) '
    } else if (event.type == 'edit') {
        args = [event.body, true, event.comment_id]
        query = 'UPDATE cms_aggregate_parentcomment SET body = ?, is_edited = ? WHERE commentID = ?'
    } else if (event.type == 'vote') {
        args = [event.vote, event.comment_id]
        query = 'UPDATE cms_aggregate_parentcomment SET vote_count = vote_count + ? WHERE commentID = ?'
    }

    mysqlHelper.sqlQuery(query, args, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
        }
    })
}

exports.childCommentAggregate = function (event) {

    if (event.type == 'create') {
        ///comment_id, user_id, username, comment body, initial vote value, timpe posted, edited?
        args = [event.comment_id, event.user_id, event.username, event.body, 0, event.time_stamp.toISOString(), false]
    } else if (event.type == 'edit') {

        //comment_id, body, edited?
        args = [event.comment_id, event.body, true]

        //create sql update to above columns
    } else if (event.type == 'vote') {

        //comment_id, increment amount (+2, +1 or -1, -2)
        args = [event.comment_id, event.vote]

        //create sql update query
    }

    console.log('child comment aggregate')
}

exports.voteAggregate = function (event) {

    args = [event.user_id, event.comment_id, event.vote]
    //update vote column by incrementing by event.vote if there is a row where both user_id and comment_id match else create column
    console.log('vote aggregate')
}