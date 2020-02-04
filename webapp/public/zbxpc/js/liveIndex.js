var $URI='http://api1.user.hongdoujiao.com:8721'
function flashChecker() {
    let hasFlash = 0; //是否安装了flash
    let flashVersion = 0; //flash版本
    if (document.all) {
        let swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            let swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                let words = swf.description.split(" ");
                for (let i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) continue;
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return { f: hasFlash, v: flashVersion };
}
$(document).ready(function () {
    let fls = flashChecker();
    if (!fls.f) {
        $('.no_flash').show()
    } else {
        $('.no_flash').hide()
    }
    $('#liveMore').click(function () {
        window.location.href='/live/liveList'
    })
    $('#liveMore1').click(function () {
        window.location.href='/live/otherLiveList'
    })
    $('#storyMore').click(function () {
        window.location.href='/live/storyList'
    })
    $('#nav .center').on('click','span',function () {
        getTopList($(this).attr('data-id'),$(this))
    })
    $('#topBanner').click(function () {
        // window.location.href=
    })
    $('.loading').show();
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
            }
            $('.loading').hide();
        }
    })
    function getTopList(id,dom) {
        var livePara={
            pageSize:6,
            pageIndex:1,
        }
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
                if(res.code===20000){
                    if(res.resp.liveList){
                        if(res.resp.liveList.spaceInfo){
                            var list=res.resp.liveList.spaceInfo.spaceInfoList;
                            if(dom){
                                $('#nav .center span').removeClass('active')
                                dom.addClass('active');
                                $('.top .container .left').html('')
                                $('.top .container .right').html('')
                            }
                            for(var i=0;i<list.length;i++){
                                topHtml+='<div class="item">'
                                topHtml+='<div class="top"  onclick="routerDetail('+list[i].userInfo.userId+','+list[i].liveInfo.liveInfoList[0].liveId+','+list[i].spaceId+')">'
                                topHtml+='<img class="big" src="'+list[i].userInfo.userHead.thumPicurl+'" alt="">'
                                if(list[i].liveInfo){
                                    topHtml+='<img src="../zbxpc/image/play.png" alt="" class="living">'
                                    topHtml+='<p class="num">直播中</p>'
                                }
                                if(!list[i].liveInfo.liveInfoList[0].liveTitle){
                                    if(!list[i].spaceNotice){
                                        topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                    }else{
                                        topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                                    }
                                }else{
                                    topHtml+='<p class="name">'+list[i].liveInfo.liveInfoList[0].liveTitle+'</p>'
                                }
                                topHtml+='</div><div class="bottom"><img src="'+list[i].userInfo.userHead.iconPicurl+'" alt=""><span>'+list[i].spaceName+'</span></div></div>'
                                // topHtml+='<div class="bottom">'
                                // if(list[i].spaceNotice){
                                //     if(list[i].spaceNotice===''){
                                //         topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                //     }else{
                                //         topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                                //     }
                                // }else{
                                //     topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                // }
                                // topHtml+='<div class="content">'
                                // topHtml+='<img src="'+list[i].userInfo.userHead.iconPicurl+'" alt="">'
                                // topHtml+='<span class="name">'+list[i].spaceName+'</span></div>'
                                // topHtml+='</div></div>'
                            }
                            $('.top .container .item').remove()
                            $('.top .container').append(topHtml)
                            $('.loading').hide();
                        }else{
                            $('.toast').html('该类目下暂无直播')
                            $('.toast').fadeIn(200)
                            setTimeout(function () {
                                $('.toast').fadeOut(200)
                            },1000)
                            $('.loading').hide();
                        }
                    }else{
                        $('.toast').html('该类目下暂无直播')
                        $('.toast').fadeIn(200)
                        setTimeout(function () {
                            $('.toast').fadeOut(200)
                        },1000)
                        $('.loading').hide();
                    }
                }else{
                    $('.toast').html(res.msg)
                    $('.toast').fadeIn(200)
                    setTimeout(function () {
                        $('.toast').fadeOut(200)
                    },1000)
                    $('.loading').hide();
                }
            }
        })
    }
    getTopList('000');
    $('div.nav div.item').click(function () {
        if($(this).children('.content').children('.title').text()==='新奇看点'){
            window.location.href='/live/storyList'
        }else if($(this).children('.content').children('.title').text()==='抢手拍卖'){
            
        }else if($(this).children('.content').children('.title').text()==='珠宝直销'){
            window.location.href='/live/liveList'
        }else{
            window.location.href='/live/otherLiveList'
        }
    })
    function getTopList1(id,dom) {
        var livePara={
            pageSize:6,
            pageIndex:1,
        }
        if(GetRequest()['token']){
            livePara.token=GetRequest()['token']
        }else{
            delete livePara.token;
        }
        $('.loading').show();
        $.ajax({
            url:$URI+'/classifyPgc/getClassifyPgcListforJson',
            type:'post',
            data:{
                pageSize:6,
                pageIndex:1,
                moduleId:6
            },
            success:function (res) {
                var topHtml=''
                if(res.Code===20000){
                    if(res.classifyModule){
                        if(res.classifyModule.classifyPgcReply.classifyPgc){
                            var list=res.classifyModule.classifyPgcReply.classifyPgc.spaceInfo.spaceInfoList.splice(0,6)
                            for(var i=0;i<list.length;i++){
                                topHtml+='<div class="item">'
                                if(list[i].liveInfo){
                                    topHtml+='<div class="top"  onclick="routerDetail('+list[i].userInfo.userId+','+list[i].liveInfo.liveInfoList[0].liveId+','+list[i].spaceId+')">'
                                }else{
                                    topHtml+='<div class="top"  onclick="routerDetail('+list[i].userInfo.userId+','+undefined+','+list[i].spaceId+')">'
                                }
                                topHtml+='<img class="big" src="'+list[i].userInfo.userHead.thumPicurl+'" alt="">'
                                if(list[i].liveInfo){
                                    topHtml+='<img src="./image/play.png" alt="" class="living">'
                                    topHtml+='<p class="num">直播中</p>'
                                }
                                if(list[i].liveInfo){
                                    if(!list[i].liveInfo.liveInfoList[0].liveTitle){
                                        if(!list[i].spaceNotice){
                                            topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                        }else{
                                            topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                                        }
                                    }else{
                                        topHtml+='<p class="name">'+list[i].liveInfo.liveInfoList[0].liveTitle+'</p>'
                                    }
                                }else{
                                    if(!list[i].spaceNotice){
                                        topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                    }else{
                                        topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                                    }
                                }
                                topHtml+='</div><div class="bottom"><img src="'+list[i].userInfo.userHead.iconPicurl+'" alt=""><span>'+list[i].spaceName+'</span></div></div>'
                                // topHtml+='<div class="bottom">'
                                // if(list[i].spaceNotice){
                                //     if(list[i].spaceNotice===''){
                                //         topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                //     }else{
                                //         topHtml+='<p class="name">'+list[i].spaceNotice+'</p>'
                                //     }
                                // }else{
                                //     topHtml+='<p class="name">直播购物,保证正品优品</p>'
                                // }
                                // topHtml+='<div class="content">'
                                // topHtml+='<img src="'+list[i].userInfo.userHead.iconPicurl+'" alt="">'
                                // topHtml+='<span class="name">'+list[i].spaceName+'</span></div>'
                                // topHtml+='</div></div>'
                            }
                            $('.top .container1 .item').remove()
                            $('.top .container1').append(topHtml)
                            $('.loading').hide();
                        }else{
                            $('.toast').html('该类目下暂无直播')
                            $('.toast').fadeIn(200)
                            setTimeout(function () {
                                $('.toast').fadeOut(200)
                            },1000)
                            $('.loading').hide();
                        }
                    }else{
                        $('.toast').html('该类目下暂无直播')
                        $('.toast').fadeIn(200)
                        setTimeout(function () {
                            $('.toast').fadeOut(200)
                        },1000)
                        $('.loading').hide();
                    }
                }else{
                    $('.toast').html(res.msg)
                    $('.toast').fadeIn(200)
                    setTimeout(function () {
                        $('.toast').fadeOut(200)
                    },1000)
                    $('.loading').hide();
                }
            }
        })
    }
    getTopList1();
    getTopList('000');
    $('div.nav div.item').click(function () {
        if($(this).children('.content').children('.title').text()==='新奇看点'){
            window.location.href='/live/storyList'
        }else if($(this).children('.content').children('.title').text()==='抢手拍卖'){
        }else if($(this).children('.content').children('.title').text()==='珠宝直销'){
            window.location.href='/live/liveList'
        }else{
            window.location.href='/live/otherLiveList'
        }
    })
    $('#routerOther').hover(function () {
        $('#routerOther .ceng').fadeIn(200)
        $('#routerOther ul').fadeIn(200)
    },function () {
        $('#routerOther .ceng').fadeOut(200)
        $('#routerOther ul').fadeOut(200)
    })
    $('#routerOther ul li:first-child').click(function () {
        window.location.href='http://www.gacjc.com/exchange/auction'
    })
    $('#routerOther ul li:last-child').click(function () {
        window.location.href='/live/otherLiveList'
    })
})