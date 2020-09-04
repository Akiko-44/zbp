webpackJsonp([82],{"58JZ":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("zaf7"),i=a("cAgV"),l=a("BNTT"),r={name:"articleList",directives:{waves:i.a},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,name:void 0,auditState:null,columnId:null,updateTimeStart:void 0,updateTimeEnd:void 0},tableKey:0,dateValue:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.$emit("pick",[a,e])}}]},categories:[],selectedCategory:[],status:[{value:1,label:"审核中"},{value:2,label:"审核通过"},{value:3,label:"审核拒绝"}],auditState:{1:"审核中",2:"审核通过",3:"审核拒绝"}}},watch:{dateValue:function(t){this.listQuery.updateTimeStart=t?t[0]:void 0,this.listQuery.updateTimeEnd=t?t[1]:void 0}},created:function(){var t=this;this.getList(),l.a.get().then(function(e){return t.categories=e})},methods:{getList:function(){var t=this;this.listLoading=!0,Object(n.d)(this.listQuery).then(function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(t){this.listQuery.limit=t,this.getList()},handleCurrentChange:function(t){this.listQuery.offset=t,this.getList()},handleDelete:function(t){var e=this;this.$confirm("确定删除当前文章？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.b)(t.id).then(function(){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=e.list.indexOf(t);e.list.splice(a,1)})})},audit:function(t,e){var a=this;this.$confirm("确定执行当前操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.a)(t.id,e).then(function(n){a.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),t.auditState=e})})},handleCategoryChange:function(t){this.listQuery.columnId=t[t.length-1]}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{attrs:{type:"primary",icon:"edit"},on:{click:function(e){t.$router.push({name:"addArticle"})}}},[t._v("添加文章")])],1),t._v(" "),a("div",{staticClass:"filter-container"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入标题/发布人"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.handleFilter(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}}),t._v(" "),a("el-cascader",{attrs:{clearable:"",placeholder:"栏目",options:t.categories,props:{value:"id",label:"name"}},on:{change:t.handleCategoryChange},model:{value:t.selectedCategory,callback:function(e){t.selectedCategory=e},expression:"selectedCategory"}}),t._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"审核状态"},model:{value:t.listQuery.auditState,callback:function(e){t.$set(t.listQuery,"auditState",e)},expression:"listQuery.auditState"}},t._l(t.status,function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{width:"220px",align:"left",label:"文章标题"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.title))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"更新时间"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.updateTime||"-"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"栏目"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.columnName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"80px",align:"center",label:"点击数"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.clickNum||"-"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"发布人"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.authorName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(t.auditState[n.auditState]))])]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"350"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return e.$index,[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){t.$router.push({name:"addArticle",query:{id:n.id}})}}},[t._v("\n          编辑\n        ")]),t._v(" "),2!==n.auditState?a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.audit(n,2)}}},[t._v("审核通过")]):t._e(),t._v(" "),3!==n.auditState?a("el-button",{attrs:{size:"small",type:"warning"},on:{click:function(e){t.audit(n,3)}}},[t._v("审核拒绝")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){t.handleDelete(n)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":t.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.$set(t.listQuery,"offset",e)}}})],1)],1)},staticRenderFns:[]},o=a("VU/8")(r,s,!1,null,null,null);e.default=o.exports},zaf7:function(t,e,a){"use strict";e.d=function(t){return Object(n.a)({url:"/admin/industry/article/list",method:"get",params:t})},e.c=function(t){return Object(n.a)({url:"/admin/industry/article/detail/"+t,method:"get"})},e.b=function(t){return Object(n.a)({url:"/admin/industry/article/delete/"+t,method:"post"})},e.e=function(t){return Object(n.a)({url:"/admin/industry/article/save",method:"post",data:t})},e.a=function(t,e){return Object(n.a)({url:"/admin/industry/article/audit/"+t+"/"+e,method:"post"})};var n=a("vLgD")}});