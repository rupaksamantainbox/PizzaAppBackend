const { loginUser } = require("../services/authService")

async function login(req,res){

    try {
        const loginPayload = req.body
        //console.log(loginPayload)
        const response = await loginUser(loginPayload)
        return res.status(200).json({
            success : true,
            message : "Logged in Successfully",
            data : response,
            error : {}
        })
    } catch (error) {
        return res.status(401).json({
            success : false,
            message : error.message,
            data : {},
            error : error
        })
    }
    
}

module.exports = {
    login
}