import ServiceBase from '../../common/serviceBase'
import { deleteUserById } from '../../helper/user'
import { ERRORS } from '../../utils/errors'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  }
}

export class DeleteUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { id } = this.filteredArgs

    try {
      // Delete User by Id
      await deleteUserById({ id })

      return {
        message: 'User deleted Successfully',
        deletedUser: {
          ...this.filteredArgs
        }
      }
    } catch (e) {
      console.error('Error deleting user ', e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
