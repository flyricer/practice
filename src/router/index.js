import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../pages/index.vue'
import Search from '../pages/search.vue'
import shopCar from '../pages/shopCar.vue'
import userCenter from '../pages/userCenter.vue'
import Classify from '../pages/classify.vue'
import Main from '../pages/main.vue'
import filmDetail from '../pages/filmDetail.vue'
import scroll from '../pages/scroll.vue'
import Login from '../pages/login.vue'
// import test from '../test1/test.vue'
// const Car = () => import('pages/car')
// const Search = () => import('pages/search')
// const Login = () => import('pages/login')
// const Main = () => import('pages/main')
// const vipMessage = () => import('pages/vip-message')
// const Classify = () => import('pages/classify')
// const FilmDetail = () => import('pages/film-detail')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    
    {
      path: '/home',
      component: Main,
      children: [
        {
          path: '',
          redirect: 'index'
        },

        {
          name: 'index',
          path: 'index',
          component: Index
        },
        {
          name: 'search',
          path: 'search',
          component: Search
        },
        {
          name: 'shopcar',
          path: 'shopcar',
          component: shopCar,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'usercenter',
          path: 'usercenter',
          component: userCenter,
          meta: {
            requiresAuth: true
          }
        },
      ]
    },
    
    {
      path: '/classify/:type',
      component: Classify,
      name: 'classify'
    },

    {
      path: '/film-detail/:id',
      name: 'filmdetail',
      component: filmDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      name: 'scroll',
      path: '/scroll',
      component: scroll
    },
 
  ]
});

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  // let token = this.$store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth) {
    if(this.$store.state.token) {
      next();
    } else {
      next({
      path: '/login',
      query: { redirect: to.fullPath } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
    });
    }
  } else {
    next();
  } 
});


export default router;