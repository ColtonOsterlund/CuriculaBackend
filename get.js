//file for all get routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')

const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

//root route request
router.get("/", (req, res) => {
    res.send("ROOT")
})

router.get("/courses", jsonParser, (req, res) => {
    mysqlHelper.sqlQuery("SELECT * FROM course", null, (err, rows) => {
        if(err != null){
            return res.send("Error: " + err)
        }
        else{
            var jsonObjects = []
            
            rows.forEach(function(course){
                var courseObject = {
                    courseName: course.courseName,
                    courseID: course.courseID,
                    level: course.level
                }

                jsonObjects.push(course);
            })

            return res.send(JSON.stringify(jsonObjects))
        }
    });
})

router.get("/content/videos", jsonParser, (req, res) => {

    var schoolName = req.query.schoolName //will be set to null if not specified in the request
    var programName = req.query.programName //will be set to null if not specified in the request
    var courseCode = req.query.courseCode  //will be set to null if not specified in the request
    var tagName = req.query.tagName //will be set to null if not specified in the request
    var userName = req.query.userName //will be set to null if not specified in the request

    res.send("/content/videos")

})

router.get("/content/comments", jsonParser, (req, res) => { 

    //TODO add possible query parameters

    res.send("/content/comments")
})

router.get("/content/comments", jsonParser, (req, res) => { 

    //TODO add possible query parameters
    
    res.send("/content/comments")
})

router.get("/content/upvotes", jsonParser, (req, res) => {
    
    //TODO add possible query parameters

    res.send("/content/upvotes")
})

router.get("/content/flags", jsonParser, (req, res) => { 

    //TODO add possible query parameters

    res.send("/content/flags")
})


module.exports = router //exports router out of this file 