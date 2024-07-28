const AppError = require("./appError");


class NotFoundError extends AppError{

    constructor(properties, resourse){
        super(`Not able to find ${resourse} `, 404)
    }
}

module.exports = NotFoundError