const asyncHandler = require('express-async-handler');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const setLoginUser = asyncHandler(async (req, res) => {

    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400)
        }

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

    } catch (error) {
        console.log(error)
    }    
})

module.exports = setLoginUser