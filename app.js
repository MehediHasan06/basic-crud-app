const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

//reference of express module
const app = express();

//parsing the json data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting with database
mongoose.connect(process.env.database_url , {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch((err) => console.log(err)); //Handles initial connection error
// To avoid unknown warnings, we use 'useNewUrlParser: true'.

const db = mongoose.connection;
// This is a coonnection holder. With this variable, we can handle the connection.

// when I'm connected with a database, below code block will let me know.
db.on('error', () => {
  console.log('> Error occurred from database...');
});
db.once('open', () => {
  console.log('> Database is connected successfully...');
});


// To have the routing of the /aliens page request.
app.use("/aliens", require("./routes/aliens.js")); 
// middleware for all the '/aliens' request will go to the 'alienRouter' variable.which holds the required files.


//server listener
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`> Server is running on port ${port}... `));
