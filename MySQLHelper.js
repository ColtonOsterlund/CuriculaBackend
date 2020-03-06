const mysql = require('mysql') //used to connect with a MySQL database
const dotenv = require('dotenv') //used to configure the environment variables
dotenv.config() //CONFIGURE ENVIRONMENT VARIABLES

function sqlQuery(query, arguments, callback){
    getConnection().query(query, arguments, (err, rows, fields) => {

        if(err != null){
            callback(err, null)
        }
        
        callback(null, rows)
    })
}

const pool = mysql.createPool({ //connection pool 
    connectionLimit: 10,
    //change these environment variables to what you need to connect to your own localhost version of the testing database for now (until we deploy) in the .env file
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB
})

function getConnection(){
    return pool
}

module.exports.sqlQuery = sqlQuery;
module.exports.pool = pool;
module.exports.getConnection = getConnection;