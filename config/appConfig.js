const convict = require('convict')
const { resolve } = require('path')

require('dotenv').config({ path: resolve(__dirname, '../.env') })

const appConfig = convict({
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
})

appConfig.validate({ allowed: 'strict' })

module.exports = { appConfig }
