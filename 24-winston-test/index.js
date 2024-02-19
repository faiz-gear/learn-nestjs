import winston from 'winston'
import 'winston-daily-rotate-file'

// const logger = winston.createLogger({
//   level: 'debug',
//   // format: winston.format.simple(), // simple 格式
//   // format: winston.format.json(), // json 格式
//   // format: winston.format.prettyPrint(), // prettyPrint 格式 比json格式多一些空格
//   format: winston.format.combine(
//     // winston.format.colorize(), // 控制台输出带颜色
//     winston.format.label({ label: '标签' }), // 控制台输出格式
//     winston.format.timestamp(),
//     winston.format.json()
//   ), // 组合多种格式
//   transports: [
//     // 日志的输出方式
//     new winston.transports.Console({
//       format: winston.format.combine(winston.format.colorize(), winston.format.simple())
//     }), // 控制台输出
//     // new winston.transports.File({
//     //   dirname: 'log',
//     //   filename: 'test.log',
//     //   maxsize: 1024 // 1kb
//     // }) // 文件输出
//     new winston.transports.DailyRotateFile({
//       level: 'debug',
//       dirname: 'log2',
//       filename: 'application-%DATE%.log',
//       datePattern: 'YYYY-MM-DD-HH',
//       maxSize: '1k'
//     })
//   ]
// })

// logger.info(111)
// logger.error(222)
// logger.debug(333)

/* ------------------------------- 多个logger示例 ------------------------------- */
// winston.loggers.add('console', {
//   format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
//   transports: [new winston.transports.Console()]
// })

// winston.loggers.add('file', {
//   format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
//   transports: [
//     new winston.transports.File({
//       dirname: 'log4',
//       filename: 'test.log',
//       format: winston.format.json()
//     })
//   ]
// })

// const logger1 = winston.loggers.get('console')

// logger1.info('aaaaa')
// logger1.error('bbbbb')

// const logger2 = winston.loggers.get('file')

// logger2.info('xxxx')
// logger2.info('yyyy')
/* ------------------------------- 多个logger示例 ------------------------------- */

/* ------------------------------- 处理未捕获的错误日志 ------------------------------- */

// const logger = winston.createLogger({
//   level: 'debug',
//   format: winston.format.simple(),
//   transports: [new winston.transports.Console()],
//   exceptionHandlers: [
//     new winston.transports.File({
//       filename: 'error.log'
//     })
//   ]
// })

// throw new Error('xxx')

/* ------------------------------- 处理未捕获的错误日志 ------------------------------- */

/* ----------------------------- 捕获promise未捕获异常 ----------------------------- */
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
  rejectionHandlers: [
    new winston.transports.File({
      filename: 'rejection.log'
    })
  ]
})

;(async function () {
  throw Error('yyy')
})()

logger.info('光光光光光光光光光')
logger.error('东东东东东东东东')
logger.debug(66666666)
/* ----------------------------- 捕获promise未捕获异常 ----------------------------- */
