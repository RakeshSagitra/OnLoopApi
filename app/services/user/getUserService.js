import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  }
}

export class GetUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      console.log('In Get User Service', this.args.id)
      return {
        data: 'okay'
      }
    } catch (e) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}
