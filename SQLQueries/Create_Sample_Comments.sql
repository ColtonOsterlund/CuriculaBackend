INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("1", "1", "2020-01-22", "How does this work", 3);
INSERT INTO parentComment(parentID, postID) VALUES ("1", "1");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("2", "3", "2020-01-22", "Idk lol", 1);
INSERT INTO childComment(childID, parentID) VALUES ("2", "1");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("3", "5", "2020-01-23", "Same", 0);
INSERT INTO childComment(childID, parentID) VALUES ("3", "1");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("4", "3", "2020-01-24", "cool", 0);
INSERT INTO childComment(childID, parentID) VALUES ("4", "1");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("5", "2","2020-02-18","Is there not a similar video?" ,21);
INSERT INTO parentComment(parentID, postID) VALUES ("5", "5");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("6", "6", "2020-02-19", "Yeah it just explains the concept slightly different", 3);
INSERT INTO childComment(childID, parentID) VALUES ("6", "5");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("7", "1", "2020-02-22", "This video is awesome!!!",4);
INSERT INTO childComment(childID, parentID) VALUES ("7", "5");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("8", "3", "2020-02-23", "I like math", 0);
INSERT INTO childComment(childID, parentID) VALUES ("8","5");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("9", "6", "2020-02-23", "I like Engineering!!!", 2);
INSERT INTO childComment(childID, parentID) VALUES ("9", "5");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("10", "5", "2020-02-21", "Is this a TA doing the video", 2);
INSERT INTO parentComment(parentID, postID) VALUES ("10", "7");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("11", "7", "2020-03-01", "Maybe", 0);
INSERT INTO childComment(childID, parentID) VALUES ("11", "10");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("12", "6", "2020-03-01", "Yes", 0);
INSERT INTO childComment(childID, parentID) VALUES ("12", "10");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("13", "6", "2020-03-04", "This is a good video", 7);
INSERT INTO parentComment(parentID, postID) VALUES ("13", "10");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("14", "7", "2020-03-05", "This is a parent comment", 100);
INSERT INTO parentComment(parentID, postID) VALUES ("14", "30");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("15", "4", "2020-03-05", "This is child comment 1/4", 1);
INSERT INTO childComment(childID, parentID) VALUES ("15", "14");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("16", "1", "2020-03-05", "This is child comment 2/4", 3);
INSERT INTO childComment(childID, parentID) VALUES ("16", "14");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("17", "2", "2020-03-05", "This is child comment 3/4", 10);
INSERT INTO childComment(childID, parentID) VALUES ("17", "14");
INSERT INTO comments(commentID, authorUser, datePosted, text, counter) VALUES ("18", "4", "2020-03-06", "This is child comment 4/4", 5);
INSERT INTO childComment(childID, parentID) VALUES ("18", "14");