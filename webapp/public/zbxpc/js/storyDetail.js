$(document).ready(function () {
    let fls = flashChecker();
    var info=JSON.parse(sessionStorage.getItem('pgcInfo'))
    $('div.story-detail div.header span').html(info.pgcName)
    $('div.story-detail div.container .content').html(info.pgcContent)
    $('div.story-detail div.container .title').html(info.pgcName)
    if(info.pgcType===1){
        $('div.story-detail div.container .content').html(info.pgcContent)
        $('.no_flash').hide()
    }else{
        if (!fls.f) {
            $('.no_flash').show()
        } else {
            $('.no_flash').hide()
        }
        var player = new TcPlayer('content', {
            "m3u8": info.pgcVideoUrl, //请替换成实际可用的播放地址
            "mp4": info.pgcVideoUrl, //请替换成实际可用的播放地址
            "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
            "coverpic" : "http://www.test.com/myimage.jpg",
            "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
            "height" : '600'//视频的显示高度，请尽量使用视频分辨率高度
        });
    }
})
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