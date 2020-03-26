//file for all encryption

const express = require('express')
const dotenv = require('dotenv') //used to configure the environment variables
dotenv.config() //CONFIGURE ENVIRONMENT VARIABLES
const crypto = require('crypto')
var cors = require('cors')

const router = express.Router()

router.use(cors()) //THIS IS SUPPOSED TO SOLVE CORS ISSUE BUT IS NOT WORKING - LOOK MORE INTO THIS
router.options('*', cors()) //cors preflight

// create application/json parser
var jsonParser = bodyParser.json()


function encrypt(text){
	var cipher = crypto.createCipher('aes-256-ctr', process.env.ENCRYPTION_KEY) //need to add an encryption key to Heroku environment vars - this same encryption key needs to be saved on the front end
	var crypted = cipher.update(text, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
 }

 function decrypt(text){
	 var decipher = crypto.createDecipher('aes-256-ctr', process.env.ENCRYPTION_KEY) //need to add an encryption key to heroku environment vars - this same encryption key needs to be saved on the front end
	 var dec = decipher.update(text, 'hex', 'utf8')
	 dec += decipher.final('utf8')
	 return dec
 }


 module.exports.encrypt = encrypt;
 module.exports.decrypt = decrypt; 