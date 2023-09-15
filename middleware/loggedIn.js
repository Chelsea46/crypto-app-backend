const isLoggedIn = async(req, res, next) => {
   console.log(res)
    next();
}

module.exports = isLoggedIn;