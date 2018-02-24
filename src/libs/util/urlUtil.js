/**
 * @filename urlUtil.js
 * @authors remy
 * @creatTime 2017-12-01 09:44:13
 * @description url相关工具库
 * @version 0.0.1
 */

export default {
  /**
   * @name parseUrl
   * @param url String
   * @return json(含所有url参数)
   * @author remy
   * @description
   * @createTime 2016年3月31日 上午11:47:49
   */
  parseUrl(url) {
    var param = {};
    !url && (url = document.URL);
    var _index1 = url.indexOf("?");
    if (_index1 > -1) {
      var str = url.substring(_index1 + 1);
      var _index2 = str.indexOf("&");
      if (_index2 > -1) {
        //多个参数
        var arr = str.split("&");
        for (var i = 0, len = arr.length; i < len; i++) {
          var _index3 = arr[i].indexOf("=");
          if (_index3 > -1) {
            var arr1_temp = arr[i].split("=");
            param[arr1_temp[0]] = arr1_temp[1];
          }
        }
      } else {
        //单个参数
        var _index4 = str.indexOf("=");
        if (_index4 > -1) {
          var arr2_temp = str.split("=");
          param[arr2_temp[0]] = arr2_temp[1];
        }
      }
    }
    return param;
  },
  openFile(url, filename, target) {
    const link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    link.href = url;
    if(target && _.isString(target))
      link.target = target;
    else
      link.target = '_blank';
    if(filename)
      link.download = filename;

    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
    // link.click();
  }
}
