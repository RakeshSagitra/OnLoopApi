import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import { userLearnContent } from '../../helper/user'

const constraints = {
  url: {
    presence: { allowEmpty: false }
  },
  user_id: {
    presence: { allowEmpty: false }
  },
  tags: {
    presence: { allowEmpty: false }
  }
}

export class LearnContentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { url, user_id, tags } = this.filteredArgs

      const learnContentResult = await userLearnContent({
        url, user_id, tags
      })

      return { data: 'okay' }
    } catch (e) {
      return this.addError(ERRORS.INTERNAL)
    }
  }
}
