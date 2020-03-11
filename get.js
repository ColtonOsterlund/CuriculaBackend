//file for all get routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')
var cors = require('cors')

const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

//root route request
router.get("/", (req, res) => {

    res.send("ROOT")
})



router.get("/courses", jsonParser, (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var schoolID = req.query.schoolID;
    var programID = req.query.programID;
    var courseID = req.query.courseID;

    if(schoolID == undefined && programID == undefined && courseID == undefined){ //NO QUERY PARAMETERS
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

    else if(schoolID != undefined && programID == undefined && courseID == undefined){ //SCHOOL QUERY PARAMETER
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

    else if(schoolID == undefined && programID != undefined && courseID == undefined){ //PROGAM QUERY PARAMETER
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

    else if(schoolID != undefined && programID != undefined && courseID == undefined){ //SCHOOL & PROGRAM QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse as SRC, programrelcourse as PRC WHERE C.courseID = SRC.courseID AND C.courseID = PRC.courseID AND SRC.schoolID = ? AND PRC.programID = ?", [schoolID, programID], (err, rows) => {
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

    else if(schoolID == undefined && programID == undefined && courseID != undefined){ //COURSE QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C WHERE C.courseID = ?", [courseID], (err, rows) => {
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

    else if(schoolID != undefined && programID == undefined && courseID != undefined){ //SCHOOL & COURSE QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse AS SRC WHERE SRC.courseID = C.courseID AND SRC.schoolID = ? AND C.courseID = ?", [schoolID, courseID], (err, rows) => {
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

    else if(schoolID != undefined && programID != undefined && courseID != undefined){ //SCHOOL & COURSE & PROGRAM QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse AS SRC, programrelcourse AS PRC WHERE PRC.courseID = C.courseID AND SRC.courseID = C.courseID AND SRC.schoolID = ? AND PRC.programID = ? AND C.courseID = ?", [schoolID, programID, courseID], (err, rows) => {
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

})

router.get("/schools", jsonParser, (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var schoolID = req.query.schoolID;

    if(schoolID == undefined){ //NO QUERY PARAM
        mysqlHelper.sqlQuery("SELECT * FROM school", null, (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(school){
                    var courseObject = {
                        schoolName: school.schoolName,
                        schoolID: school.schoolID
                    }

                    jsonObjects.push(school);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    if(schoolID != undefined){ //SCHOOLID QUERY PARAM
        mysqlHelper.sqlQuery("SELECT * FROM school WHERE school.schoolID = ?", [schoolID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(school){
                    var courseObject = {
                        schoolName: school.schoolName,
                        schoolID: school.schoolID
                    }

                    jsonObjects.push(school);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }
})

router.get("/programs", jsonParser, (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var schoolID = req.query.schoolID;
    var programID = req.query.programID;

    if(schoolID == undefined && programID == undefined){
        mysqlHelper.sqlQuery("SELECT * FROM program", null, (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(program){
                    var courseObject = {
                        programName: program.programName,
                        programID: program.programID
                    }

                    jsonObjects.push(program);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if(schoolID != undefined && programID == undefined){
        mysqlHelper.sqlQuery("SELECT * FROM program AS P, schoolrelprogram AS SRP WHERE SRP.programID = P.programID AND SRP.schoolID = ?", [schoolID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(program){
                    var courseObject = {
                        programName: program.programName,
                        programID: program.programID
                    }

                    jsonObjects.push(program);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if(schoolID == undefined && programID != undefined){
        mysqlHelper.sqlQuery("SELECT * FROM program WHERE program.programID = ?", [programID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(program){
                    var courseObject = {
                        programName: program.programName,
                        programID: program.programID
                    }

                    jsonObjects.push(program);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if(schoolID != undefined && programID != undefined){
        mysqlHelper.sqlQuery("SELECT * FROM program AS P, schoolrelprogram AS SRP WHERE SRP.programID = P.programID AND p.programID = ? AND SRP.schoolID = ?", [programID, schoolID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
                rows.forEach(function(program){
                    var courseObject = {
                        programName: program.programName,
                        programID: program.programID
                    }

                    jsonObjects.push(program);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

})

module.exports = router //exports router out of this file 