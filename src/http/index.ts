export default class Http {
  public interceptorsRequest: any
  public interceptorsResponse: any
  public config: Config = {}
  public interceptors: any = {
    request: (interceptorsRequest: any) => {
      this.interceptorsRequest = interceptorsRequest
    },
    response: (interceptorsResponse: any) => {
      this.interceptorsResponse = interceptorsResponse
    }
  }
  public request(params: Params) {
    params.headers ? params.headers = params.headers : params.headers = {}
    params = this.interceptorsRequest(params)
    if (this.config && this.config.headers) {
      if (!params.headers) {
        params.headers = {}
      }
      params.headers = Object.assign({}, params.headers, this.config.headers)
    }
    let baseURL = ''
    if (params.url && params.url.startsWith('http')) {
      baseURL = ''
    } else if (params.baseURL) {
      baseURL = params.baseURL
    } else if (this.config && this.config.baseURL) {
      baseURL = this.config.baseURL
    }
    return new Promise((resolve, reject) => {
      uni.request({
        url: baseURL + params.url,
        data: params.data,
        header: params.headers,
        method: params.method || 'GET',
        success: (res) => {
          return this.interceptorsResponse(res, params).then((res1: any) => {
            resolve(res1)
          }).catch((err: any) => {
            reject(err)
          })
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  public post(url: string, data?: any, config?: Params) {
    config = !config ? Object.assign({ url, data }, config) : { url, data}
    return this.request(config)
  }
  public get(url: string, config?: Params) {
    config = !config ? Object.assign({ url }, config) : { url }
    return this.request(config)
  }
}


interface Config {
  headers?: any,
  baseURL?: string
}
interface Params {
  baseURL?: string,
  url?: string,
  data?: any,
  headers?: any,
  method?: 'GET' | 'POST'
}