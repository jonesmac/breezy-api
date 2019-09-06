// centralized error object that derives from Node’s Error
class AppError {

  constructor(name, httpCode, description, isOperational) {
    Error.call(this);
    Error.captureStackTrace(this);
    this.httpCode = httpCode;
    this.description = description;
    this.name = name;
    this.isOperational = isOperational;
  }
}

AppError.prototype.__proto__ = Error.prototype;

module.exports.AppError = AppError;