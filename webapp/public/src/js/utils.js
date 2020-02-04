;
(function () {

  var Utils = function () {

    this.dom = {
      nodata: '<div class="nodata"><p>暂无数据</p></div>',
      nocomment: '<div class="nocomment"><p>暂无评论哦，快来评论一下吧！</p></div>',
      nosearch: '<p class="nosearch">很遗憾，未搜索到与<span class="red">“搜索词”</span>相关的商品，换个搜索词试试吧</p>'
    };

  };

  //根据url参数名称获取参数的值
  Utils.prototype.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  Utils.prototype.getUrlParamVal = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  //iframe下载文件
  Utils.prototype.download = function (filepath) {
    var iframe = document.getElementById("downloadframe");
    if (iframe) {
      iframe.src = filepath;
    } else {
      iframe = document.createElement("iframe");
      iframe.src = filepath;
      iframe.style.display = "none";
      iframe.id = "downloadframe";
      document.body.appendChild(iframe);
    }
  }

  //返回顶部
  Utils.prototype.goTop = function () {
    $("html, body").stop().animate({
      scrollTop: 0
    }, 300);
  }

  //获取IE版本
  Utils.prototype.getIEVersion = function () {
    var ua = navigator.userAgent,
      matches, tridentMap = {
        '4': 8,
        '5': 9,
        '6': 10,
        '7': 11
      };
    matches = ua.match(/MSIE (\d+)/i);
    if (matches && matches[1]) {
      return +matches[1];
    }
    matches = ua.match(/Trident\/(\d+)/i);
    if (matches && matches[1]) {
      return tridentMap[matches[1]] || null;
    }
    return null;
  }

  //检测浏览器，如果是ie7、ie6 显示提示升级浏览器信息
  Utils.prototype.updateIE = function () {
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
      var b_version = navigator.appVersion;
      var version = b_version.split(";");
      var trim_Version = version[1].replace(/[ ]/g, "");
      if (trim_Version == "MSIE7.0" || trim_Version == "MSIE6.0") {
        window.location.href = "../../system/ie.html";
      }
    }
  }

  //是否是PC端
  Utils.prototype.isPc = function () {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

  //封装ajax
  Utils.prototype.ajax = function (param) {
    //按钮防重复提交
    if (param.el) {
      if (param.el.classList.contains("loadingBtn")) {
        return;
      }
      param.el.classList.add("loadingBtn");
      param.el.disabled = true
    }

    var _url = param.url;
    var _data = param.data || {};
    var _type = !!param.type ? param.type : "post";
    var _async = (typeof param.async) != 'undefined' ? param.async : true;
    //var _contentType = !!param.contentType ? param.contentType : "application/x-www-form-urlencoded";
    var _contentType = !!param.contentType ? param.contentType : "application/json;charset=UTF-8";

    $.ajax({
      url: _url,
      data: _data,
      type: _type,
      dataType: "json",
      cache: false,
      async: _async,
      contentType: _contentType,
      beforeSend: function (request) {
        param.beforeSend && param.beforeSend(request);
        var _t = utils.getCookie("token");
        if (!!_t) {
          request.setRequestHeader("Authorization", _t);
        }
      },
      success: function (data) {
        if (data.code == "9") {
          utils.setCookie("token", "", -1);
          window.location.href = "../../login";
        }
        if (data.success) {
          if (typeof param.success == "function") {
            param.success(data);
          }
        } else {
          if (data.msg != 'Token丢失或者不可用' && data.msg != '内部错误，服务器异常') {
            utils.alert("danger", data.msg)
            param.fail && param.fail(data);
          }
        }
      },
      error: function (res) {
        if (typeof param.error == "function") {
          param.error(res);
        }
        //utils.alert("danger", "系统错误")
      },
      complete: function () {
        param.complete && param.complete();

        //按钮防重复提交
        if (param.el) {
          setTimeout(function () {
            param.el.classList.remove("loadingBtn");
            param.el.disabled = false
          }, 500);
        }

      }
    });
  }

  //uuid
  Utils.prototype.uuid = function (len, radix) {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var chars = CHARS,
      uuid = [],
      i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data. At i==19 set the high bits of clock sequence
      // as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  }

  //获取随机颜色
  Utils.prototype.getRandomColor = function () {
    return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
  }

  //过滤表情
  Utils.prototype.filteremoji = function (content) {
    var ranges = [
      '\ud83c[\udf00-\udfff]',
      '\ud83d[\udc00-\ude4f]',
      '\ud83d[\ude80-\udeff]'
    ];
    var emojireg = content.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
  }

  //计算字节
  Utils.prototype.countByte = function (s) {
    var len = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      //单字节加1   
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  }

  //验证url
  Utils.prototype.isUrl = function (str) {
    return /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
  }

  //过滤XSS攻击
  Utils.prototype.escape = function (str) {
    return String(str).replace(/&(?!\w+;)/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  //设置cookie
  Utils.prototype.setCookie = function (key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
  }

  //设置domain_cookie
  Utils.prototype.setDomainCookie = function (key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/;domain=.gacjc.com";
  }

  //获取cookie
  Utils.prototype.getCookie = function (key) {
    var nameEQ = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0, max = ca.length; i < max; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  //去掉2边空格
  Utils.prototype.trim = function (str) {
    str = typeof str === 'string' ? str : '';
    return str.trim ?
      str.trim() :
      str.replace(/^\s|\s$/g, '');
  }

  //打印日志
  Utils.prototype.log = !!window.console ? window.console.log : function () {}

  //操作localstorage
  Utils.prototype.setLocalItem = function (key, value) {
    if (window.localStorage) {
      localStorage.setItem(key, value);
    } else {
      this.setCookie(key, value, 7);
    }
  }

  Utils.prototype.getLocalItem = function (key) {
    var val = "";
    if (window.localStorage) {
      val = localStorage.getItem(key);
    } else {
      val = this.getCookie(key);
    }
    return val;
  }

  Utils.prototype.removeLocalItem = function (key) {
    if (window.localStorage) {
      localStorage.removeItem(key);
    } else {
      this.setCookie(key, "", -1);
    }
  }

  Utils.prototype.clearLocal = function () {
    if (window.localStorage) {
      localStorage.clear();
    }
  }

  //pc端提示
  Utils.prototype.alert = function (alertClass, message) {
    var alertWrap = $("#alertWrap");
    if (alertWrap.length == 0) {
      $(document.body).append('<div id="alertWrap"></div>');
    }
    var $html = $('<div class="alert alert-' + alertClass + '"><i class="alert-icon-close"></i><div><strong>提示</strong><p>' + message + '</p></div></div>');
    $("#alertWrap").html($html);
    $($html).find(".alert-icon-close").one("click", function () {
      $($html).remove();
    });
    setTimeout(function () {
      $html.queue(function () {
        $($html).addClass('show').dequeue();
      }).delay(3600).queue(function () {
        $($html).removeClass('show').dequeue();
      }).delay(500).queue(function () {
        $($html).remove();
      })
    }, 100);
  }

  //是否是微信客户端
  Utils.prototype.isWx = function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }

  //对象OBJECT操作
  Utils.prototype.extend = function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
        keys = this.allKeys(source),
        l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        //if (!1 || obj[key] === void 0) obj[key] = source[key];
        if (!0 || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  }

  Utils.prototype.isObject = function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  Utils.prototype.allKeys = function (obj) {
    if (!this.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    //if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  }

  /*
	  	字符串转成json
		字符串:"name=123&telephone=123&email=123&content=123"
		json: {
			name: 123,
			telephone: 123,
			email: 123,
			content: 123
		}
	*/
  Utils.prototype.str2json = function (str) {
    var arr = str.split("&");
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].split("=")[0];
      var val = decodeURIComponent(arr[i].split("=")[1]);
      if (val != "") {
        obj[key] = val;
      }
    }
    return obj;
  }

  Utils.prototype.formatImg = function (url) {
    if (typeof url == "undefined" && !url) {
      return "";
    } else if (url.indexOf("pa95ui71l.bkt.clouddn.com") != -1) {
      return url.replace('pa95ui71l.bkt.clouddn.com', 'image.gacjc.com');
    } else if (url.indexOf("http") == 0 || url.indexOf("../../") == 0) {
      return url;
    } else {
      return "http://image.gacjc.com/" + url
    }
  }

  Utils.prototype.formatUrl = function (str) {
    if (str.indexOf("http") == 0) {
      return str
    } else {
      return "http://" + str;
    }
  }

  //阻止事件冒泡
  Utils.prototype.stopBubble = function (e) {
    if (e && e.stopPropagation) { //非IE 
      e.stopPropagation();
    } else { //IE 
      window.event.cancelBubble = true;
    }
  }

  //新旧程度
  Utils.prototype.formatDep = function (str) {
    var text = "";
    if (str == 3) {
      text = "三成以下"
    } else if (str == 4) {
      text = "四成新"
    } else if (str == 5) {
      text = "五成新"
    } else if (str == 6) {
      text = "六成新"
    } else if (str == 7) {
      text = "七成新"
    } else if (str == 8) {
      text = "八成新"
    } else if (str == 9) {
      text = "九成新"
    } else if (str == 10) {
      text = "全新"
    }
    return text;
  }

  /* *
   * 手机号隐藏
   * */
  Utils.prototype.phoneHide = function (str) {
    var str1 = str.substring(3, 7)
    return str.replace(str1, '****')
  }

  /* *
   * 截取小能客服ID
   * */
  Utils.prototype.kefuStr = function (str) {
    var str2 = str.split("_")
    return str2[1]
  }

  /**
   * 判断是否收藏 boolean
   * */
  Utils.prototype.checkCollect = function (id, source, callback) {
    if (!utils.islogin()) {
      return false;
    }
    utils.ajax({
      type: 'post',
      url: '/api/userCenter/collect/check/' + id + '/' + source,
      // data: JSON.stringify({merchantId: merchantId}),
      success: function (data) {
        if (!data.data) {
          callback && callback()
        } else {
          console.log(data.msg)
        }
      }
    })
  }


  /**
   * 保留两位小数
   * */
  Utils.prototype.keepTwoDecimalFull = function (num) {
    var result = parseFloat(num);
    if (isNaN(result)) {
      /*'传递参数错误，请检查！'*/
      return false;
    }
    result = Math.round(num * 100) / 100;
    var s_x = result.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0';
    }
    return s_x;
  }

  window.utils = new Utils();

}());

$(function () {

  $(document).on("click.dropdown", ".dropdown .dropdown-toggle", function (e) {

    //下拉菜单
    e.preventDefault();
    e.stopPropagation();

    var self = $(e.currentTarget);
    if (self.is('.disabled, :disabled')) return;
    var parent = self.parent();
    if (parent.hasClass("open")) {
      parent.removeClass("open");
    } else {
      $(".dropdown").each(function () {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
        }
      });
      self.parent().addClass("open");
    }

  }).on("click.dropdown", function () {

    //下拉菜单
    $(".dropdown").each(function () {
      if ($(this).hasClass("open")) {
        $(this).removeClass("open");
      }
    });

  }).on("click.radio", ".radio", function (e) {

    //radio
    e.preventDefault();
    e.stopPropagation();
    var self = $(e.currentTarget);
    if (self.hasClass("disabled")) return;
    if (!self.hasClass("checked")) {
      var name = self.find("input").attr("name");
      $(".radio input[name='" + name + "']").each(function () {
        var input = $(this);
        if (input.parents(".radio").hasClass("checked")) {
          input.parents(".radio").removeClass("checked");
          input.parents(".radio").find("input").prop("checked", true);
        }
      });
      self.addClass("checked");
      self.find("input").prop("checked", true);
    }

  }).on("click.checkbox", ".checkbox", function (e) {

    //checkbox
    e.preventDefault();
    e.stopPropagation();
    var self = $(e.currentTarget);
    if (self.hasClass("disabled")) return;
    if (!self.hasClass("checked")) {
      self.addClass("checked");
      self.find("input").prop("checked", true);
    } else {
      self.removeClass("checked");
      self.find("input").prop("checked", false);
    }

  }).on("focusin", ".select .select-input input", function (e) {

    //select
    var self = $(e.currentTarget);
    var parent = self.parents(".select");
    if (parent.hasClass("disabled")) return;
    if (!parent.hasClass("focused")) {
      parent.addClass("focused")
    }

  }).on("focusout", ".select .select-input input", function (e) {

    //select
    var self = $(e.currentTarget);
    var parent = self.parents(".select");
    if (parent.hasClass("focused")) {
      parent.removeClass("focused")
    }

  }).on("mouseover", ".select .select-input", function (e) {

    //select
    var self = $(e.currentTarget);
    /*if(self.val() != "")*/
    self.addClass("mousein");


  }).on("mouseleave", ".select .select-input", function (e) {

    //select
    var self = $(e.currentTarget);
    self.removeClass("mousein");

  }).on("click", ".select .show-options", function (e) {

    var self = $(e.currentTarget);
    var parent = self.parents(".select");
    if (parent.hasClass("disabled")) return;
    if (!parent.hasClass("focused")) {
      parent.addClass("focused")
    } else {
      parent.removeClass("focused")
    }

  }).on("click", ".switch", function (e) {

    //switch
    e.preventDefault();
    e.stopPropagation();
    var self = $(e.currentTarget);
    if (self.hasClass("disabled")) return;
    if (!self.hasClass("on")) {
      self.addClass("on");
      self.find("input").prop("checked", true);
    } else {
      self.removeClass("on");
      self.find("input").prop("checked", false);
    }

  }).on("click", ".collapse .collapse-item-header", function (e) {

    //collapse
    var self = $(e.currentTarget);
    var parent = self.parent();
    if (parent.hasClass("active")) {
      parent.removeClass("active");
      self.siblings(".collapse-item-body").slideUp();
    } else {
      parent.siblings(".active").find(".collapse-item-body").slideUp();
      parent.siblings(".active").removeClass("active");
      parent.addClass("active");
      self.siblings(".collapse-item-body").slideDown();
    }



  }).on("click", ".dialog .dialog-close", function (e) {

    //dialog
    $(e.currentTarget).parents(".dialog").removeClass("show");
    $('html, body').css({
      'overflow': 'auto'
    })
  }).on("click", ".tab-default .tab-header li", function (e) {

    //tab
    var self = $(e.currentTarget);
    self.addClass("active").siblings().removeClass("active");
    var index = self.index();
    window.g_const.verifyNum = 0;
    self.parents(".tab-default").find(".tab-body-panel:eq(" + index + ")").show().siblings().hide();

  }).on("click", ".tab-primary .tab-header li", function (e) {

    //tab
    var self = $(e.currentTarget);
    self.addClass("active").siblings().removeClass("active");
    var index = self.index();
    self.parents(".tab-primary").find(".tab-body-panel:eq(" + index + ")").show().siblings().hide();

  }).on("click", ".tab-card .tab-header li", function (e) {

    //tab
    var self = $(e.currentTarget);
    self.addClass("active").siblings().removeClass("active");
    var index = self.index();
    self.parents(".tab-card").find(".tab-body-panel:eq(" + index + ")").show().siblings().hide();

  })




}).on("click.selectLi", ".select:not(.multiselect) li[data-val]", function (e) {

  //select下拉框点击
  e.stopPropagation();
  var self = $(e.currentTarget);
  if (self.hasClass("disabled")) {
    return;
  }
  self.addClass("selected").siblings(".selected").removeClass("selected");
  var val = self.attr("data-val");
  var text = self.text();
  if (!!self.attr("data-text")) {
    text = self.attr("data-text");
  }
  self.parents(".select").find(".select-input input").val(text);
  var target = self.parents(".select").attr("target")
  if (!!target) {
    self.parents(".select").find("input[name='" + target + "']").val(val);
    self.parents(".select").find("input[name='" + target + "']").trigger("change");
  }
})


/*
-------------------------------------------------------
日期格式化
示例
alert(new Date().format("yyyy年MM月dd日"));
alert(new Date().format("MM/dd/yyyy"));
alert(new Date().format("yyyyMMdd"));
alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
--------------------------------------------------------
*/
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    "S": this.getMilliseconds() //millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/*
-------------------------------------------------------
base64加密解密
-------------------------------------------------------
var _base64 = function(){

    var self = this;

    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = self._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = self._utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    this._utf8_encode = function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    this._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
//base64加密
function encrypt(str){
	var base64 = new _base64();
    var encrypt = base64.encode(str);
    return encrypt;
}
//base64解密
function decrypt(str){
	var base64 = new _base64();
    var decrypt = base64.decode(str);
    decrypt = escape(decrypt);
    decrypt = decrypt.replace(/%00/g, '');
    decrypt = unescape(decrypt);
    return decrypt;
}
*/