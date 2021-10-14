// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入百度离线地图
// import BaiduMap from 'vue-baidu-map'
import scroll from 'vue-seamless-scroll'
// 初始化标签元素
import "./common/css/reset.css"
// 引入字体样式
import "./common/css/font.css"
import ElementUI from 'element-ui';
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import App from './App'

//引入动画库
import 'animate.css';

import router from './router'
import store from './store/index.js'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Observer from "./common/js/observer.js"
Vue.prototype.Observer = Observer;
Vue.config.productionTip = true

Vue.use(ElementUI);
Vue.use(scroll);

// Vue.use(BaiduMap, {
//   ak: 'xQPEXT6Q3PjY88VicneaSA5qUNQFdFwL'  //这个地方是官方提供的ak密钥
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


// rem适配
function setRem() {
  var whdef = 16/1920;// 表示1920的设计图,使用16PX的默认值
  var bodyWidth = document.documentElement.clientWidth || document.body.clientWidth;// 当前窗口的宽度
  var rem;
     rem = bodyWidth * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
     document.getElementsByTagName('html')[0].style.fontSize = rem + 'px';
}

if(window.document.all){
     window.attachEvent("onload", setRem);
     window.attachEvent("onresize", setRem);
  } else {
    window.addEventListener('load', setRem);
    window.addEventListener('resize', setRem);
  }
