webpackJsonp([29],{LplH:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("Gu7T"),o=i.n(n),s=i("mvHQ"),r=i.n(s),a=i("Xxa5"),c=i.n(a),l=i("exGp"),d=i.n(l),u=i("rajo"),m=i("CWYl"),f={"350_350":{width:350,height:350},"470_180":{width:470,height:180},"230_160":{width:230,height:160}},p={components:{Add:u.a},created:function(){var t=this;return d()(c.a.mark(function e(){var i;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(m.b)({type:t.type}).then(function(t){return t.data});case 2:i=e.sent,t.change(i.records);case 4:case"end":return e.stop()}},e,t)}))()},data:function(){return{type:2,width:350,height:350,prefix:"",imgs:[]}},methods:{add:function(t,e){var i=this.$refs.dialog;i.dialogFormVisible=!0,i.dialogStatus="add",i.resetForm("form",function(){i.form.type=2,i.form.area=e}),this.width=f[t].width,this.height=f[t].height,this.prefix="recommended-"+e},remove:function(t){var e=this;this.$confirm("确定执行当前操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(m.a)(e.imgs[t].id).then(function(i){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3}),e.imgs.splice(t,1,void 0)})})},edit:function(t,e){var i=this,n=this.$refs.dialog;n.dialogFormVisible=!0,n.dialogStatus="update",this.width=f[t].width,this.height=f[t].height,n.resetForm("form",function(){n.form=JSON.parse(r()(i.imgs[e])),n.form.type=2,n.form.area=e,i.prefix="recommended-"+e})},success:function(t){this.imgs[t.area]=t,this.imgs=[].concat(o()(this.imgs))},change:function(t){var e=[];t.forEach(function(t){e[t.area]=t}),e[0]={},this.imgs=e}}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"exchange"},[i("div",{staticClass:"box"},[i("div",{staticClass:"mod-1"},[t.imgs[1]?i("img",{attrs:{src:t._f("setImg")(t.imgs[1].imgUrl),width:"100%",height:"100%"}}):t._e(),t._v(" "),i("div",{staticClass:"upload"},[t.imgs[1]?[i("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit("350_350",1)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(e){t.remove(1)}}},[t._v("删除")])]:i("el-button",{attrs:{type:"text"},on:{click:function(e){t.add("350_350",1)}}},[t._v("添加")])],2)]),t._v(" "),i("div",{staticClass:"wrap-2"},[i("div",{staticClass:"mod-3"},[t.imgs[2]?i("img",{attrs:{src:t._f("setImg")(t.imgs[2].imgUrl),width:"100%",height:"100%"}}):t._e(),t._v(" "),i("div",{staticClass:"upload"},[t.imgs[2]?[i("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit("470_180",2)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(e){t.remove(2)}}},[t._v("删除")])]:i("el-button",{attrs:{type:"text"},on:{click:function(e){t.add("470_180",2)}}},[t._v("添加")])],2)]),t._v(" "),i("div",{staticClass:"wrap-4"},[i("div",{staticClass:"mod-5"},[t.imgs[3]?i("img",{attrs:{src:t._f("setImg")(t.imgs[3].imgUrl),width:"100%",height:"100%"}}):t._e(),t._v(" "),i("div",{staticClass:"upload"},[t.imgs[3]?[i("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit("230_160",3)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(e){t.remove(3)}}},[t._v("删除")])]:i("el-button",{attrs:{type:"text"},on:{click:function(e){t.add("230_160",3)}}},[t._v("添加")])],2)]),t._v(" "),i("div",{staticClass:"mod-5"},[t.imgs[4]?i("img",{attrs:{src:t._f("setImg")(t.imgs[4].imgUrl),width:"100%",height:"100%"}}):t._e(),t._v(" "),i("div",{staticClass:"upload"},[t.imgs[4]?[i("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit("230_160",4)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(e){t.remove(4)}}},[t._v("删除")])]:i("el-button",{attrs:{type:"text"},on:{click:function(e){t.add("230_160",4)}}},[t._v("添加")])],2)])])]),t._v(" "),i("div",{staticClass:"mod-1"},[t.imgs[5]?i("img",{attrs:{src:t._f("setImg")(t.imgs[5].imgUrl),width:"100%",height:"100%"}}):t._e(),t._v(" "),i("div",{staticClass:"upload"},[t.imgs[5]?[i("el-button",{attrs:{type:"text"},on:{click:function(e){t.edit("350_350",5)}}},[t._v("修改")]),t._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(e){t.remove(5)}}},[t._v("删除")])]:i("el-button",{attrs:{type:"text"},on:{click:function(e){t.add("350_350",5)}}},[t._v("添加")])],2)])]),t._v(" "),i("Add",{ref:"dialog",attrs:{type:t.type,width:t.width,height:t.height,prefix:t.prefix},on:{success:t.success}})],1)},staticRenderFns:[]};var h=i("VU/8")(p,g,!1,function(t){i("YR3j")},"data-v-2327c331",null);e.default=h.exports},YR3j:function(t,e,i){var n=i("taI/");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("1f62d354",n,!0)},rajo:function(t,e,i){"use strict";var n=i("Oakg"),o=i("CWYl"),s={components:{ImageCropper:n.a},props:{prefix:String,type:Number,width:Number,height:Number},data:function(){return{cropShow:!1,loading:!1,dialogStatus:"",dialogFormVisible:!1,form:{targetUrl:void 0,imgUrl:void 0,type:this.type},rules:{imgUrl:[{required:!0,message:"请上传图片",trigger:"blur"}],targetUrl:[{required:!0,message:"请输入链接地址",trigger:"blur"}]}}},methods:{create:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.loading=!0,("add"===e.dialogStatus?o.d:o.c)(e.form).then(function(t){e.dialogFormVisible=!1,e.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3}),e.success(t.data)}).catch(function(){e.loading=!1})})},resetForm:function(t,e){var i=this;this.$nextTick(function(){i.$refs[t].resetFields(),setTimeout(function(){e&&e()})})},cancel:function(){this.dialogFormVisible=!1,this.resetForm("form")},success:function(t){this.loading=!1,this.$emit("success",t)},uploadSuccess:function(t){var e=t.key;this.form.imgUrl=e,this.cropShow=!1,this.$refs.cropper.setStep(1)}}},r={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"新增/修改",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"图片内容",prop:"imgUrl"}},[t.form.imgUrl?i("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[i("img",{staticClass:"image",attrs:{src:t._f("setImg")(t.form.imgUrl),width:"100%"}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("div",{staticClass:"bottom clearfix"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){t.form.imgUrl=""}}},[t._v("删除")])],1)])]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.cropShow=!0}}},[t._v("上传")]),t._v(" "),i("ImageCropper",{ref:"cropper",attrs:{noCircle:!0,noSquare:!0,withCredentials:!0,imgFormat:"jpg",width:t.width,height:t.height,prefix:t.prefix},on:{"crop-upload-success":t.uploadSuccess},model:{value:t.cropShow,callback:function(e){t.cropShow=e},expression:"cropShow"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"链接地址",prop:"targetUrl"}},[i("el-input",{model:{value:t.form.targetUrl,callback:function(e){t.$set(t.form,"targetUrl",e)},expression:"form.targetUrl"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.cancel("form")}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.create("form")}}},[t._v("确 定")])],1)],1)},staticRenderFns:[]},a=i("VU/8")(s,r,!1,null,null,null);e.a=a.exports},"taI/":function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,'\n.box[data-v-2327c331] {\n  width: 1190px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-transform: scale(0.8);\n          transform: scale(0.8);\n}\n.box [class*="mod-"][data-v-2327c331] {\n  position: relative;\n  background: #efefef;\n}\n.box .mod-1[data-v-2327c331] {\n  width: 350px;\n  height: 350px;\n}\n.box .wrap-2[data-v-2327c331] {\n  width: 470px;\n  height: 100%;\n}\n.box .mod-3[data-v-2327c331] {\n  width: 100%;\n  height: 180px;\n}\n.box .wrap-4[data-v-2327c331] {\n  margin-top: 10px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.box .mod-5[data-v-2327c331] {\n  width: 230px;\n  height: 160px;\n}\n.box .upload[data-v-2327c331] {\n  position: absolute;\n  right: 15px;\n  bottom: 15px;\n  z-index: 4;\n}\n',""])}});