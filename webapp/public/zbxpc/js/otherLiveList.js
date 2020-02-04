var livePara={
    pageSize:10,
    pageIndex:1,
    moduleId:6
}
var list=[];
function getTopList(id,dom) {
    if(GetRequest()['token']){
        livePara.token=GetRequest()['token']
    }else{
        delete livePara.token;
    }
    $('.loading').show();
    $.ajax({
        url:URL+'/classifyPgc/getClassifyPgcListforJson',
        type:'post',
        data:livePara,
        success:function (res) {
            var topHtml=''
            if(res.Code===20000){
                if(res.classifyModule.classifyPgcReply){
                    list=res.classifyModule.classifyPgcReply.classifyPgc.spaceInfo.spaceInfoList
                    $("#pagination").whjPaging({
                        isShowTotalPage:false,
                        isShowTotalSize:false,
                        isShowRefresh: false,
                        isShowPageSizeOpt: false,
                        css: 'css-4',
                        totalSize: res.classifyModule.classifyPgcReply.page.countNum,
                        isShowFL:false,
                        totalPage:  res.classifyModule.classifyPgcReply.page.pages,
                        callBack: function (currPage, pageSize) {
                            livePara.pageIndex=currPage
                            getMore()
                        }
                    });
                    for(var i=0;i<list.length;i++){
                        topHtml+='<li data-index="'+i+'">'
                        topHtml+='<div class="top">'
                        topHtml+='<img class="big" src="'+list[i].userInfo.userHead.thumPicurl+'" alt="">'
                        if(list[i].liveInfo){
                            topHtml+='<img src="./image/play.png" alt="" class="living">'
                            if(list[i].liveInfo.liveInfoList[0].liveAudiences){
                                topHtml+='<p class="num">'+list[i].liveInfo.liveInfoList[0].liveAudiences+'人观看</p>'
                            }else{
                                topHtml+='<p class="num">直播中</p>'
                            }
                        }
                        topHtml+='</div>'
                        topHtml+='<div class="bottom">'
                        if(list[i].spaceNotice){
                            if(list[i].spaceNotice===''){
                                topHtml+='<p class="name">直播购物,保证正品优品</p>'
                            }else{
                                topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                            }
                        }else{
                            topHtml+='<p class="name">直播购物,保证正品优品</p>'
                        }
                        topHtml+='<div class="content">'
                        topHtml+='<img src="'+list[i].userInfo.userHead.iconPicurl+'" alt="">'
                        topHtml+='<span class="name">'+list[i].spaceName+'的直播间</span>'
                        topHtml+='</div></div></li>'
                    }
                    $("#pagination").show()
                }
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
            $('ul.list').html(topHtml)
            $('.loading').hide();
        }
    })
}
function getMore(){
    $('.loading').show();
    $.ajax({
        url:URL+'/classifyPgc/getClassifyPgcListforJson',
        type:'post',
        data:livePara,
        success:function (res) {
            var topHtml=''
            var list=[];
            if(res.Code===20000){
                if(res.classifyModule.classifyPgcReply){
                    list=res.classifyModule.classifyPgcReply.classifyPgc.spaceInfo.spaceInfoList
                    for(var i=0;i<list.length;i++){
                        topHtml+='<li data-index="'+i+'">'
                        topHtml+='<div class="top">'
                        topHtml+='<img class="big" src="'+list[i].userInfo.userHead.thumPicurl+'" alt="">'
                        if(list[i].liveInfo){
                            topHtml+='<img src="../zbxpc/image/play.png" alt="" class="living">'
                            if(list[i].liveInfo.liveInfoList[0].liveAudiences){
                                topHtml+='<p class="num">'+list[i].liveInfo.liveInfoList[0].liveAudiences+'人观看</p>'
                            }else{
                                topHtml+='<p class="num">直播中</p>'
                            }
                        }
                        topHtml+='</div>'
                        topHtml+='<div class="bottom">'
                        if(list[i].spaceNotice){
                            if(list[i].spaceNotice===''){
                                topHtml+='<p class="name">直播购物,保证正品优品</p>'
                            }else{
                                topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                            }
                        }else{
                            topHtml+='<p class="name">直播购物,保证正品优品</p>'
                        }
                        topHtml+='<div class="content">'
                        topHtml+='<img src="'+list[i].userInfo.userHead.iconPicurl+'" alt="">'
                        topHtml+='<span class="name">'+list[i].spaceName+'的直播间</span>'
                        topHtml+='</div></div></li>'
                    }
                    $("#pagination").show()
                }
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
            $('ul.list').html(topHtml)
            $('.loading').hide();
        }
    })
}
$(document).ready(function () {
    getTopList();
    $('ul.list').on('click','li',function () {
        if(list[$(this).attr('data-index')].liveInfo){
            window.location.href='./living.html?userId='+list[$(this).attr('data-index')].userInfo.userId+'&liveId='+list[$(this).attr('data-index')].liveInfo.liveInfoList[0].liveId+'&spaceId='+list[$(this).attr('data-index')].spaceId
        }else{
            $('.toast').html('主播还在赶来的路上哦...')
            $('.toast').fadeIn(200)
            setTimeout(function () {
                $('.toast').fadeOut(200)
            },1000)
        }
    })
})