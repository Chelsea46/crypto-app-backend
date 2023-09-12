const express = require('express');
const router = express.Router();
const setRegisterUser = require('../controllers/registerController');
const setLoginUser = require('../controllers/loginController')

// define route for user registration
router.post('/register', (req, res) => {
  console.log('Received request:', req.body);
  // Call the controller function to handle the registration logic
  setRegisterUser(req, res); 
});

// define router for user login
router.post('/login', (req, res) => {
    console.log('Recieved request:', req.body);

    setLoginUser(req, res); 
})

module.exports = router;

