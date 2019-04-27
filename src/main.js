// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios
import qs from 'qs'
Vue.prototype.qs = qs
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers['Content-Type'] = 'application/json'



import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: './assets/loading.gif',
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// axios.interceptors.request.use(
//   config => {
//       if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//           config.headers.Authorization = `token ${store.state.token}`;
//       }
//       return config;
//   },
//   err => {
//       return Promise.reject(err);
//   }
// );

// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
//       return response;
//   },
//   error => {
//       if (error.response) {
//           switch (error.response.status) {
//               case 401:
//                   // 返回 401 清除token信息并跳转到登录页面
//                   this.$store.commit('delToken');
//                   router.replace({
//                       path: '/login',
//                       query: {redirect: router.currentRoute.fullPath}
//                   })
//           }
//       }
//       return Promise.reject(error.response.data)   // 返回接口返回的错误信息
//   }
// );
