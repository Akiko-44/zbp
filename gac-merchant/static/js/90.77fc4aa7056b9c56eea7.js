webpackJsonp([90],{wJd9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("C0nA"),i={directives:{waves:a("cAgV").a},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,userName:void 0},tableKey:0,status:{1:"出局",2:"领先",3:"拍得"}}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(n.c)(this.listQuery).then(function(t){e.list=t.data.records,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.listQuery.userName||(this.listQuery.userName=void 0),this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.offset=e,this.getList()}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入出价人名称"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName","string"==typeof t?t.trim():t)},expression:"listQuery.userName"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,attrs:{data:e.list,border:""}},[a("el-table-column",{attrs:{width:"180px",align:"center",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.createTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"商品名"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.goodsName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"出价人"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.userName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"出价金额"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v("¥ "+e._s(n.auctionPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"200px",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.status[n.result]))])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"offset",t)}}})],1)],1)},staticRenderFns:[]},l=a("VU/8")(i,s,!1,null,null,null);t.default=l.exports}});