export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'ValidationError',
      details: err.issues?.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      error: err.code || 'Error',
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'ServerError',
    message: 'Internal server error',
  });
}
