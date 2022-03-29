import express from 'express'
import { userRouter } from './user.router'

const router = express.Router()
const NAMESPACE = 'v1'

router.use(`/${NAMESPACE}/user`, userRouter)


export default router
