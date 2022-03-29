import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'

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

      // Upload User Data to Firestore
      console.log(this.filteredArgs)
      return {
        data: 'okay'
      }
    } catch (e) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}
