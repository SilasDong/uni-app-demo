// import cookies from 'js-cookie'
import { setStore, getStore } from '@/data'
const TokenKey = 'Admin-Token-mobile'
const IconfontKey = 'iconfontKey'

class UserStorage {
  set token(content) {
    setStore({ name: TokenKey, content})
  }
  get token() {
    return getStore({ name: TokenKey }) || ''
  }
}

const userStorage = new UserStorage()
export default userStorage
