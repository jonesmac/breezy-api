const errorManagement = require('../util/errors/errorManagement');
const { commonExceptions } = require('../constants/errors');

// Catching what wasn't caught
module.exports = () => {
  process.on(commonExceptions.uncaughtException, function(error) {
    errorManagement.handler.handleError(error);
    if(!errorManagement.handler.isTrustedError(error)) {
      console.error(error);
      process.exit(1);
    }
  });
  
  process.on(commonExceptions.unhandledRejection, function(error) {
    console.error('\nUnhandledPromiseRejection\n')
    throw error
  });
}
