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

    if(schoolID == undefined && programID == undefined){ //NO QUERY PARAMETERS
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
    }

    else if(schoolID != undefined && programID == undefined){ //SCHOOL QUERY PARAMETER
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse as SRC WHERE C.courseID = SRC.courseID AND SRC.schoolID = ?", [schoolID], (err, rows) => {
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
    }

    else if(schoolID == undefined && programID != undefined){ //PROGAM QUERY PARAMETER
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, programrelcourse as PRC WHERE C.courseID = PRC.courseID AND PRC.programID = ?", [programID], (err, rows) => {
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
    }

    else if(schoolID != undefined && programID != undefined){ //SCHOOL & PROGRAM QUERY PARAMETERS
        //TODO
    }

})


module.exports = router //exports router out of this file 