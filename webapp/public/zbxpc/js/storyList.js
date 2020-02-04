var para={
    pageIndex:1,
    pageSize:15,
    moduleId:4
}
var list;
var userToken=GetRequest()['userToken']
var userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
$(document).ready(function () {
    $.ajax({
        url:URL+'/classifyPgc/getClassifyPgcListforJson',
        type:'post',
        data:para,
        success(res){
            var html='';
            list=res.classifyModule.classifyPgcReply.classifyPgc.classifyPgcs
            for(var i=0;i<list.length;i++){
                html+=`<li data-id="`+list[i].pgcId+`" data-index="`+i+`">
                            <div class="top"><img src="`+list[i].pgcPicUrl+`" alt=""></div>
                            <div class="bottom">
                                <p class="name">`+list[i].pgcTitle+`</p>
                                <p class="desc">`+list[i].pgcDesc+`</p>
                            </div>
                        </li>`
            }
            $('ul.content').html(html)
            $("#pagination").whjPaging({
                isShowTotalPage:false,
                isShowTotalSize:false,
                isShowRefresh: false,
                isShowPageSizeOpt: false,
                css: 'css-4',
                totalSize: res.classifyModule.classifyPgcReply.page.countNum,
                isShowFL:false,
                totalPage: res.classifyModule.classifyPgcReply.page.pages,
                callBack: function (currPage, pageSize) {
                    getMore(currPage)
                }
            });
        }
    })
    function getMore(val) {
        para.pageIndex=val;
        $.ajax({
            url:URL+'/classifyPgc/getClassifyPgcListforJson',
            type:'post',
            data:para,
            success(res){
                var html='';
                list=res.classifyModule.classifyPgcReply.classifyPgc.classifyPgcs
                for(var i=0;i<list.length;i++){
                    html+=`<li data-id="`+list[i].pgcId+`" data-index="`+i+`">
                            <div class="top"><img src="`+list[i].pgcPicUrl+`" alt=""></div>
                            <div class="bottom">
                                <p class="name">`+list[i].pgcTitle+`</p>
                                <p class="desc">`+list[i].pgcDesc+`</p>
                            </div>
                        </li>`
                }
                $('ul.content').html(html)
            }
        })
    }
    $('ul.content').on('click','li',function () {
        if(sessionStorage.getItem('pgcInfo')){
            sessionStorage.removeItem('pgcInfo')
            sessionStorage.setItem('pgcInfo',JSON.stringify(list[$(this).attr('data-index')]))
        }else{
            sessionStorage.setItem('pgcInfo',JSON.stringify(list[$(this).attr('data-index')]))
        }
        window.location.href='/live/storyDetail'
    })
})