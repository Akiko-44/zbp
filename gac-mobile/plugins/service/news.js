const basePath = '/app/industry'

export default {
  newsHomeList: [`/app/industry/homeSetting/getHomePage`, 'get'], //获取首页列表
  newsBannerList: [`/pc/industry/banner/list`, 'get'], //获取首页banner图
  newsArticleDetail: [`${basePath}/article/detail`, 'get'], //获取详情
  newsSendComment: [`${basePath}/article/comment/add`, 'post'], //添加评论
  newsCommentList: [`${basePath}/article/comment/list`, 'get'], //评论列表
  newsHotList: ['/pc/industry/article/columnIdNewList', 'get'], //获取热点新闻列表
  newsTree: ['/pc/industry/column/classifyListTwo', 'get'], //获取树
  newList: ['/pc/industry/article/list', 'get'], //更多页面
  newPatentList: ['/pc/industry/patent/list', 'get'], //专利列表
  newListNum: ['/pc/industry/patent/listNum', 'get'], //专利总条数
  newListdetail: ['/pc/industry/patent/detail', 'get'], //专利详情
  newNotice: ['/pc/industry/notice/list', 'get'], //公告list
  newdetail: ['/pc/industry/notice/detail', 'get'], //公告详情

  // 珠宝圈
  jewelryCircleColumns: ['/api/homePage/jewelry/columns', 'get'], // 珠宝圈栏目
  jewelryCircle: ['/api/homePage/jewelry/content/page', 'get'], // 珠宝圈列表
  jewelryCircleDetail: ['/api/homePage/jewelry/content/detail', 'get'], // 详情
  jewelryCircleComment: ['/api/homePage/content/comment/page', 'get'], // 评论列表
  jewelryCircleLike: ['/api/like/click', 'post'], // 珠宝圈文章、评论点赞与取消点赞
  jewelryCircleCommentAdd: ['/admin/contentComment/save', 'post'], // 珠宝圈评论
  jewelryCircleCommentReply: ['/api/homePage/content/comment/more', 'get'], // 查看评论回复内容
  jewelryCircleConcernAuthor: ['/api/jewelryContent/concernAuthor/list', 'get'], // 关注页面获取所有关注作者
  jewelryCircleAuthor: ['/api/jewelryContent/author/page', 'get'], // 作者个人页面获取作者信息
  jewelryCircleConcern: ['/api/jewelryContent/author/concern', 'get'], // 关注作者及取消关注
  jewelryCircleCollect: ['/api/userCenter/collect/add', 'post'], // 珠宝圈内容收藏
  jewelryCircleCollectDelete: ['/api/userCenter/collect/delete', 'get'], // 批量删除珠宝圈内容收藏
  jewelryCircleCollectOrNot: ['/api/userCenter/collect/addOrDelete', 'post'], // 珠宝圈内容收藏或取消收藏

  jewelryCircleCollectList: ['/api/userCenter/collect/Jewelry', 'get'], // 获取用户收藏珠宝圈内容
  jewelryCircleHotKeyword: ['/api/homePage/hotKeyword', 'get'], // 获取搜索热门关键字
  jewelryCircleHistoryKeyword: ['/api/homePage/userKeywordRecord', 'get'], // 获取用户搜索记录
  jewelryCircleHistoryDelete: ['/api/homePage/deleteUserKeywordRecord', 'post'], // 删除用户搜索记录
  jewelryCircleShare: ['/app/share/success', 'get'], // 珠宝圈分享统计
}
