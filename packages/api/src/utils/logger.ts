import appRoot from 'app-root-path';
import { createLogger, Logger, transports } from 'winston';

const LOG_FILE_PATH = `${appRoot}/logs/app.log`;
const ERROR_LOG_FILE_PATH = `${appRoot}/logs/error.log`;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const options = {
  file: {
    level: 'info',
    filename: LOG_FILE_PATH,
    handleExceptions: true,
    json: true,
    maxsize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    colorize: false,
  },
  errorFile: {
    level: 'error',
    filename: ERROR_LOG_FILE_PATH,
    handleExceptions: true,
    json: true,
    maxsize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    json: false,
  },
  testConsole: {
    level: 'debug',
    handleExceptions: true,
    colorize: true,
    json: false,
  },
};

function generateTransports(): (
  | transports.FileTransportInstance
  | transports.ConsoleTransportInstance
)[] {
  switch (process.env.NODE_ENV) {
    case 'production':
      return [
        new transports.File(options.file),
        new transports.File(options.errorFile),
      ];
    case 'test':
      return [new transports.Console(options.testConsole)];
    default:
      return [
        new transports.File(options.file),
        new transports.File(options.errorFile),
        new transports.Console(options.console),
      ];
  }
}

// instantiate a new Winston Logger with the settings defined above
export const logger = createLogger({
  transports: generateTransports(),
  defaultMeta: { service: 'api' },
  exitOnError: false, // do not exit on handled exceptions
});

class LoggerStream {
  constructor(private log: Logger) {}

  write(message: string): void {
    this.log.info(message);
  }
}

export default new LoggerStream(logger);
