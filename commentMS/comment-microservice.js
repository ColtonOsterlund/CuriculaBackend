const uuid = require('uuid')
const mysqlHelper = require('../MySQLHelper.js')

class Event {
    constructor(eventType) {
        this.time_stamp = new Date().toISOString().replace('Z', '')
        this.event_id = uuid.v4()
        this.type = eventType
    }
}

//each event will be created from command, popular, stored in event store, and finally sent to read store
function generateEvent(command, err) {
    console.log('in generate event()')
    createEvent(command)
        .then((event) => {
            let populatedEvent = event.populateEvent(command)
            console.log('populated event')
            return storeEvent(populatedEvent)
        })
        .then(() => {
            console.log('next part')
        })
        .catch(console.log(err))
}

function createEvent(command) { //set appropriate actions for each event
    return new Promise((resolve, reject) => {
        console.log('command ' + command.type)
        let event = new Event()
        if (command.type === 'create') {
            event.populateEvent = createCommentEvent(command)
            //add handlers
        } else if (command.type === 'edit') {
            event.populateEvent = createCommentEvent(command)
            //add handlers
        } else if (command.type === 'vote') {
            event.populateEvent = createVoteEvent(command)
            //add handlers
        } else {
            reject(new Error('failed in createEvent()'))
        }

        resolve()
    })
}
function createCommentEvent(command) {

    console.log('in createCommentEvent()')
    this.authour_user_id = req.user
    this.body = req['comment-body']

    // if (req.mode == 'create') {    //if create mode, create an event and a new comment ID
    //     event.comment_id = uuid.v4()
    //     event.comment_level = req["comment-level"]
    //     event.parent_id = req["parent-comment-id"]
    // } else if (req.mode == 'edit') {   //if edit more, create an event for given comment ID
    //     event.comment_id = req["target-comment-id"]
    // }
}

function createVoteEvent(req, err_handler) {

    console.log('in createVoteEvent()')
    // let event = new Event('editComment')

    // event.handler = function () {
    //     console.log('handling event')
    // }
}


function storeEvent(event) {
    return new Promise((resolve, reject) => {
        let query, args
        if (event.type == 'createComment') {
            query = 'INSERT INTO comment_event(event_id, comment_id, author_user_id, body, comment_level, parent_comment_id, time_posted, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, req.user, event.body, event.comment_level, event.parent_id, event.time_stamp, event.getMilliseconds]

        } else if (event.type == 'editComment') {
            query = 'INSERT INTO comment_event(event_id, comment_id, author_user_id, body, comment_level, parent_comment_id, time_posted, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, event.comment_id, req.user, event.body, event.comment_level, event.parent_id, event.time_stamp, event.getMilliseconds]

        } else if (event.type == 'vote') {
            query = 'INSERT INTO vote_event(event_id, comment_id, author_user_id, time_posted, vote, milliseconds_posted) VALUES ( ?, ?, ?, ?, ?, ?)'
            args = [event.event_id, req['comment_id'], req.user, event.time_stamp, req.vote, event.getMilliseconds]
        }

        mysqlHelper.sqlQuery(query, args, (failure) => {
            if (!failure) {
                resolve()
            } else {
                reject(failure)
            }
        })
    })
}

module.exports.generateEvent = generateEvent;
