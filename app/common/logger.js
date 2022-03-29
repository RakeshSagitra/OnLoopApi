import winston from 'winston'
import fs from 'fs'
import { appConfig } from '../../config/appConfig'

require('winston-daily-rotate-file')

const {
  combine, timestamp, label, printf
} = winston.format

const logDir = 'logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logLevel = appConfig.get('log_level')
const maxSize = appConfig.get('logConfig.maxSize')
// maxFiles is set as 20d, it means after 10 days respective log files will be deleted.
const maxFiles = appConfig.get('logConfig.maxFiles')
const dirname = appConfig.get('logConfig.dirname')
// datePattern is set as YYYY-MM-DD-HH, it means we have different log files per day.
const datePattern = appConfig.get('logConfig.datePattern')
const zippedArchive = appConfig.get('logConfig.zippedArchive')
const environment = appConfig.get('env')

let transports = [
  new winston.transports.Console({
    level: logLevel,
    handleExceptions: true,
    json: true,
    colorize: true
  })
]

// Save the logs in production environment
if (environment === 'production') {
  transports = [
    new winston.transports.DailyRotateFile({
      filename: 'qlctr-%DATE%-combined.log',
      datePattern,
      zippedArchive,
      maxSize,
      maxFiles,
      dirname,
      level: logLevel,
      utc: true
    }),

    new winston.transports.DailyRotateFile({
      filename: 'qlctr-%DATE%-error.log',
      datePattern,
      zippedArchive,
      maxSize,
      maxFiles,
      dirname,
      level: 'error',
      utc: true
    }),

    ...transports
  ]
}

const customFormat = printf((info) => {
  let msg = `Process: ${process.pid} ${info.timestamp} [${info.label}] ${info.level}: `
  msg += info.logTitle
    ? `${info.logTitle} Message: ${info.message} `
    : info.message
  msg += info.class
    ? `class: ${
      typeof info.class === 'object' ? JSON.stringify(info.class) : info.class
    } `
    : ''
  msg += info.context
    ? `context: ${
      typeof info.context === 'object'
        ? JSON.stringify(info.context)
        : info.context
    } `
    : ''
  msg += info.metadata
    ? `metadata: ${
      typeof info.metadata === 'object'
        ? JSON.stringify(info.metadata)
        : info.metadata
    } `
    : ''
  msg += info.tagsCtx
    ? `tagsCtx: ${
      typeof info.tagsCtx === 'object'
        ? JSON.stringify(info.tagsCtx)
        : info.tagsCtx
    } `
    : ''
  msg += info.userCtx
    ? `userCtx: ${
      typeof info.userCtx === 'object'
        ? JSON.stringify(info.userCtx)
        : info.userCtx
    } `
    : ''
  msg += info.exceptionBacktrace
    ? `exceptionBacktrace: ${
      typeof info.exceptionBacktrace === 'object'
        ? JSON.stringify(info.exceptionBacktrace)
        : info.exceptionBacktrace
    } `
    : ''
  msg += info.fault
    ? `fault: ${
      typeof info.fault === 'object' ? JSON.stringify(info.fault) : info.fault
    } `
    : ''
  return msg
})

const format = combine(
  winston.format.colorize(),
  label({ label: appConfig.get('app.name') }),
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.prettyPrint(),
  customFormat
)

const logger = winston.createLogger({
  transports,
  exitOnError: false,
  format
})

export default class Logger {
  static info (logTitle, argHash) {
    this.log('info', logTitle, argHash)
  }

  static debug (logTitle, argHash) {
    this.log('debug', logTitle, argHash)
  }

  static error (logTitle, argHash) {
    this.log('error', logTitle, argHash)
  }

  static log (logType, logTitle, argHash) {
    const allArgs = { logTitle, ...argHash }
    const logMessage = this.buildMessage(allArgs)
    this.writeToLog(logType, logTitle, logMessage, argHash)
  }

  static writeToLog (logType, logTitle, logMessage, argHash) {
    if (argHash && ['start', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](
        this.generateWrapStr(logTitle, 'START', argHash.extraData)
      )
    } else if (argHash && ['end', 'around'].indexOf(argHash.wrap) !== -1) {
      logger[logType](
        this.generateWrapStr(logTitle, 'END', argHash.extraData)
      )
    } else {
      logger[logType](logMessage)
    }
  }

  static generateWrapStr (logTitle, separatorType, extraData) {
    return `${separatorType}${'-'.repeat(
      5
    )}${logTitle.toUpperCase()}${'-'.repeat(5)}${
      extraData ? `${extraData}${'-'.repeat(5)}` : ''
    }${separatorType}`
  }

  static buildMessage (logAttrs) {
    const msg = [`${logAttrs.logTitle}`]
    if (logAttrs.klass) {
      msg.push('Class:', logAttrs.klass.name, ',')
    }
    if (logAttrs.message) {
      msg.push('Message:', logAttrs.message, ',')
    }
    if (logAttrs.context) {
      msg.push('Context:', logAttrs.context, ',')
    }
    if (logAttrs.metadata) {
      msg.push('Metadata:', logAttrs.metadata, ',')
    }
    if (logAttrs.tagCtx) {
      msg.push('TagsCtx:', logAttrs.tagCtx, ',')
    }
    if (logAttrs.userCtx) {
      msg.push('UserCtx:', logAttrs.userCtx, ',')
    }
    if (logAttrs.exception) {
      msg.push('ExceptionBacktrace:', logAttrs.exception.stack, ',')
    }
    if (logAttrs.fault) {
      msg.push('Fault:', logAttrs.fault, ',')
    }
    return msg
  }
}
