//file for all post routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')


const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

module.exports = router //exports router out of this file 