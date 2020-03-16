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


function authorizeUser(req, res, next) {

	const token = req.header('auth-token')
	if (!token) {
		return res.status(401).json([{message: "Access Denied"}]);
	}

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET)

		mysqlHelper.sqlQuery("SELECT * FROM blacklistedjwts WHERE jwt = ?", token, (err, rows) => {

			console.log(rows[0])

			if (err != null) {
				console.log("error case")
				return res.status(401).json([{message: "Access Denied"}])
			}
			else if (rows[0] != undefined) {	//TODO this should be "=="?
				console.log("rows undefined case")
				return res.status(400).json([{message: "Invalid Token"}])
			}
			else {
				req.user = verified //this sets req.user to the payload id from the JWT - this is to identify which user is making the request
				next() //proceed to the next middleware in the route
			}
		})

	} catch (err) {
		return res.status(400).json([{message: "Invalid Token"}])
	}
}

function authorizeUserTesting(req, res, next) {
	req.user = req.body.user
	next()
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
	var hashedPassword = bcrypt.hashSync(req.body.password, 10, function (err, hash) {
		if (err) {
			console.log("error while hashing password: " + err)
			return res.json([{error: err}])
		}
	})
	//use hashSync so that it is synchronous and finished the hash before the next code executes - implements a callback function itself


	var userID = uuid.v4();

	mysqlHelper.sqlQuery("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, objects) => {

		if (err) {
			res.json([{message: "Server Error"}])
			return
		}

		if (objects[0] != undefined) {
			res.json([{message: "Username or Email has Already Been Used"}])
			return
		}
		else {

			if(schoolID == undefined){
				schoolID = null; //so that it sets null in teh db
			}
			if(majorProgramID == undefined){
				majorProgramID = null; //so that it sets null in the db
			}
			if(minorProgramID == undefined){
				minorProgramID = null; //so that it sets null in teh db
			}

			//save user to database
			mysqlHelper.sqlQuery("INSERT INTO user (username, email, password, userID, firstName, lastName) VALUES (?, ?, ?, ?, ?, ?);", [username, email, hashedPassword, userID, firstName, lastName], (err, objects) => { //TODO: CHANGE THIS TO MATCH OUR DATABASE SCHEMA
				if (err) {
					res.status(501).json([{message: "Server Database Query Error"}])
					return
				}
				else{
									
                    mysqlHelper.sqlQuery("INSERT INTO schoolRelUser(userID, schoolID) VALUES (?, ?)", [userID, schoolID], (err, objects) =>{
                        if(err){
                            res.json([{message: "Server Error: " + err}])
                            return
						}
						else{
							mysqlHelper.sqlQuery("INSERT INTO userRelMajor(userID, majProgramID) VALUES (?, ?)", [userID, majorProgramID], (err, objects) =>{
								if(err){
									res.json([{message: "Server Error: " + err}])
									return
								}
								else{
									mysqlHelper.sqlQuery("INSERT INTO userRelMinor(userID, minProgramID) VALUES (?, ?)", [userID, minorProgramID], (err, objects) =>{
										if(err){
											res.json([{message: "Server Error: " + err}])
											return
										}
										else{
											var jsonObjects = []
					
											var registrationObject = {
												userUUID: userID
											}
											
											jsonObjects.push(registrationObject);
											
											return res.header('user-uuid', userID).send(JSON.stringify(jsonObjects)) //this sends back the UUID
										}
									})
								}
							})
						}

                    })
				}
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

		if (err != null) {
			//console.log("got here 1")
			console.log("ERROR : " + err)
			return res.json([{message: "Server Error"}])
		}

		if (objects[0] == undefined) { //email did not match - user not in database
			//console.log("got here 2")
			return res.json([{message: "Username or Password is Incorrect"}])
		}

		bcrypt.compareSync(password, objects[0].password, function (err, res) { //compares password sent with hashed password in database
			if (err) {
				return res.json([{message: "error comparing password with stored hashed password: " + err}])
			}
			else if (res != null) {
				//passwords match
			}
			else {
				//passwords dont match
				return res.json([{message: "Username or Password is Incorrect"}])
			}
		})

		//at this point it will have been returned if the login was not succesful
		//res.send("logged in")

		//console.log("got here 4")

		//create and assign JWT
		token = jwt.sign({ _id: objects[0].userID }, process.env.TOKEN_SECRET, { expiresIn: '1h' }) //change the id from username to the userID

		var jsonObjects = []

		var loginObject = {
			userUUID: objects[0].userID,
			jwt: token
		}

		jsonObjects.push(loginObject);

		res.header('user-uuid', objects[0].userID)
		res.header('auth-token', token)
		return res.send(JSON.stringify(jsonObjects)) //this sends back the UUID

	})

})

router.post('/user/logout', jsonParser, authorizeUser, (req, res) => {

	var token = req.header("auth-token")

	mysqlHelper.sqlQuery("INSERT INTO blacklistedjwts (jwt, deleteNext) VALUES (?, ?)", [token, "0"], (err, rows) => {
		if (err != null) {
			return res.json([{message: err}])
		}
		else {
			return res.json([{message: "Success"}])
		}
	})

})

router.get('/user/user-profile', jsonParser, authorizeUser, (req, res) => {

	var userID = req.header("user-id")

	mysqlHelper.sqlQuery("SELECT * FROM user AS U, userRelMajor AS URELMAJ, userRelMinor AS URELMIN, schoolRelUser AS SCHRELU WHERE U.userID = ? AND URELMAJ.userID = ? AND URELMIN.userID = ? AND SCHRELU.userID = ?", [userID, userID, userID, userID], (err, objects) => {
		if (err != null) {
			return res.json([{message: err}])
		}
		else {
			var jsonObjects = []

			var userObject = {
				userUUID: objects[0].userID,
				userName: objects[0].userName,
				firstName: objects[0].firstName,
				lastName: objects[0].lastName,
				email: objects[0].email,
				majProgramID: objects[0].majProgramID,
				minProgramID: objects[0].minProgramID,
				schoolID: objects[0].schoolID
			}

			jsonObjects.push(userObject);

			return res.send(JSON.stringify(jsonObjects)) //this sends back the UUID
		}
	})

})



module.exports.router = router;
module.exports.authorizeUser = authorizeUser;