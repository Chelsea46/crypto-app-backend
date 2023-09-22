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
            db.start.query('SELECT * FROM users WHERE email = ?', [email], async(error, result) => {
                if(!result || !(await bcrypt.compare(password, result[0].password))){
                    res.status(401)
                    console.log('email or password incorrect')
                }else{
                    const id = result[0].id;
                    const name = result[0].name;
                    const userEmail = result[0].email;

                    const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN
                    });

                    const cookieOptions = {
                        expires: new Date(
                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                        ),
                        httpOnly: true,
                    };
                    
                        res.cookie('jwt', token, cookieOptions);

                        res.status(200).json({ success: true, token, user: {name, userEmail, id}});
                }
            });
        }
    });
})

module.exports = setRegisterUser