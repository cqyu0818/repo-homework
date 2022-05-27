const express = require('express')
const apiRouter = express.Router()
const validate = require('./validate')
import { v4 as uuidv4 } from 'uuid';

const userArr = []

// 新增用户
apiRouter.post('/createUser', async (req, res) => {
  const error = await validate(req, res)
  if (!error) {
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
      msg: '创建成功！'
    })
  } else {
    res.send({
      status: 400,
      msg: error.message
    })
  }
})

// 更新用户
apiRouter.post('/updateUser', (req, res) => {
  const valid = validate(req, res)
  if (valid) {
    const body = req.body
    const i = userArr.findIndex(item => item.id === body.id)
    if (i >= 0) {
      userArr[i] = { ...body, isDeleted: 0 }
      res.send({
        status: 200,
        msg: '更新成功'
      })
    } else {
      throw new Error('更新失败')
    }
  }
})

// 查询用户
apiRouter.get('/getUserById/:id', (req, res) => {
  const id = req.params.id || ''
  const user = userArr.filter(item => item.id === id && !item.isDeleted)
  res.send({
    status: 200,
    msg: '查询成功',
    data: user[0] || {}
  })
})

// 查询用户列表
apiRouter.get('/getAutoSuggestUsers', (req, res) => {
  const { loginSubstring = '', limit } = req.query
  let searchList = []
  // 筛选出未删除数据
  searchList = userArr.filter(item => !item.isDeleted)
  // 根据loginSubstring筛选
  if (loginSubstring) {
    searchList = searchList.filter(item => item.login.indexOf(loginSubstring) > -1)
  }
  // sorted by login property
  searchList.sort((a, b) => a.login > b.login ? 1 : ( a.login < b.login ? -1 : 0))
  res.send({
    status: 200,
    msg: '查询成功',
    data: limit > 0 ? searchList.slice(0, limit) : searchList
  })
})

// 删除用户
apiRouter.post('/deleteUser/:id', (req, res) => {
  const id = req.params.id || ''
  const i = userArr.findIndex(item => item.id === id)
  if (i >= 0) {
    userArr[i].isDeleted = 1
    res.send({
      status: 200,
      msg: '删除成功'
    })
  } else {
    throw new Error('删除失败')
  }
})

module.exports = apiRouter