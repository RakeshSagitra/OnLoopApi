import _ from 'lodash'
import logger from '../app/common/logger'
import { MESSAGES, ERRORS } from '../app/utils/errors'

function Responder () { }

/*
 * This method sends the response to the client.
 */
function sendResponse (res, status, body) {
  if (!res.headersSent) {
    if (body) { return res.status(status).json(body) }
    return res.status(status).send()
  }
  logger.error('Response already sent.')
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.sendJSONResponse = (res, obj) => sendResponse(res, 200, obj)

Responder.success = (res, data) => {
  let message = 'Request has been processed successfully.'
  if (_.isString(data)) {
    message = data
    data = ''
  } else if (_.isObject(data) && data.message) {
    message = data.message
  }

  if (data && data.message) {
    delete data.message
  }

  return sendResponse(res, 200, { data: data || [], message })
}

Responder.failed = (res, errorObj) => {
  // get the error key
  const keys = errorObj && Object.keys(errorObj)
  const errorName = (keys && keys.length && keys[0])

  if (errorName && _.isFunction(res.boom[errorName])) {
    let errorMessage
    if (errorName === ERRORS.INTERNAL) {
      errorMessage = MESSAGES.SERVER_ERROR
    } else {
      errorMessage = errorObj[errorName]
    }
    res.boom[errorName](errorMessage)
  } else {
    res.boom.internal(MESSAGES.SERVER_ERROR)
  }
}

export default Responder
