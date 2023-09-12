const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const { path } = require("express/lib/application");
dotenv.config({path:'./.env'});
const db = require("./config/db");
const app = express();



app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));

db.start.connect( (error) => {
    if(error){
        console.log(error);
    } else{
        console.log('MYSQL CONNECTED')
    }
})

// define routes
app.use('/auth', require('./routes/authRoutes'));  
  

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});