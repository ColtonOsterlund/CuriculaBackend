const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')

<<<<<<< HEAD
function createCommentEvent(newEvent) {
    newEvent.timeStamp = Date.now()
    newEvent.eventID = 123  //TODO generate unique eventID (or let SQL)

    
    

    if (newEvent.mode == 'create') {    //if create mode, create an event and a new comment ID
        newEvent.commentID = 432 //TODO generate unique comment IDs
    } else if (newEvent.mode == 'edit') {   //if edit more, create an event for given comment ID
        newEvent.commentID = newEvent.parent-id
    }
    console.log("creating event with \n" + JSON.stringify(newEvent))
}

function createVoteEvent(newEvent) {
    //generate ID
    //write into event store
}

module.exports.createCommentEvent = createCommentEvent;
module.exports.createVoteEvent = createVoteEvent;
=======
>>>>>>> Added POST endpoints for comments and upvotes. Added microservice stubs to handle the endpoint
