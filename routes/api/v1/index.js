import express from 'express'
import { usersRouter } from './users.router'

const router = express.Router()
const NAMESPACE = 'v1'

router.use(`/${NAMESPACE}/users`, usersRouter)

export default router
