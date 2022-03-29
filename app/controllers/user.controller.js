import Responder from '../../server/expressResponder'
import { CreateUserService, DeleteUserService, GetUserService, GetUsersService, UpdateUserService } from '../services/user'

export default class UserController {
  static async createUser (req, res) {
    const createUserResult = await CreateUserService.execute(req.body)

    if (createUserResult.successful) {
      Responder.success(res, createUserResult.result)
    } else {
      Responder.failed(res, createUserResult.errors)
    }
  }

  static async getUser (req, res) {
    const getUserResult = await GetUserService.execute(req.params)

    if (getUserResult.successful) {
      Responder.success(res, getUserResult.result)
    } else {
      Responder.failed(res, getUserResult.errors)
    }
  }

  static async getUsers (req, res) {
    const getUsersResult = await GetUsersService.execute(req.params)

    if (getUsersResult.successful) {
      Responder.success(res, getUsersResult.result)
    } else {
      Responder.failed(res, getUsersResult.errors)
    }
  }

  static async updateUser (req, res) {
    const updateUserResult = await UpdateUserService.execute({ ...req.body, ...req.params })

    if (updateUserResult.successful) {
      Responder.success(res, updateUserResult.result)
    } else {
      Responder.failed(res, updateUserResult.errors)
    }
  }

  static async deleteUser (req, res) {
    const deleteUserResult = await DeleteUserService.execute(req.params)

    if (deleteUserResult.successful) {
      Responder.success(res, deleteUserResult.result)
    } else {
      Responder.failed(res, deleteUserResult.errors)
    }
  }
}
