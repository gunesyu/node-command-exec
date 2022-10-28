import morgan from 'morgan'

import Logger from '../../utils/logger.js'

const morganMiddleware = morgan(
  ':method :url :status - :response-time ms',
  {
    stream: {
      write: (message) => Logger.info(message.trim()),
    },
  }
)

export default morganMiddleware
