/**
 * @filename
 * @authors remy
 * @creatTime 2017-09-19 15:57:09
 * @description 时间格式转换
 * @version 0.1.0
 */
import util from '../typeJudge/index.js'

export default {
  /* 获取当前时刻年月日 */
  getNowDate: function (sign, isAll) {
    var date = new Date();
    return this.formatDateToStr(date, sign, isAll);
  },
  /**
   * @name getNowTimestamp
   * @param
   * @return String
   * @author remy
   * @description 获取当前日期的时间戳
   * @createTime 2016年4月6日 下午4:52:19
   */
  getNowTimestamp: function () {
    var date = new Date();
    return date.getTime();
  },
  /**
   * @param date { Date }
   * @param sign { String }
   * @param isAll { Boolean }
   * @return String
   * @description 将日期格式化成年月日
   * @createTime 2017.10.10
   */
  formatDateToStr(date, sign, isAll) {
    if (util.isBoolean(sign) && sign) {
      isAll = true;
      sign = '-';
    }
    !util.isString(sign) && (sign = '-');
    var month = date.getMonth() + 1;
    var day = date.getDate();
    month < 10 ? month = "0" + month : "";
    day < 10 ? day = "0" + day : "";
    if (isAll) {
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      hour < 10 && (hour = '0' + hour);
      minute < 10 && (minute = '0' + minute);
      second < 10 && (second = '0' + second);
      return date.getFullYear() + sign + month + sign + day + ' ' + hour + ':' + minute + ':' + second;
    }
    return date.getFullYear() + sign + month + sign + day;
  },
  /**
   * @param timestamp { Number }
   * @param sign { String }
   * @param isAll { Boolean }
   * @return String
   * @description 将时间戳格式化成年月日
   * @createTime 2017.10.10
   */
  formatTimestampToStr(timestamp, sign, isAll) {
    if (util.isNumber(timestamp) && String(timestamp).length == 13) {
      var date = new Date(timestamp);
      return this.formatDateToStr(date, sign, isAll);
    }
  },
  /**
   * 将指定日期转化成时间戳
   * @param param : json or "yyyy/mm/dd" 、 "yyyy-mm-dd" 、"yyyy-mm-dd hh:ii:ss"
   * @update 2017.1.20
   */
  formatDateToTimestamp: function (param) {
    if (util.isDate(param)) {
      return Date.parse(param);
    }

    var date;
    util.isString(param) && (date = new Date(param));
    if (util.isDate(date)) {
      return Date.parse(date);
    }

    if (util.isObject(param)) {
      date = param;
      if (!date.hour) {
        return Date.UTC(date.year, date.month - 1, date.day);
      } else {
        return Date.UTC(date.year, date.month - 1, date.day, date.hour + (new Date()).getTimezoneOffset() / 60, date.minute || 0, date.second || 0);
      }
    }

    if (!param) return Date.parse(new Date());
  },
  /**
   * 解析str to 年月日json
   * @param str
   */
  parseDate: function (str) {
    var arr, date = {};
    if (str.indexOf("-") > -1) arr = str.split("-");
    if (str.indexOf("/") > -1) arr = str.split("/");
    for (var i = 0, len = arr.length; i < len; i++) {
      switch (i) {
        case 0:
          date.year = arr[i];
          break;
        case 1:
          date.month = arr[i];
          break;
        case 2:
          date.day = arr[i];
          break;
      }
    }
    return date;
  }
}
