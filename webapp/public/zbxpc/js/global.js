// var $URL='http://60.190.202.220/api'
var URL='http://api1.user.hongdoujiao.com:8721'
var $URI='http://api1.user.hongdoujiao.com:8721'
var $URL='http://jewelry-api.hongdoujiao.com/jewelry-api'
function GetRequest () {
    var params = location.href.split('?')[1]// 获取url中"?"符后的字串
    if (!params) {
        return {}
    }
    let obj = {}
    var strs = params.split('#')[0]
    strs = strs.split('&')
    for (var i = 0; i < strs.length; i++) {
        obj[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
    
    return obj
}

//function getCookie(name){
//				let arr = document.cookie.split('; ')
//			    let obj = {}
//			    arr.map((item, key) => {
//			    	let bob = item.split('=')
//			    	obj[bob[0]] = bob[1]
//			    })
//				return obj[name]
//			}
//			 utils.ajax({
//				url:"/api/liveRoom/token",
//				type:"post",
//				data:{
//					token:getCookie('token'),
//					userName :getCookie('phone')
//				},
//				headers:{
//					Authorization:getCookie('token')
//				},
//				success:function(data){
//					console.log(data,11111111111111)
//				},
//			})
			 
			 
			 
function routerDetail(userId,liveId,spaceId) {
    if(liveId){
        if(GetRequest()['token']){
            window.location.href='/live/living?userToken='+GetRequest()['token']+'&userId='+userId+'&liveId='+liveId+'&spaceId='+spaceId;
        }else{
            window.location.href='/live/living?userId='+userId+'&liveId='+liveId+'&spaceId='+spaceId;
        }
    }else{
        $('.toast').html('主播正在路上...')
        $('.toast').fadeIn(200)
        setTimeout(function () {
            $('.toast').fadeOut(200)
        },1000)
        $('.loading').hide();
    }
}


