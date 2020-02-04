export default {
  jewelryShowList: ['/api/extend/exhibitionshow/showList', 'get'],
  jewelryDetailShow: ['/api/extend/exhibitionshow/detailShow', 'get'],
  jewelryDetailMerPicShow: ['/api/extend/exhibitionshow/detailMerPicShow', 'get'],
  getAdShowList: ['/api/extend/exhibitionshow/adShowList', 'get'],
  
  jewelryReservation: ['/pc/jewelry/exhibition/IndexJewelryPicture', 'get'],			  //预约banner
  jewelryVRList: ['/app/jewelry/home/getHomeVRPage', 'get'],					 						//珠宝大市场之后的和第一个大的VR
  jewelryList: [' /app/jewelry/home/getHomePage', 'get'],													//珠宝展首页列表
 	jewelryBrand: ['/pc/jewelry/exhibition/brandList', 'get'],											 	//展会品牌
 	jewelryDir: ['/pc/jewelry/exhibition/regionList', 'get'],													//展会地址
 	
 	
 	jewelryExhibition: ['/pc/jewelry/exhibition/list', 'get'],					    					//前两个更多列表
 	jewelryExhibitionPar: ['/pc/jewelry/exhibition/exhibitionList', 'get'],					  //前两个更多列表带参数
 	jewelryExhibitionParNum: ['/pc/jewelry/exhibition/exhibitionListNum', 'get'],		  //前两个更多列表带参数返回总条数
 	
 	jewelryMorelist: ['/pc/jewelry/vr/VrList', 'get'],																//后三个更多页
 	
 	jewelryDetail: ['/pc/jewelry/exhibition/details', 'get'],                         //前两个详情页内容
 	jewelryDetailimage: ['/pc/jewelry/exhibition/atlasList', 'get'],                  //前两个详情页图集
 	
 	jewelryVRdetail: ['/pc/jewelry/vr/detailsVr', 'get'],														  //后三个详情页

 	jewelryForm: ['/pc/jewelry/subscribe/subscribeMessage', 'get'],								    //from
 	
 	jewelryDirList: ['/pc/jewelry/exhibition/regionList', 'get'],							        //获取地址
 	jewelryBrandList: ['/pc/jewelry/exhibition/brandList', 'get'],							      //获取品牌
}
