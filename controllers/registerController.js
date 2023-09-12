const asyncHandler = require('express-async-handler');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const Activity = require('../models/acitivityModel.js')

const setRegisterUser = asyncHandler(async (req, res) => {
    
    if(!req.body.name ){
        res.status(400)
        throw new Error('Please add name')
    }if(!req.body.email ){
        res.status(400)
        throw new Error('Please add email')
    }if(!req.body.password ){
        res.status(400)
        throw new Error('Please add password')
    }

   const {name, email, password} = req.body;

   let hashedPassword = await bcrypt.hash(password, 8);
  
    db.start.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword}, (error, result) => {
        if (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        } else {
        res.status(201).json({ message: 'User registered successfully' });
        }
    });
})

module.exports = setRegisterUser