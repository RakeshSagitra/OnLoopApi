import express from 'express'
import UserController from '../../../app/controllers/user.controller'

const args = { mergeParams: true }
const usersRouter = express.Router(args)

usersRouter.route('/').post(UserController.createUser)

usersRouter.route('/').get(UserController.getUsers)

usersRouter.route('/:id').get(UserController.getUser)

usersRouter.route('/:id').put(UserController.updateUser)

usersRouter.route('/:id').delete(UserController.deleteUser)

usersRouter.route('/learn-content').post(UserController.learnContent)

export { usersRouter }
