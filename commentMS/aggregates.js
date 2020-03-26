const mysqlHelper = require('../MySQLHelper.js')

//one table per aggregate
exports.parentCommentAggregate = function (event) {
    let args
    let query

    if (event.type == 'create' && event.comment_level == 1) {
        args = [event.parent_id]
        query = 'UPDATE cms_aggregate_parentcomment SET child_count = child_count + 1 WHERE commentID = ?'
    } else if (event.type == 'create') {
        args = [event.comment_id, event.user_id, event.username, event.parentID, event.body, event.time_stamp.toISOString()]
        query = 'INSERT INTO cms_aggregate_parentcomment (commentID, author_userID, author_username, parent_videoID, body, timestamp) VALUES (?, ?, ?, ?, ?, ?) '
    } else if (event.type == 'edit') {
        args = [event.body, true, event.comment_id]
        query = 'UPDATE cms_aggregate_parentcomment SET body = ?, is_edited = ? WHERE commentID = ?'
    } else if (event.type == 'vote') {
        args = [event.vote, event.comment_id]
        query = 'UPDATE cms_aggregate_parentcomment SET vote_count = vote_count + ? WHERE commentID = ?'
    }

    console.log('updating parent aggregate')

    mysqlHelper.sqlQuery(query, args, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
        }
    })
}

exports.childCommentAggregate = function (event) {

    let args
    let query 

    if (event.type == 'create') {
        args = [event.comment_id, event.user_id, event.username, event.parent_id, event.body, event.time_stamp.toISOString()]
        query = 'INSERT INTO cms_aggregate_childcomment (commentID, author_userID, author_username, parent_commentID, body, timestamp) VALUES ( ?, ?, ?, ?, ?, ?)'
    } else if (event.type == 'edit') {
        args = [event.body, true, event.comment_id]
        query = 'UPDATE cms_aggregate_childcomment SET body = ?, is_edited = ? WHERE commentID = ?'
    } else if (event.type == 'vote') {
        args = [event.vote, event.comment_id]
        query = 'UPDATE cms_aggregate_childcomment SET vote_count = vote_count + ? WHERE commentID = ?'
    }

    console.log('updating child aggregate')
    mysqlHelper.sqlQuery(query, args, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
        }
    })
}

exports.voteAggregate = function (event) {

    args = [event.user_id, event.comment_id, event.vote, event.vote]
    query = 'INSERT INTO cms_aggregate_vote (userID, commentID, vote) VALUES(?, ?, ?) ' + 
            '   ON DUPLICATE KEY ' +
            '   UPDATE ' +
            '   vote = ?'

    console.log('updating vote aggregate')


    mysqlHelper.sqlQuery(query, args, (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.log(result)
        }
    })
}