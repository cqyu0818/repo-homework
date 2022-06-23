export function errHanlder(err, req, res, next) {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else if (err.name === 'UnauthorizedError') {
    const { authorization } = req.headers
    return authorization ? res.status(403).json('Forbidden Error') : res.status(401).json('Unauthorized Error')
  } else {
    next(err);
  }
}