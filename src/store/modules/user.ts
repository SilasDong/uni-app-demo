import userStorage from '@/data/user'
const user = {
  state: {
    token: 'userStorage.token',
    userInfo: {}
  },
  actions: {
  },
  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      userStorage.token = token
      state.token = token
    }
  }
}
export default user
