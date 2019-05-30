import { Component, Vue } from 'vue-property-decorator'
import * as util from '@/utils/'
import * as log from '@/utils/log'
import * as validate from '@/utils/validate'
// import store from '@/store/'
import router from '@/router/'
import uniHttp from '@/http/uniHttp'
import api from '@/api/'
// import * as toast from '@/utils/toast'
export default Vue.extend({
  data() {
    return {
      $api: api,
      $uniRouter: router,
      $http: uniHttp,
      $log: log,
      $util: util,
      $validate: validate
    }
  },
  onLoad() {
    this.onLoad()
  },
  onShow() {
    this.onShow()
  },
  onReady() {
    this.onReady()
  },
  onHide() {
    this.onHide()
  },
  onUnload() {
    this.onUnload()
  },
  onPullDownRefresh() {
    this.onPullDownRefresh()
  },
  onReachBottom() {
    this.onReachBottom()
  },
  onTabItemTap() {
    this.onTabItemTap()
  },
  onPageScroll() {
    this.onPageScroll()
  },

  methods: {
    onLoad() {
      console.log('onLoad')
    },
    onShow() {
      console.log('onShow')
    },
    onReady() {
      console.log('onReady')
    },
    onHide() {
      console.log('onHide')
    },
    onUnload() {
      console.log('onUnload')
    },
    onPullDownRefresh() {
      console.log('onPullDownRefresh')
    },
    onReachBottom() {
      console.log('onReachBottom')
    },
    onTabItemTap() {
      console.log('onTabItemTap')
    },
    onPageScroll() {
      console.log('onPageScroll')
    }
  }

})
// @Component({})
// export default class BaseMixin extends Vue {

//   // public $store = store
//   protected $api = api
//   protected $http = uniHttp
//   protected $log = log
//   protected $util = util
//   protected $validate = validate
//   // protected $toast = toast

//   protected cruuentPage: any = { page: 1, pageSize: 10 }

//   protected fileDownloadurl = '/api/xcd-module-filemanager-file-download?id='

//   protected beforeCreate() {
//   }

//   protected created() {
//     //
//   }

//   protected mounted() {
//     //
//   }

//   protected activated() {
//     //
//   }
//   protected destroyed() {
//     //
//   }

//   protected showImage(url: any, perfi = '@100w') {
//     if (url && url.length === 32) {
//       return `${this.fileDownloadurl}${url}`
//     } else if (url && url.includes('uploadfiles')) {
//       if (url.includes(',')) {
//         return `${url.split(',')[0]}` + perfi
//       } else {
//         return `${url}` + perfi
//       }
//     }
//     return url
//   }

//   protected clipboardSuccess() {
//     // this.$toast.showToast({ txt: '拷贝成功' })
//   }
// }
