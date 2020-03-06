DELIMITER $$
 
CREATE PROCEDURE CreateTables()
BEGIN
  
  CREATE TABLE IF NOT EXISTS school (
schoolName VARCHAR(40),
schoolID VARCHAR(128),
PRIMARY KEY(schoolID)
);

CREATE TABLE IF NOT EXISTS program (
programName VARCHAR(40),
programID VARCHAR(128), 
PRIMARY KEY(programID)
);

CREATE TABLE IF NOT EXISTS topicTag (
tagName VARCHAR(40),
tagID VARCHAR(128),
PRIMARY KEY(tagID)
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
schoolID VARCHAR(128),
PRIMARY KEY(userID),
FOREIGN KEY(schoolID) REFERENCES school(schoolID)
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
programID VARCHAR(128),
courseID VARCHAR(128),
PRIMARY KEY(programID, courseID),
FOREIGN KEY(programID) REFERENCES program(programID),
FOREIGN KEY(courseID) REFERENCES course(courseID)
);

CREATE TABLE IF NOT EXISTS contentRelTag(
contentID VARCHAR(128),
tagid VARCHAR(128),
PRIMARY KEY(contentID, tagID),
FOREIGN KEY(contentID) REFERENCES content(videoID),
FOREIGN KEY(tagID) REFERENCES topicTag(tagID)
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
programID VARCHAR(128),
PRIMARY KEY(userID, programID),
FOREIGN KEY(userID) REFERENCES user(userID),
FOREIGN KEY(programID) REFERENCES program(programID)
);

CREATE TABLE IF NOT EXISTS userRelMinor(
userID VARCHAR(128),
programID VARCHAR(128),
PRIMARY KEY(userID, programID),
FOREIGN KEY(userID) REFERENCES user(userID),
FOREIGN KEY(programID) REFERENCES program(programID)
);

CREATE TABLE IF NOT EXISTS schoolRelProgram(
schoolID varchar(128),
programID varchar(128),
PRIMARY KEY(schoolID, programID),
FOREIGN KEY(schoolID) REFERENCES school(schoolID),
FOREIGN KEY(programID) REFERENCES program(programID)
);

CREATE TABLE IF NOT EXISTS schoolRelCourse(
schoolID varchar(128),
courseID varchar(128),
PRIMARY KEY(schoolID, courseID),
FOREIGN KEY(schoolID) REFERENCES school(schoolID),
FOREIGN KEY(courseID) REFERENCES course(courseID) 
);
  
END $$
 
DELIMITER ;