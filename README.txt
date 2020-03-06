Start server by running - 

node server.js

- in the terminal. You can also use: -

nodemon server.js

- this will allow all changes made to the server.js file to automatically stop and restart the running server upon saving. You may need to run - 

npm install -g nodemon

- before being able to do this. I am not sure if the nodemon modules are included within the node_modules folder when you install all dependancies for the project. 

Start a MySQL local database instance on your computer, then go into the .env file and change all the environment variables to be correct based on your local instance. We will not have to worry about everybody doing this once we deploy to heroku, it must just be done presently while testing on local database instances. 