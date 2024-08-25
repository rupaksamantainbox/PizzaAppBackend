const { loginUser } = require("../services/authService")
const { COOKIE_SECURE, FRONTEND_URL } = require("../config/serverConfig");

async function login(req, res) {
    
    try {
        const loginPayload = req.body;

        const response = await loginUser(loginPayload);

        res.cookie("authToken", response.token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        
        //console.log("Cookie from frontend", req.cookies);

        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            data: {
                userRole: response.userRole,
                userData: response.userData
            },
            error: {}
        })
    } catch(error) {
        return res.status(404).json({
            success: false,
            data: {},
            message: error.message,
            error: error
        })
    }

}

async function logout(req, res) {

    //console.log("Cookie from frontend", req.cookies);

    res.cookie("authToken", "", {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success: true,
        message: "Log out successfull",
        error: {},
        data: {}
    });
}

module.exports = {
    login,
    logout
}