const basePath = '/app/gallery'

export default {
  galleryBannerPage: [`/pc/gallery/banner/list`, 'get'],							 //获取首页轮播图
  galleryHomeList: [`/app/gallery/homeSetting/getHomePage`, 'get'],  //获取首页位置列表
  galleryList: ['/pc/gallery/newGalleryList','get'],              		 //获取列表
  galleryListNum: ['/pc/gallery/galleryListNum','get'],                //获取列表总条数
  galleryFatherList: ['/pc/gallery/moreGalleryList','get'],            //一二级列表     （pid）
  galleryFatherListNum: ['/pc/gallery/moreGalleryListNum','get'],      //一二级列表总条数 （pid）
  gallerySubsetList: ['/pc/gallery/galleryListById','get'],            //三级列表 （id）
  gallerySubsetListNum: ['/pc/gallery/galleryListNumById','get'],      //三级列表总条数 （id）
  galleryAtlasDetail: [`${basePath}/atlas/detail`, 'get'],						 //获取图集详情
  galleryAtlasCommentList: [`${basePath}/atlas/comment/list`, 'get'],  //获取评论列表
  galleryAtlasComment: [`${basePath}/atlas/comment`, 'post'],          //获取评论详情
	galleryTree:['/pc/gallery/categoryListTwo','get'],                   //获取树
	galleryDoing:['/app/gallery/activity/page','get'],				 				 //活动列表
	galleryDoingNum:['/app/gallery/activity/getPCNumCount','get'],		 //活动列表总条数
	gallerydetails:['/app/gallery/activity/getGalleryActivityById','get'],	//详情
	galleryLikeNum:['/app/gallery/activity/updateIncrLikeNum','post'],    //点赞
	
	galleryAtlasPraise:['/pc/gallery/atlas/praise','post'],
	activityCodeAll: ['/api/userCenter/smscodetel', 'post']
}
