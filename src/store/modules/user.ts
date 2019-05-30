import userStorage from '@/data/user'
import { getUserInfo } from '@/api/page/user'
const user = {
  state: {
    token: 'userStorage.token',
    userInfo: {}
  },
  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }: any) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res: any) => {
          if (!res.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = res.data
          commit('SET_USER_INFO', data)
          resolve(res)
        }).catch((error) => {
          reject(error)
        })
      })
    }

  },
  mutations: {
    SET_TOKEN: (state: any, token: string) => {
      userStorage.token = token
      state.token = token
    },
    SET_USER_INFO: (state: any, userInfo: any) => {
      state.userInfo = userInfo
    }
  }
}
export default user
