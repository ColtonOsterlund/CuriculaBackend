//file for all authorization

const express = require('express')
const mysqlHelper = require('./MySQLHelper.js')
var bodyParser = require('body-parser')
const dotenv = require('dotenv') //used to configure the environment variables
dotenv.config() //CONFIGURE ENVIRONMENT VARIABLES
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()


function authorizeUser(req, res, next){

	 const token = req.header('auth-token')
	 if(!token){
		return res.send("Access Denied")
	 }
	 
	 try{
		 const verified = jwt.verify(token, process.env.TOKEN_SECRET)
		 
		 mysqlHelper.sqlQuery("SELECT * FROM blacklistedjwts WHERE jwt = ?", token, (err, rows) => {

			console.log(rows[0])

			if(err != null){ 
				console.log("error case")
				return res.send("Access Denied")
			}	
			else if(rows[0] != undefined){
				console.log("rows undefined case")
				return res.send("Invalid Token")
			}
			else{
				req.user = verified //this sets req.user to the payload id from the JWT - this is to identify which user is making the request
				next() //proceed to the next middleware in the route
			}		
		})

	 }catch(err){
		 return res.send("Invalid Token")
	 }
 }


router.get("/user/authenticate", jsonParser, authorizeUser, (req, res) => {
	//sends back "Access Denied" if JWT is not valid/null and "Authenticated" if JWT is valid
	res.send("Authenticated")
})

router.post('/user/register', jsonParser, (req, res) => { 
	console.log(req.body)

	var username = req.body.username
    var email = req.body.email
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var majorProgramID = req.body.majorProgramID
    var minorProgramID = req.body.minorProgramID
    var schoolID = req.body.schoolID
	var hashedPassword = bcrypt.hashSync(req.body.password, 10, function(err, hash){
		if(err){
			console.log("error while hashing password: " + err)
			return res.send(err)	
		}
	})
	//use hashSync so that it is synchronous and finished the hash before the next code executes - implements a callback function itself
    
    
    var userID = uuid.v4();

	mysqlHelper.sqlQuery("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, objects) => {

		if(err){
			res.send("Server Error")
			return
		}

		if(objects[0] != undefined){
			res.send("Username or Email has Already Been Used")
			return
		}
		else{
			//save user to database
			mysqlHelper.sqlQuery("INSERT INTO user (username, email, password, userID, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?)", [username, email, hashedPassword, userID, firstName, lastName], (err, objects) =>{ //TODO: CHANGE THIS TO MATCH OUR DATABASE SCHEMA
				if(err){
					res.send("Server Error")
					return
                }
                
                if(schoolID != undefined){
                    mysqlHelper.sqlQuery("INSERT INTO schoolRelUser(userID, schoolID) VALUES (?, ?)", [userID, schoolID], (err, objects) =>{
                        if(err){
                            res.send("Server Error")
                            return
                        }
                    })
                }

                if(majorProgramID != undefined){
                    mysqlHelper.sqlQuery("INSERT INTO userRelMajor(userID, programID) VALUES (?, ?)", [userID, majorProgramID], (err, objects) =>{
                        if(err){
                            res.send("Server Error")
                            return
                        }
        
                    })
                }

                if(minorProgramID != undefined){
                    mysqlHelper.sqlQuery("INSERT INTO userRelMinor(userID, programID) VALUES (?, ?)", [userID, minorProgramID], (err, objects) =>{
                        if(err){
                            res.send("Server Error")
                            return
                        }
        
                    })
                }

                var jsonObjects = []
                
                var registrationObject = {
                    userUUID: userID
                }
                
                jsonObjects.push(registrationObject);
                
                return res.send(JSON.stringify(jsonObjects)) //this sends back the UUID
			})
		}
	})
	
 })


router.post('/user/login', jsonParser, (req, res) => {
	
	var email = req.body.email
	var password = req.body.password
	var token = null


	var object = mysqlHelper.sqlQuery("SELECT * FROM user WHERE email = ?", [email], (err, objects) => { //callback function so that query loads before data is checked/sent back to user

		//console.log(objects[0])

		if(err != null){
			//console.log("got here 1")
			//res.send("Server Error")
			return console.log("ERROR : " + err)
		}

		if(objects[0] == undefined){ //email did not match - user not in database
			//console.log("got here 2")
			return res.send("Username or Password is Incorrect")
		}
		
		bcrypt.compareSync(password, objects[0].password, function(err, res){ //compares password sent with hashed password in database
			if(err){
				return res.send("error comparing password with stored hashed password: " + err)
			}
			else if(res != null){
				//passwords match
			}
			else{
				//passwords dont match
				return res.send("Username or Passoword is Incorrect")
			}
		})
	
		//at this point it will have been returned if the login was not succesful
		//res.send("logged in")
	
		//console.log("got here 4")

		//create and assign JWT
        token = jwt.sign({_id: objects[0].userID}, process.env.TOKEN_SECRET, {expiresIn: '1h'}) //change the id from username to the userID
        
        var jsonObjects = []

        var loginObject = {
            userUUID: objects[0].userID,
            jwt: token
        }

        jsonObjects.push(loginObject);

        return res.send(JSON.stringify(jsonObjects)) //this sends back the UUID

	})

 })

router.post('/user/logout', jsonParser, authorizeUser, (req, res) => {
	
	const token = req.header("auth-token")

	mysqlHelper.sqlQuery("INSERT INTO blacklistedjwts (jwt, deleteNext) VALUES (?, ?)", [token, "0"], (err, rows) => {
		if(err != null){
			return res.send(err)
		}
		else{
			return res.send("Success")
		}
	})

 })


 module.exports.router = router;
 module.exports.authorizeUser = authorizeUser;