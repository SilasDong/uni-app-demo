import Vue from 'vue'
// @ts-ignore
import App from '@/App.vue'
import store from '@/store/'

// @ts-ignore
import basics from './demo/basics/home.vue'
Vue.component('basics', basics)

// @ts-ignore
import components from './demo/component/home.vue'
Vue.component('components', components)

// @ts-ignore
import plugin from './demo/plugin/home.vue'
Vue.component('plugin', plugin)

// @ts-ignore
import cuCustom from './ui/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false

new App({ store }).$mount()
