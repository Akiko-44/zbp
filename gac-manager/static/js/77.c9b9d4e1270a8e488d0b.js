webpackJsonp([77],{"/Vac":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("Xxa5"),n=a.n(l),s=a("exGp"),r=a.n(s),i=a("b6Iv"),o=a("oyZn"),_=a("XDMK"),d={data:function(){return{orderState:_.i,srcState:o.f,payType:_.j,goodsDesc:"",detail:{list:[]}}},beforeRouteEnter:function(t,e,a){var l=this;return r()(n.a.mark(function e(){var s,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(i.b)(t.query.id);case 2:s=e.sent,r=s.data,a(function(t){t.detail=r});case 5:case"end":return e.stop()}},e,l)}))()},methods:{handleCancel:function(){var t=this;this.$confirm("确定取消当前订单？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.a)(t.detail.id).then(function(){t.$notify({title:"成功",message:"取消成功",type:"success",duration:2e3}),t.$router.go(-1)})})}}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"detail"},[a("div",{staticClass:"actions"},[a("el-button",{attrs:{size:"small",type:"danger"},on:{click:t.handleCancel}},[t._v("取消订单")])],1),t._v(" "),a("br"),t._v(" "),a("el-tabs",{attrs:{type:"border-card"}},[a("el-tab-pane",{attrs:{label:"订单信息"}},[a("h4",[t._v("基本信息")]),t._v(" "),a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"订单编号"}},[a("span",[t._v(t._s(t.detail.orderNumber))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单创建时间"}},[a("span",[t._v(t._s(t.detail.createTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单状态"}},[a("span",[t._v(t._s(t.orderState[t.detail.state]))])]),t._v(" "),a("el-form-item",{attrs:{label:"应付金额"}},[a("span",[t._v(t._s(t.detail.payMoney))])]),t._v(" "),a("el-form-item",{attrs:{label:"竞拍价"}},[a("span",[t._v(t._s(t.detail.dealPrice))])]),t._v(" "),a("el-form-item",{attrs:{label:"运费金额"}},[a("span",[t._v(t._s(t.detail.freightMoney))])]),t._v(" "),a("el-form-item",{attrs:{label:"卖家"}},[a("span",[t._v(t._s(t.detail.sellUserName))])]),t._v(" "),a("el-form-item",{attrs:{label:"买家"}},[a("span",[t._v(t._s(t.detail.buyUserName))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单结束时间"}},[a("span",[t._v(t._s(t.detail.endTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"订单来源"}},[a("span",[t._v(t._s(t.srcState[t.detail.src]))])]),t._v(" "),a("el-form-item",{attrs:{label:"保证金"}},[a("span",[t._v(t._s(t.detail.deposit))])])],1),t._v(" "),a("h4",[t._v("拍卖商品")]),t._v(" "),a("el-table",{staticStyle:{width:"620px"},attrs:{data:t.detail.orderGoodVOList}},[a("el-table-column",{attrs:{width:"180px",align:"center",label:"图片"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("img",{staticStyle:{height:"100px"},attrs:{src:t._f("setImg")(l.skuMainPic)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"商品名称"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("span",[t._v(t._s(l.skuName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"商品ID"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("span",[t._v(t._s(l.skuId))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"价格"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("span",[t._v(t._s(l.unitPrice))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"110px",align:"center",label:"数量"},scopedSlots:t._u([{key:"default",fn:function(e){var l=e.row;return[a("span",[t._v(t._s(l.goodsNumber))])]}}])})],1),t._v(" "),a("h4",[t._v("支付信息")]),t._v(" "),a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"支付方式"}},[a("span",[t._v(t._s(t.payType[t.detail.payType]))])]),t._v(" "),a("el-form-item",{attrs:{label:"支付渠道"}},[a("span",[t._v(t._s(t.detail.shop))])]),t._v(" "),a("el-form-item",{attrs:{label:"支付时间"}},[a("span",[t._v(t._s(t.detail.payTime))])]),t._v(" "),a("el-form-item",{attrs:{label:"支付流水号"}},[a("span",[t._v(t._s(t.detail.shopId))])])],1),t._v(" "),a("h4",[t._v("物流信息")]),t._v(" "),a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"快递公司"}},[a("span",[t._v(t._s(t.detail.name))])]),t._v(" "),a("el-form-item",{attrs:{label:"快递单号"}},[a("span",[t._v(t._s(t.detail.shop))])]),t._v(" "),a("el-form-item",{attrs:{label:"发货时间"}},[a("span",[t._v(t._s(t.detail.id))])])],1)],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(d,c,!1,function(t){a("PKkN")},"data-v-0fa1b8a0",null);e.default=v.exports},PKkN:function(t,e,a){var l=a("WU8W");"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);a("rjj0")("363c816f",l,!0)},WU8W:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.detail[data-v-0fa1b8a0] {\n  margin:20px 14px;\n}\n.table-expand[data-v-0fa1b8a0] {\n  font-size: 0;\n}\n.table-expand label[data-v-0fa1b8a0] {\n  width: 90px;\n  color: #99a9bf;\n}\n.table-expand .el-form-item[data-v-0fa1b8a0] {\n  margin-right: 0;\n  margin-bottom: 0;\n  width: 30%;\n}\n",""])}});