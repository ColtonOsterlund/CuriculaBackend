//one table per aggregate

exports.parentCommentAggregate = function (event) {

    if (event.type = 'create') {
        //comment_id, user_id, username, comment body, initial vote value, timpe posted, edited?
        args = [event.comment_id, event.user_id, event.username, event.body, 0, event.time_stamp.toISOString(), false]
        //create sql query that inserts new row
    } else if (event.type = 'edit') {

        //comment_id, body, edited?
        args = [event.comment_id, event.body, true]

        //create sql update to above columns
    } else if (event.type = 'vote') {

        //comment_id, increment amount (+2, +1 or -1, -2)
        args = [event.comment_id, event.vote]

        //create sql update query
    }

    console.log('parent comment aggregate')
}

exports.childCommentAggregate = function (event) {

    if (event.type = 'create') {
        ///comment_id, user_id, username, comment body, initial vote value, timpe posted, edited?
        args = [event.comment_id, event.user_id, event.username, event.body, 0, event.time_stamp.toISOString(), false]
    } else if (event.type = 'edit') {

        //comment_id, body, edited?
        args = [event.comment_id, event.body, true]

        //create sql update to above columns
    } else if (event.type = 'vote') {

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