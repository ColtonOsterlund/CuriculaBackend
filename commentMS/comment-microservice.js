const uuid = require('uuid')
const mysqlHelper = require('../MySQLHelper.js')

class Event {
    constructor(eventType) {
        this.time_stamp = new Date()
        this.event_id = uuid.v4()
        this.type = eventType
    }
}

//each event will be created from command, populated, stored in event store, and finally sent to read store
function generateEvent(command, callback) {
    console.log('command accepted: ' + JSON.stringify(command))
    createEvent(command)
        .then((event) => {
            event.populateEvent(command)
            console.log('populated event: ' + JSON.stringify(event))
            return storeEvent(event)
        })
        .then(() => {
            console.log('update aggregates')
        })
        .then(callback())
        .catch((err) => {
            console.error(err)
            callback(err)
        })
}

function createEvent(command) { //set appropriate actions for each event
    return new Promise((resolve, reject) => {
        console.log('command ' + command.type)
        let event = new Event(command.type)
        if (command.type === 'create') {
            event.populateEvent = createCommentEvent
            //add handlers
        } else if (command.type === 'edit') {
            event.populateEvent = createCommentEvent
            //add handlers
        } else if (command.type === 'vote') {
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
        console.log('in create option')
        this.comment_id = uuid.v4()
        this.comment_level = command.comment_level
        this.parent_id = command.parent_id
    } else if (command.type == 'edit') {
        this.comment_id = command.parent_id
    }
    // if (req.mode == 'create') {    //if create mode, create an event and a new comment ID
    //     event.comment_id = uuid.v4()
    //     event.comment_level = req["comment-level"]
    //     event.parent_id = req["parent-comment-id"]
    // } else if (req.mode == 'edit') {   //if edit more, create an event for given comment ID
    //     event.comment_id = req["target-comment-id"]
    // }
}

function createVoteEvent(command) {

    this.vote = command.vote
    this.user_id = command.user_id
    this.comment_id = command.comment_id

    // let event = new Event('editComment')

    // event.handler = function () {
    //     console.log('handling event')
    // }
}



function storeEvent(event) {
    console.log('in storeEvent(): ' + JSON.stringify(event))

    return new Promise((resolve, reject) => {
        let query;
        let args;

        if (event.type == 'create') {
            query = 'INSERT INTO comment_event(event_id, comment_id, author_user_id, body, comment_level, time_posted, parent_comment_id, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.body, event.comment_level, event.time_stamp.toISOString(), event.parent_id, event.time_stamp.getMilliseconds()]
        } else if (event.type == 'edit') {
            query = 'INSERT INTO comment_event(event_id, comment_id, author_user_id, body, comment_level, time_posted, parent_comment_id, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.body, event.comment_level, event.time_stamp.toISOString(), event.parent_id, event.time_stamp.getMilliseconds()]

        } else if (event.type == 'vote') {
            query = 'INSERT INTO vote_event(event_id, comment_id, author_user_id, vote, time_posted, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, event.user_id, event.vote, event.time_stamp.toISOString(), event.time_stamp.getMilliseconds()]
        }

        console.log(args)

        mysqlHelper.sqlQuery(query, args, (error) => {
            if (!error) {
                resolve()
            } else {
                reject(error)
            }
        })
    })
}

module.exports.generateEvent = generateEvent;
