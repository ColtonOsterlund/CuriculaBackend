DELIMITER $$
 
CREATE PROCEDURE CreateEventTables()
BEGIN
  
CREATE TABLE IF NOT EXISTS comment_event (
event_id VARCHAR(128),
comment_id VARCHAR(128),
author_user_id VARCHAR(128),
date_posted DATE,
body VARCHAR(500),
comment_level INT,
parent_comment_id VARCHAR(128),
PRIMARY KEY(event_id)
);

CREATE TABLE IF NOT EXISTS vote_event (
event_id VARCHAR(128),
comment_id VARCHAR(128),
author_user_id VARCHAR(128),
date_posted DATE,
vote INT,
PRIMARY KEY(event_id)
);
  
END $$
 
DELIMITER ;

CALL CreateEventTables();