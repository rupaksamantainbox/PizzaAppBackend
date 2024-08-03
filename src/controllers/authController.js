const { loginUser } = require("../services/authService")

async function login(req,res){

    try {
        const loginPayload = req.body
        const response = await loginUser(loginPayload)

        res.cookie("authToken", response, {
            httpOnly : true,
            secure : true,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

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

async function logout(req, res){
    res.cookie("authToken", "")
    return res.status(200).json({
        success : true,
        message : "Logout Successfully",
        error : {},
        data : {}
    })
}

module.exports = {
    login,
    logout
}