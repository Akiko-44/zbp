var livePara={
    pageSize:25,
    pageIndex:1,
}
$(document).ready(function () {
    $("#pagination").whjPaging({
        isShowTotalPage:false,
        isShowTotalSize:false,
        isShowRefresh: false,
        isShowPageSizeOpt: false,
        css: 'css-4',
        totalSize: 90,
        isShowFL:false,
        totalPage: 18,
        callBack: function (currPage, pageSize) {
            livePara.pageIndex=currPage
            getTopList($('.active').attr('data-id'))
        }
    });
    $('#nav .center').on('click','span',function () {
        getTopList($(this).attr('data-id'),$(this))
    })
    $('.loading').show();
    getClassify()
    getTopList('000')
})
function getTopList(id,dom) {
    if(id==='000'){
        delete livePara.classifyId;
    }else{
        livePara.classifyId=id;
    }
    if(GetRequest()['token']){
        livePara.token=GetRequest()['token']
    }else{
        delete livePara.token;
    }
    $('.loading').show();
    $.ajax({
        url:$URL+'/jewelry/jewelryLiveList',
        type:'GET',
        data:livePara,
        success:function (res) {
            var topHtml=''
            var list=[];
            if(res.code===20000){
                if(res.resp.liveList.spaceInfo){
                    if(dom){
                        $('#nav .center span').removeClass('active')
                        dom.addClass('active');
                    }
                    $('ul.list').html('')
                    list=res.resp.liveList.spaceInfo.spaceInfoList
                    $("#pagination").whjPaging("setPage", {currPage: livePara.pageIndex, totalPage: res.resp.liveList.page.pages, totalSize: res.resp.liveList.page.countNum});
                    $("#pagination").show()
                }else{
                    $('.toast').html('该类目下暂无类目')
                    $('.toast').fadeIn(200)
                    setTimeout(function () {
                        $('.toast').fadeOut(200)
                    },1000)
                }
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
            for(var i=0;i<list.length;i++){
                topHtml+='<li>'
                topHtml+='<div class="top" onclick="routerDetail('+list[i].userInfo.userId+','+list[i].liveInfo.liveInfoList[0].liveId+','+list[i].spaceId+')">'
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
                topHtml+='<span class="name">'+list[i].spaceName+'</span>'
                topHtml+='</div></div></li>'
            }
            $('ul.list').append(topHtml)
            $('.loading').hide();
        }
    })
}
function getClassify(){
    $.ajax({
        url:$URL+'/jewelry/jewelryClassify',
        type:'get',
        success:function (res) {
            var topStr=''
            if(res.code===20000){
                topStr+='<span class="active" data-id="000">全部</span>'
                for(var i=0;i<res.resp.jewelryClassify.classifyList.length;i++){
                    topStr+='<span data-id="'+res.resp.jewelryClassify.classifyList[i].classifyId+'">'+res.resp.jewelryClassify.classifyList[i].classifyName+'</span>'
                }
                $('#nav .center').append(topStr)
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
            $('.loading').hide();
        }
    })
}