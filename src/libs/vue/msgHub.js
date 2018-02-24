/**
 * @filename
 * @authors remy
 * @creatTime 2017-09-20 09:45:58
 * @description 消息中间件，用于组件之间的消息通信，可拦截消息进行统一处理
 * @version 0.0.1
 */

import Vue from 'vue'

let hub = new Vue()

// 预设的拦截通道id: dialogVisible弹框开关通知
let msgHub = {
  $once(channelId, handler) {
    hub.$once(channelId, (param) => {
      // 消息拦截
      if (channelId == 'dialogVisible') {
        //
      }
      handler(param)
    })
  },
  $on(channelId, handler) {
    var callback = function (param) {
      // 消息拦截
      if (channelId == 'dialogVisible') {
        //
      }
      handler(param)
    }
    hub.$on(channelId, callback)
    return callback
  },
  $emit(channelId, param) {
    // 消息拦截
    if (channelId == 'dialogVisible') {
      //
    }
    hub.$emit(channelId, param)
  },
  // 如果没有提供参数，则移除所有的事件监听器；
  // 如果只提供了事件，则移除该事件所有的监听器；
  // 如果同时提供了事件与回调，则只移除这个回调的监听器。
  $off(channelId, callback) {
    if (!channelId) {
      hub.$off()
    } else if (!callback) {
      hub.$off(channelId)
    } else {
      hub.$off(channelId, callback)
    }
  }
}

export default msgHub
