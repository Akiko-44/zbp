webpackJsonp([98],{v6Yp:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("Xxa5"),a=n.n(r),o=n("exGp"),c=n.n(o),s=n("pF2J"),i=(n("Q0Ca"),{data:function(){return{form:{}}},beforeRouteEnter:function(e,t,n){var r=this;return c()(a.a.mark(function t(){var o;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(s.b)(e.query.id).then(function(e){return e.data});case 2:o=t.sent,n(function(e){setTimeout(function(){e.form=o},10)});case 4:case"end":return t.stop()}},t,r)}))()}}),u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container calendar-list-container"},[n("p",[n("span",{staticStyle:{color:"#e5c6a1"}},[e._v(e._s(e.form.userName))]),e._v("于"),n("span",[e._v(e._s(e.form.createTime))]),e._v("对"),n("span",{staticStyle:{color:"#e5c6a1"}},[e._v(e._s(e.form.sellName))]),e._v("发表评论")]),e._v(" "),e.form.commentGalleryList&&e.form.commentGalleryList.length?n("p",e._l(e.form.commentGalleryList,function(t){return n("img",{attrs:{src:e._f("setImg")(t)}})})):e._e(),e._v(" "),n("p",[e._v(e._s(e.form.content))]),e._v(" "),""!==e.form.merchantContent?n("p"):e._e(),n("h2",[e._v("商家回复：")]),e._v(" "),n("p",[e._v(e._s(e.form.merchantContent))]),e._v(" "),n("p")])},staticRenderFns:[]},l=n("VU/8")(i,u,!1,null,null,null);t.default=l.exports}});