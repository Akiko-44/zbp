(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe92c322"],{"0713":function(t,e,n){"use strict";var a=n("88bd"),r=n.n(a);r.a},"23ba":function(t,e,n){"use strict";n.d(e,"f",(function(){return r})),n.d(e,"a",(function(){return l})),n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"g",(function(){return u})),n.d(e,"d",(function(){return c})),n.d(e,"e",(function(){return s}));var a=n("b775");function r(t){return Object(a["a"])({url:"/admin/group/get",method:"get",params:t})}function l(t){return Object(a["a"])({url:"/admin/group/saveOrUpdate",method:"post",data:t})}function o(t){return Object(a["a"])({url:"/admin/group/delete",method:"post",params:t})}function i(){return Object(a["a"])({url:"/admin/group/getAllGroup",method:"get"})}function u(){return Object(a["a"])({url:"/admin/group/getUserGroup",method:"get"})}function c(t){return Object(a["a"])({url:"/admin/chain/getDataHistory",method:"get",params:t})}function s(t){return Object(a["a"])({url:"/admin/chain/getDataHistoryDetail",method:"get",params:t})}},"45a5":function(t,e,n){},"71e2":function(t,e,n){"use strict";var a=n("45a5"),r=n.n(a);r.a},"88bd":function(t,e,n){},"8ad4":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-table",t._b({attrs:{data:t.data,"row-style":t.showRow,"row-key":"id"}},"el-table",t.$attrs,!1),[0===t.columns.length?n("el-table-column",{attrs:{align:"center",width:"50",type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.iconShow(0,e.row)?n("span",{staticClass:"tree-ctrl",on:{click:function(n){return t.toggleExpanded(e.$index)}}},[e.row._expanded?n("i",{staticClass:"el-icon-minus"}):n("i",{staticClass:"el-icon-plus"})]):t._e()]}}],null,!1,2363745888)}):t._l(t.columns,(function(e,a){return n("el-table-column",{key:e.value,attrs:{label:e.text,width:e.width},scopedSlots:t._u([{key:"default",fn:function(e){return[t._l(e.row._level,(function(e){return 0===a?n("span",{key:e,staticClass:"ms-tree-space"}):t._e()})),t._v(" "),t._v("\n      "+t._s(e.row["name"])+"\n    ")]}}],null,!0)})})),t._v(" "),t._t("default")],2)},r=[];n("7f7f"),n("5df3"),n("1c4c"),n("ac6a"),n("2b0e");var l={name:"TreeTable",props:{data:{type:[Array,Object],required:!0},columns:{type:Array,default:function(){return[]}},evalFunc:Function,evalArgs:Array,expandAll:{type:Boolean,default:!1}},computed:{},watch:{columns:function(t){console.log(t)}},methods:{showRow:function(t){var e=!t.row.parent||t.row.parent._expanded&&t.row.parent._show;return t.row._show=e,e?"animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;":"display:none;"},toggleExpanded:function(t){var e=this.formatData[t];e._expanded=!e._expanded},iconShow:function(t,e){return 0===t&&e.children&&e.children.length>0}}},o=l,i=(n("e9b3"),n("71e2"),n("2877")),u=Object(i["a"])(o,a,r,!1,null,"546e7334",null);e["a"]=u.exports},be00:function(t,e,n){},e9b3:function(t,e,n){"use strict";var a=n("be00"),r=n.n(a);r.a},fb6b:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"plus"},on:{click:function(e){return t.handlerAdd()}}},[t._v("添加")])],1),t._v(" "),n("tree-table",{attrs:{data:t.data,columns:t.columns,"expand-all":"",border:""}},[n("el-table-column",{attrs:{width:"200px",align:"center",label:"标签",prop:"tag"}}),t._v(" "),n("el-table-column",{attrs:{width:"200px",align:"center",label:"组织级别",prop:"level"}}),t._v(" "),n("el-table-column",{attrs:{width:"200px",align:"center",label:"更新时间",prop:"updateTime"}}),t._v(" "),n("el-table-column",{attrs:{width:"400px",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[n("el-button",{attrs:{size:"small"},on:{click:function(e){return t.handlerAdd(a)}}},[t._v("\n          添加\n        ")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return t.handleUpdate(a)}}},[t._v("\n          修改\n        ")]),t._v(" "),n("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(e){return t.delGroup(a.id)}}},[t._v("\n          删除\n        ")])]}}])})],1)],1)},r=[],l=n("23ba"),o=n("8ad4"),i={components:{TreeTable:o["a"]},data:function(){return{list:null,total:null,listLoading:!1,listParams:{current:1,size:20,groupName:""},columns:[{text:"组织名称",value:"groupName"}],data:[]}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0,Object(l["c"])().then((function(e){t.data=e.data,t.rename(t.data),t.listLoading=!1}))},delGroup:function(t){var e=this;this.$confirm("是否确认删除该组织（包含子组织数据）？","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then((function(){Object(l["b"])({id:t}).then((function(t){e.$notify({title:"成功",message:"删除成功",type:"success",duration:2e3}),e.getList()})).catch((function(){}))}))},handlerAdd:function(t){this.$router.push({name:"groupModify",query:{parentId:t&&t.id?t.id:0,level:t&&t.level?t.level+1:1}})},handleUpdate:function(t){this.$router.push({name:"groupModify",query:{parentId:t.parentId,id:t.id,level:t.level}})},rename:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return e.length>0&&e.map((function(e){e.name=e.groupName,e._level=e.level,e.children&&e.children.length>0&&t.rename(e.children)})),e}}},u=i,c=(n("0713"),n("2877")),s=Object(c["a"])(u,a,r,!1,null,"245c5538",null);e["default"]=s.exports}}]);