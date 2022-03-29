import convict from 'convict'
import { resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(__dirname, '../.env') })

export const appConfig = convict({
  app: {
    name: {
      doc: 'OnLoop',
      format: String,
      default: 'OnLoop'
    }
  },
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 4000,
    env: 'PORT'
  },
  log_level: {
    doc: 'level of logs to show',
    format: String,
    default: 'debug',
    env: 'LOG_LEVEL'
  },
  logConfig: {
    maxSize: {
      default: '50m',
      env: 'WINSTON_LOG_MAX_SIZE'
    },
    maxFiles: {
      default: '10d',
      env: 'WINSTON_MAX_FILES_DURATION'
    },
    dirname: {
      default: 'logs',
      env: 'WINSTON_LOG_DIR'
    },
    datePattern: {
      default: 'YYYY-MM-DD-HH',
      env: 'WINSTON_FILE_NAME_DATE_PATTERN'
    },
    zippedArchive: {
      default: true,
      env: 'WINSTON_ZIPPED_ARCHIVE'
    }
  },
  firebase: {
    apiKey: {
      default: '',
      env: 'FIREBASE_API_KEY'
    },
    authDomain: {
      default: '',
      env: 'FIREBASE_AUTH_DOMAIN'
    },
    projectId: {
      default: '',
      env: 'FIREBASE_PROJECT_ID'
    },
    storageBucket: {
      default: '',
      env: 'FIREBASE_STORAGE_BUCKET'
    },
    messagingSenderId: {
      default: '',
      env: 'FIREBASE_MESSAGING_SENDER_ID'
    },
    appId: {
      default: '',
      env: 'FIREBASE_APP_ID'
    },
    measurementId: {
      default: '',
      env: 'FIREBASE_MEASUREMENT_ID'
    }
  }
})

appConfig.validate({ allowed: 'strict' })
