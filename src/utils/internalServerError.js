const AppError = require("./appError");


class InternalServerError extends AppError{

    constructor(properties){

        super(`Something Went Wrong `, 404)
    }
}

module.exports = InternalServerError