const express = require('express')
const app = express()
const router = require('./router')

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/user', router)

app.use(function (err, req, res, next) {
  console.log('发生了错误：' + err.message)
  res.send('Error!' + err.message)
})

app.listen(80, () => {
  console.log('express server running at http://127.0.0.1')
})