import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import { addUser } from '../../helper/user'

const constraints = {
  name: {
    presence: { allowEmpty: false }
  },
  email: {
    presence: { allowEmpty: false }
  },
  phone: {
    presence: { allowEmpty: false }
  }
}

export class CreateUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { name, email, phone } = this.filteredArgs
      const userRef = await addUser({ name, email, phone })

      return {
        userRefId: userRef.id,
        message: 'User created Successfully'
      }
    } catch (e) {
      console.error('Error adding user: ', e)
      return this.addError(ERRORS.INTERNAL)
    }
  }
}
