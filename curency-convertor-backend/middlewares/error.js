const httpStatus = require('http-status-codes');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus.getStatusText(statusCode);
        error = new ApiError(statusCode, message, err.stack);
    }
    next(err);
}

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    console.error(err.stack);

    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler
}