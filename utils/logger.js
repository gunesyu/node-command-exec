import { createLogger, format, transports, config } from "winston"
const { combine, timestamp, printf, errors } = format

class Logger {
	static instance

	static get logger() {
		if (this.instance) {
			return this.instance
		}

		this.instance = createLogger({
      levels: config.syslog.levels,
      level: process.env.LOG_LEVEL || 'info',
      format: combine(
        errors({ stack: true }),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
      ),
      transports: [
        new transports.File({
          filename: 'viascientific.log'
        }),
        new transports.Console()
      ],
      exceptionHandlers: [
        new transports.File({
          filename: 'viascientific.log'
        }),
        new transports.Console()
      ],
      rejectionHandlers: [
        new transports.File({
          filename: 'viascientific.log'
        }),
        new transports.Console()
      ],
    });

		return this.instance
	}

	static info(message, metadata = {}) {
		this.logger.info(message, { ...metadata })
	}

	static debug(message, metadata = {}) {
		this.logger.debug(message, { ...metadata })
	}

	static warn(message, metadata = {}) {
		this.logger.warning(message, { ...metadata })
	}

	static error(message, metadata = {}) {
		this.logger.error(message, { ...metadata })
	}

	static critical(message, metadata = {}) {
		this.logger.crit(message, { ...metadata })
	}

	static alert(message, metadata = {}) {
		this.logger.alert(message, { ...metadata })
	}

	static emergency(message, metadata = {}) {
		this.logger.emerg(message, { ...metadata })
	}
}

export default Logger
