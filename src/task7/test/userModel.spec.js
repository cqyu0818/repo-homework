import UserModel from '../models/userModels'
const UserInstance = new UserModel()

let userId = ''

describe('models/userModels.js', () => {
  beforeAll(async () => {
    // 数据库连接等操作
  });

  afterAll(() => {
    // 关闭数据库连接
  });

  test('createUser', () => {
    const user = { login: "qiuyu",  password: "123abc", age: 18 }
    const userArr = UserInstance.createUser(user)
    expect(userArr[0]).toHaveProperty('login', 'qiuyu');
    userId = userArr[0].id
  });

  test('getAutoSuggest', () => {
    const list = UserInstance.getAutoSuggest('qiu', 1)
    expect(list[0]).toHaveProperty('login', 'qiuyu');
  });

  test('getUserById', () => {
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toHaveProperty('login', 'qiuyu')
  });

  test('updateUser', () => {
    const body = { login: "qiuyu",  password: "123abc", age: 19 }
    UserInstance.updateUser(userId, body)
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toHaveProperty('age', 19);
  });

  test('deleteUser', () => {
    UserInstance.deleteUser(userId)
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toBe(undefined)
  });
})