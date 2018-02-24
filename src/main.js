import './common';
require('es6-promise').polyfill();
import Vue from 'vue';
import App from './app';

window.document.title = '橙魔方-登录';
Vue.config.productionTip = false;
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
