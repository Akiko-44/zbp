webpackJsonp([108],{"5aCZ":function(t,e,n){"use strict";var r=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],i=["bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap\t preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],o={name:"tinymce",components:{ImageUpload:n("TAej").a},props:{id:{type:String},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{default:"file edit insert view format table"},height:{type:Number,required:!1,default:360}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id||"vue-tinymce-"+ +new Date,fullscreen:!1}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(e.tinymceId).setContent(t||"")})}},mounted:function(){this.initTinymce()},activated:function(){this.initTinymce()},deactivated:function(){this.destroyTinymce()},methods:{initTinymce:function(){var t=this,e=this;window.tinymce.init({selector:"#"+this.tinymceId,language:"zh_CN",height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:i,menubar:this.menubar,plugins:r,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,init_instance_callback:function(n){e.value&&n.setContent(e.value),e.hasInit=!0,n.on("NodeChange Change KeyUp SetContent",function(){t.hasChange=!0,t.$emit("input",n.getContent())})},setup:function(t){t.on("FullscreenStateChanged",function(t){e.fullscreen=t.state})}})},destroyTinymce:function(){window.tinymce.get(this.tinymceId)&&window.tinymce.get(this.tinymceId).destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach(function(t){window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'+t.url+'" >')})}},destroyed:function(){this.destroyTinymce()}},a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tinymce-container editor-container",class:{fullscreen:this.fullscreen}},[e("textarea",{staticClass:"tinymce-textarea",attrs:{id:this.tinymceId}}),this._v(" "),e("div",{staticClass:"editor-custom-btn-container"},[e("ImageUpload",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:this.imageSuccessCBK}})],1)])},staticRenderFns:[]};var s=n("VU/8")(o,a,!1,function(t){n("nprw")},"data-v-313878aa",null);e.a=s.exports},"7rdf":function(t,e,n){"use strict";e.a=function(t){return Object(r.a)({url:"/admin/designmanu/case/audit",method:"post",data:t})},e.d=function(t,e){return Object(r.a)({url:"/admin/designmanu/case/page",method:"post",data:t,params:e})},e.c=function(t){return Object(r.a)({url:"/admin/designmanu/merchant/case/info/"+t,method:"get"})},e.b=function(t){return Object(r.a)({url:"/api/designmanu/designroom/case/category/list/"+t+" ",method:"get"})};var r=n("vLgD")},EHY9:function(t,e,n){var r=n("YxOl");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("2c5e7629",r,!0)},N0Ja:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.tinymce-container[data-v-313878aa] {\n  position: relative;\n}\n.tinymce-container[data-v-313878aa] .mce-fullscreen {\n  z-index: 10000;\n}\n.tinymce-textarea[data-v-313878aa] {\n  visibility: hidden;\n  z-index: -1;\n}\n.editor-custom-btn-container[data-v-313878aa] {\n  position: absolute;\n  right: 4px;\n  top: -1px;\n  /*z-index: 2005;*/\n}\n.fullscreen .editor-custom-btn-container[data-v-313878aa] {\n  z-index: 10000;\n  position: fixed;\n}\n.editor-upload-btn[data-v-313878aa] {\n  display: inline-block;\n}\n",""])},SldL:function(t,e){!function(e){"use strict";var n,r=Object.prototype,i=r.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",l="object"==typeof t,u=e.regeneratorRuntime;if(u)l&&(t.exports=u);else{(u=e.regeneratorRuntime=l?t.exports:{}).wrap=w;var d="suspendedStart",f="suspendedYield",p="executing",m="completed",h={},g={};g[a]=function(){return this};var v=Object.getPrototypeOf,y=v&&v(v(N([])));y&&y!==r&&i.call(y,a)&&(g=y);var b=C.prototype=x.prototype=Object.create(g);_.prototype=b.constructor=C,C.constructor=_,C[c]=_.displayName="GeneratorFunction",u.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},u.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,C):(t.__proto__=C,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(b),t},u.awrap=function(t){return{__await:t}},j(L.prototype),L.prototype[s]=function(){return this},u.AsyncIterator=L,u.async=function(t,e,n,r){var i=new L(w(t,e,n,r));return u.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},j(b),b[c]="Generator",b[a]=function(){return this},b.toString=function(){return"[object Generator]"},u.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},u.values=N,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,i){return s.type="throw",s.arg=t,e.next=r,i&&(e.method="next",e.arg=n),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;S(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:N(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),h}}}function w(t,e,n,r){var i=e&&e.prototype instanceof x?e:x,o=Object.create(i.prototype),a=new E(r||[]);return o._invoke=function(t,e,n){var r=d;return function(i,o){if(r===p)throw new Error("Generator is already running");if(r===m){if("throw"===i)throw o;return T()}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=O(a,n);if(s){if(s===h)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var c=k(t,e,n);if("normal"===c.type){if(r=n.done?m:f,c.arg===h)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=m,n.method="throw",n.arg=c.arg)}}}(t,n,a),o}function k(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}function x(){}function _(){}function C(){}function j(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function L(t){var e;this._invoke=function(n,r){function o(){return new Promise(function(e,o){!function e(n,r,o,a){var s=k(t[n],t,r);if("throw"!==s.type){var c=s.arg,l=c.value;return l&&"object"==typeof l&&i.call(l,"__await")?Promise.resolve(l.__await).then(function(t){e("next",t,o,a)},function(t){e("throw",t,o,a)}):Promise.resolve(l).then(function(t){c.value=t,o(c)},a)}a(s.arg)}(n,r,e,o)})}return e=e?e.then(o,o):o()}}function O(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,O(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var i=k(r,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,h;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function I(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(I,this),this.reset(!0)}function N(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return o.next=o}}return{next:T}}function T(){return{value:n,done:!0}}}(function(){return this}()||Function("return this")())},TAej:function(t,e,n){"use strict";var r=n("//Fk"),i=n.n(r),o=n("fZjL"),a=n.n(o),s=n("Zg3+");var c={name:"ImageUpload",props:{color:{type:String,default:"#1890ff"},multiple:{type:Boolean,default:!0},prefix:{type:String,default:"pic"},checkFile:{type:Function,default:function(){}},accept:{type:String,default:"image/*"},uploadUrl:{type:String,default:s.d}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[],uploadData:{}}},methods:{checkAllSuccess:function(){var t=this;return a()(this.listObj).every(function(e){return t.listObj[e].hasSuccess})},handleSubmit:function(){var t=this,e=a()(this.listObj).map(function(e){return t.listObj[e]});0!==e.length?this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！"):this.$message("请上传图片")},handleSuccess:function(t,e){for(var n=e.uid,r=a()(this.listObj),i=0,o=r.length;i<o;i++)if(this.listObj[r[i]].uid===n)return this.listObj[r[i]].url=s.a+"/"+t.key,this.listObj[r[i]].key=t.key,void(this.listObj[r[i]].hasSuccess=!0)},handleError:function(t,e,n){this.handleRemove(e),this.$message({message:t,showClose:!0,type:"error"})},handleRemove:function(t){for(var e=t.uid,n=a()(this.listObj),r=0,i=n.length;r<i;r++)if(this.listObj[n[r]].uid===e)return void delete this.listObj[n[r]]},beforeUpload:function(t){var e=this,n=this,r=t.uid;return this.listObj[r]={},new i.a(function(i,o){Object(s.c)().then(function(a){!function(t,e){var n=window.URL||window.webkitURL,r=new Image;r.src=n.createObjectURL(t),r.onload=function(){e&&e(r),n.revokeObjectURL(r.src)}}(t,function(c){n.uploadData={key:Object(s.b)(n.prefix,c.width,c.height,t.type.split("/")[1]),token:a,fname:t.name};var l=n.checkFile(t,c);if("string"==typeof l)e.$message({message:l,showClose:!0,type:"warning"}),o();else{var u={hasSuccess:!1,uid:r,width:c.width,height:c.height};n.listObj[r]=u,i(!0)}})})})}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload-container"},[n("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("上传图片\n  ")]),t._v(" "),n("el-dialog",{attrs:{"append-to-body":"",visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-upload",{staticClass:"editor-slide-upload",attrs:{action:t.uploadUrl,multiple:t.multiple,"file-list":t.fileList,"show-file-list":!0,"list-type":"picture-card","on-remove":t.handleRemove,"on-success":t.handleSuccess,"on-error":t.handleError,"before-upload":t.beforeUpload,data:t.uploadData,accept:t.accept}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1),t._v(" "),n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("确 定")])],1)],1)},staticRenderFns:[]};var u=n("VU/8")(c,l,!1,function(t){n("EHY9")},"data-v-0f37f45a",null);e.a=u.exports},Xxa5:function(t,e,n){t.exports=n("jyFz")},YxOl:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.editor-slide-upload[data-v-0f37f45a] {\n  margin-bottom: 20px;\n}\n.editor-slide-upload[data-v-0f37f45a] .el-upload--picture-card {\n    width: 100%;\n}\n",""])},cAgV:function(t,e,n){"use strict";var r=n("woOf"),i=n.n(r),o=(n("ctMr"),{bind:function(t,e){t.addEventListener("click",function(n){var r=i()({},e.value),o=i()({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},r),a=o.ele;if(a){a.style.position="relative",a.style.overflow="hidden";var s=a.getBoundingClientRect(),c=a.querySelector(".waves-ripple");switch(c?c.className="waves-ripple":((c=document.createElement("span")).className="waves-ripple",c.style.height=c.style.width=Math.max(s.width,s.height)+"px",a.appendChild(c)),o.type){case"center":c.style.top=s.height/2-c.offsetHeight/2+"px",c.style.left=s.width/2-c.offsetWidth/2+"px";break;default:c.style.top=n.pageY-s.top-c.offsetHeight/2-document.body.scrollTop+"px",c.style.left=n.pageX-s.left-c.offsetWidth/2-document.body.scrollLeft+"px"}return c.style.backgroundColor=o.color,c.className="waves-ripple z-active",!1}},!1)}}),a=function(t){t.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(a)),o.install=a;e.a=o},ctMr:function(t,e,n){var r=n("z4F4");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("6077c87a",r,!0)},exGp:function(t,e,n){"use strict";e.__esModule=!0;var r,i=n("//Fk"),o=(r=i)&&r.__esModule?r:{default:r};e.default=function(t){return function(){var e=t.apply(this,arguments);return new o.default(function(t,n){return function r(i,a){try{var s=e[i](a),c=s.value}catch(t){return void n(t)}if(!s.done)return o.default.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});t(c)}("next")})}}},"gE/u":function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.image[data-v-358278ee] {\n  display: block;\n  max-width: 100%;\n  height: 200px;\n  background-size: cover;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n.danger[data-v-358278ee] {\n  color: #F56C6C;\n}\n.el-col-6[data-v-358278ee] {\n  margin-bottom: 20px;\n}\n.my-autocomplete li[data-v-358278ee] {\n  line-height: normal;\n  padding: 7px;\n}\n.my-autocomplete li .name[data-v-358278ee] {\n    text-overflow: ellipsis;\n    overflow: hidden;\n}\n.my-autocomplete li .addr[data-v-358278ee] {\n    font-size: 12px;\n    color: #b4b4b4;\n}\n.my-autocomplete li .highlighted .addr[data-v-358278ee] {\n    color: #ddd;\n}\n.right-nav[data-v-358278ee] {\n  position: fixed;\n  right: 0;\n  top: 150px;\n}\n",""])},jyFz:function(t,e,n){var r=function(){return this}()||Function("return this")(),i=r.regeneratorRuntime&&Object.getOwnPropertyNames(r).indexOf("regeneratorRuntime")>=0,o=i&&r.regeneratorRuntime;if(r.regeneratorRuntime=void 0,t.exports=n("SldL"),i)r.regeneratorRuntime=o;else try{delete r.regeneratorRuntime}catch(t){r.regeneratorRuntime=void 0}},nprw:function(t,e,n){var r=n("N0Ja");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("7c2a7338",r,!0)},qJ5E:function(t,e,n){var r=n("gE/u");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n("rjj0")("5adf5565",r,!0)},wt7r:function(t,e,n){"use strict";e.d=function(t,e){return Object(r.a)({url:"/admin/designmanu/merchant/case/page",method:"post",data:t,params:e})},e.b=function(t){return Object(r.a)({url:"/admin/designmanu/merchant/case/info/"+t,method:"get"})},e.a=function(t){return Object(r.a)({url:"/admin/designmanu/merchant/case/delete/"+t,method:"post"})},e.e=function(t){return Object(r.a)({url:"/admin/designmanu/merchant/case/saveOrUpdate",method:"post",data:t})},e.c=function(t,e){return Object(r.a)({url:"/admin/designmanu/merchant/case/onOrOff/"+t+"/"+e,method:"post"})};var r=n("vLgD")},z4F4:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".waves-ripple {\n    position: absolute;\n    border-radius: 100%;\n    background-color: rgba(0, 0, 0, 0.15);\n    background-clip: padding-box;\n    pointer-events: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 1;\n}\n\n.waves-ripple.z-active {\n    opacity: 0;\n    -webkit-transform: scale(2);\n    transform: scale(2);\n    -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out;\n    transition: opacity 1.2s ease-out, transform 0.6s ease-out, -webkit-transform 0.6s ease-out;\n}",""])},zeBY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),i=n.n(r),o=n("exGp"),a=n.n(o),s=n("cAgV"),c=n("TAej"),l=n("Q0Ca"),u=n("Zg3+"),d=n("5aCZ"),f=n("wt7r"),p=n("7rdf"),m={directives:{waves:s.a},components:{ImageUpload:c.a,Tinymce:d.a},data:function(){return{domain:u.a,categories:[],loading:!1,form:{id:void 0,caseName:void 0,subtitle:void 0,keywords:void 0,secondaryCgyId:void 0,secondaryCgyName:void 0,price:null,originalPrice:null,designConcept:void 0,freightPrice:void 0,stock:void 0,stockType:"1",caseInfo:void 0,goodsSource:6,picUrlList:[],caseAttrsDTOList:[]},rules:{caseName:[{required:!0,message:"请输入商品名",trigger:"blur"},{min:2,max:20,message:"长度在 2 到 20 个字符",trigger:"blur"}],keywords:[{required:!0,message:"请输入商品关键字",trigger:"blur"}],price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],originalPrice:[{required:!0,message:"请输入商品原价",trigger:"blur"}],designConcept:[{required:!0,message:"请输入设计理念",trigger:"blur"}],stock:[{required:!0,message:"请输入库存",trigger:"blur"}],freightPrice:[{required:!0,message:"请选择运费",trigger:"change"}],caseInfo:[{required:!0,message:"请输入商品详情",trigger:"blur"}],picUrlList:[{required:!0,message:"请上传商品图片",type:"array",trigger:"blur"}],caseAttrsDTOList:[{required:!0,message:"请添加商品参数",type:"array",trigger:"blur"}],secondaryCgyId:[{required:!0,message:"请选择分类",trigger:"blur"}]},editStatus:!0,timeout:null}},beforeRouteLeave:function(t,e,n){this.onbeforeunloadHandler(n)},beforeRouteEnter:function(t,e,n){var r=this;return a()(i.a.mark(function e(){var o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(o=void 0,!t.query.id){e.next=5;break}return e.next=4,Object(f.b)(t.query.id).then(function(t){return t.data});case 4:o=e.sent;case 5:n(function(t){setTimeout(function(){o&&(t.form=o)},10)});case 6:case"end":return e.stop()}},e,r)}))()},created:function(){this.getCategory()},methods:{getCategory:function(){var t=this;return a()(i.a.mark(function e(){var n;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(p.b)(1);case 2:n=e.sent,t.categories=n.data;case 4:case"end":return e.stop()}},e,t)}))()},categoryChange:function(t){for(var e=this.categories.length,n=0;n<e;n++)if(this.categories[n].id===t)return void(this.form.secondaryCgyName=this.categories[n].name)},save:function(){var t=this;this.$refs.form.validate(function(e){if(!e)return t.$notify({title:"警告",message:"请务必填写必选项",type:"warning"}),!1;t.loading=!0,Object(f.e)(t.form).then(function(e){t.editStatus=!1,t.$notify({title:"成功",message:"操作成功",type:"success",duration:2e3}),t.$router.push({name:"worksList"}),t.loading=!1}).catch(function(){t.loading=!1})})},reset:function(){this.$refs.form.resetFields()},getImageStyle:function(t){return{backgroundImage:"url("+Object(l.setImg)(t,{w:500})+")"}},workUploadSuccess:function(t){var e=this;t.forEach(function(t){var n=t.key;e.form.picUrlList.push(n)})},onbeforeunloadHandler:function(t){this.editStatus?window.confirm("确定要放弃当前的操作吗？")?t():t(!1):t()},handleCategoryChange:function(t){var e=this,n=[{id:"primaryCgyId",name:"primaryCgyName"},{id:"secondaryCgyId",name:"secondaryCgyName"}];t.forEach(function(t,r){e.form[n[r].id]=t,e.form[n[r].name]=p.b.map[t].catName})},tabClick:function(t){var e=document.querySelector(t.$attrs.target);e&&window.scrollTo(0,e.offsetTop)}}},h={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("el-form",{ref:"form",staticStyle:{"padding-right":"200px"},attrs:{model:t.form,rules:t.rules,"label-width":"120px"}},[n("h4",{attrs:{id:"BaseInfo"}},[t._v("基本信息：")]),t._v(" "),n("el-form-item",{attrs:{label:"商品名称",prop:"caseName"}},[n("el-input",{model:{value:t.form.caseName,callback:function(e){t.$set(t.form,"caseName",e)},expression:"form.caseName"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"副标题"}},[n("el-input",{model:{value:t.form.subtitle,callback:function(e){t.$set(t.form,"subtitle",e)},expression:"form.subtitle"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"关键字",prop:"keywords"}},[n("el-input",{attrs:{placeholder:"商品关键字,使用','号分隔,能准确搜到商品的,比如: 海尔电视,电视之类"},model:{value:t.form.keywords,callback:function(e){t.$set(t.form,"keywords",e)},expression:"form.keywords"}})],1),t._v(" "),n("h4",{attrs:{id:"WorkInfo"}},[t._v("商品信息：")]),t._v(" "),n("el-form-item",{attrs:{label:"商品分类",prop:"secondaryCgyId"}},[n("el-select",{attrs:{placeholder:"选择商品分类"},on:{change:t.categoryChange},model:{value:t.form.secondaryCgyId,callback:function(e){t.$set(t.form,"secondaryCgyId",e)},expression:"form.secondaryCgyId"}},t._l(t.categories,function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"商品主图",prop:"picUrlList"}},[t.form.picUrlList.length?n("el-row",{staticClass:"row"},t._l(t.form.picUrlList,function(e,r){return n("el-col",{key:r,staticClass:"col",attrs:{span:6}},[n("el-card",{staticStyle:{width:"250px"},attrs:{"body-style":{padding:"0px"}}},[n("a",{staticClass:"image",style:t.getImageStyle(e),attrs:{target:"_blank",href:t._f("setImg")(e)}}),t._v(" "),n("div",{staticStyle:{padding:"14px"}},[n("div",{staticClass:"bottom clearfix"},[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){t.form.picUrlList.splice(r,1)}}},[t._v("删除")])],1)])])],1)})):t._e(),t._v(" "),t.form.picUrlList.length<9?n("div",[n("ImageUpload",{attrs:{multiple:!1,prefix:"work"},on:{successCBK:t.workUploadSuccess}}),t._v(" "),n("div",[t._v("共"),n("span",{staticClass:"danger"},[t._v(t._s(t.form.picUrlList.length))]),t._v("张，还能上传"),n("span",{staticClass:"danger"},[t._v(t._s(9-t.form.picUrlList.length))]),t._v("张")])],1):t._e()],1),t._v(" "),n("el-form-item",{attrs:{label:"设计理念",prop:"designConcept"}},[n("el-input",{attrs:{autosize:{minRows:3,maxRows:5},type:"textarea",placeholder:"请输入设计理念，不超过500字"},model:{value:t.form.designConcept,callback:function(e){t.$set(t.form,"designConcept",e)},expression:"form.designConcept"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"运费设置(￥)",prop:"freightPrice"}},[n("el-input",{model:{value:t.form.freightPrice,callback:function(e){t.$set(t.form,"freightPrice",e)},expression:"form.freightPrice"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"库存",prop:"stock"}},[n("el-input",{model:{value:t.form.stock,callback:function(e){t.$set(t.form,"stock",t._n(e))},expression:"form.stock"}}),t._v(" "),n("el-radio-group",{model:{value:t.form.stockType,callback:function(e){t.$set(t.form,"stockType",e)},expression:"form.stockType"}},[n("el-radio",{attrs:{label:"1"}},[t._v("付款减库存")]),t._v(" "),n("el-radio",{attrs:{label:"2"}},[t._v("拍下减库存")])],1)],1),t._v(" "),n("h4",{attrs:{id:"WorkDetail"}},[t._v("商品详情：")]),t._v(" "),n("el-form-item",{attrs:{label:"参数设置",prop:"caseAttrsDTOList"}},[n("el-table",{staticStyle:{width:"540px","margin-bottom":"10px"},attrs:{data:t.form.caseAttrsDTOList,border:""}},[n("el-table-column",{attrs:{width:"180px",align:"center",label:"参数名称"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("el-input",{attrs:{placeholder:"请输入参数名称"},model:{value:r.attrName,callback:function(e){t.$set(r,"attrName",e)},expression:"row.attrName"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"180px",align:"center",label:"参数值"},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.row;return[n("el-input",{attrs:{placeholder:"请输入参数值"},model:{value:r.attrValue,callback:function(e){t.$set(r,"attrValue",e)},expression:"row.attrValue"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"180px",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){e.row;var r=e.$index;return[n("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(e){t.form.caseAttrsDTOList.splice(r,1)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:function(e){t.form.caseAttrsDTOList.push({attrName:"",attrValue:""})}}},[t._v("添加参数")])],1),t._v(" "),n("el-form-item",{attrs:{label:"商品价格",prop:"price"}},[n("el-input",{model:{value:t.form.price,callback:function(e){t.$set(t.form,"price",t._n(e))},expression:"form.price"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"原价",prop:"originalPrice"}},[n("el-input",{model:{value:t.form.originalPrice,callback:function(e){t.$set(t.form,"originalPrice",t._n(e))},expression:"form.originalPrice"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"商品详情",prop:"caseInfo"}},[n("Tinymce",{ref:"editor",attrs:{height:500},model:{value:t.form.caseInfo,callback:function(e){t.$set(t.form,"caseInfo",e)},expression:"form.caseInfo"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.save}},[t._v("提交")])],1)],1),t._v(" "),n("el-tabs",{staticClass:"right-nav",attrs:{"tab-position":"right"},on:{"tab-click":t.tabClick}},[n("el-tab-pane",{attrs:{label:"基本信息",target:"#BaseInfo"}}),t._v(" "),n("el-tab-pane",{attrs:{label:"商品信息",target:"#WorkInfo"}}),t._v(" "),n("el-tab-pane",{attrs:{label:"商品详情",target:"#WorkDetail"}})],1)],1)},staticRenderFns:[]};var g=n("VU/8")(m,h,!1,function(t){n("qJ5E")},"data-v-358278ee",null);e.default=g.exports}});