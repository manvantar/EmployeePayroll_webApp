const { createLogger, transports, format} =require('winston');
//const file=require('')
const logger =createLogger({
    transports:[
        new transports.File({
            filename: 'logger/info.logs',
            level:'info',
            format:format.combine(format.timestamp(),format.simple()) 
        })
    ],
    transports:[
        new transports.File({
            filename: 'logger/error.log',
            level:'error',
            format:format.combine(format.timestamp(),format.simple()) 
        })
    ],
})

module.exports=logger;