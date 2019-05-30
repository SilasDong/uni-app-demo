import pages from './pages'
import store from '@/store/'
import {info} from '@/utils/log'

const router = {
  navigateTo(path: string) {
    getPath(path).then((url: any) => {
      uni.navigateTo({
        url
      })
    })
  }, redirectTo(path: string) {
    getPath(path).then((url: any) => {
      uni.redirectTo({
        url
      })
    })
  }, reLaunch(path: string) {
    getPath(path).then((url: any) => {
      uni.reLaunch({
        url
      })
    })
  }, switchTab(path: string) {
    getPath(path).then((url: any) => {
      uni.switchTab({
        url
      })
    })
  }, navigateBack(delta: number) {
    uni.navigateBack({
      delta
    })
  }
}

export default router

/**
 * 根据name获取跳转路径
 * @param path 跳转路径
 */
function getPath(path: string) {
  if (!path) {
    console.error('路由名称不能为空')
  }
  let params = ''
  let name = path
  if (path.includes('?')) {
    name = path.split('?')[0]
    params = path.split('?')[1]
  }
  const page: any = pages.pages.filter((item: any) => {
    return item.name === name
  })
  console.log('navigateTo', page)
  if (!page || page.length !== 1) {
    console.error('路由错误：' + name, page)
  }
  let url = params ? `/${page[0].path}?${params}` : `/${page[0].path}`
  info('url', url)
  return new Promise((resolve, reject) => {
    info('isLogin', page[0].isLogin)
    info('userInfo', store.getters.userInfo)
    if (page[0].isLogin) {
      if (!store.getters.token) {
        url = getLoginPage()
        resolve(url)
      } else if (!store.getters.userInfo) {
        store.dispatch('GetUserInfo').then((res: any) => {
          resolve(url)
        })
      } else {
        resolve(url)
      }
    } else {
      resolve(url)
    }
  })
}

/**
 * 获取登陆页面
 */
function getLoginPage() {
  const page: any = pages.pages.filter((item: any) => {
    return item.name === 'login'
  })
  if (!page || page.length !== 1) {
    console.error('登陆页面路由错误：', page)
  }
  return `/${page[0].path}`
}