const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || err.statusCode || 500;
  const errorMessage = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      message: errorMessage,
      code: statusCode,
      details: err.details || undefined,
    },
  });
};

module.exports = { errorLogger, errorHandler };
