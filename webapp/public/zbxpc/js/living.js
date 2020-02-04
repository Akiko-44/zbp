var token=''
var spaceId=GetRequest()['spaceId']
var userId=GetRequest()['userId']
var liveId=GetRequest()['liveId']
var userToken=GetRequest()['userToken']
var messageName;
var player = null;
// var userToken='dGJ4RDFaZFQ4enU5UStJSGNMVkhMRlFzT082dkdMZTQwNWM4TnBDZjAvd293MTFiTG9Bbk1IVmpQYTNJa3hrRA=='
var userInfo=JSON.parse(sessionStorage.getItem('userInfo'));
var proPara={
    pageIndex:1,
    pageSize:10,
    spaceId:spaceId
}
var livePara={
    liveId:GetRequest()['liveId'],
    spaceId:GetRequest()['spaceId']
}
if(userToken){
    livePara.token=userToken;
    proPara.token=userToken;
}else{
    delete livePara.token;
    delete proPara.token;
}
// Object.assign(window, RongIMLib)
window.RongIMLib=RongIMLib;
$(document).ready(function () {
    let fls = flashChecker();
    if (!fls.f) {
        $('.no_flash').show()
    } else {
        $('.no_flash').hide()
    }
    $('.play').click(function () {
        if(player){
            player.play();
        }
    })
    $('#sendMsg').click(sendMessageHandle)
    $("input").keydown(function(){
        if(event.keyCode === 13){
            sendMessageHandle()
        }
    })
    getLive()
    getToken()
    getProList()
    if(userToken){
        getUserInfo()
    }
    $('ul.list').on('click','p.tip',function () {
        proPara.pageIndex++;
        getProList();
    })
})
RongIMLib.RongIMClient.init('4z3hlwrv3vhjt')
initRY()
ryConnect();
function getToken() {
	console.log($URL)
    $.ajax({
        url:$URL+'/jewelry/rongyunToken',
        type:'get',
        success:function (res) {
            if(res.code===20000){
                token=res.resp.rongyunToken;
                RongIMLib.RongIMClient.init('4z3hlwrv3vhjt')
                initRY()
                ryConnect();
                //pwe86ga5e58n6
                //4z3hlwrv3vhjt
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
        }
    })
}
function getLive() {
    $.ajax({
        url:$URL+'/jewelry/enterLive',
        type:'get',
        data:livePara,
        success:function (res) {
            if(res.code===20000){
                if(res.resp.info.liveInfo){
                    if(res.resp.info.liveInfo.liveTitle){
                        $('.left .title').html(res.resp.info.liveInfo.liveTitle)
                    }else{
                        $('.left .title').html('直播购物,保证正品优品')
                    }
                    player =  new TcPlayer('video', {
                        "m3u8": res.resp.info.liveInfo.hlsUrl,
                        "flv": res.resp.info.liveInfo.hlsUrl , //增加了一个flv的播放地址，用于PC平台的播放 请替换成实际可用的播放地址
                        "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
                        'rtmp': res.resp.info.liveInfo.rtmpUrl,
                        "width" :  '100%',//视频的显示宽度，请尽量使用视频分辨率宽度
                        "height" : '710',//视频的显示高度，请尽量使用视频分辨率高度
                        'live':true,
                        'controls':'none',
                        // 'flash':true,
                        // 'h5_flv':true,
                        'listener': function (msg) {
                            console.log(msg)
                            if(msg.type==='pause'){
                                $('.play').show();
                            }else if(msg.type==='play'){
                                $('.play').hide()
                            }
                            if(msg.code===5){
                                window.location.href='http://www.adobe.com/go/getflashplayer_cn'
                            }
                        }
                    });
                }
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
function initRY () {
    RongIMClient.RegisterMessage.HDJCommonMessage = function (message) {
        messageName = 'HDJCommonMessage'
    }
    RongIMClient.registerMessageType('HDJCommonMessage', 'HDJCommonMessage', new RongIMLib.MessageTag(true, true), ['extra', 'content', 'user'])
    // 连接状态监听器
    RongIMClient.setConnectionStatusListener({
        onChanged: function (status) {
            var mesg = ''
            switch (status) {
                case RongIMLib.ConnectionStatus.CONNECTED:
                    mesg = '连接成功'
                    break
                case RongIMLib.ConnectionStatus.CONNECTING:
                    mesg = '正在连接'
                    break
                case RongIMLib.ConnectionStatus.DISCONNECTED:
                    mesg = '断开连接'
                    break
                case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                    mesg = '其他设备登录'
                    break
                case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                    mesg = '域名不正确'
                    break
                case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                    mesg = '网络不可用'
                    break
            }
            console.log(mesg)
            if (mesg === '') return
        }
    })
    // 消息监听器
    RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function (message) {
            // 判断消息类型
            switch (message.objectName) {
                case 'HDJSystemMessage':
                    // 退出聊天室不显示
                    if (message.content.message.content.extra === '12') {
                        getMessage(message.content.message.content)
                    }else{
                        showMessage(getMessage(message.content.message.content))
                    }
                    break
                case 'HDJCommonMessage':
                    // 退出聊天室不显示
                    if (message.content.extra === '12') {
                        getMessage(message.content)
                    }else{
                        showMessage(getMessage(message.content))
                    }
                    break
                default:
                    console.log('异常错误')
            }
        }
    })
}
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
function ryConnect() {
    var successCallback = function () {
        joinChartRoom()
    }
    var tokenIncorrectCallback = function () {
        console.log('token无效')
    }
    var errorCallBack = function (errorCode) {
        var info = ''
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时'
                break
            case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                info = '未知错误'
                break
            case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                info = '不可接受的协议版本'
                break
            case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                info = 'appkey不正确'
                break
            case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                info = '服务器不可用'
                break
        }
        console.log(info)
    }
    RongIMClient.connect(token, {
        onSuccess: successCallback,
        onTokenIncorrect: tokenIncorrectCallback,
        onError: errorCallBack
    })
}
function joinChartRoom () {
    var successCallback = function () {
        // 加入聊天室成功。
        console.log('加入聊天室')
        showMessage({
            usernameColor: '#f0df1c',
            color: '#890F1C',
            username: '',
            content: '直播消息： 我们提倡绿色直播，封面和直播内容含吸烟、低俗、引诱、暴露等都将会被封停账号，网警24小时在线巡查。'
        })
    }
    var errorCallback = function (error) {
        // 加入聊天室失败
        RongIMClient.getInstance().joinChatRoom(spaceId, 0, {
            onSuccess: successCallback,
            onError: errorCallback
        })
        console.log('正在重新加入')
        console.log(error)
    }
    RongIMClient.getInstance().joinChatRoom(spaceId, 0, {
        onSuccess: successCallback,
        onError: errorCallback
    })
}
function getMessage (content) {
    console.log(content)
    var extra = content.extra
    var showMessage = {}
    content.content = content.content.split('&hdj&')[0]
    switch (parseInt(extra)) {
        case 10:
            showMessage.usernameColor = '#256fec'
            showMessage.color = '#000'
            showMessage.username = content.user.name+':'
            showMessage.content = content.content
            break
        // 进入房间消息
        case 11:
            showMessage.usernameColor = '#256fec'
            showMessage.color = '#000'
            showMessage.username = content.user.name
            showMessage.content = '进直播间准备剁手了'
            break
        // 退出房间消息
        case 12:
            // 此处移除观众
            break
        case 20:
            showMessage.color = '#fb4575'
            showMessage.username = ''
            showMessage.content = content.content
            break
        case 21:
            showMessage.color = '#09d8da'
            showMessage.username = ''
            showMessage.content = content.content
            break
        case 22:
            showMessage.usernameColor = '#f0df1c'
            showMessage.color = '#208dff'
            showMessage.username = content.user.name+':'
            showMessage.content = content.content
            break
        // 礼物
        case 23:
            showMessage.color = '#9ee425'
            showMessage.username = ''
            showMessage.content = content.content
            break
        // 订单
        case 24:
            showMessage.color = '#f3a12d'
            showMessage.username = ''
            showMessage.content = content.content
            break
        case 25:
            showMessage.color = '#feffa5'
            showMessage.username = ''
            showMessage.content = content.content
            break
        case 26:
            showMessage.usernameColor = '#f0df1c'
            showMessage.color = '#dcffa6'
            showMessage.username = content.user.name+':'
            showMessage.content = content.content
            break
        case 27:
            alert('直播已结束')
            history.back();
            break
        // 直播结束
        case 99:
            alert('直播已结束')
            history.back();
            break
        default:
            showMessage.usernameColor = '#fff'
            showMessage.color = '#ffffff'
            showMessage.username = content.user.name
            showMessage.content = content.content
            break
    }
    return showMessage
}
function showMessage(message){
    console.log(message)
    var html=''
    html+='<p style="margin:6px 0;line-height:20px;">'
    if(message.username && message.username!==''){
        html+='<span style="color:'+message.usernameColor+';margin-right:10px;">'+message.username+'</span>'
    }
    html+='<span style="color:'+message.color+';">'+message.content+'</span>'
    html+='</p>'
    $('.areaBox').append(html)
    $('.areaBox').scrollTop($('.areaBox').height())
}
function getUserInfo(){
    $.ajax({
        url:$URL+'/jewelry/getUserInfo',
        type:'get',
        data:{
            token:userToken
        },
        success:function (res) {
            if(res.code===20000){
                userInfo=res.resp.userInfo;
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
        }
    })
}
function sendMessageHandle  () {
	console.log(userToken,888888888888)
    if(!userToken){
        $('.toast').html('请先登录')
        $('.toast').fadeIn(200)
        setTimeout(function () {
            $('.toast').fadeOut(200)
            window.location.href='/login'
        },1000)
    }
    if(!userInfo){
        $('.toast').html('请先登录')
        $('.toast').fadeIn(200)
        setTimeout(function () {
            $('.toast').fadeOut(200)
            window.location.href='/login'
        },1000)
    }
    let content = $('input').val();
    if(content===''){
        $('.toast').html('请输入要发送的信息')
        $('.toast').fadeIn(200)
        setTimeout(function () {
            $('.toast').fadeOut(200)
        },1000)
        return false;
    }
    $('input').focus()
    sendMessage(content, 10, userInfo.userId, userInfo.userName, spaceId)
    $('input').val('')
}
function getProList() {
    $.ajax({
        url:$URL+'/jewelry/otherProductRecomList',
        type:'get',
        data:proPara,
        success:function (res) {
            if(res.code===20000){
                if(res.resp.recomList.page){
                    if(!res.resp.recomList.page.countNum){
                        $('.no-list').css({'display':'block'});
                        $('.list').hide();
                        $('.right p.title span').text('0')
                    }else{
                        $('.right p.title span').text(res.resp.recomList.page.countNum)
                    }
                    if($('ul.list>p').length>0){
                        $('ul.list>p').remove();
                    }
                }else{
                    $('.no-list').css({'display':'block'});
                    $('.list').hide();
                    $('.right p.title span').text('0')
                }
                if(!res.resp.recomList.productInfo.productInfoList){
                    $('.no-list').css({'display':'block'});
                    $('.list').hide();
                }else{
                    $('.no-list').show();
                    $('.list').show();
                    var proList=res.resp.recomList.productInfo.productInfoList;
                    var proHtml='';
                    for(var i=0;i<proList.length;i++){
                        proHtml+='<li>';
                        proHtml+='<div class="left">';
                        proHtml+='<img src="'+proList[i].productImage+'" alt="">';
                        proHtml+='</div>'
                        proHtml+='<div class="right">'
                        proHtml+='<p class="name">'+proList[i].productName+'</p>'
                        if(proList[i].productPurchasePrice){
                            if(proList[i].productPrice<proList[i].productPurchasePrice){
                                proHtml+='<span class="price">¥'+proList[i].productPurchasePrice+'</span>'
                            }else{
                                proHtml+='<span class="price">¥'+proList[i].productPrice+'</span>'
                            }
                        }else{
                            proHtml+='<span class="price">¥'+proList[i].productPrice+'</span>'
                        }

                        proHtml+='<div class="btn">'
                        if(proList[i].sale){
                            proHtml+='<span class="sale">'+proList[i].sale+'人已购买</span>'
                        }else{
                            proHtml+='<span class="sale">0人已购买</span>'
                        }
                        proHtml+='<button class="buuBtn">立即购买</button>'
                        proHtml+='</div></div></li>'
                    }
                    $('ul.list').append(proHtml)
                    if(res.resp.recomList.page.pages>1){
                        $('ul.list').append('<p class="tip">点击加载更多</p>')
                    }
                    if(proPara.pageIndex===res.resp.recomList.page.pages){
                        if($('ul.list>p').length>0){
                            $('ul.list>p').remove();
                        }
                    }
                }
            }else{
                $('.toast').html(res.msg)
                $('.toast').fadeIn(200)
                setTimeout(function () {
                    $('.toast').fadeOut(200)
                },1000)
            }
        }
    })
}
// 发送消息
function sendMessage  (ms, extra, id, username, chatroomId) {
    var MESSAGE = {
        'content': ms,
        'extra': extra + '',
        'user': {
            'icon': this.userInfo.iconPicurl || 'http://upload.hongdoujiao.com/xiaotao/thum//user/userdefault.jpg',
            'id': id + '',
            'name': !username ? '红豆角' : username
        }
    }
    var msg = new RongIMClient.RegisterMessage.HDJCommonMessage(MESSAGE)
    var conversationtype = RongIMLib.ConversationType.CHATROOM // 聊天室
    var targetId = chatroomId + '' // 目标 Id
    RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
        onSuccess: function (message) {
            var msg1;
            if (message.content.extra === '25') {
                msg1={
                    'color': '#feffa5',
                    'username': '',
                    'content': ms
                }
                showMessage(msg1)
            } else {
                // message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                var msg2;
                msg2={
                    'color': '#000',
                    'username': username,
                    'usernameColor': '#890F1C',
                    'content': ms
                }
                showMessage(msg2)
            }
        },
        onError: function (errorCode, message) {
            var info = ''
            switch (errorCode) {
                case RongIMLib.ErrorCode.TIMEOUT:
                    info = '超时'
                    break
                case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                    info = '未知错误'
                    break
                case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                    info = '在黑名单中，无法向对方发送消息'
                    break
                case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                    info = '不在讨论组中'
                    break
                case RongIMLib.ErrorCode.NOT_IN_GROUP:
                    info = '不在群组中'
                    break
                case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                    info = '不在聊天室中'
                    break
                default:
                    info = ''
                    break
            }
            console.log('发送失败:' + info)
            if (errorCode === 23408) {
                var erroMsg;
                erroMsg={
                    'color': '#fff000',
                    'username': '系统',
                    'usernameColor': '#f0df1c',
                    'content': '你已被禁言'
                }
                showMessage(erroMsg)
            }
        }
    })
}