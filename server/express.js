import express from 'express'
import initRoutes from '../routes'

const app = express()

// Init Routes
initRoutes(app)

export default app
