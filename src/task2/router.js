const express = require('express')
const apiRouter = express.Router()

const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true })

import { v4 as uuidv4 } from 'uuid';

const userArr = []

const querySchema = Joi.object({
  id: Joi.any(),
  login: Joi.string().required(),
  password: Joi.string().required().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,}$/).error(new Error('password must contain letters and numbers')),
  age: Joi.number().required().min(4).max(130).error(new Error('Uer’s age must be between 4 and 130')),
})

// 新增用户
apiRouter.post('/', validator.body(querySchema), async (req, res) => {
  const body = req.body
  userArr.push({
    id: uuidv4(),
    login: body.login,
    password: body.password,
    age: body.age,
    isDeleted: 0
  })
  res.send({
    status: 200,
    msg: 'SUCCESS'
  })
})

// 更新用户
apiRouter.put('/:id', validator.body(querySchema), (req, res) => {
  const body = req.body
  const { id } = req.params
  const i = userArr.findIndex(item => item.id === id && !item.isDeleted)
  if (i >= 0) {
    userArr[i] = { id, ...body, isDeleted: 0 }
    res.send({
      status: 200,
      msg: 'SUCCESS'
    })
  } else {
    res.send({
      status: 400,
      msg: `FAILURE: Can't find User by Id ${id}`
    })
  }
})

// 查询用户
apiRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const user = userArr.filter(item => item.id === id && !item.isDeleted)
  res.send({
    status: 200,
    msg: 'SUCCESS',
    data: user[0] || {}
  })
})

// 查询用户列表
apiRouter.get('/auto-suggest', (req, res) => {
  const { loginSubstring = '', limit } = req.query
  let searchList = []
  // 筛选出未删除数据
  searchList = userArr.filter(item => !item.isDeleted)
  // 根据loginSubstring筛选
  if (loginSubstring) {
    searchList = searchList.filter(item => item.login.indexOf(loginSubstring) > -1)
  }
  // sorted by login property
  searchList.sort((a, b) => a.login > b.login ? 1 : (a.login < b.login ? -1 : 0))
  res.send({
    status: 200,
    msg: 'SUCCESS',
    data: limit > 0 ? searchList.slice(0, limit) : searchList
  })
})

// 删除用户
apiRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const i = userArr.findIndex(item => item.id === id)
  if (i >= 0) {
    userArr[i].isDeleted = 1
    res.send({
      status: 200,
      msg: 'SUCCESS'
    })
  } else {
    res.send({
      status: 400,
      msg: `FAILURE: Can't find User by Id ${id}`
    })
  }
})

module.exports = apiRouter