import { appConfig } from '../config/appConfig'
import  app from './express'

const start = async () => {
  const PORT = appConfig.get('port')
  app.listen(PORT, () => {
    console.log('App is listening on port', PORT)
  })
}

export { start }
