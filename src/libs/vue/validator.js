/**
 * @filename validator.js
 * @authors remy
 * @creatTime 2017-07-20 14:00:28
 * @description 基于vue的校验器
 * @version 0.0.1
 */

import rge from '../regExp.js';

export default {
  // 手机
  mobile: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('请输入手机号')) : callback();
    } else {
      // var rge = /^(13[0-9]|14[5|7]|15[0-35-9]|17[06-8]|18[0-9])\d{8}$/;
      if (!rge.mobile.test(value)) {
        callback(new Error('手机号格式错误'));
      } else {
        callback();
      }
    }
  },
  // 座机
  telephone: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('请输入电话号码')) : callback();
    } else {
      // var rge = /^0[1-9]\d{1,2}-?\d{7,8}$/;
      if (!rge.telephone.test(value)) {
        callback(new Error('电话号码格式错误'));
      } else {
        callback();
      }
    }
  },
  email: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('请输入邮箱')) : callback();
    } else {
      // var rge = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!rge.email.test(value)) {
        callback(new Error('邮箱格式错误'));
      } else {
        callback();
      }
    }
  },
  website: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('请输入网址')) : callback();
    } else {
      // var rge = /^[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_%&\?\/.=]+$/;
      if (!rge.website.test(value)) {
        callback(new Error('网址格式错误'));
      } else {
        callback();
      }
    }
  },
  imgURL: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('图片地址不能为空')) : callback();
    } else {
      // var rge = /^[A-Za-z]+:\/\/[A-Za-z0-9-_.]+[:0-9][A-Za-z0-9-_%&\?\/.=]+\.(jpeg|jpg|png)$/;
      if (!rge.imgURL.test(value)) {
        callback(new Error('图片地址格式错误，只能是jpg、png图片'));
      } else {
        callback();
      }
    }
  },
  vedioURL: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('视频地址不能为空')) : callback();
    } else {
      // var rge = /^[A-Za-z]+:\/\/[A-Za-z0-9-_.]+[:0-9][A-Za-z0-9-_%&\?\/.=]+\.(avi|navi|dvavi|mpeg|divx|mov|asf|wmv|rm|revb|mtv|3gp|mp4)$/;
      if (!rge.vedioURL.test(value)) {
        callback(new Error('视频地址格式错误'));
      } else {
        callback();
      }
    }
  },
  chinese: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('不能为空')) : callback();
    } else {
      // var rge = /^[\u4E00-\u9FA5\uF900-\uFA2D]{1,}$/;
      if (!rge.chinese.test(value)) {
        callback(new Error('输入内容只能包含中文'));
      } else {
        callback();
      }
    }
  },
  loginName: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入登录名'));
    } else {
      // var rge = /^[a-zA-Z][0-9a-zA-Z]{1,}$/;
      if (!rge.loginName.test(value)) {
        callback(new Error('输入内容必须是字母、数字，且以字母开头'));
      } else {
        callback();
      }
    }
  },
  pwd: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入密码'));
    } else {
      // var rge = /^[a-z0-9A-Z\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]{6,20}$/;
      if (!rge.pwd.test(value)) {
        callback(new Error('密码由6-20个字母、数字、符号组成，且至少包含两种'));
      } else {
        var count = 0,//包含一下三种的几种
          hasNumber = rge.hasNumber.test(value),//包含数字(/.*\d+.*/)
          hasLetter = rge.hasLetter.test(value),//包含字母(/.*[a-zA-Z]+.*/)
          hasSymbol = rge.hasSymbol.test(value);//包含标点符号(/.*[\u0020-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]+.*/)
        hasNumber && count++;
        hasLetter && count++;
        hasSymbol && count++;
        if (count < 2) {
          callback(new Error('密码由6-20个字母、数字、符号组成，且至少包含两种'));
        } else {
          callback();
        }
      }
    }
  },
  easyPwd: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入密码'));
    } else {
      // var rge = /^[0-9a-zA-Z]{6,20}$/;
      if (!rge.easyPwd.test(value)) {
        callback(new Error('密码由6-20个字母、数字组成'));
      } else {
        callback();
      }
    }
  },
  code: (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入验证码'));
    } else {
      // var rge = /^[0-9a-zA-Z]{4}$/;
      if (!rge.code.test(value)) {
        callback(new Error('验证码由6个数字组成'));
      } else {
        callback();
      }
    }
  },
  equipNumber: (rule, value, callback) => {
    if (!value) {
      rule.required ? callback(new Error('设备序列号不能为空')) : callback();
    } else {
      if (rge.chinese.test(value)) {
        callback(new Error('设备序列号不能包含中文'));
      }else if (!rge.equipNumber.test(value)) {
        callback(new Error('设备序列号由字母、数字组成，最多32位'));
      } else {
        callback();
      }
    }
  }
}
