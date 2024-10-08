const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
const UnauthorizedError = require('../utils/unauthorizedError')

async function isLoggedIn(req, res, next){

    const token = req.cookies['authToken']
    //console.log("AUth")
    //console.log(req.cookies);

    if(!token){
        return res.status(401).json({
            success : false,
            data : {},
            error : "Authentication Failed",
            message : "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        
        if(!decoded){
            throw new UnauthorizedError();
        }
        req.user = {
            email : decoded.email,
            id : decoded.id,
            role : decoded.role
        }
        next()
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            res.cookie("authToken", "", {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({
                success: true,
                message: "Log out successfull",
                error: {},
                data: {}
            });
        }
        return res.status(401).json({
            success : false,
            data : {},
            error : error,
            message : "Invalid token provided"
        });
    }
}

async function isAdmin(req,res,next){
    const loggedInUser = req.user;
    if(loggedInUser.role == "ADMIN"){
        console.log("User is Admin")
        next()
    }else{
        res.status(401).json({
            success : false,
            data : {},
            message : "You are not Authorized",
            error : {
                statusCode : 401,
                reason : "Unauthorized User"
            }
        })
    }
    
}

module.exports = {
    isLoggedIn,
    isAdmin
}