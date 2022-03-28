const { appConfig } =  require('../config/appConfig')
const app = require('./express')

const start = async () => {
  const PORT = appConfig.get('port')
  app.listen(PORT, () => {
    console.log('App is listening on port', PORT)
  })
}

module.exports = { start }
