const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.File(
            {
                filename: 'logger/info.log',
                format: format.combine(format.timestamp(), format.simple())
            })
    ],
})

module.exports = logger;