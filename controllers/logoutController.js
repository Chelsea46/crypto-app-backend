const asyncHandler = require('express-async-handler');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logout = asyncHandler(async (req, res) => {
    res.cookie('jwt', 'logout',{
    expires: new Date(Date.now() + 2*1000),
    httpOnly: true
   });

   res.status(200).json({ success: true})
})

module.exports = logout