webpackJsonp([15],{"1HAd":function(n,o,t){var e=t("I/5Y");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);t("rjj0")("0e16b7b2",e,!0)},EcB4:function(n,o,t){(n.exports=t("FZ+f")(!1)).push([n.i,'/* reset element-ui css */\n.login-container {\n  width: 100%;\n  height: 100%;\n  background-image: url("http://7jptea.com1.z0.glb.clouddn.com/login.png");\n  background-size: cover;\n  background-position: center;\n}\n.login-container .el-input {\n    display: inline-block;\n    height: 47px;\n    width: 85%;\n}\n.login-container .el-input input {\n      background: transparent;\n      border: 0px;\n      -webkit-appearance: none;\n      border-radius: 0px;\n      padding: 12px 5px 12px 15px;\n      color: #333;\n      height: 47px;\n}\n.login-container .el-input input:-webkit-autofill {\n        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;\n        -webkit-text-fill-color: #333 !important;\n}\n.login-container .el-form-item {\n    background: #fff;\n    border-radius: 5px;\n    border: 1px solid #dcdcdc;\n}\n',""])},"I/5Y":function(n,o,t){(n.exports=t("FZ+f")(!1)).push([n.i,"\n.login-container[data-v-5bfde4d4] {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  background-color: #2d3a4b;\n}\n.login-container .login-form[data-v-5bfde4d4] {\n    position: absolute;\n    left: 0;\n    right: 0;\n    width: 520px;\n    padding: 35px 35px 15px 35px;\n    margin: 120px auto;\n    background: rgba(255, 255, 255, 0.9);\n}\n.login-container .svg-container[data-v-5bfde4d4] {\n    padding: 6px 5px 6px 15px;\n    color: #889aa4;\n    vertical-align: middle;\n    width: 30px;\n    display: inline-block;\n}\n.login-container .svg-container_login[data-v-5bfde4d4] {\n      font-size: 20px;\n}\n.login-container .title-container[data-v-5bfde4d4] {\n    position: relative;\n}\n.login-container .title-container .title[data-v-5bfde4d4] {\n      font-size: 26px;\n      font-weight: 400;\n      color: #889aa4;\n      margin: 0px auto 40px auto;\n      text-align: center;\n      font-weight: bold;\n      color: #409EFF;\n}\n.login-container .title-container .set-language[data-v-5bfde4d4] {\n      color: #889aa4;\n      position: absolute;\n      top: 5px;\n      right: 0px;\n}\n.login-container .show-pwd[data-v-5bfde4d4] {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #889aa4;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.login-container .thirdparty-button[data-v-5bfde4d4] {\n    position: absolute;\n    right: 35px;\n    bottom: 28px;\n}\n",""])},"PW/M":function(n,o,t){var e=t("EcB4");"string"==typeof e&&(e=[[n.i,e,""]]),e.locals&&(n.exports=e.locals);t("rjj0")("732678b4",e,!0)},"T+/8":function(n,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=t("wAeJ"),i=t("oy+F"),a=t("TIfe"),r={props:{title:{type:String,default:"GAC 公共登录平台"},loginType:{type:Number,default:1}},components:{LangSelect:e.a},name:"login",data:function(){return{loginForm:{name:"",password:"",verifyCode:"",codeUuid:"",loginType:this.loginType,flag:Object(a.b)()?1:Object(a.c)()?2:void 0},loginRules:{name:[{required:!0,trigger:"blur",validator:function(n,o,t){o.trim()?t():t(new Error("请输入正确的用户名/手机号"))}}],password:[{required:!0,trigger:"blur",validator:function(n,o,t){o.length<6?t(new Error("密码不能小于6位数")):t()}}],verifyCode:[{required:!0,trigger:"blur",validator:function(n,o,t){o.trim()?t():t(new Error("验证码不能为空"))}}]},passwordType:"password",loading:!1,showDialog:!1,code:Object(i.a)()}},methods:{getVerifyCode:i.a,showPwd:function(){"password"===this.passwordType?this.passwordType="":this.passwordType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(o){if(!o)return console.log("error submit!!"),!1;n.loading=!0,n.loginForm.codeUuid=n.code.uuid,n.$store.dispatch("LoginByUsername",n.loginForm).then(function(){n.loading=!1,n.$router.push({path:"/"})}).catch(function(){n.loading=!1,n.code=Object(i.a)()})})}}},l={render:function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:n.loginForm,rules:n.loginRules,"label-position":"left"},nativeOn:{keyup:function(o){if(!("button"in o)&&n._k(o.keyCode,"enter",13,o.key))return null;n.handleLogin(o)}}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[n._v(n._s(n.title))]),n._v(" "),t("lang-select",{staticClass:"set-language"})],1),n._v(" "),t("el-form-item",{attrs:{prop:"name"}},[t("span",{staticClass:"svg-container svg-container_login"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),n._v(" "),t("el-input",{attrs:{name:"name",type:"text",autoComplete:"on",placeholder:"用户名/手机号"},model:{value:n.loginForm.name,callback:function(o){n.$set(n.loginForm,"name",o)},expression:"loginForm.name"}})],1),n._v(" "),t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),n._v(" "),t("el-input",{attrs:{name:"password",type:n.passwordType,autoComplete:"on",placeholder:"密码"},nativeOn:{keyup:function(o){if(!("button"in o)&&n._k(o.keyCode,"enter",13,o.key))return null;n.handleLogin(o)}},model:{value:n.loginForm.password,callback:function(o){n.$set(n.loginForm,"password",o)},expression:"loginForm.password"}}),n._v(" "),t("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[t("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),t("el-form-item",{attrs:{prop:"verifyCode"}},[t("el-col",{attrs:{span:2}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"picture"}})],1)]),n._v(" "),t("el-col",{attrs:{span:16}},[t("el-input",{attrs:{name:"code",type:"text",autoComplete:"on",placeholder:"验证码"},model:{value:n.loginForm.verifyCode,callback:function(o){n.$set(n.loginForm,"verifyCode",o)},expression:"loginForm.verifyCode"}})],1),n._v(" "),t("el-col",{attrs:{span:6}},[t("img",{staticStyle:{display:"block",float:"right","border-radius":"0 5px 5px 0",height:"47px"},attrs:{src:n.code.url},on:{click:function(o){n.code=n.getVerifyCode()}}})])],1),n._v(" "),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{type:"primary",loading:n.loading},nativeOn:{click:function(o){o.preventDefault(),n.handleLogin(o)}}},[n._v(n._s(n.$t("login.logIn")))])],1)],1)},staticRenderFns:[]};var s=t("VU/8")(r,l,!1,function(n){t("PW/M"),t("1HAd")},"data-v-5bfde4d4",null);o.default=s.exports}});