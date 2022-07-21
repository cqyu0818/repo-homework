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

  it('should contain an obj WHEN create one', () => {
    const user = { login: "qiuyu",  password: "123abc", age: 18 }
    const userArr = UserInstance.createUser(user)
    expect(userArr[0]).toHaveProperty('login', 'qiuyu');
    userId = userArr[0].id
  });

  it('should return a list which contain an created obj', () => {
    const list = UserInstance.getAutoSuggest('qiu', 1)
    expect(list[0]).toHaveProperty('login', 'qiuyu');
  });

  it('should return the user info WHEN enter an id', () => {
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toHaveProperty('login', 'qiuyu')
  });

  it('should return the user with new attribute WHEN update it', () => {
    const body = { login: "qiuyu",  password: "123abc", age: 19 }
    UserInstance.updateUser(userId, body)
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toHaveProperty('age', 19);
  });

  it('should not contain the obj WHEN delete it', () => {
    UserInstance.deleteUser(userId)
    const user = UserInstance.getUserById(userId)[0]
    expect(user).toBe(undefined)
  });
})