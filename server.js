const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });
const db = require("./config/db");
const app = express();

const corsOptions = {
    origin: 'https://chelsea-cryptoapp.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    
};
  
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());


db.start.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('MYSQL CONNECTED')
    }
})

const createTableQuery = `
CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
) 
`;

connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Table created successfully');
    }

    connection.end(); 
  });


// Define routes
app.use('/auth', require('./routes/authRoutes'));

app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});
