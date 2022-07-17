import { winstonLog } from './winston-log'

export function reqLogger(req, res, next) {
  const { method, params, query, body } = req
  const args = Object.assign({}, params, query, body)

  console.table({ 'method': method, 'arguments': JSON.stringify(args) })

  next()
}

export function errLogger(err, req, res, next) {
  const { method, params, query, body } = req
  const args = Object.assign({}, params, query, body)
  winstonLog.error({
    level: 'error',
    method,
    arguments: args,
    message: err.error?.toString()
  })
  res.status(500).json({ err: err.error?.toString() })
  next()
}