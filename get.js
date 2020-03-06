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

    var schoolID = req.query.schoolID;
    var programID = req.query.programID;
    console.log(schoolID);

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


module.exports = router //exports router out of this file 