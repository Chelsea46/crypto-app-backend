const express = require('express');
const router = express.Router();
const setRegisterUser = require('../controllers/registerController');
const setLoginUser = require('../controllers/loginController')
const isLoggedIn = require('../middleware/loggedIn')


router.post('/register', (req, res) => {
  setRegisterUser(req, res); 
});

// define router for user login
router.post('/login', isLoggedIn, (req, res) => {
    setLoginUser(req, res); 
})

module.exports = router;

