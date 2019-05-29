import pages from './pages'

const router = {
  navigateTo(path: any) {
    const url = getPath(path)
    console.log('navigateTo', url)
    uni.navigateTo({
      url
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
  const page: any = pages.filter((item: any) => {
    return item.name === name
  })
  if (!page || page.length !== 1) {
    console.error('路由错误：' + name, page)
  }
  return params ? `${page.path}?${params}` : page.path
}