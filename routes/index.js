import apiRoutes from './api'

const initRoutes = (app) => {
  app.use(apiRoutes)

  app.get('/healthcheck', (req, res) => {
    res.sendStatus(200)
  })
}

export default initRoutes
