webpackJsonp([140],{jmoS:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Kg8H"),l=a("wUMz"),s={props:{groupId:{default:"1"}},data:function(){return{lItems:[],mItems:[],leaders:[],members:[],list:[],loading:!1,groupManager_btn_userManager:!0}},created:function(){this.initUsers()},methods:{remoteMemberMethod:function(e){var t=this;""!==e?(this.loading=!0,this.loading=!1,Object(r.d)({name:e}).then(function(e){t.mItems=e.data.records,t.total=e.data.total,t.loading=!1})):this.mItems=[]},remoteLeaderMethod:function(e){var t=this;""!==e?(this.loading=!0,this.loading=!1,Object(r.d)({name:e}).then(function(e){t.lItems=e.data.records,t.total=e.data.total,t.loading=!1})):this.lItems=[]},onSubmit:function(){var e=this,t={};this.members.length>0&&(t.members=this.members.join()),this.leaders.length>0&&(t.leaders=this.leaders.join()),Object(l.k)(this.groupId,t).then(function(){e.$emit("closeUserDialog"),e.$notify({title:"成功",message:"保存成功",type:"success",duration:2e3})})},initUsers:function(){var e=this;Object(l.i)(this.groupId).then(function(t){e.lItems=t.data.leaders,e.mItems=t.data.members;for(var a=[],r=[],l=0;l<t.data.members.length;l++)a.push(t.data.members[l].id);for(var s=0;s<t.data.leaders.length;s++)r.push(t.data.leaders[s].id);e.members=a,e.leaders=r})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{attrs:{"label-width":"80px"}},[a("el-form-item",{attrs:{label:"群主|领导"}},[a("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"请输入关键词","remote-method":e.remoteLeaderMethod,loading:e.loading},model:{value:e.leaders,callback:function(t){e.leaders=t},expression:"leaders"}},e._l(e.lItems,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"组员|下属"}},[a("el-select",{attrs:{multiple:"",filterable:"",remote:"",placeholder:"请输入关键词","remote-method":e.remoteMemberMethod,loading:e.loading},model:{value:e.members,callback:function(t){e.members=t},expression:"members"}},e._l(e.mItems,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),a("el-form-item",[e.groupManager_btn_userManager?a("el-button",{attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v("保存")]):e._e()],1)],1)},staticRenderFns:[]},o=a("VU/8")(s,n,!1,null,null,null);t.default=o.exports}});