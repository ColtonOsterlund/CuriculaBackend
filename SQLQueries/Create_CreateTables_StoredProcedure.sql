DELIMITER $$
 
CREATE PROCEDURE CreateTables()
BEGIN
  
  CREATE TABLE IF NOT EXISTS school (
schoolName VARCHAR(40),
PRIMARY KEY(schoolName)
);

CREATE TABLE IF NOT EXISTS program (
programName VARCHAR(40) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS topicTag (
tagName VARCHAR(40),
PRIMARY KEY(tagName)
);

CREATE TABLE IF NOT EXISTS course (
courseName VARCHAR(40),
courseID VARCHAR(128),
courseLevel INTEGER,
PRIMARY KEY(courseID)
);

CREATE TABLE IF NOT EXISTS user (
userName VARCHAR(40),
userID VARCHAR(128),
firstName VARCHAR(40),
lastName VARCHAR(40),
email VARCHAR(40),
password VARCHAR(40),
schoolName VARCHAR(40),
PRIMARY KEY(userID),
FOREIGN KEY(schoolName) REFERENCES school(schoolName)
);

CREATE TABLE IF NOT EXISTS content(
videoID VARCHAR(128),
videoLink VARCHAR(128),
description VARCHAR(128),
datePosted DATE,
relatedCourseID VARCHAR(128),
verifiedFlag INTEGER,
posterID VARCHAR(128),
PRIMARY KEY(videoID),
FOREIGN KEY(relatedCourseID) REFERENCES course(courseID),
FOREIGN KEY(posterID) REFERENCES user(userID)
);

CREATE TABLE IF NOT EXISTS programRelCourse(
programName VARCHAR(40),
courseID VARCHAR(128),
PRIMARY KEY(programName, courseID),
FOREIGN KEY(programName) REFERENCES program(programName),
FOREIGN KEY(courseID) REFERENCES course(courseID)
);

CREATE TABLE IF NOT EXISTS contentRelTag(
contentID VARCHAR(128),
tagName VARCHAR(40),
PRIMARY KEY(contentID, tagName),
FOREIGN KEY(contentID) REFERENCES content(videoID),
FOREIGN KEY(tagName) REFERENCES topicTag(tagName)
);

CREATE TABLE IF NOT EXISTS courseRelEquivalentCourse(
courseID VARCHAR(128),
relatedCourseID VARCHAR(128),
PRIMARY KEY(courseID, relatedCourseID),
FOREIGN KEY(courseID) REFERENCES course(courseID),
FOREIGN KEY(relatedCourseID) REFERENCES course(courseID)
);

CREATE TABLE IF NOT EXISTS userRelMajor(
userID VARCHAR(128),
programName VARCHAR(40),
PRIMARY KEY(userID, programName),
FOREIGN KEY(userID) REFERENCES user(userID),
FOREIGN KEY(programName) REFERENCES program(programName)
);

CREATE TABLE IF NOT EXISTS userRelMinor(
userID VARCHAR(128),
programName VARCHAR(40),
PRIMARY KEY(userID, programName),
FOREIGN KEY(userID) REFERENCES user(userID),
FOREIGN KEY(programName) REFERENCES program(programName)
);

CREATE TABLE IF NOT EXISTS schoolRelProgram(
schoolName varchar(40),
programName varchar(40),
PRIMARY KEY(schoolName, programName),
FOREIGN KEY(schoolName) REFERENCES school(schoolName),
FOREIGN KEY(programName) REFERENCES program(programName)
);
  
END $$
 
DELIMITER ;