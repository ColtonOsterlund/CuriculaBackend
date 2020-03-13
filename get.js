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


    var schoolID = req.query.schoolID;
    var programID = req.query.programID;
    var courseID = req.query.courseID;

    if (schoolID == undefined && programID == undefined && courseID == undefined) { //NO QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM course, schoolRelCourse WHERE schoolRelCourse.courseID = course.courseID", null, (err, rows) => {
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

    router.get('/comment', jsonParser, (req, res) => {
	
        var commentID = req.query.commentID
        var childID = req.query.childID
        var parentID = req.query.parentID
        
        if(commentID == undefined && parentID == undefined && childID == undefined){ //NO QUERY PARAMETERS
            mysqlHelper.sqlQuery("SELECT * FROM comment", null, (err, rows) => {
                if(err != null){
                    return res.send("Error: " + err)
                }
                else{
                    var jsonObjects = []
                    
                   rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
						jsonObjects.push(comment);
                   })
    
                    return res.send(JSON.stringify(jsonObjects))
                }
            });
        }
    
        else if(commentID != undefined && parentID == undefined && childID == undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment WHERE commentID = ?", [commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID != undefined && parentID != undefined && childID == undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P WHERE C.commentID = P.parentID AND C.commentID = ? AND P.parentID = ?", [commentID, parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID == undefined && parentID != undefined && childID != undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P, childComment AS CC WHERE CC.childID = ? AND P.parentID = ? AND CC.childID = C.commentID AND P.parentID = C.commentID", [childID, parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID != undefined && parentID == undefined && childID != undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, childComment AS CC WHERE CC.childID = ? AND C.commentID = ? AND CC.childID = C.commentID", [childID, commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID == undefined && parentID == undefined && childID != undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, childComment AS CC WHERE CC.childID = ? AND CC.childID = C.commentID", [childID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID == undefined && parentID != undefined && childID == undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P WHERE P.parentID = ? AND P.parentID = C.commentID", [parentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
        
        else if(commentID != undefined && parentID != undefined && childID != undefined){
            mysqlHelper.sqlQuery("SELECT * FROM comment AS C, parentComment AS P, childComment AS CC WHERE CC.childID = ? AND P.parentID = ? AND C.commentID = ? AND CC.childID = C.commentID AND P.parentID = C.commentID", [childID, parentID, commentID], (err, objects) => { //callback function so that query loads before data is checked/sent back to user
    
                if(err != null){
                    return console.log("ERROR : " + err)
                }
    
                if(objects[0] == undefined){ //childComment did not match - childComment not in database
                    return res.send("Parent Comment ID is Incorrect")
                }
                
                var jsonObjects = []
                        
                rows.forEach(function(comment){
                        var commentObject = {
                            commentID: comment.commentID, 
                            authorUser: comment.authorUser, 
                            datePosted: comment.datePosted,
                            text: comment.text, 
                            counter: comment.counter}
    
                    jsonObjects.push(comment);
                })
    
                return res.send(JSON.stringify(jsonObjects)) //this sends all childComment objects
            });
        }
    })
    

})


router.get('/comment', jsonParser, (req, res) => {
	
	var postID = req.query.postID
	var parentID = req.query.parentID
	
	if(postID != undefined && parentID != undefined){ //NO QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM comments WHERE comments.commentID = (SELECT parentID FROM parentcomment WHERE postID = ?) OR (SELECT childID FROM childcomment WHERE parentID = ?)", [postID, parentID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
               rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(commentObject);
			   })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    } else if(postID != undefined && parentID == undefined){ //NO QUERY PARAMETERS
        console.log("querying using postID " + postID)
        mysqlHelper.sqlQuery("SELECT * FROM comments WHERE comments.commentID = (SELECT parentID FROM parentcomment WHERE postID = ?)", [postID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
               rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(commentObject);
			   })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }else if(postID == undefined && parentID != undefined){
        mysqlHelper.sqlQuery("SELECT * FROM comments WHERE comments.commentID = (SELECT childID FROM childcomment WHERE parentID = ?)", [parentID], (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)//ERROR!!!!!!!!!!!!!!!!!!!
            }
            else{
                var jsonObjects = []
                
               rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(commentObject);
			   })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    } else if(postID == undefined  && parentID == undefined){ //NO QUERY PARAMETERS
        mysqlHelper.sqlQuery("SELECT * FROM comments", null, (err, rows) => {
            if(err != null){
                return res.send("Error: " + err)
            }
            else{
                var jsonObjects = []
                
               rows.forEach(function(comment){
                    var commentObject = {
						commentID: comment.commentID, 
						authorUser: comment.authorUser, 
						datePosted: comment.datePosted,
						text: comment.text, 
						counter: comment.counter}

				jsonObjects.push(commentObject);
			   })

                return res.send(JSON.stringify(jsonObjects))
            }
        });
    }
})


module.exports = router //exports router out of this file 