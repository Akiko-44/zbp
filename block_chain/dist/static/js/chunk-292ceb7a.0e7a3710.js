(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-292ceb7a"],{"0ac8":function(e,o,t){},2017:function(e,o,t){"use strict";var s=t("b12d"),r=t.n(s);r.a},"9ed6":function(e,o,t){"use strict";t.r(o);var s=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"login-container"},[t("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,autocomplete:"on","label-position":"left"}},[t("div",{staticClass:"title-container"},[t("h3",{staticClass:"title"},[e._v("千度真区块链管理平台")])]),e._v(" "),t("el-form-item",{attrs:{prop:"username"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),t("el-input",{ref:"username",attrs:{placeholder:"手机号",name:"username",type:"text",tabindex:"1",autocomplete:"on"},model:{value:e.loginForm.username,callback:function(o){e.$set(e.loginForm,"username",o)},expression:"loginForm.username"}})],1),e._v(" "),t("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:e.capsTooltip,callback:function(o){e.capsTooltip=o},expression:"capsTooltip"}},[t("el-form-item",{attrs:{prop:"password"}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),t("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(o){e.capsTooltip=!1}},nativeOn:{keyup:[function(o){return e.checkCapslock(o)},function(o){return!o.type.indexOf("key")&&e._k(o.keyCode,"enter",13,o.key,"Enter")?null:e.handleLogin(o)}]},model:{value:e.loginForm.password,callback:function(o){e.$set(e.loginForm,"password",o)},expression:"loginForm.password"}}),e._v(" "),t("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[t("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1)],1),e._v(" "),e.count>3?t("el-form-item",{attrs:{prop:"verifyCode"}},[t("el-col",{attrs:{span:2}},[t("span",{staticClass:"svg-container"},[t("svg-icon",{attrs:{"icon-class":"picture"}})],1)]),e._v(" "),t("el-col",{attrs:{span:16}},[t("el-input",{attrs:{name:"code",type:"text","auto-complete":"on",placeholder:"验证码"},model:{value:e.loginForm.verifyCode,callback:function(o){e.$set(e.loginForm,"verifyCode",o)},expression:"loginForm.verifyCode"}})],1),e._v(" "),t("el-col",{attrs:{span:6}},[t("img",{staticStyle:{display:"block",float:"right","border-radius":"0 5px 5px 0",height:"47px"},attrs:{src:e.code.url},on:{click:function(o){e.code=e.getVerifyCode()}}})])],1):e._e(),e._v(" "),t("span",{staticClass:"forget-password",on:{click:e.toForgetPassword}},[e._v("忘记密码")]),e._v(" "),t("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(o){return o.preventDefault(),e.handleLogin(o)}}},[e._v("登录")])],1)],1)},r=[],n=(t("ac6a"),t("456d"),t("c24f")),i={name:"Login",data:function(){return{loginForm:{username:"",password:"",verifyCode:void 0,codeUuid:void 0,verify:void 0},loginRules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],verifyCode:[{required:!0,message:"请输入验证码",trigger:"blur"}]},passwordType:"password",capsTooltip:!1,loading:!1,showDialog:!1,redirect:void 0,otherQuery:{},code:Object(n["c"])(),count:1}},watch:{$route:{handler:function(e){var o=e.query;o&&(this.redirect=o.redirect,this.otherQuery=this.getOtherQuery(o))},immediate:!0}},created:function(){},mounted:function(){""===this.loginForm.username?this.$refs.username.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{getVerifyCode:n["c"],checkCapslock:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=e.shiftKey,t=e.key;t&&1===t.length&&(this.capsTooltip=!!(o&&t>="a"&&t<="z"||!o&&t>="A"&&t<="Z")),"CapsLock"===t&&!0===this.capsTooltip&&(this.capsTooltip=!1)},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(o){if(!o)return!1;e.loading=!0,e.loginForm.codeUuid=e.loginForm.verifyCode?e.code.uuid:void 0,e.loginForm.verify=e.loginForm.verifyCode?"0":void 0,e.$store.dispatch("user/login",e.loginForm).then((function(o){e.$router.push({path:e.redirect||"/",query:e.otherQuery}),e.loading=!1,location.reload()})).catch((function(){e.count++,e.loading=!1,e.code=Object(n["c"])()}))}))},toForgetPassword:function(){this.$router.push({path:"/forgetPassword"})},getOtherQuery:function(e){return Object.keys(e).reduce((function(o,t){return"redirect"!==t&&(o[t]=e[t]),o}),{})}}},a=i,c=(t("2017"),t("c2a7"),t("2877")),l=Object(c["a"])(a,s,r,!1,null,"02ef18e5",null);o["default"]=l.exports},b12d:function(e,o,t){e.exports={menuText:"#bfcbd9",menuActiveText:"#409EFF",subMenuActiveText:"#f4f4f5",menuBg:"#304156",menuHover:"#263445",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"210px"}},c2a7:function(e,o,t){"use strict";var s=t("0ac8"),r=t.n(s);r.a}}]);