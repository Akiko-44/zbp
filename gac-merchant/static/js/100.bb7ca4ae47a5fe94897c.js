webpackJsonp([100],{cgTB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),n=a("Kg8H"),r={name:"user",directives:{waves:a("cAgV").a},data:function(){return{form:{username:void 0,name:void 0,sex:"男",password:void 0,description:void 0},rules:{name:[{required:!0,message:"请输入用户",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],username:[{required:!0,message:"请输入账户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:20,message:"长度在 5 到 20 个字符",trigger:"blur"}]},list:null,total:null,listLoading:!0,listQuery:{offset:1,limit:20,name:void 0},sexOptions:["男","女"],dialogFormVisible:!1,dialogStatus:"",userManager_btn_edit:!0,userManager_btn_del:!0,userManager_btn_add:!0,textMap:{update:"编辑",create:"创建"},tableKey:0,rowIndex:void 0}},created:function(){this.getList()},methods:{getList:function(){var e=this;this.listLoading=!0,Object(n.d)(this.listQuery).then(function(t){e.list=t.data.records,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.offset=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleUpdate:function(e,t){this.form=JSON.parse(s()(e)),this.dialogFormVisible=!0,this.dialogStatus="update",this.rowIndex=t},handleDelete:function(e,t){var a=this,i=1==+t?"启用":"禁用";this.$confirm("确定"+i+"账户？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(n.b)(e.id,+t).then(function(){a.$notify({title:"成功",message:i+"成功",type:"success",duration:2e3}),e.status=+t})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;Object(n.a)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$notify({title:"成功",message:"创建成功",type:"success",duration:2e3})})})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1,t.form.password=void 0;var a=t.form,i=a.id,s=a.name,r=a.sex,l=a.description,o=a.username;Object(n.e)({id:i,name:s,sex:r,description:l,username:o}).then(function(){t.dialogFormVisible=!1,t.list[t.rowIndex].name=s,t.list[t.rowIndex].sex=r,t.list[t.rowIndex].description=l,t.$notify({title:"成功",message:"编辑成功",type:"success",duration:2e3})})})},resetTemp:function(){this.form={username:void 0,name:void 0,sex:"男",password:void 0,description:void 0}}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"姓名或账户"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.handleFilter(t)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),e.userManager_btn_add?a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("添加")]):e._e()],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{width:"200px",align:"center",label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"账户"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.username))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"性别"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.sex))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"300px",align:"center",label:"备注"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.description))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"180px",align:"center",label:"最后时间"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.updTime))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"最后更新人"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row;return[a("span",[e._v(e._s(i.updName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",align:"center",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.row,s=t.$index;return[e.userManager_btn_edit?a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(t){e.handleUpdate(i,s)}}},[e._v("编辑\n        ")]):e._e(),e._v(" "),null===i.status||1==+i.status?a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(t){e.handleDelete(i,0)}}},[e._v("禁用")]):a("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(t){e.handleDelete(i,1)}}},[e._v("启用")])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.offset,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"offset",t)}}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"姓名",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入姓名"},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"账户",prop:"username"}},["create"==e.dialogStatus?a("el-input",{attrs:{placeholder:"请输入账户"},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}}):a("el-input",{attrs:{placeholder:"请输入账户",disabled:""},model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"密码",placeholder:"请输入密码",prop:"password"}},[a("el-input",{attrs:{type:"password"},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"性别"}},[a("el-select",{staticClass:"filter-item",attrs:{placeholder:"请选择"},model:{value:e.form.sex,callback:function(t){e.$set(e.form,"sex",t)},expression:"form.sex"}},e._l(e.sexOptions,function(e){return a("el-option",{key:e,attrs:{label:e,value:e}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"描述"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:5},placeholder:"请输入内容"},model:{value:e.form.description,callback:function(t){e.$set(e.form,"description",t)},expression:"form.description"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]},o=a("VU/8")(r,l,!1,null,null,null);t.default=o.exports}});