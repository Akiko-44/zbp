(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02694ff4"],{"17e8":function(t,e,a){},2934:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return s}));var i=a("b775");function r(){return Object(i["a"])({url:"/admin/platform/getAllPlatform",method:"get"})}function s(){return Object(i["a"])({url:"/admin/eth/getBlockChains",method:"get"})}},d181:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-form",{ref:"dispatchForm",staticClass:"listForm",staticStyle:{width:"100%"},attrs:{model:t.dispatchForm,rules:t.rules,"label-width":"100px"}},[a("div",{staticClass:"filter-container"},[a("el-form-item",{attrs:{label:"调度名称:",prop:"name"}},[a("el-input",{attrs:{maxlength:30,placeholder:"请输入调度名称"},model:{value:t.dispatchForm.name,callback:function(e){t.$set(t.dispatchForm,"name",e)},expression:"dispatchForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"上链平台:",prop:"platformId"}},[a("el-radio-group",{model:{value:t.dispatchForm.platformId,callback:function(e){t.$set(t.dispatchForm,"platformId",e)},expression:"dispatchForm.platformId"}},t._l(t.platformList,(function(e){return a("el-radio",{key:e.id,attrs:{label:e.id}},[t._v(t._s(e.displayName))])})),1)],1),t._v(" "),a("el-form-item",{attrs:{label:"数据接入:",prop:"platformId"}},[a("el-radio-group",{model:{value:t.dispatchForm.dataAccess,callback:function(e){t.$set(t.dispatchForm,"dataAccess",e)},expression:"dispatchForm.dataAccess"}},[a("el-radio",{attrs:{label:1}},[t._v("SFTP")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("DB")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"调度类型:",prop:"scheduleType"}},[a("el-radio-group",{on:{change:t.changeSchedule},model:{value:t.dispatchForm.scheduleType,callback:function(e){t.$set(t.dispatchForm,"scheduleType",e)},expression:"dispatchForm.scheduleType"}},[a("el-radio",{attrs:{label:1}},[t._v("表达式调度")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("定时器调度")])],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"执行操作:",prop:"action"}},[a("el-radio-group",{model:{value:t.dispatchForm.action,callback:function(e){t.$set(t.dispatchForm,"action",e)},expression:"dispatchForm.action"}},[1===t.dispatchForm.dataAccess?[a("el-radio",{attrs:{label:4}},[t._v("SFTP数据抽取")]),t._v(" "),a("el-radio",{attrs:{label:5}},[t._v("SFTP补数申请")]),t._v(" "),a("el-radio",{attrs:{label:6}},[t._v("SFTP补数")]),t._v(" "),1===t.dispatchForm.scheduleType?a("el-radio",{attrs:{label:1}},[t._v("SFTP数据上链")]):t._e(),t._v(" "),1===t.dispatchForm.scheduleType?a("el-radio",{attrs:{label:7}},[t._v("SFTP篡改验证申请")]):t._e(),t._v(" "),1===t.dispatchForm.scheduleType?a("el-radio",{attrs:{label:8}},[t._v("SFTP篡改验证")]):t._e()]:[a("el-radio",{attrs:{label:0}},[t._v("DB数据抽取")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("DB补数")]),t._v(" "),1===t.dispatchForm.scheduleType?a("el-radio",{attrs:{label:1}},[t._v("DB数据上链")]):t._e(),t._v(" "),1===t.dispatchForm.scheduleType?a("el-radio",{attrs:{label:2}},[t._v("DB篡改验证")]):t._e()]],2)],1),t._v(" "),1===t.dispatchForm.scheduleType?a("div",{staticClass:"filter-container"},[a("el-form-item",{attrs:{label:"调度周期:",prop:"timePattern"}},[a("el-radio-group",{on:{change:t.changeTimePattern},model:{value:t.dispatchForm.timePattern,callback:function(e){t.$set(t.dispatchForm,"timePattern",e)},expression:"dispatchForm.timePattern"}},[a("el-radio",{attrs:{label:1}},[t._v("每日")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("每周")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("每月")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"执行时间:",prop:"sendTime"}},[a("el-time-picker",{staticStyle:{width:"100%"},attrs:{format:"HH:mm","value-format":"HH:mm",placeholder:"请选择执行时间"},model:{value:t.dispatchForm.sendTime,callback:function(e){t.$set(t.dispatchForm,"sendTime",e)},expression:"dispatchForm.sendTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"按星期:"}},[a("el-radio-group",{attrs:{prop:"weekPoint",disabled:t.weekDisabled},model:{value:t.dispatchForm.weekPoint,callback:function(e){t.$set(t.dispatchForm,"weekPoint",e)},expression:"dispatchForm.weekPoint"}},[a("el-radio",{attrs:{label:1}},[t._v("星期一")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("星期二")]),t._v(" "),a("el-radio",{attrs:{label:3}},[t._v("星期三")]),t._v(" "),a("el-radio",{attrs:{label:4}},[t._v("星期四")]),t._v(" "),a("el-radio",{attrs:{label:5}},[t._v("星期五")]),t._v(" "),a("el-radio",{attrs:{label:6}},[t._v("星期六")]),t._v(" "),a("el-radio",{attrs:{label:7}},[t._v("星期日")])],1)],1),t._v(" "),a("el-form-item",{staticClass:"date-form-item",attrs:{label:"按日期:"}},[a("el-radio-group",{attrs:{prop:"monthPoint",disabled:t.monthDisabled},model:{value:t.dispatchForm.monthPoint,callback:function(e){t.$set(t.dispatchForm,"monthPoint",e)},expression:"dispatchForm.monthPoint"}},t._l(31,(function(e){return a("el-radio",{key:e,attrs:{label:e}},[t._v(t._s(e)+"号")])})),1)],1)],1):[a("el-form-item",{staticClass:"is-required",attrs:{prop:"roundCycle",label:"定时周期:"}},[a("el-input",{staticStyle:{width:"195px","margin-right":"10px"},model:{value:t.dispatchForm.roundCycle,callback:function(e){t.$set(t.dispatchForm,"roundCycle",e)},expression:"dispatchForm.roundCycle"}}),t._v("小时\n      ")],1)],t._v(" "),a("div",{staticClass:"text-center"},[a("el-button",{staticClass:"btn cancel-btn",on:{click:t.cancel}},[t._v("取消")]),t._v(" "),a("el-button",{staticClass:"btn save-btn",attrs:{type:"primary",loading:t.loading},on:{click:t.save}},[t._v("保存")])],1)],2)],1)},r=[],s=(a("c5f6"),a("f527")),o=a("2934"),l={data:function(){return{loading:!1,dispatchForm:{id:void 0,name:"",scheduleType:1,dataAccess:1,platformId:void 0,action:4,timePattern:1,sendTime:"00:00",weekPoint:void 0,monthPoint:void 0,roundCycle:""},weekDisabled:!0,monthDisabled:!0,platformList:[],rules:{name:[{required:!0,message:"请输入调度名称",trigger:"blur"}],sendTime:[{required:!0,message:"请选择时间",trigger:"change"}],platformId:[{required:!0,message:"请选择上链平台",trigger:"change"}],dataAccess:[{required:!0,message:"请选择数据接入",trigger:"change"}],scheduleType:[{required:!0,message:"请选择调度类型",trigger:"change"}],action:[{required:!0,message:"请选择执行操作",trigger:"change"}],timePattern:[{required:!0,message:"请选择调度周期",trigger:"change"}],weekPoint:[{required:!0,message:"请选择",trigger:"change"}],monthPoint:[{required:!0,message:"请选择",trigger:"change"}],roundCycle:[{validator:this.validateRoundCycle,message:"请输入合法的定时周期",trigger:"blur"}]}}},created:function(){this.getAllPlatformList()},methods:{getAllPlatformList:function(){var t=this;Object(o["a"])().then((function(e){if(t.platformList=e.data,t.$route.query.id)t.dispatchForm.id=t.$route.query.id,t.getDispatch();else{var a=new Date;t.dispatchForm.sendTime=a.getHours()+":"+a.getMinutes(),t.dispatchForm.platformId=t.platformList[0].id}}))},getDispatch:function(){var t=this;Object(s["b"])({id:this.dispatchForm.id}).then((function(e){t.dispatchForm=e.data,2===t.dispatchForm.timePattern?t.weekDisabled=!1:3===t.dispatchForm.timePattern&&(t.monthDisabled=!1)}))},add:function(){var t=this;1===this.dispatchForm.scheduleType&&(this.dispatchForm.roundCycle=""),Object(s["d"])(this.dispatchForm).then((function(e){t.success()})).catch((function(){t.loading=!1}))},save:function(){var t=this;this.$refs.dispatchForm.validate((function(e){if(!e)return t.$notify({title:"警告",message:"请务必填写必选项",type:"warning"}),!1;t.loading=!0,t.add()}))},success:function(){this.$notify({title:"成功",message:"提交成功",type:"success",duration:2e3}),this.$router.push({name:"dispatchPage"}),this.loading=!1},changeSchedule:function(t){1===t?(this.dispatchForm.timePattern=1,this.dispatchForm.sendTime="00:00",this.dispatchForm.weekPoint=1,this.dispatchForm.monthPoint=1,this.dispatchForm.roundCycle=""):(this.dispatchForm.timePattern=void 0,this.dispatchForm.sendTime="",this.dispatchForm.week=void 0,this.dispatchForm.monthPoint=void 0,this.dispatchForm.roundCycle="")},changeTimePattern:function(t){1===t?(this.weekDisabled=!0,this.monthDisabled=!0,this.dispatchForm.weekPoint=void 0,this.dispatchForm.monthPoint=void 0):2===t?(this.weekDisabled=!1,this.monthDisabled=!0,this.dispatchForm.weekPoint=1,this.dispatchForm.monthPoint=void 0):(this.weekDisabled=!0,this.monthDisabled=!1,this.dispatchForm.weekPoint=void 0,this.dispatchForm.monthPoint=1)},cancel:function(){this.$router.go(-1)},validateRoundCycle:function(t,e,a){var i=/^[0-9]*$/;e?!i.test(e)||Number(e)>24?a(new Error("请输入合法的定时周期")):a():a(new Error("请输入定时周期"))}}},n=l,d=(a("de94"),a("2877")),c=Object(d["a"])(n,i,r,!1,null,"72a2973e",null);e["default"]=c.exports},de94:function(t,e,a){"use strict";var i=a("17e8"),r=a.n(i);r.a},f527:function(t,e,a){"use strict";a.d(e,"c",(function(){return r})),a.d(e,"b",(function(){return s})),a.d(e,"d",(function(){return o})),a.d(e,"a",(function(){return l}));var i=a("b775");function r(t){return Object(i["a"])({url:"/admin/dispatchingManagement/getAllThreadTask",method:"get",params:t})}function s(t){return Object(i["a"])({url:"/admin/dispatchingManagement/getThreadTask",method:"get",params:t})}function o(t){return Object(i["a"])({url:"/admin/dispatchingManagement/saveOrUpdate",method:"post",data:t})}function l(t){return Object(i["a"])({url:"/admin/dispatchingManagement/deleteThreadTask/".concat(t),method:"post"})}}}]);