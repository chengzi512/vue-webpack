/**
 * @filename
 * @authors remy
 * @creatTime 2017-09-19 15:59:41
 * @description 获取文档、浏览器、滚动条等的高宽
 * @version 0.0.1
 */

export default {
  /**
   * @description 获取浏览器的scrollTop
   * @author remy
   * @createTime 2016年6月29日 上午10:00:18
   */
  getScrollTop: function () {
    return document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
  },
  /**
   * @description 获取浏览器滚动条的宽度
   * @author remy
   * @createTime 2016年5月6日 下午3:23:00
   */
  getScrollWidth: function () {
    var noScroll, scroll, oDiv = document.createElement("DIV");
    oDiv.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;";
    noScroll = document.body.appendChild(oDiv).clientWidth;
    oDiv.style.overflowY = "scroll";
    scroll = oDiv.clientWidth;
    document.body.removeChild(oDiv);
    return noScroll - scroll;
  },
  /* 获取chrome/firefox浏览器document高度 */
  getDocumentHeight: function () {
    return document.documentElement.offsetHeight;
  },
  /* 获取设备浏览器显示区域宽度 */
  getClientWidth: function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  },
  /* 获取设备浏览器显示区域高度 */
  getClientHeight: function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  },
  /* 获取网页全文宽度 */
  getDocWidth: function () {
    return document.body.scrollWidth;
  },
  /* 获取网页全文高度 */
  getDocHeight: function () {
    return document.body.scrollHeight;
  }
}
