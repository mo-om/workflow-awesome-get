/*!
 * 通用工具函数util.js
 * @author mo-om
 * @namespace util
 * @dependence jQuery
 * @return {Object} 返回通用的util组件接口
 */
;(function(window,document,undefined) {
	var util = (function() {
		return {
			/**
			 * 模拟生成guid
			 * @return {String} 返回模拟生成的guid
			 */
			guid: function () {
				return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
					var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
					return v.toString(16);
				}).toUpperCase();      
			},
			

			/**
			 * 获取web应用的basepath
			 * @return {String} 返回web应用的basepath
			 */ 
			getBasePath: function () {
				var loc = window.location,
					path = loc.protocol + '//' + loc.host + loc.pathname;
				return loc.href.substring(0, path.lastIndexOf('/'));
			},

			/**
			 * 获取url中指定参数的值
			 * @param  {String} name 指定的参数名
			 * @return {String}      返回url中指定参数的值，如果没有则返回空字符串
			 */
			getQueryString: function (name) {
				var reg = new RegExp('(^|\\?|&)'+ name +'=([^&]*)(\\s|&|$)', 'i');  
				return reg.test(location.href) ? unescape(RegExp.$2.replace(/\+/g, ' ')) : '';
			}, 

			/**
			 * 检测某个url是否跨域
			 * @param  {String} url 需要检测的url
			 * @return {Boolean}    检测结果为跨域则返回true，否则返回false
			 */
			isCrossDomain: function (url) {
				var loc = window.location,
					patt = new RegExp('^' + loc.protocol + '//' + loc.host);
				return patt.test(url) ? false : true;
			},

			/**
			 * 在一个字符串中查找指定的字符串从0开始
			 * @param  {String} string 任意指定字符串
			 * @param  {String} word   需要进行对比匹配的字符串
			 * @return {Boolean}       有匹配结果则返回true，否则返回false
			 */
			match: function (string, word) {
				var len = string.length,
					sub = word.substr(0, len);
				return string.toUpperCase() === sub.toUpperCase();
			},

			/**
			 * 提取字符串中body标签之间的内容
			 * @param  {String} html html内容
			 * @return {String}      若有匹配则返回第一个子匹配，否则原样返回
			 */
			 extractor: function (html) {
			 	var patt = /<body[^>]*>((.|[\n\r])*)<\/body>/im,
			 		matches = patt.exec(html);
		 		return matches ? matches[1] : html;
			 },

			/**
			 * 按需载入javascript文件
			 * @param {Array/String} url      javascript文件的url地址
			 * @param {Function}     callback 回调函数
			 */
			loadScript: function (url, callback) {

				// 传入单个文件url时数组不必
				url = (url instanceof Array) ? url : [url];
				callback = callback || function() {};

				var i = 0, len = url.length, last = len - 1,
				head = document.getElementsByTagName('head')[0] || document.documentElement,

				loadNextScript = function (src) {
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = src;
					script.async = true;
					script.onload = script.onreadystatechange = function() {
						// Attach handlers for all browsers
						if(!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
							this.onload = this.onreadystatechange = null;
							this.parentNode.removeChild(this);
							i++;
							i <  len  && loadNextScript(url[i]);
							i == last && callback();
						}
					}
					head.appendChild(script);
				};

				loadNextScript(url[i]);
			}
		}
	})();
	// 暴露接口
	window.util = util;
})(window,document);

util.loadScript([
	'js/store+json2.min.js',
	'js/jquery-1.11.1.min.js',
	'plugins/jquery-tmpl/jquery.tmpl.min.js',
	'plugins/jquery-validate/jquery.validate.min.js',
	'plugins/jsPlumb/js/dom.jsPlumb-1.7.4-min.js',
	'plugins/Highcharts/js/highcharts.js',
	'plugins/Highcharts/js/modules/exporting.js',
	'plugins/codemirror/lib/codemirror.js',
	'plugins/codemirror/addon/display/placeholder.js',
	'plugins/codemirror/mode/sql/sql.js',
	'plugins/codemirror/addon/hint/show-hint.js',
	'plugins/codemirror/addon/hint/sql-hint.js',
	'js/app.js?v=1.0.1',
	'js/config-validate.js?v=1.0.1'
],function () {
	var entry = document.getElementById('entry');
	entry.parentNode.removeChild(entry);
});