exports.responseHandler = (req, res, next) => {
  res.successHandler = (message) => {
    return res.json({
      status: 'success',
      message,
    });
  };

  res.errorHandler = (err, statusCode = 500) => {
    const message = typeof err === 'string' ? err : err.message;
    return res.status(statusCode).json({
      status: 'error',
      message,
    });
  };
  next();
};

exports.globalErrorHandler = (err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.errorHandler(
      `JOI - type: ${err.type}, message: ${err.error.toString()}`
    );
  } else {
    next(err);
  }
};
