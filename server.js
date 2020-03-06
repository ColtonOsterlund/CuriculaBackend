const express = require('express') //import express library
const morgan = require('morgan') //morgan used for logging requests on the server
const dotenv = require('dotenv') //used to configure the environment variables
const bodyParser = require('body-parser'); //used to parse json body requests
const jwt = require('jsonwebtoken') //used for web token authentication
const getRouter = require('./get.js')
const postRouter = require('./post.js')
const mysqlHelper = require('./MySQLHelper.js')


const server = express() //set server = to a new instance of express
//server.use(morgan('short')) //used for more basic logging
server.use(morgan('combined')) //used for more detailed logging
dotenv.config() //CONFIGURE ENVIRONMENT VARIABLES
server.use(bodyParser.json());
server.use(getRouter)
server.use(postRouter)


function mySQLConnectionTest(){
    mysqlHelper.sqlQuery("CREATE TABLE TEST(test VARCHAR(40))", null, (err, rows) => {
        if(err != null){
            console.log("Error creating test table in DB: " + err)
        }
        else{
            mysqlHelper.sqlQuery("DROP TABLE TEST", null, (err, rows) => {
                 if(err != null){
                     console.log("Error dropping test table in DB: " + err)
                 }
                 else{
                     console.log("Successfully created and dropped test table in DB")
                 }
             })
        }
    })
}

function mySQLCreateDatabaseTables(){
    mysqlHelper.sqlQuery("CALL CreateTables();", null, (err, rows) => {
        if(err != null){
            console.log("Error while calling CreateTables() stored procedure in database: " + err)
        }
    })
}


const PORT = process.env.PORT || 3000 //use PORT environment variable (used by Heroku when we deploy) if available, if not - default to port 3000
server.listen(PORT, () => { //server listening on localhost:3002 for now - this will be changed upon deployment
    console.log("Server listening succesfully")

    //uncomment to test MySQL connection and create tables if not exists
    //mySQLConnectionTest();
    //mySQLCreateDatabaseTables();

})

