import ServiceBase from '../../common/serviceBase'
import { updateUserById } from '../../helper/user'
import { ERRORS } from '../../utils/errors'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  },
  name: {
    presence: false
  },
  email: {
    presence: false
  },
  phone: {
    presence: false
  }
}

export class UpdateUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { id, name, email, phone } = this.filteredArgs

    try {
      // Fetch all users
      await updateUserById({
        id, name, email, phone
      })
      return {
        message: 'User updated Successfully',
        updatedUser: {
          ...this.filteredArgs
        }
      }
    } catch (e) {
      console.error('Error updating user ', e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
