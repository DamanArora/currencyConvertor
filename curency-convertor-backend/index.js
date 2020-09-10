const app = require('./app');

let server;

console.log("INDEEEEEEEEEx js")

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server Closed');
            //process.exit(1);
        });
    } else {
        //process.exit(1);
    }
};

process.on('uncaughtException', (ex) => {
    console.error("FATAL ERROR: UNCAUGHT EXCEPTION\r\n" + ex.stack);
    exitHandler();
});

process.on('unhandledRejection', (ex) => {
    console.error("FATAL ERROR: UNHANDLED REJECTION\r\n" + ex.stack);
    exitHandler();
});

// For graceful shutdowns
process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});