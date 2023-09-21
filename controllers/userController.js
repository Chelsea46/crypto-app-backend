const asyncHandler = require('express-async-handler');
const db = require('../config/db');


const userController = asyncHandler(async (req, res) => {
    
    if(req.user?.name){
        res.status(200).json({ success: true, token: req.cookies.jwt, user: {name: req.user.name, userEmail: req.user.email, id: req.user.id}});
    }
})

module.exports = userController