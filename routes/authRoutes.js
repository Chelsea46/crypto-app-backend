const express = require('express');
const router = express.Router();
const setRegisterUser = require('../controllers/registerController');
const setLoginUser = require('../controllers/loginController');
const isLoggedIn = require('../middleware/loggedIn');
const userController = require('../controllers/userController');
const logout = require('../controllers/logoutController');
const deleteUser = require('../controllers/deleteController');



router.post('/register', (req, res) => {
  setRegisterUser(req, res); 
});

// define router for user login
router.post('/login', (req, res) => {
    setLoginUser(req, res); 
})

router.get('/checkLogin', isLoggedIn, userController);

router.get('/logout', logout);

router.delete('/delete/:id', deleteUser);

module.exports = router;

