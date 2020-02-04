(function(root, plug) {
  var RULES = {
    name:function(){
      return /^[\u3400-\u9fa5]+$/g.test(this.val())
    },
    email: function() {
      return /^\w+@\w+\.\w+$/g.test(this.val());
    },
    mobile: function() {
      return /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.val());
    },
    password: function() {
        return  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.val())
    },
    IdentifyCard:function(){
        return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.val())
    }
  };
  $.fn[plug] = function(options) {
    if (this.is("form")) {
      return this;
    }
    // 以默认配置为优先，以用户设置为覆盖
    var __der__ = {
      initEvent: "input",
      sign: "dv",
      error: "请输入正确的格式"
    };
    var ret = $.extend({}, __der__, options);
    console.log("ret", ret);
    var keynot = this.find("input");
    
    keynot.on(ret.initEvent, function() {
      console.log('keynot',keynot);
      var _this = $(this);
      var e;
      _this.parent().next('p').remove()
      console.log('34');
      $.each(RULES, function(key, func) {
        var configname = _this.data(ret.sign + "-" + key);
        if (configname) {
          var result = func.call(_this);
          if (!result) {
            e = _this.data(ret.sign + "-" + key + "-error") || __der__.error;
            _this.parent().after("<p style='color: red;margin-left: 54px;margin-bottom: 20px;margin-top: -14px;'>" + e + "</p>");
          }
        }
      });
    });
  };
})(this, "valite");
