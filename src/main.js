import animated from 'animate.css'
import '@/assets/css/global.styl'
import 'element-ui/lib/theme-chalk/display.css'
import 'github-markdown-css/github-markdown.css'
import 'vant/lib/index.css'

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import '@/plugins/element'
import '@/plugins/http'
import '@/plugins/vant' 



Vue.config.productionTip = false

Vue.use(animated)

Vue.prototype.$EventBus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
