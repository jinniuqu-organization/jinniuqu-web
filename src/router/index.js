import Vue from 'vue'
import Router from 'vue-router'

//首页
import Home from '@/components/home/index'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
