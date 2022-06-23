const express = require('express')
import { secretKey } from '../config'

const loginRouter = express.Router()
const jwt = require('jsonwebtoken')

// 登录接口
loginRouter.post('/login', (req, res) => {
  const { username, password } = req.body
  // 调用数据库处理登录匹配逻辑...
  // 三个参数：用户信息对象、加密秘钥、配置对象
  const tokenStr = jwt.sign({username, password}, secretKey, {expiresIn: '1h'})
  res.send({
    status: 200,
    message: '登录成功！',
    token: tokenStr
  })
})

module.exports = loginRouter