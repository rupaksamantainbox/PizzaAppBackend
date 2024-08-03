const User = require('../schema/userSchema');

async function findUser(parameters){
    console.log(parameters)
    try {  
        const response = await User.findOne({...parameters})
        //console.log(response)
        return response
    }
    catch (error) {
        console.log(error)
    }
}
    
async function createUser(userDetails){
    
    try {   
        const response = await User.create(userDetails)
        return response
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    findUser,
    createUser
};