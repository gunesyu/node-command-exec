import morgan from 'morgan'

import Logger from '../../utils/logger.js'

morgan.token('userID', function(req, res) {
  return req?.body?.userID;
})

const morganMiddleware = morgan(
  'user > :userID - :method :url :status - :response-time ms',
  {
    stream: {
      write: (message) => Logger.info(message.trim()),
    },
  }
)

export default morganMiddleware
