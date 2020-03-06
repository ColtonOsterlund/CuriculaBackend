//file for all post routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')

const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

router.post("/authentication/register", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/authentication/register")
})

router.post("/authentication/login", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/authentication/login")
})

router.post("/content/videos", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data
    
    res.send("/content/videos")
})

router.post("/content/comments", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/content/comments")
})

router.post("/content/comments", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/content/comments")
})

router.post("/content/upvotes", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/content/upvotes")
})

router.post("/content/flags", jsonParser, (req, res) => { 

    //TODO parse JSON to get all data

    res.send("/content/flags")
})

module.exports = router //exports router out of this file 