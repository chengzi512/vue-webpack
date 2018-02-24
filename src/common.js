/**
 * @filename common.js
 * @authors chengzi512
 * @creatTime 2017-09-25 10:21:20
 * @description 配置
 * @version 1.0.0
 */

import Vue from 'vue'
import _ from 'lodash'

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import './common.less'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import util from '@/libs/util'
Vue.prototype.$util = util

import msgHub from '@/libs/vue/msgHub';
Vue.prototype.$msgHub = msgHub

import respont from '@/libs/axios';
Vue.prototype.$respont = respont;

import validator from '@/libs/vue/validator'
Vue.prototype.$validator = validator

import regExp from '@/libs/regExp'
Vue.prototype.$regExp = regExp;

