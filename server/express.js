import express from 'express'
import initRoutes from '../routes'
import expressBoom from 'express-boom'

const app = express()

const initMiddleware = () => {
  app.use(expressBoom())
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true
    })
  )
}

// Init Middlewares
initMiddleware(app)

// Init Routes
initRoutes(app)

export default app
