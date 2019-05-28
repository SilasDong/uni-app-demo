import { getObjType, timeout } from '.'

export function showToast(toast: ShowToastOptions) {
  uni.showToast({
    title: toast.title,
    icon: toast.icon || 'none',
    image: toast.image,
    mask: toast.mask || false,
    duration: toast.duration || 2000
  })
}

export function hideToast() {
  uni.hideToast()
}

export function showLoading(loading: ShowLoadingOptions, hideTime?: number) {
  uni.showLoading({
    title: loading.title || '加载中...',
    mask: loading.mask || false
  })
  if (hideTime) {
    timeout(() => {
      uni.hideLoading()
    }, hideTime)
  }
}

export function hideLoading() {
  uni.hideLoading()
}

export function showModal(modal: ShowModalOptions) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: modal.title,
      content: modal.content,
      showCancel: modal.showCancel,
      cancelText: modal.cancelText || '取消',
      cancelColor: modal.cancelColor || '#000000',
      confirmText: modal.confirmText || '确定',
      confirmColor: modal.confirmColor || '#3CC51F',
      success: (res) => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    })
  })
}

export function showActionSheet(actionSheet: ShowActionSheetOptions) {
  return new Promise((resolve, reject) => {
    uni.showActionSheet({
      itemList: actionSheet.itemList,
      itemColor: actionSheet.itemColor || '#000000',
      success: (res: ShowActionSheetRes) => {
        resolve(res)
      },
      fail: () => {
        reject('出错了')
      }
    })
  })
}

