const { registerUser } = require("../services/userService");

async function createUser(req,res){
    
    try {
        const response = await registerUser(req.body)
       //console.log(response);
        console.log('Successfully added User');
        return res.json({
            message : 'Successfully added User',
            success : true,
            data : response,
            error : {}
        })

    } catch (error) {
        return res.json({
            message : error.reason,
            success : false,
            data : {},
            error : error
        })
    }

    
}

module.exports = {
    createUser
}