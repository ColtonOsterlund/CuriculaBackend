DELIMITER $$
 
CREATE PROCEDURE CreateCommentTables()
BEGIN
  
  CREATE TABLE IF NOT EXISTS comments (
commentID VARCHAR(128),
authorUser VARCHAR(128),
datePosted DATE,
text VARCHAR(500),
counter INT,
PRIMARY KEY(commentID)
);

CREATE TABLE IF NOT EXISTS parentComment (
parentID VARCHAR(128),
FOREIGN KEY(parentID) REFERENCES comments(commentID)
);

CREATE TABLE IF NOT EXISTS childComment (
childID VARCHAR(40),
parentID VARCHAR(128),
FOREIGN KEY(childID) REFERENCES comments(commentID), 
FOREIGN KEY(parentID) REFERENCES parentComment(parentID)
);
  
END $$
 
DELIMITER ;

CALL CreateCommentTables();