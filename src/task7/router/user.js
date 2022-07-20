import UserModel from '../models/userModels'

const UserInstance = new UserModel()

const express = require('express')
const userRouter = express.Router()

const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({ passError: true })

const querySchema = Joi.object({
  id: Joi.any(),
  login: Joi.string().required(),
  password: Joi.string().required().regex(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,}$/).rule({ message: 'password must contain letters and numbers' }),
  age: Joi.number().required().min(4).max(130).rule({ message: 'Uer’s age must be between 4 and 130' })
})

// 新增用户
userRouter.post('/', validator.body(querySchema), async (req, res, next) => {
  try {
    UserInstance.createUser(req.body)
    res.send({
      status: 200,
      msg: 'SUCCESS'
    })
  } catch (e) {
    next(e)
  }
})

// 查询用户列表
userRouter.get('/auto-suggest', (req, res, next) => {
  try {
    const { loginSubstring = '', limit } = req.query
    const data = UserInstance.getAutoSuggest(loginSubstring, limit)
    res.send({
      status: 200,
      msg: 'SUCCESS',
      data
    })
  } catch (e) {
    next(e)
  }
})

// 更新用户
userRouter.put('/:id', validator.body(querySchema), (req, res, next) => {
  try {
    const user = req.body
    const { id } = req.params
    const i = UserInstance.updateUser(id, user)
    if (i >= 0) {
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
  } catch (e) {
    next(e)
  }
})

// 查询用户
userRouter.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const data = UserInstance.getUserById(id)
    res.send({
      status: 200,
      msg: 'SUCCESS',
      data: data[0] || {}
    })
  } catch (e) {
    next(e)
  }
})

// 删除用户
userRouter.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const i = UserInstance.deleteUser(id)
    if (i >= 0) {
      res.send({
        status: 200,
        msg: 'SUCCESS'
      })
    } else {
      res.json({
        status: 400,
        msg: `FAILURE: Can't find User by Id ${id}`
      })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = userRouter