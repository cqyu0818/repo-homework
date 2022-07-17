const request = require("supertest");
const app = require("../app");

let token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsInBhc3N3b3JkIjoiMTIzYWJjIiwiaWF0IjoxNjU4MDQ3NTg5LCJleHAiOjE2NTgwNTExODl9.ovX02S_qUrygh186ZPpwdVV757LiERO06xPHxLekOPk'
let userId = ''

describe('router/login', () => {
  test('login', async () => {
    const loginInfo = { username:"aaa",  password: "123abc" }

    const response = await request(app)
      .post('/login')
      .send(loginInfo)
    expect(response.status).toBe(200)
    token = 'Bearer ' + JSON.parse(response.text)?.token
  })
})

describe('router/user', () => {
  // res.send 文本返回使用 response.text  res.json  json数据返回使用 response.body
  test('add user', async () => {
    const response = await request(app)
      .post('/user')
      .set('Authorization', token)
      .send({
        login: 'aaa',
        password: '123abc',
        age: 18
      })
    expect(response.status).toBe(200)
  })

  test('get auto suggest users', async () => {
    const response = await request(app)
      .get('/user/auto-suggest')
      .set('Authorization', token)
      .send({
        limit: 10
      })
    expect(response.status).toBe(200)
    const data = JSON.parse(response.text)?.data || []
    userId = data.length > 0 ? data[0].id : ''
  })

  test('get user by id', async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set('Authorization', token)
    expect(response.status).toBe(200)
  })

  test('update user', async () => {
    const response = await request(app)
      .put(`/user/${userId}`)
      .set('Authorization', token)
      .send({
        login: 'bbb',
        password: '123abc',
        age: 19
      })
    expect(response.status).toBe(200)
  })

  test('delete user by id', async () => {
    const response = await request(app)
      .delete(`/user/${userId}`)
      .set('Authorization', token)
    expect(response.status).toBe(200)
  })

})