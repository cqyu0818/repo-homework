import { v4 as uuidv4 } from 'uuid';

const userArr = []

export default class UserModel {
  createUser(user) {
    let { login, password, age } = user
    userArr.push({
      id: uuidv4(),
      login,
      password,
      age,
      isDeleted: 0
    })
    return userArr
  }

  getAutoSuggest(loginSubstring, limit) {
    let searchList = []
    // 筛选出未删除数据
    searchList = userArr.filter(item => !item.isDeleted)
    // 根据loginSubstring筛选
    if (loginSubstring) {
      searchList = searchList.filter(item => item.login.indexOf(loginSubstring) > -1)
    }
    // sorted by login property
    searchList.sort((a, b) => a.login > b.login ? 1 : (a.login < b.login ? -1 : 0))

    return limit > 0 ? searchList.slice(0, limit) : searchList
  }

  getUserById(id) {
    return userArr.filter(item => item.id === id && !item.isDeleted)
  }

  updateUser(id, user) {
    const i = userArr.findIndex(item => item.id === id && !item.isDeleted)
    if (i >= 0) {
      userArr[i] = { id, ...user, isDeleted: 0 }
    }
    return i
  }

  deleteUser(id) {
    const i = userArr.findIndex(item => item.id === id)
    if (i >= 0) {
      userArr[i].isDeleted = 1
    }
    return i
  }
}