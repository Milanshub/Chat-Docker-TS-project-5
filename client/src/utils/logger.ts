import log from 'loglevel';

// Set default log level
log.setLevel('info');

// Optionally, you can configure loglevel to display colors for different log levels
log.getLogger('root').setLevel('info');

// Custom logging functions
export const logInfo = (message: string) => log.info(message);
export const logError = (message: string) => log.error(message);

export default log;
