/**
 * @filename other.js
 * @authors remy
 * @creatTime 2017-12-12 15:32:11
 * @description 其他零碎的方法集
 * @version 0.0.1
 */

export default {
	getByteLength(str){
		var rge = /[^\x00-\xff]/g;//匹配双字节
		var result = str.match(rge);
		var cHlen = !result  ? 0 : result.join("").length;//中文长度
		return cHlen + str.length;//字节长度
	}
}