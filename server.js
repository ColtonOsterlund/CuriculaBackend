const express = require('express') //import express library
const morgan = require('morgan') //morgan used for logging requests on the server
const dotenv = require('dotenv') //used to configure the environment variables
const bodyParser = require('body-parser'); //used to parse json body requests
const jwt = require('jsonwebtoken') //used for web token authentication
const getRouter = require('./get.js')
const postRouter = require('./post.js')
const authenticationRouter = require('./authorization.js')
const comment_ms = require('./comment-microservice/')
const mysqlHelper = require('./MySQLHelper.js')
var cors = require('cors') //THIS IS SUPPOSED TO SOLVE CORS ISSUE BUT IS NOT WORKING - LOOK MORE INTO THIS


const server = express() //set server = to a new instance of express
//server.use(morgan('short')) //used for more basic logging
server.use(morgan('combined')) //used for more detailed logging
dotenv.config() //CONFIGURE ENVIRONMENT VARIABLES
server.use(bodyParser.json());
server.use(getRouter)
server.use(postRouter)
server.use(postRouter)
server.use(authenticationRouter.router)
server.use(cors()) //THIS IS SUPPOSED TO SOLVE CORS ISSUE BUT IS NOT WORKING - LOOK MORE INTO THIS
server.options('*', cors()) //cors preflight

// server.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Allow-Origin", "http://localhost:4200");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// });

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

const PORT = process.env.PORT || 3000 //use PORT environment variable (used by Heroku when we deploy) if available, if not - default to port 3000
server.listen(PORT, () => { //server listening on localhost:3002 for now - this will be changed upon deployment
    console.log("Server listening succesfully")

    //uncomment to test MySQL connection and create tables if not exists
    //mySQLConnectionTest();
    //mySQLCreateDatabaseTables();

    setInterval(function() { //clear blacklistedjwts table every hour



		mysqlHelper.sqlQuery("DELETE FROM blacklistedjwts WHERE deleteNext = ?", "1", (err, rows) => {


			if(err != null){
				console.log("Error deleting from blacklistedjwts table")
			}
			else{
				console.log("Success deleting from blacklistedjwts table")

				mysqlHelper.sqlQuery("SELECT * FROM blacklistedjwts WHERE deleteNext = ?", "0", (err, rows) => { //set all jwts blacklisted with deleteNext = 0 to deleteNext = 1

					if(err != null){
						console.log("Error setting deleteNext = 1 on jwts in blacklistedjwts table")
					}
					else{

						rows.forEach(function(jwt){


							mysqlHelper.sqlQuery("UPDATE blacklistedjwts SET deleteNext = ? WHERE jwt = ?", ["1", jwt["jwt"]], (err, rows) => { //set all jwts blacklisted with deleteNext = 0 to deleteNext = 1

								if(err != null){
									console.log("Error setting deleteNext = 1 on jwts in blacklistedjwts table")
								}
								else{
									console.log("Success setting deleteNext = 1 on jwts in blacklistedjwts table")
								}
						
							})

						})

					}
			
				})

			}
	
		})

	}, 3600 * 1000) //3600 seconds = 1h (x 1000 because it is measured in miliseconds)

})

