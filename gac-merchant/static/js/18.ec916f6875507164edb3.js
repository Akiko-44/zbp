webpackJsonp([18],{"1m5u":function(t,e,i){var a=i("g353");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("3f0b7356",a,!0)},A3Vw:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.image[data-v-4965f66a] {\n  display: block;\n  max-width: 100%;\n  height: 200px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.danger[data-v-4965f66a] {\n  color: #F56C6C;\n}\n.el-col-6[data-v-4965f66a] {\n  margin-bottom: 20px;\n}\n",""])},"Y/Av":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Xxa5"),r=i.n(a),o=i("exGp"),n=i.n(o),s=i("PXsz"),l=i("Q0Ca"),c=i("mvHQ"),m=i.n(c),d={components:{ImageCropper:i("Oakg").a},data:function(){return{cropShow:!1,width:1080,height:460,showStatus:[{name:"待展示",value:0},{name:"展示中",value:1},{name:"已过期",value:2}],loading:!1,dialogFormVisible:!1,form:{id:void 0,merchantId:void 0,exhibitionId:void 0,imgUrl:void 0,imgName:void 0,imgDesc:void 0,goodsId:void 0},rules:{imgName:[{required:!0,message:"请输入图片名称",trigger:"change"}],imgDesc:[{required:!0,message:"请输入图片描述",trigger:"blur"}],imgUrl:[{required:!0,message:"请上传图片",trigger:"blur"}]}}},methods:{resetForm:function(t,e){var i=this;this.$nextTick(function(){i.$refs[t].resetFields(),setTimeout(function(){e&&e()})})},cancel:function(){this.dialogFormVisible=!1,this.resetForm("form")},success:function(){this.loading=!1,this.$emit("success",JSON.parse(m()(this.form)))},update:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.loading=!0,Object(s.a)(e.form).then(function(){e.dialogFormVisible=!1,e.success()}).catch(function(){e.loading=!1})})},uploadSuccess:function(t){var e=t.key;this.form.imgUrl=e,this.cropShow=!1,this.$refs.cropper.setStep(1)}}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"修改图片",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"图片名称",prop:"imgName"}},[i("el-input",{model:{value:t.form.imgName,callback:function(e){t.$set(t.form,"imgName",e)},expression:"form.imgName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"图片描述",prop:"imgDesc"}},[i("el-input",{model:{value:t.form.imgDesc,callback:function(e){t.$set(t.form,"imgDesc",e)},expression:"form.imgDesc"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"商品ID",prop:"goodsId"}},[i("el-input",{attrs:{placeholder:"不填写则默认不出现商品购买链接"},model:{value:t.form.goodsId,callback:function(e){t.$set(t.form,"goodsId",t._n(e))},expression:"form.goodsId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"图片",prop:"imgUrl"}},[t.form.imgUrl?i("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[i("img",{staticClass:"image",attrs:{src:t._f("setImg")(t.form.imgUrl),width:"100%"}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("div",{staticClass:"bottom clearfix"},[i("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){t.form.imgUrl=""}}},[t._v("删除")])],1)])]):i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.cropShow=!0}}},[t._v("上传")]),t._v(" "),i("ImageCropper",{ref:"cropper",attrs:{noCircle:!0,noSquare:!0,withCredentials:!0,imgFormat:"jpg",width:t.width,height:t.height,prefix:"pic"},on:{"crop-upload-success":t.uploadSuccess},model:{value:t.cropShow,callback:function(e){t.cropShow=e},expression:"cropShow"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.cancel("form")}}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:function(e){t.update("form")}}},[t._v("确 定")])],1)],1)},staticRenderFns:[]},u=i("VU/8")(d,f,!1,null,null,null).exports,p={props:{merchantName:String,merchantId:String,exhibitionId:String},components:{EditShopPicDialog:u},data:function(){return{loading:!1,dialogFormVisible:!1,list:[],index:void 0}},methods:{resetForm:function(t,e){var i=this;this.$nextTick(function(){i.$refs[t].resetFields(),setTimeout(function(){e&&e()})})},cancel:function(){this.dialogFormVisible=!1,this.resetForm("form")},success:function(t){var e=this;this.loading=!1,Object(s.d)(this.merchantId).then(function(t){e.list=t.data})},getImageStyle:function(t){return{backgroundImage:"url("+Object(l.setImg)(t,{w:500})+")"}},handleAdd:function(){var t=this,e=this.$refs.dialog;e.dialogStatus="create",e.dialogFormVisible=!0,e.resetForm("form",function(){e.form.id=void 0,e.form.merchantId=t.merchantId,e.form.exhibitionId=t.exhibitionId}),this.index=this.list.length},handleDelete:function(t){var e=this;this.$confirm("确定删除此图片？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.b)(t.id).then(function(){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var i=e.list.indexOf(t);e.list.splice(i,1)})})},handleUpdate:function(t,e){var i=this.$refs.dialog;i.dialogStatus="update",i.dialogFormVisible=!0,i.resetForm("form",function(){i.form=JSON.parse(m()(t))}),this.index=e}}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-dialog",{attrs:{title:"参展店铺修改",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"form",attrs:{"label-width":"100px"}},[i("el-form-item",{attrs:{label:"参展店铺名"}},[i("span",[t._v(t._s(t.merchantName))])]),t._v(" "),i("el-form-item",{attrs:{label:"店铺ID"}},[i("span",[t._v(t._s(t.merchantId))])]),t._v(" "),i("el-form-item",{attrs:{label:"参展图片"}},[t.list.length?i("el-row",{staticClass:"row"},t._l(t.list,function(e,a){return i("el-col",{key:a,staticClass:"col",attrs:{span:10}},[i("el-card",{attrs:{"body-style":{padding:"0px"}}},[i("a",{staticClass:"image",style:t.getImageStyle(e.imgUrl),attrs:{target:"_blank",href:t._f("setImg")(e.imgUrl)}}),t._v(" "),i("div",{staticStyle:{padding:"14px"}},[i("p",[t._v("图片名称："+t._s(e.imgName))]),t._v(" "),i("p",[t._v("图片描述："+t._s(e.imgDesc))]),t._v(" "),i("div",{staticClass:"bottom clearfix"},[i("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(i){t.handleUpdate(e,a)}}}),t._v(" "),i("el-button",{attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(i){t.handleDelete(e,a)}}})],1)])])],1)})):t._e(),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleAdd}},[t._v("添加图片")])],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.cancel("form")}}},[t._v("确定")])],1)],1),t._v(" "),i("EditShopPicDialog",{ref:"dialog",on:{success:t.success}})],1)},staticRenderFns:[]};var h={components:{ShopDialog:i("VU/8")(p,g,!1,function(t){i("1m5u")},"data-v-fc827986",null).exports},data:function(){return{showStatus:{0:"待展示",1:"展示中",2:"已过期"},form:{merList:[],airscapeList:[],id:void 0},merchantName:"",merchantId:""}},beforeRouteEnter:function(t,e,i){var a=this;return n()(r.a.mark(function e(){var o;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.e)(t.query.id).then(function(t){return t.data});case 2:"string"==typeof(o=e.sent).merList&&(o.merList=[]),i(function(t){setTimeout(function(){t.form=o},10)});case 5:case"end":return e.stop()}},e,a)}))()},methods:{getImageStyle:function(t){return{backgroundImage:"url("+Object(l.setImg)(t,{w:500})+")"}},showDialog:function(t){var e=this;Object(s.d)(t.id).then(function(i){var a=e.$refs.dialog;a.list=i.data,a.dialogFormVisible=!0,e.merchantName=t.merchantName,e.merchantId=t.id})}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container",staticStyle:{"padding-right":"40px"}},[i("el-form",{attrs:{"label-width":"120px"}},[i("el-form-item",{attrs:{label:"展会名称"}},[i("span",[t._v(t._s(t.form.name))])]),t._v(" "),i("el-form-item",{attrs:{label:"展会地址"}},[i("span",[t._v(t._s(t.form.provinceName)+" "+t._s(t.form.cityName)+" "+t._s(t.form.address))])]),t._v(" "),i("el-form-item",{attrs:{label:"头部banner图"}},[i("el-row",{staticClass:"row"},[i("el-col",{staticClass:"col",attrs:{span:6}},[i("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[t.form.banner?i("a",{staticClass:"image",style:t.getImageStyle(t.form.banner),attrs:{target:"_blank",href:t._f("setImg")(t.form.banner)}}):t._e()])],1)],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"显示周期",prop:"caseTypes"}},[i("span",[t._v(t._s(t.form.startTime)+" 至 "+t._s(t.form.endTime))])]),t._v(" "),i("el-form-item",{attrs:{label:"状态"}},[i("span",[t._v(t._s(t.showStatus[t.form.showStatus]))])]),t._v(" "),i("el-form-item",{attrs:{label:"参展店铺总数"}},[i("span",[t._v(t._s(t.form.merList.length)+"家")])]),t._v(" "),i("el-form-item",{attrs:{label:"参展店铺"}},[i("el-table",{staticStyle:{"max-width":"600px"},attrs:{data:t.form.merList,border:""}},[i("el-table-column",{attrs:{align:"center",label:"店铺名"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("span",[t._v(t._s(a.merchantName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.showDialog(a)}}},[t._v("管理")])]}}])})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"展会鸟瞰图",prop:"airscapeList"}},[i("el-row",{directives:[{name:"show",rawName:"v-show",value:t.form.airscapeList.length,expression:"form.airscapeList.length"}],staticClass:"row"},t._l(t.form.airscapeList,function(e,a){return i("el-col",{key:a,staticClass:"col",attrs:{span:6}},[i("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[i("a",{staticClass:"image",staticStyle:{"min-height":"200px"},style:t.getImageStyle(e.airscape),attrs:{target:"_blank",href:t._f("setImg")(e.airscape)}})])],1)}))],1),t._v(" "),i("el-form-item",{attrs:{label:"分类标签"}},t._l(t.form.labelList,function(e,a){return i("el-tag",{key:a,staticStyle:{"margin-right":"10px"}},[t._v(t._s(e.label))])})),t._v(" "),i("el-form-item",{attrs:{label:"创建时间"}},[i("span",[t._v(t._s(t.form.createTime))])]),t._v(" "),i("el-form-item",{attrs:{label:"操作"}},[i("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.$router.push({name:"addExhibition",query:{id:t.form.id}})}}},[t._v("修改")])],1)],1),t._v(" "),i("ShopDialog",{ref:"dialog",attrs:{exhibitionId:t.form.id,merchantName:t.merchantName,merchantId:t.merchantId}})],1)},staticRenderFns:[]};var b=i("VU/8")(h,v,!1,function(t){i("cx4C")},"data-v-4965f66a",null);e.default=b.exports},cx4C:function(t,e,i){var a=i("A3Vw");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("77f6f0df",a,!0)},g353:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.image[data-v-fc827986]{\n  display: block;\n  max-width: 100%;\n  height: 150px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.row[data-v-fc827986] {\n  position: relative;\n  left: -20px;\n  margin-top: 10px;\n}\n.col[data-v-fc827986] {\n  margin-bottom: 20px;\n  margin-left: 20px;\n  max-height: 400px;\n}\n.col p[data-v-fc827986] {\n  margin: 0;\n  height: 39px;\n  line-height: 19px;\n  word-break: break-all;\n  font-size: 14px;\n  overflow : hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n",""])}});