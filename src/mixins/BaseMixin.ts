import { Component, Vue } from 'vue-property-decorator'
import * as util from '@/utils/'
import * as log from '@/utils/log'
import * as validate from '@/utils/validate'
import store from '@/store/'
import uniHttp from '@/http/uniHttp'
import api from '@/api/'
// import * as toast from '@/utils/toast'
@Component({})
export default class BaseMixin extends Vue {

  // public $store = store
  protected $api = api
  protected $http = uniHttp
  protected $log = log
  protected $util = util
  protected $validate = validate
  // protected $toast = toast

  protected cruuentPage: any = { page: 1, pageSize: 10 }

  protected fileDownloadurl = '/api/xcd-module-filemanager-file-download?id='

  protected beforeCreate() {
  }

  protected created() {
    //
  }

  protected mounted() {
    //
  }

  protected activated() {
    //
  }
  protected destroyed() {
    //
  }

  protected showImage(url: any, perfi = '@100w') {
    if (url && url.length === 32) {
      return `${this.fileDownloadurl}${url}`
    } else if (url && url.includes('uploadfiles')) {
      if (url.includes(',')) {
        return `${url.split(',')[0]}` + perfi
      } else {
        return `${url}` + perfi
      }
    }
    return url
  }

  protected clipboardSuccess() {
    // this.$toast.showToast({ txt: '拷贝成功' })
  }
}
