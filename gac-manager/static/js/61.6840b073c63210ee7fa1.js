webpackJsonp([61],{"3bQU":function(e,t,n){var i=n("e/6s");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("ed91efe6",i,!0)},"8IlM":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Xxa5"),r=n.n(i),o=n("//Fk"),a=n.n(o),s=n("d7EF"),c=n.n(s),l=n("exGp"),u=n.n(l),d=n("IM3O"),f=n("cAgV"),m=n("TAej"),p=n("5aCZ"),h={name:"editMsg",directives:{waves:f.a},data:function(){return{loading:!1,checked:[],checkList:[{id:"0",menu:"PC"},{id:"1",menu:"APP"},{id:"2",menu:"珠宝店商家"},{id:"3",menu:"设计室商家"},{id:"4",menu:"制造间商家"}],form:{id:void 0,title:"",position:"",content:""},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"},{min:0,max:20,message:"长度在 0 到 20 个字符",trigger:"blur"}],content:[{required:!0,message:"请填写正文内容",trigger:"blur"},{min:0,max:1e3,message:"长度在 0 到 1000 个字符",trigger:"blur"}]},editStatus:!0}},beforeRouteLeave:function(e,t,n){this.onbeforeunloadHandler(n)},beforeRouteEnter:function(e,t,n){var i=this;return u()(r.a.mark(function t(){var o,s,l,u,f;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=[],e.query.id&&o.push(Object(d.c)(e.query.id).then(function(e){return e.data})),t.next=4,a.a.all(o);case 4:s=t.sent,l=c()(s,2),u=l[0],f=l[1],n(function(e){setTimeout(function(){e.categories=u,f&&(delete f.propIds,delete f.props,delete f.columns,e.form=f)},10)});case 9:case"end":return t.stop()}},t,i)}))()},methods:{test:function(){this.form.position=this.checked.join(",")},save:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return e.$notify({title:"警告",message:"请务必填写必选项",type:"warning"}),!1;e.loading=!0,Object(d.e)(e.form).then(function(t){e.editStatus=!1,e.$notify({title:"成功",message:"提交成功",type:"success",duration:2e3}),e.$router.push({name:"msglist"}),e.loading=!1}).catch(function(){e.loading=!1})})},reset:function(){this.$refs.form.resetFields()},uploadSuccess:function(e){this.form.thumbnail=e[e.length-1].key},onbeforeunloadHandler:function(e){this.editStatus?window.confirm("确定要放弃当前的操作吗？")?e():e(!1):e()}},components:{ImageUpload:m.a,Tinymce:p.a}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container",staticStyle:{"padding-right":"40px"}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"标题",prop:"title"}},[n("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"正文内容",prop:"content"}},[n("Tinymce",{ref:"editor",attrs:{height:500},model:{value:e.form.content,callback:function(t){e.$set(e.form,"content",t)},expression:"form.content"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"发布位置"}},[n("el-checkbox-group",{on:{change:e.test},model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},e._l(e.checkList,function(t){return n("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.menu))])}))],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.save()}}},[e._v("提交")])],1)],1)],1)},staticRenderFns:[]};var b=n("VU/8")(h,g,!1,function(e){n("3bQU")},"data-v-5e2925b3",null);t.default=b.exports},"e/6s":function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.image[data-v-5e2925b3] {\n    max-width: 80%;\n    max-height: 100%;\n    display: block;\n    margin: 10px auto 0;\n}\n",""])}});