const express = require('express')
const app = express()
const loginRouter = require('./router/login')
const userRouter = require('./router/user')
const cors = require('cors')

import { winstonLog } from './middleware/winston-log'
import { reqLogger, errLogger } from './middleware/log'
import { errHanlder } from './middleware/errHandler'
import { secretKey } from './config'

const { expressjwt: expressJWT } = require('express-jwt')

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cors())

// task 6.1 —— 解析token中间件
app.use('/user', expressJWT({ secret: secretKey, algorithms: ["HS256"] }))

// task 5.1
app.use(reqLogger)

app.use(loginRouter)

app.use('/user', userRouter)

// validate error handler
app.use(errHanlder);

// task 5.2
app.use(errLogger)

process.on('uncaughtException', err => {
  winstonLog.error(err)
})

// 捕获没有处理的promise rejection
process.on('unhandledRejection', err => {
  winstonLog.error(err)
})

// app.listen(80, () => {
//   console.log('express server running at http://127.0.0.1')
// })

module.exports = app;