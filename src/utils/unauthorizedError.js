const AppError = require("./appError");


class UnauthorizedError extends AppError{

    constructor(properties, resourse){
        super(`User is not Authorized `, 401)
    }
}

module.exports = UnauthorizedError;