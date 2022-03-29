import express from 'express'
import UserController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const userRouter = express.Router(args)

userRouter.post('/', UserController.createUser)
userRouter.get('/', UserController.getUser)

export { userRouter }
