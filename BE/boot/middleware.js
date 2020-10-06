exports.responseHandler = (req, res, next) => {
  res.SuccessHandler = (message) => {
    return res.json({
      status: 'success',
      message,
    });
  };

  res.ErrorHandler = (err, statusCode = 500) => {
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
    res.ErrorHandler(`JOI - type: ${err.type}, message: ${err.error.toString()}`);
  } else {
    next(err);
  }
};
