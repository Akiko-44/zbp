webpackJsonp([44],{"+Zza":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.image[data-v-17bcc246] {\n  display: block;\n  max-width: 100%;\n  height: 200px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.danger[data-v-17bcc246] {\n  color: #F56C6C;\n}\n.el-col-6[data-v-17bcc246] {\n  margin-bottom: 20px;\n}\n",""])},Cj9N:function(t,e,a){"use strict";e.d=function(t,e){return Object(n.a)({url:"/admin/designmanu/craft/page",method:"post",data:t,params:e})},e.b=function(t){return Object(n.a)({url:"/admin/designmanu/craft/delete/"+t,method:"post"})},e.c=function(t){return Object(n.a)({url:"/admin/designmanu/craft/info/"+t,method:"get"})},e.a=function(t){return Object(n.a)({url:"/admin/designmanu/craft/audit",method:"post",data:t})};var n=a("vLgD")},VeBs:function(t,e,a){var n=a("+Zza");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("771236ac",n,!0)},YiEN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),o=a("exGp"),i=a.n(o),c=a("Zg3+"),s=a("Cj9N"),l=a("Q0Ca"),d={components:{},data:function(){return{domain:c.a,form:{}}},beforeRouteEnter:function(t,e,a){var n=this;return i()(r.a.mark(function e(){var o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.c)(t.query.id).then(function(t){return t.data});case 2:o=e.sent,a(function(t){setTimeout(function(){t.form=o},10)});case 4:case"end":return e.stop()}},e,n)}))()},methods:{getImageStyle:function(t){return{backgroundImage:"url("+Object(l.setImg)(t,{w:500})+")"}}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container",staticStyle:{"padding-right":"40px"}},[a("el-form",{attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"工艺名称"}},[a("span",[t._v(t._s(t.form.craftName))])]),t._v(" "),a("el-form-item",{attrs:{label:"Logo",prop:"craftLogo"}},[t.form.craftLogo?a("el-row",{staticClass:"row"},[a("el-col",{staticClass:"col",attrs:{span:6}},[a("el-card",{attrs:{"body-style":{padding:"0px"}}},[a("a",{staticClass:"image",style:t.getImageStyle(t.form.craftLogo),attrs:{target:"_blank",href:t._f("setImg")(t.form.craftLogo)}})])],1)],1):t._e()],1),t._v(" "),a("el-form-item",{attrs:{label:"工艺介绍"}},[a("div",{domProps:{innerHTML:t._s(t.form.intro)}})]),t._v(" "),t.form.videoUrl?a("el-form-item",{attrs:{label:"视频介绍"}},[a("video",{staticStyle:{width:"450px",height:"250px"},attrs:{controls:"controls",src:t.domain+"/"+t.form.videoUrl}},[t._v("\n        您的浏览器不支持 html5 video 属性，下载视频查看：\n        "),a("el-button",{attrs:{size:"mini",type:"text"}},[a("a",{attrs:{href:t.domain+"/"+t.form.videoUrl,target:"_blank"}},[t._v("下载视频")])])],1)]):t._e()],1)],1)},staticRenderFns:[]};var m=a("VU/8")(d,u,!1,function(t){a("VeBs")},"data-v-17bcc246",null);e.default=m.exports}});