const sqlQuery = require("../MySQLHelper").sqlQuery;
const uuid = require('uuid')
const am = require('./aggregate-managers')

class Event {
    constructor(eventType) {
        this.time_stamp = new Date()
        this.event_id = uuid.v4()
        this.type = eventType
    }
}

//each event will be created from command, populated, stored in event store, and finally sent to read store
function generateEvent(command, callback) {
    createEvent(command)
        .then((event) => {
            event.populateEvent(command)
            return storeEvent(event)
        })
        .then((event) => {
            am.updateAggregates(event)
        })
        .then(callback())
        .catch((err) => {
            console.error(err)
            callback(err)
        })
}



function createEvent(command) { //set appropriate actions for each event
    return new Promise((resolve, reject) => {
        let event = new Event(command.type)
        if (command.type == 'create') {
            event.populateEvent = createCommentEvent
            //add handlers
        } else if (command.type == 'edit') {
            event.populateEvent = createCommentEvent
            //add handlers
        } else if (command.type == 'vote') {
            event.populateEvent = createVoteEvent
            //add handlers
        } else {
            reject(new Error('failed in createEvent()'))
        }

        resolve(event)
    })
}

function createCommentEvent(command) {

    this.user_id = command.user_id
    this.body = command.body

    if (command.type == 'create') {
        this.comment_id = uuid.v4()
        this.comment_level = command.comment_level
        this.parent_id = command.parent_id
        this.username = command.username
    } else if (command.type == 'edit') {
        this.comment_id = command.parent_id
    }
}

function createVoteEvent(command) {

    this.vote = command.vote
    this.user_id = command.user_id
    this.comment_id = command.comment_id
}

function storeEvent(event) {

    return new Promise((resolve, reject) => {
        let query;
        let args;

        if (event.type == 'create') {
            query = 'INSERT INTO cms_event_comment(eventID, commentID, author_userID, author_username, body, comment_level, parentID, timestamp, milliseconds) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.username, event.body, event.comment_level, event.parent_id, event.time_stamp.toISOString(), event.time_stamp.getMilliseconds()]
        } else if (event.type == 'edit') {
            query = 'INSERT INTO cms_event_comment(eventID, commentID, author_userID, body, timestamp, milliseconds) VALUES ( ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.body, event.time_stamp.toISOString(), event.time_stamp.getMilliseconds()]

        } else if (event.type == 'vote') {
            query = 'INSERT INTO cms_event_vote(eventID, commentID, author_userID, vote, timestamp, milliseconds) VALUES ( ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.vote, event.time_stamp.toISOString(), event.time_stamp.getMilliseconds()]
        }

        sqlQuery(query, args, (error) => {
            if (!error) {
                resolve(event)
            } else {
                reject(error)
            }
        })
    })
}

module.exports.generateEvent = generateEvent;
