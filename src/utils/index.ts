import { isEmpty } from './validate'

export const vaildData = (val: any, dafult: any) => {
  if (typeof val === 'boolean') {
    return val
  }
  return !isEmpty(val) ? val : dafult
}

export const serialize = (data: any) => {
  const list: any = []
  Object.keys(data).forEach((ele: any) => {
    list.push(`${ele}=${data[ele]}`)
  })
  return list.join('&')
}

export const getObjType = (obj: any): string => {
  const toString = Object.prototype.toString
  const map: any = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}

export const loadStyle = (url: any) => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}


// 对象深拷贝
export const deepClone = (data: any) => {
  const type = getObjType(data)
  let obj: any
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    // 不再具有下一层次
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (const key of Object.keys(data)) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}
export const formatDate = (time: number | Date, fmt = 'yyyy-MM-dd hh:mm') => {
  if (!time) {
    return ''
  }
  let date: any
  if (getObjType(time) === 'number') {
    date = new Date(time)
  } else {
    date = time
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

export const padLeftZero = (str: string) => {
  return ('00' + str).substr(str.length)
}

/**
 * 延迟执行函数
 * @param callback 执行函数
 * @param delay 延迟时间
 */
export const timeout = (callback: any, delay = 200) => {
  return setTimeout(callback, delay)
}

/**
 * 生成32位的uuid
 */
export const uuid = () => {
  const s: any = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = ''
  return s.join('')
}

/**
 * 获取屏幕高度
 * @param unit 单位（如px）
 */
export function height(unit?: string, offset: number = 0) {
  if (unit) {
    return document.documentElement.clientHeight - offset + unit
  }
  return document.documentElement.clientHeight - offset
}

/**
 * 获取根url
 */
export function rootUrl() {
  return window.location.protocol + '//' + window.location.host
}

export function isIos() {
  const u = navigator.userAgent
  console.log('isIosisIos', !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
}
export function isWechat() {
  const ua = navigator.userAgent.toLowerCase().match(/MicroMessenger/i)
  if (ua !== null && ua.toString() === 'micromessenger') {
    return true
  } else {
    return false
  }
}
