webpackJsonp([93],{Ifte:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Xxa5"),i=n.n(a),l=n("exGp"),r=n.n(l),o=n("vLgD");var s=n("cAgV"),c=n("BNTT"),u=void 0,d={name:"commentList",directives:{waves:s.a},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,name:void 0,columnId:null},tableKey:0,categories:[],selectedCategory:[],dialogFormVisible:!1,form:{keyword:""},rules:{keyword:[{required:!0,message:"请输入过滤词汇",trigger:"blur"}]}}},created:function(){var e=this;this.getList(),c.a.get().then(function(t){return e.categories=t})},methods:{getList:function(){var e,t=this;this.listLoading=!0,(e=this.listQuery,Object(o.a)({url:"/admin/industry/article/comment/list",method:"get",params:e})).then(function(e){t.list=e.data.records,t.total=e.data.total,t.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.offset=e,this.getList()},handleDelete:function(e){var t=this;this.$confirm("确定删除当前文章的这条评论？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n;(n=e.id,Object(o.a)({url:"/admin/industry/article/comment/delete/"+n,method:"post"})).then(function(){t.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var n=t.list.indexOf(e);t.list.splice(n,1)})})},showDialog:function(){var e=this;return r()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(void 0!==u){t.next=4;break}return t.next=3,Object(o.a)({url:"/admin/industry/comment/regular/detail",method:"get"}).then(function(e){return e.data.keyword});case 3:u=t.sent;case 4:e.form.keyword=u,e.dialogFormVisible=!0;case 6:case"end":return t.stop()}},t,e)}))()},cancel:function(e){this.dialogFormVisible=!1},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var n;(n=t.form,Object(o.a)({url:"/admin/industry/comment/regular/save",method:"post",data:n})).then(function(){t.dialogFormVisible=!1,u=t.form.keyword,t.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3})})})},handleCategoryChange:function(e){this.listQuery.columnId=e[e.length-1]}}},f={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container calendar-list-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{attrs:{type:"primary",icon:"edit"},on:{click:e.showDialog}},[e._v("设置规则")])],1),e._v(" "),n("div",{staticClass:"filter-container"},[n("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入文章标题"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}}),e._v(" "),n("el-cascader",{attrs:{clearable:"",placeholder:"栏目",options:e.categories,props:{value:"id",label:"name"}},on:{change:e.handleCategoryChange},model:{value:e.selectedCategory,callback:function(t){e.selectedCategory=t},expression:"selectedCategory"}}),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")])],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{width:"200px",align:"left",label:"文章标题"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.title))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"180px",align:"center",label:"最新评论时间"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.createTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"110px",align:"center",label:"栏目"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.column))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"400px",align:"left",label:"最新评论内容"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.content))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"110px",align:"center",label:"评论数"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return[n("span",[e._v(e._s(a.commentNum))])]}}])}),e._v(" "),n("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.row;return t.$index,[n("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){e.handleDelete(a)}}},[e._v("删除")])]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[n("el-pagination",{attrs:{"current-page":e.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"offset",t)}}})],1),e._v(" "),n("el-dialog",{attrs:{title:"设置规则",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[n("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"过滤词汇",prop:"keyword"}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"请输入过滤词汇，使用；分隔，如：关键词1；关键词2；"},model:{value:e.form.keyword,callback:function(t){e.$set(e.form,"keyword",t)},expression:"form.keyword"}})],1)],1),e._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]},m=n("VU/8")(d,f,!1,null,null,null);t.default=m.exports}});