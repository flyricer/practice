import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '../store/store.js'


import Index from '../pages/index.vue'
import Search from '../pages/search.vue'
import shopCar from '../pages/shopCar.vue'
import userCenter from '../pages/userCenter.vue'
import Classify from '../pages/classify.vue'
import Main from '../pages/main.vue'
import filmDetail from '../pages/filmDetail.vue'
import scroll from '../pages/scroll.vue'
import Login from '../pages/login.vue'
import example1 from '../components/example1.vue'
import example2 from '../components/example2.vue'
import example3 from '../components/example3.vue'
import example4 from '../components/example4.vue'
import example5 from '../components/example5.vue'
// import test from '../test1/test.vue'
// const Car = () => import('pages/car')
// const Search = () => import('pages/search')
// const Login = () => import('pages/login')
// const Main = () => import('pages/main')
// const vipMessage = () => import('pages/vip-message')
// const Classify = () => import('pages/classify')
// const FilmDetail = () => import('pages/film-detail')



const router = new VueRouter({
  mode: 'history',
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
          component: Search,
          children: [
            {
              path: '',
              redirect: 'example1'
            },
            {
              name: 'coexample1m1',
              path: 'example1',
              component: example1
            },
            {
              name: 'example2',
              path: 'example2',
              component: example2
            },
            {
              name: 'example3',
              path: 'example3',
              component: example3
            },
            {
              name: 'example4',
              path: 'example4',
              component: example4
            },
            {
              name: 'example5',
              path: 'example5',
              component: example5
            },
          ]
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
      name: 'classify',
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },

    {
      path: '/film-detail/:id',
      name: 'filmdetail',
      component: filmDetail,
      meta: {
        keepAlive: true, 
        isBack: false
      }
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
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth) {
    if(store.state.token) {
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