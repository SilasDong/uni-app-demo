import request from '@/http/uniHttp'

// 获取用户信息
export function getUserInfo() {
  return request.get('/api/p-lightlove-front-user-info')
}