class ApiError extends Error {
    constructor(statusCode, message, stack = '') {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            // V8 engine provides captureStackTrace to gather up the stack trace
            // 1st argument is used to inject the stack trace into object we want as .stack property
            // 2nd argument says exclude it from stack trace and anything after 
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

module.exports = ApiError;