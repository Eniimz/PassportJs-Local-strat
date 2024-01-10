
const isAuth = (req, res, next) => {
   if(req.isAuthenticated()){
    next()
   }
   else{
    res.send("<h1> You are not Authenticated as a user for this route. </h1>");
   }
}

const isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.admin){
        next()
       }
    else{
        res.send("<h1> You are not Authenticated as an admin for this route. </h1>");
   }
}

module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;