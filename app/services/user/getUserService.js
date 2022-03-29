import ServiceBase from '../../common/serviceBase'
import { getUserById } from '../../helper/user'
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
    const { id } = this.filteredArgs

    try {
      // Fetch User by Id
      const user = await getUserById({ id })
      if (user) {
        return user
      } else {
        return this.addError(ERRORS.NOT_FOUND, `User with id ${id} does not exist`)
      }
    } catch (e) {
      console.error('Error fetching user ', e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
