const aggregates = require('./aggregates.js')

class Aggregate {
    constructor(update, subscriptionCheck) {
        this.subscriptionCheck = subscriptionCheck
        this.updateAggregate = update
    }
}

const aggregateList = [
    new Aggregate(aggregates.parentCommentAggregate, (event) => {
        if (event.type == 'create') {
            return true
        } else if (event.type == 'edit') {
            return true
        } else if (event.type == 'vote') {
            return true
        } else {
            return false
        }
    }),
    new Aggregate(aggregates.childCommentAggregate, (event) => {
        if (event.type == 'create' && event.comment_level == 1) {
            return true
        } else if (event.type == 'edit') {
            return true
        } else if (event.type == 'vote') {
            return true
        } else {
            return false
        }
    }),
    new Aggregate(aggregates.voteAggregate, (event) => {
        if (event.type == 'vote') {
            return true
        } else {
            return false
        }
    })
]


function updateAggregates(event) {
    aggregateList.forEach((item) => {
        if (item.subscriptionCheck(event)) {
            item.updateAggregate(event)
        }
    })
}


module.exports.updateAggregates = updateAggregates