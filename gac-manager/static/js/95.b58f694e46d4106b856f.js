webpackJsonp([95],{"8/gU":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t("R6Wb"),a=t("vLgD");var s={components:{BannerSettings:r.a},methods:{getBanners:function(){return Object(a.a)({url:"/admin/gallery/banner/list",method:"get"})},saveBanners:function(e){return Object(a.a)({url:"/admin/gallery/banner/bannerSetting",method:"post",data:e})}}},l={render:function(){var e=this.$createElement;return(this._self._c||e)("BannerSettings",{attrs:{getBanners:this.getBanners,saveBanners:this.saveBanners}})},staticRenderFns:[]},i=t("VU/8")(s,l,!1,null,null,null);n.default=i.exports}});