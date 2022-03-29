import Responder from '../../server/expressResponder'
import { CreateUserService, GetUserService } from '../services/user'

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
    const getUserResult = await GetUserService.execute(req.query)

    if (getUserResult.successful) {
      Responder.success(res, getUserResult.result)
    } else {
      Responder.failed(res, getUserResult.errors)
    }
  }
}
