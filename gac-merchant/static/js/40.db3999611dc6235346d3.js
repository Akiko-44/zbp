webpackJsonp([40],{Dycb:function(e,t,r){(e.exports=r("FZ+f")(!1)).push([e.i,"\n.image[data-v-5ecb6c72] {\n  max-width: 80%;\n  max-height: 100%;\n  display: block;\n  margin: 10px auto 0;\n}\n",""])},LXPb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Xxa5"),n=r.n(a),o=r("exGp"),i=r.n(o),l=r("azTv"),s=r("cAgV"),u=r("TAej"),c=r("5aCZ"),m={directives:{waves:s.a},data:function(){return{loading:!1,categroies:[{value:1,label:"精品专题"},{value:2,label:"玉雕臻选"},{value:3,label:"流行风尚"}],form:{id:void 0,title:"",subtitle:"",thumbnail:"",keyword:"",summary:"",content:"",type:""},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],subtitle:[{required:!0,message:"请输入子标题",trigger:"blur"}],summary:[{required:!0,message:"请填写内容摘要",trigger:"blur"}],thumbnail:[{required:!0,message:"请上传缩略图",trigger:"blur"}],content:[{required:!0,message:"请填写正文内容",trigger:"blur"}],type:[{required:!0,message:"请选择所属栏目",trigger:"change"}]},editStatus:!0}},beforeRouteLeave:function(e,t,r){this.onbeforeunloadHandler(r)},beforeRouteEnter:function(e,t,r){var a=this;return i()(n.a.mark(function t(){var o;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(o=void 0,!e.query.id){t.next=5;break}return t.next=4,Object(l.c)(e.query.id).then(function(e){return e.data});case 4:o=t.sent;case 5:r(function(e){setTimeout(function(){o&&(e.form=o)},10)});case 6:case"end":return t.stop()}},t,a)}))()},methods:{save:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return e.$notify({title:"警告",message:"请务必填写必选项",type:"warning"}),e.loading=!1,!1;e.loading=!0,Object(l.e)(e.form).then(function(t){e.editStatus=!1,e.$notify({title:"成功",message:"提交成功",type:"success",duration:2e3}),e.$router.push({name:"list"}),e.loading=!1}).catch(function(){e.loading=!1})})},reset:function(){this.$refs.form.resetFields()},uploadSuccess:function(e){this.form.thumbnail=e[e.length-1].key},onbeforeunloadHandler:function(e){this.editStatus?window.confirm("确定要放弃当前的操作吗？")?e():e(!1):e()}},components:{ImageUpload:u.a,Tinymce:c.a}},f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app-container",staticStyle:{"padding-right":"40px"}},[r("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"副标题",prop:"subtitle"}},[r("el-input",{attrs:{placeholder:"请输入副标题"},model:{value:e.form.subtitle,callback:function(t){e.$set(e.form,"subtitle",t)},expression:"form.subtitle"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所属栏目",prop:"type"}},[r("el-select",{attrs:{clearable:"",placeholder:"所属栏目"},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.categroies,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"缩略图",prop:"thumbnail"}},[e.form.thumbnail?r("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[r("img",{staticClass:"image",attrs:{src:e._f("setImg")(e.form.thumbnail)}}),e._v(" "),r("div",{staticStyle:{padding:"14px"}},[r("div",{staticClass:"bottom clearfix"},[r("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){e.form.thumbnail=""}}},[e._v("删除")])],1)])]):e._e(),e._v(" "),r("ImageUpload",{directives:[{name:"show",rawName:"v-show",value:!e.form.thumbnail,expression:"!form.thumbnail"}],attrs:{multiple:!1,prefix:"news"},on:{successCBK:e.uploadSuccess}})],1),e._v(" "),r("el-form-item",{attrs:{label:"关键字",prop:"keyword"}},[r("el-input",{attrs:{placeholder:'如不填写自动获取，手动填写请用","分开'},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"内容摘要",prop:"summary"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5}},model:{value:e.form.summary,callback:function(t){e.$set(e.form,"summary",t)},expression:"form.summary"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"正文内容",prop:"content"}},[r("Tinymce",{ref:"editor",attrs:{height:500},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.save}},[e._v("提交审核")])],1)],1)],1)},staticRenderFns:[]};var d=r("VU/8")(m,f,!1,function(e){r("v/xu")},"data-v-5ecb6c72",null);t.default=d.exports},azTv:function(e,t,r){"use strict";t.d=function(e){return Object(a.a)({url:"/admin/gallery/subject/page",method:"get",params:e})},t.c=function(e){return Object(a.a)({url:"/admin/gallery/subject/detail/"+e,method:"get"})},t.b=function(e){return Object(a.a)({url:"/admin/gallery/subject/delete/"+e+"/",method:"post"})},t.e=function(e){return Object(a.a)({url:"/admin/gallery/subject/saveOrUpdate",method:"post",data:e})},t.a=function(e,t){return Object(a.a)({url:"/admin/gallery/subject/audit/"+e+"/"+t,method:"post"})};var a=r("vLgD")},"v/xu":function(e,t,r){var a=r("Dycb");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("rjj0")("7d2c1fbf",a,!0)}});