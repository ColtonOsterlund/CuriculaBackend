//file for all get routes

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
var authorization = require('./authorization.js')
const rm = require('./comment-microservice/').readmanager
var cors = require('cors')

const router = express.Router()

router.use(cors()) //THIS IS SUPPOSED TO SOLVE CORS ISSUE BUT IS NOT WORKING - LOOK MORE INTO THIS
router.options('*', cors()) //cors preflight

// create application/json parser
var jsonParser = bodyParser.json()

//root route request
router.get("/", (req, res) => {

    res.send("ROOT")
})



router.get("/courses", jsonParser, (req, res) => {


    var schoolID = req.query.schoolID;
    var programID = req.query.programID;
    var courseID = req.query.courseID;

    if (schoolID == undefined && programID == undefined && courseID == undefined) { //NO QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course, schoolRelCourse, programRelCourse WHERE schoolRelCourse.courseID = course.courseID AND programRelCourse.courseID = course.courseID", null, (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID,
                        programID: course.programID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID != undefined && programID == undefined && courseID == undefined) { //SCHOOL QUERY PARAMETER
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse as SRC WHERE C.courseID = SRC.courseID AND SRC.schoolID = ?", [schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID == undefined && programID != undefined && courseID == undefined) { //PROGAM QUERY PARAMETER
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, programrelcourse as PRC, schoolRelCourse as SRC WHERE C.courseID = PRC.courseID AND PRC.programID = ? AND SRC.courseID = C.courseID", [programID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID != undefined && programID != undefined && courseID == undefined) { //SCHOOL & PROGRAM QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse as SRC, programrelcourse as PRC WHERE C.courseID = SRC.courseID AND C.courseID = PRC.courseID AND SRC.schoolID = ? AND PRC.programID = ?", [schoolID, programID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID == undefined && programID == undefined && courseID != undefined) { //COURSE QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolRelCourse as SRC WHERE C.courseID = ? AND SRC.courseID = C.courseID", [courseID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID != undefined && programID == undefined && courseID != undefined) { //SCHOOL & COURSE QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse AS SRC WHERE SRC.courseID = C.courseID AND SRC.schoolID = ? AND C.courseID = ?", [schoolID, courseID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    else if (schoolID != undefined && programID != undefined && courseID != undefined) { //SCHOOL & COURSE & PROGRAM QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course AS C, schoolrelcourse AS SRC, programrelcourse AS PRC WHERE PRC.courseID = C.courseID AND SRC.courseID = C.courseID AND SRC.schoolID = ? AND PRC.programID = ? AND C.courseID = ?", [schoolID, programID, courseID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (course) {
                    var courseObject = {
                        courseName: course.courseName,
                        courseID: course.courseID,
                        level: course.level,
                        schoolID: course.schoolID
                    }

                    jsonObjects.push(course);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

})

router.get("/schools", jsonParser, (req, res) => {

    var schoolID = req.query.schoolID;

    if (schoolID == undefined) { //NO QUERY PARAM
        mysqlHelper.sqlQuery("SELECT * FROM school", null, (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (school) {
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

    if (schoolID != undefined) { //SCHOOLID QUERY PARAM
        mysqlHelper.sqlQuery("SELECT * FROM school WHERE school.schoolID = ?", [schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (school) {
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

    var schoolID = req.query.schoolID;
    var programID = req.query.programID;

    if (schoolID == undefined && programID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM program", null, (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (program) {
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

    else if (schoolID != undefined && programID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM program AS P, schoolrelprogram AS SRP WHERE SRP.programID = P.programID AND SRP.schoolID = ?", [schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (program) {
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

    else if (schoolID == undefined && programID != undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM program WHERE program.programID = ?", [programID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (program) {
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

    else if (schoolID != undefined && programID != undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM program AS P, schoolrelprogram AS SRP WHERE SRP.programID = P.programID AND p.programID = ? AND SRP.schoolID = ?", [programID, schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (program) {
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




router.get("/faculty", jsonParser, (req, res) => {

    mysqlHelper.sqlQuery("SELECT * FROM faculty", null, (err, rows) => {
        if (err != null) {
            return res.send("Error: " + err)
        }
        else {
            var jsonObjects = []

            rows.forEach(function (faculty) {
                var courseObject = {
                    facultyName: faculty.facultyName,
                    facultyID: faculty.facultyID
                }

                jsonObjects.push(faculty);
            })

            return res.send(JSON.stringify(jsonObjects))
        }
    });

})







router.get("/videos", jsonParser, (req, res) => {

    var courseID = req.query.courseID;
    var schoolID = req.query.schoolID;
    var programID = req.query.programID;
    var videoID = req.query.videoID;

    if (courseID == undefined && schoolID == undefined && programID == undefined && videoID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content", null, (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }

    if (courseID != undefined && schoolID == undefined && programID == undefined && videoID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content WHERE relatedCourseID = ?", [courseID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });

    }

    if (courseID == undefined && schoolID != undefined && programID == undefined && videoID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content AS C, course as CO, schoolRelCourse AS SRC WHERE C.relatedCourseID = CO.courseID AND CO.courseID = SRC.courseID AND SRC.schoolID = ?", [schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });

    }

    if (courseID == undefined && schoolID == undefined && programID != undefined && videoID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content AS C, course AS CO, programRelCourse AS PRC WHERE C.relatedCourseID = CO.courseID AND CO.courseID = PRC.courseID AND PRC.programID = ?", [programID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });

    }

    if (courseID == undefined && schoolID != undefined && programID != undefined && videoID == undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content AS C, course AS CO, programRelCourse AS PRC, schoolRelProgram AS SRP WHERE C.relatedCourseID = CO.courseID AND CO.courseID = PRC.courseID AND PRC.programID = ? AND SRP.programID = ? AND SRP.schoolID = ?", [programID, programID, schoolID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });

    }

    if (courseID == undefined && schoolID == undefined && programID == undefined && videoID != undefined) {
        mysqlHelper.sqlQuery("SELECT * FROM content WHERE videoID = ?", [videoID], (err, rows) => {
            if (err != null) {
                return res.send("Error: " + err)
            }
            else {
                var jsonObjects = []

                rows.forEach(function (video) {
                    var videoObject = {
                        videoID: video.videoID,
                        videoLink: video.videoLink,
                        description: video.description,
                        datePosted: video.datePosted,
                        relatedCourseID: video.relatedCourseID,
                        verifiedFlag: video.verifiedFlag,
                        posterID: video.posterID
                    }

                    jsonObjects.push(videoObject);
                })

                return res.send(JSON.stringify(jsonObjects))
            }
        });

    }
})

router.get('/comments/parent', jsonParser, (req, res, next) => {
    if (req.header('auth-token')) {
        authorization.authorizeUser(req, res, () => {
            next()
        })
    } else {
        req.user = { _id: undefined } //not the best work around but makes the code more readable
        next()
    }
}, (req, res) => {

    rm.readComments({
        comment_level: 0,
        comment_id: req.query.videoID,
        user_id: req.user._id       //this will be optional, it'll automatically disappear is user wasnt authenticated
    }, (err, comments) => {
        if (err) {
            res.status(500).send('server failure: ' + err)
        } else {
            res.status(201).send(comments)
        }
    })
})

router.get('/comments/child', jsonParser, (req, res, next) => {
    if (req.header('auth-token')) {
        authorization.authorizeUser(req, res, () => {
            next()
        })
    } else {
        req.user = { _id: undefined } //not the best work around but makes the code more readable
        next()
    }
}, (req, res) => {

    rm.readComments({
        comment_level: 1,
        comment_id: req.query.commentID,
        user_id: req.user._id       //this will be optional, it'll automatically disappear is user wasnt authenticated
    }, (err, comments) => {
        if (err) {
            console.error('Microservice error: ' + err)
            res.status(500).send(new Error('Server Error: ' + error))
        } else {
            res.status(201).send(comments)
        }
    })

})

module.exports = router //exports router out of this file 