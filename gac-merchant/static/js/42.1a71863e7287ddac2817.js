webpackJsonp([42],{"/ON8":function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.image[data-v-5afe678f]{\n  display: block;\n  max-width: 100%;\n  height: 280px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.row[data-v-5afe678f] {\n  margin-top: 10px;\n  margin-left: -20px;\n}\n.col[data-v-5afe678f] {\n  margin-bottom: 20px;\n  margin-left: 20px;\n  max-width: 23%;\n  max-height: 400px;\n}\n.col p[data-v-5afe678f] {\n  margin: 0;\n  height: 38px;\n  line-height: 19px;\n  word-break: break-all;\n  font-size: 14px;\n  overflow : hidden;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n}\n.nums[data-v-5afe678f] {\n  margin-top: 4px;\n  float: right;\n  font-size: 12px;\n}\n",""])},"52mC":function(t,e,n){"use strict";e.c=function(t){return Object(a.a)({url:"/admin/gallery/atlas/page",method:"get",params:t})},e.b=function(t){return Object(a.a)({url:"/admin/gallery/atlas/detail/"+t,method:"get"})},e.a=function(t){return Object(a.a)({url:"/admin/gallery/atlas/delete/"+t,method:"post"})},e.d=function(t){return Object(a.a)({url:"/admin/gallery/atlas/saveOrUpdate",method:"post",data:t})};var a=n("vLgD")},Brj2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("52mC"),i=n("cAgV"),l=n("Q0Ca"),s={directives:{waves:i.a},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,title:void 0,picNum:null},status:[{value:1,label:"单图"},{value:2,label:"多图"}]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(a.c)(this.listQuery).then(function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.offset=t,this.getList()},handleDelete:function(t){var e=this;this.$confirm("确定删除当前图集？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(a.a)(t.id).then(function(){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var n=e.list.indexOf(t);e.list.splice(n,1)})})},getImageStyle:function(t){return{backgroundImage:"url("+Object(l.setImg)(t.coverPic,{w:500})+")"}}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container calendar-list-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{attrs:{type:"primary",icon:"edit"},on:{click:function(e){t.$router.push({name:"addAtlas"})}}},[t._v("添加图集")])],1),t._v(" "),n("div",{staticClass:"filter-container"},[n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入标题"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}}),t._v(" "),n("el-select",{attrs:{clearable:"",placeholder:"类别"},model:{value:t.listQuery.picNum,callback:function(e){t.$set(t.listQuery,"picNum",e)},expression:"listQuery.picNum"}},t._l(t.status,function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),n("el-row",{staticClass:"row"},t._l(t.list,function(e,a){return n("el-col",{key:a,staticClass:"col",attrs:{span:6}},[n("el-card",{attrs:{"body-style":{padding:"0px"}}},[n("div",{staticClass:"image",style:t.getImageStyle(e),attrs:{href:t._f("setImg")(e.coverPic)}}),t._v(" "),n("div",{staticStyle:{padding:"14px"}},[n("p",[t._v(t._s(e.title))]),t._v(" "),n("div",{staticClass:"bottom clearfix"},[n("el-button",{attrs:{type:"text",icon:"el-icon-edit"},on:{click:function(n){t.$router.push({name:"addAtlas",query:{id:e.id}})}}}),t._v(" "),n("el-button",{attrs:{type:"text",icon:"el-icon-delete"},on:{click:function(n){t.handleDelete(e)}}}),t._v(" "),n("span",{staticClass:"nums"},[t._v(t._s(e.picNum)+"张")])],1)])])],1)})),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":t.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"offset",e)}}})],1)],1)},staticRenderFns:[]};var o=n("VU/8")(s,r,!1,function(t){n("CVXL")},"data-v-5afe678f",null);e.default=o.exports},CVXL:function(t,e,n){var a=n("/ON8");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("26566a71",a,!0)}});