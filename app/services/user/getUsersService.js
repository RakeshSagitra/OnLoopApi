import ServiceBase from '../../common/serviceBase'
import { getAllUsers } from '../../helper/user'
import { ERRORS } from '../../utils/errors'

const constraints = {

}

export class GetUsersService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      // Fetch all users
      return getAllUsers()
    } catch (e) {
      console.error('Error fetching users ', e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
