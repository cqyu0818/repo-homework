const express = require('express')
const app = express()
const router = require('./router')
import { winstonLog } from './winston-log'
import { reqLogger, errLogger } from './log'

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

// task 5.1
app.use(reqLogger)

app.use('/user', router)

// validate error handler
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  } else {
    next(err);
  }
});

// task 5.2
app.use(errLogger)

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})

process.on('uncaughtException', err => {
  winstonLog.error(err)
})