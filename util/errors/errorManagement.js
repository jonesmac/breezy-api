// centralized error handler encapsulates error-handling related logic
class ErrorHandler {
  handleError(error) {
    // Future Integrations
    // return logger.logError(err)
    //   .then(sendMailToAdminIfCritical)
    //   .then(saveInOpsQueueIfCritical)
    //   .then(determineIfOperationalError);
  }

  isTrustedError (error) {
    return error.isOperational;
  }
}

module.exports.handler = new ErrorHandler();