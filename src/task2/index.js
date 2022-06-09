const express = require('express')
const app = express()
const router = require('./router')

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/user', router)

app.use(function (err, req, res, next) {
  res.json({
    status: 400,
    type: err.type,
    msg: err.error.toString()
  })
})

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})