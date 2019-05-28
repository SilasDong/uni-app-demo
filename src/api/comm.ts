import request from '@/http/uniHttp'

/**
 * 查询系统参数
 * @param paramKeys 多个用逗号隔开
 */
export function queryParam(paramKeys: string) {
  return request.get(`/api/c-sys-param-query?paramKeys=${paramKeys}`)
}
/**
 * 七牛or阿里oss上传token查询
 */
export function uploadToken() {
  return request.get('/api/xcd-module-get-upload-token')
}

/**
 * 查询字典
 * @param key 字典组key
 * @param url 字典url
 */
export function queryDict(key: string, url = '/api/m-sys-dict-query?groupId=') {
  return request.get(`${url}${key}` )
}

/**
 * 上传文件
 * @param url 上传地址
 * @param data post参数
 * @param onUploadProgress 进度回调函数
 */
export function uploadFile(url: string, data: any, onUploadProgress: any) {
  return request.post(url, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
