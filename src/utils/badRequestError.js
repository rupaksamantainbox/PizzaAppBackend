const AppError = require("./appError");


class BadRequestError extends AppError{

    constructor(invalidParams){

        let message = "";
        invalidParams.forEach(params => message += `${params} , `)
        super(`The request are following Invalid Parameters ${invalidParams}`, 400)
    }
}

module.exports = BadRequestError