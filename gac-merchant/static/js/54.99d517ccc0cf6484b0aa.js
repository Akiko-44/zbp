webpackJsonp([54],{AkV7:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.filter-label[data-v-c7095fb2] {\n  font-size: 14px;\n  color: #909399;\n  font-weight: normal;\n}\n.el-dropdown-link[data-v-c7095fb2] {\n  cursor: pointer;\n  color: #409EFF;\n}\n.el-icon-arrow-down[data-v-c7095fb2] {\n  font-size: 12px;\n}\n.expand-table .el-form-item[data-v-c7095fb2] {\n  margin-right: 0;\n  margin-bottom: 0;\n  width: 35%;\n}\n",""])},PFMq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),i=a.n(n),l=a("exGp"),s=a.n(l),o=a("fZjL"),r=a.n(o),c=a("C0nA"),d=a("OYva"),u=a("cAgV"),v=a("oyZn"),p={directives:{waves:u.a},data:function(){return{list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,goodsName:void 0,brandName:void 0,categoryId:void 0,userName:void 0,goodsStatus:void 0,updateTimeBegin:void 0,updateTimeEnd:void 0,src:void 0},tableKey:0,dateValue:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},categories:[],selectedCategory:[],auditState:v.b,goodsState:v.e,srcState:v.f}},computed:{brands:function(){return this.$store.state.data.swapBrands},goodsStatus:function(){var e=this;return r()(this.goodsState).map(function(t){return{value:t,label:e.goodsState[t]}})},src:function(){var e=this;return r()(this.srcState).map(function(t){return{value:t,label:e.srcState[t]}})}},watch:{dateValue:function(e){this.listQuery.updateTimeBegin=e?e[0]:void 0,this.listQuery.updateTimeEnd=e?e[1]:void 0}},created:function(){this.getList(),this.getCategory(),this.$store.dispatch("data/get",{name:"swapBrands",service:d.a})},methods:{getList:function(){var e=this;this.listLoading=!0,Object(c.f)(this.listQuery).then(function(t){e.list=t.data.records,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.offset=e,this.getList()},handleDelete:function(e){var t=this;this.$confirm("确定删除当前商品？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(c.b)(e.id).then(function(){t.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3});var a=t.list.indexOf(e);t.list.splice(a,1)})})},audit:function(e,t){var a=this;this.$confirm("确定执行当前操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(c.a)(e.id,t).then(function(n){a.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),e.goodsStatus=t})})},handleCommand:function(e){var t=e.row,a=e.state;this.audit(t,a)},moreHandleCommand:function(e){this.$router.push(e)},resetQuery:function(){this.listQuery={offset:1,limit:20,goodsName:void 0,brandName:void 0,categoryId:void 0,userName:void 0,goodsStatus:void 0,updateTimeBegin:void 0,updateTimeEnd:void 0,src:void 0},this.dateValue="",this.selectedCategory=[]},getCategory:function(){var e=this;return s()(i.a.mark(function t(){var a;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,v.c.get();case 2:a=t.sent,e.categories=a;case 4:case"end":return t.stop()}},t,e)}))()},handleChange:function(e){this.listQuery.categoryId=e[e.length-1]}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("label",{staticClass:"filter-label"},[e._v("商品编号：")]),e._v(" "),a("el-input",{staticStyle:{width:"195px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.id,callback:function(t){e.$set(e.listQuery,"id",t)},expression:"listQuery.id"}}),e._v("\n\n     \n    "),a("label",{staticClass:"filter-label"},[e._v("商品名称：")]),e._v(" "),a("el-input",{staticStyle:{width:"195px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.goodsName,callback:function(t){e.$set(e.listQuery,"goodsName",t)},expression:"listQuery.goodsName"}}),e._v("\n\n     \n    "),a("label",{staticClass:"filter-label"},[e._v("商家名称：")]),e._v(" "),a("el-input",{staticStyle:{width:"195px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName",t)},expression:"listQuery.userName"}})],1),e._v(" "),a("div",{staticClass:"filter-container"},[a("label",{staticClass:"filter-label"},[e._v("商品状态：")]),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"商品状态"},model:{value:e.listQuery.goodsStatus,callback:function(t){e.$set(e.listQuery,"goodsStatus",t)},expression:"listQuery.goodsStatus"}},e._l(e.goodsStatus,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v("\n\n     \n    "),a("label",{staticClass:"filter-label"},[e._v("商品品牌：")]),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"商品品牌"},model:{value:e.listQuery.brandName,callback:function(t){e.$set(e.listQuery,"brandName",t)},expression:"listQuery.brandName"}},e._l(e.brands,function(e){return a("el-option",{key:e.id,attrs:{label:e.brandName,value:e.brandName}})})),e._v("\n\n     \n    "),a("label",{staticClass:"filter-label"},[e._v("商品分类：")]),e._v(" "),a("el-cascader",{attrs:{options:e.categories,props:{value:"id",label:"catName"}},on:{change:e.handleChange},model:{value:e.selectedCategory,callback:function(t){e.selectedCategory=t},expression:"selectedCategory"}})],1),e._v(" "),a("div",{staticClass:"filter-container"},[a("label",{staticClass:"filter-label"},[e._v("信息来源：")]),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"信息来源"},model:{value:e.listQuery.src,callback:function(t){e.$set(e.listQuery,"src",t)},expression:"listQuery.src"}},e._l(e.src,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v("\n\n     \n    "),a("label",{staticClass:"filter-label"},[e._v("更新时间：")]),e._v(" "),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd HH:mm:ss",type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"right"},model:{value:e.dateValue,callback:function(t){e.dateValue=t},expression:"dateValue"}}),e._v("\n    　\n    "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:e.resetQuery}},[e._v("清空条件")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-form",{staticClass:"expand-table",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("span",[e._v(e._s(n.goodsName))])]),e._v(" "),a("el-form-item",{attrs:{label:"商品分类"}},[a("span",[e._v(e._s(n.categoryName))])]),e._v(" "),a("el-form-item",{attrs:{label:"品牌"}},[a("span",[e._v(e._s(n.brandName))])]),e._v(" "),a("el-form-item",{attrs:{label:"商家名称"}},[a("span",[e._v(e._s(n.userName))])]),e._v(" "),a("el-form-item",{attrs:{label:"保证金"}},[a("span",[e._v(e._s(n.deposit))])]),e._v(" "),a("el-form-item",{attrs:{label:"保留价"}},[a("span",[e._v(e._s(n.reservePrice))])]),e._v(" "),a("el-form-item",{attrs:{label:"加价幅度"}},[a("span",[e._v(e._s(n.skipPrice))])])],1)]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"商品编号"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"图片"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("img",{staticStyle:{"max-width":"100%"},attrs:{src:e._f("setImg")(n.imgUrl)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"当前价"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.presentPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"起拍价"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.upsetPrice))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"160px",align:"center",label:"拍卖时间"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("p",[e._v(e._s(n.auctionStartTime))]),e._v(" "),a("span",[e._v("至")]),e._v(" "),a("p",[e._v(e._s(n.auctionEndTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(e.goodsState[n.goodsStatus]))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"left",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return t.$index,[a("el-button",{attrs:{size:"small"},on:{click:function(t){e.$router.push({name:"auctionDetail",query:{id:n.id}})}}},[e._v("\n          详情\n        ")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.$router.push({name:"auctionEdit",query:{id:n.id}})}}},[e._v("\n          修改\n        ")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){e.handleDelete(n)}}},[e._v("删除")]),e._v("\n         \n        "),1==n.goodsStatus||3==n.goodsStatus?a("el-dropdown",{on:{command:e.handleCommand}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n            审核操作"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[1==n.goodsStatus||3==n.goodsStatus?a("el-dropdown-item",{attrs:{command:{row:n,state:2}}},[e._v("审核通过")]):e._e(),e._v(" "),1==n.goodsStatus?a("el-dropdown-item",{attrs:{command:{row:n,state:3}}},[e._v("审核拒绝")]):e._e()],1)],1):e._e(),e._v("\n         \n        "),a("el-dropdown",{on:{command:e.moreHandleCommand}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n            更多操作"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:{name:"auctionUsers"}}},[e._v("报名名单")]),e._v(" "),a("el-dropdown-item",{attrs:{command:{name:"auctionPrice"}}},[e._v("出价记录")])],1)],1)]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"offset",t)}}})],1)],1)},staticRenderFns:[]};var f=a("VU/8")(p,m,!1,function(e){a("r1xi")},"data-v-c7095fb2",null);t.default=f.exports},r1xi:function(e,t,a){var n=a("AkV7");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("115b23d6",n,!0)}});