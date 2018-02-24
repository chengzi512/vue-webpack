/**
 * @filename 
 * @authors remy
 * @creatTime 2017-09-19 17:53:50
 * @description 动态注册一个包含指定子组件的全局组件
 * @version 0.0.1
 */

import Vue from 'vue'
/* 引入大屏包含的所有组件，并放到store中{component1: component1} */
// import component1 from '@/components/component1'
// import component2 from '@/components/component2'
var store = {
//   component1: component1,
//   component2: component2
}

/*
 * @id String 注册的主键名即标签名
 * @param Array/Object 元素的顺序即组件最终呈现的顺序
 * @description 动态注册一个包含指定子组件的全局组件；Object时，键的值即子组件参数；Array时，没有子组件参数undefined
 */
export default (id, param) => {
  var isArray = param instanceof Array
  if (!id || (!isArray && typeof param !== 'object'))
    throw new Error('registComponents(id, param)入参异常，id必须是String，param必须是Array或Object')
  var template = '<div>'
  var components = {}
  if (isArray) {
    param.forEach((item, i, array) => {
      if (store[item]) {
        template += '<' + item + '></' + item + '>'
        components[item] = store[item]
      }
    })
  } else {
    Object.keys(param).forEach((item, i, array) => {
      if (store[item]) {
        template += '<' + item + ' :opts="' + item + '"></' + item + '>'
        components[item] = store[item]
      }
    })
  }
  template += '</div>'
  Vue.component(id, {
    template: template,
    components: components,
    data() {
      var data = {}
      if (!isArray) {
        Object.keys(param).forEach((item, i, array) => {
          data[item] = param[item]
        })
      }
      return data
    }
  })
}