const {promisify} = require("util");
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const isLoggedIn = async(req, res, next) => {
    console.log('middleware is logged in')
   console.log(req.cookies)
   if(req.cookies.jwt){
    try {
        // step 1. verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,
            process.env.JWT_SECRET
        );
        console.log(decoded);
        
        // step 2. check if user still exists
        db.start.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, result) => {
            console.log(result);
            if(!result){
                return next();
            }
            req.user = result[0];
            return next();
        });

    } catch (error) {
        console.log(error);
        return next();
    }
   } else{
       next();
   }
}

module.exports = isLoggedIn;