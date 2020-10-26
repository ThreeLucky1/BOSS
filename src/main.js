import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//登陆页面粒子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
//elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//axios
import axios from 'axios'
Vue.prototype.$axios = axios;
//验证码
import SlideVerify from 'vue-monoplasty-slide-verify';
Vue.use(SlideVerify);
//转场特效
import vueg from 'vueg'
Vue.use(vueg, router, {
  duration: 1,
  enter: 'bounceInRight',
  leave: 'ease',
  shadow: false
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
