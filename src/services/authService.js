const { findUser } = require("../repositories/userRepository")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig")

async function loginUser(authDetails) {
    const email = authDetails.email
    const plane_password = authDetails.password
    //console.log(authDetails);
    const user = await findUser({email})
    
    if(!user){
        throw{ message :"User not found", statusCode : 404}
    }

    const isPasswordValidated = await bcrypt.compare(plane_password, user.password)

    if(!isPasswordValidated){
        throw { message : "Invalid Password", statusCode : 401}
    }

    const userRole = user.role ? user.role : "USER";

    const token = jwt.sign({email : user.email, id : user.id, role: userRole},JWT_SECRET,{expiresIn : '1h'})
    return token;
}

module.exports = { 
    loginUser
}