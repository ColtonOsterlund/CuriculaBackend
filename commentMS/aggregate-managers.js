const aggregates = require('./aggregates.js')

class Aggregate {
    constructor(update, subscriptionArray) {
        this.subscriptionArray = subscriptionArray
        this.updateAggregate = update
    }
}

const aggregateList = [
    new Aggregate(aggregates.parentCommentAggregate, ['create']),
    new Aggregate(aggregates.childCommentAggregate, ['create']),
    new Aggregate(aggregates.commentAggregate, ['create', 'edit']),
    new Aggregate(aggregates.voteAggregate, ['vote'])
]


function updateAggregates(event) {
    console.log('event type: ' + event.type)
    aggregateList.forEach((item) => {
        if (item.subscriptionArray.includes(event.type)) {
            item.updateAggregate(event)
        }
    })
}


module.exports.updateAggregates = updateAggregates