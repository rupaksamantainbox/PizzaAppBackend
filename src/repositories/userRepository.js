const User = require('../schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');

async function findUser(parameters){
//console.log(parameters)
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
        if(error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        } 
        console.log(error);
        throw new InternalServerError();
    }
}

module.exports = {
    findUser,
    createUser
};