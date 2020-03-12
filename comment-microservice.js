const express = require('express')
const uuid = require('uuid')
const mysqlHelper = require('./MySQLHelper.js')

class Event {
    constructor() {
        this.time_stamp = new Date().toISOString().replace('Z', '')
        this.event_id = uuid.v4()
    }
}

function createCommentEvent(req, err_handler) {
    
    let event = new Event()
    
    let query = 'INSERT INTO comment_event(event_id, comment_id, author_user_id, body, comment_level, parent_comment_id, time_posted) VALUES ( ?, ?, ?, ?, ?, ?, ?)'

    if (req.mode == 'create') {    //if create mode, create an event and a new comment ID
        event.comment_id = uuid.v4()
        event.comment_level = req["comment-level"]
        event.parent_id = req["parent-comment-id"]
    } else if (req.mode == 'edit') {   //if edit more, create an event for given comment ID
        event.comment_id = req["target-comment-id"]
    }
    console.log(req)
    mysqlHelper.sqlQuery(query, [event.event_id, event.comment_id, req.user, req['comment-body'], event.comment_level, event.parent_id, event.time_stamp], err_handler)
}

function createVoteEvent(req, err_handler) {
    let event = new Event()
    let query = 'INSERT INTO vote_event(event_id, comment_id, author_user_id, time_posted, vote) VALUES ( ?, ?, ?, ?, ?)'

    mysqlHelper.sqlQuery(query, [event.event_id, req['comment_id'], req.user, event.time_stamp, req.vote] , err_handler)
}

module.exports.createCommentEvent = createCommentEvent;
module.exports.createVoteEvent = createVoteEvent;
