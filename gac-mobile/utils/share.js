/**
 * stype 分享方式  >>>>qzone qq空间
 * 					  sina  微博
 * 					  qq QQ
 * 					  wechat 微信
 * ftit  标题
 * flink 分享的图片
 */

export shareTo(stype, ftit, flink) {
	var lk = '';
	//当内容中没有图片时，设置分享图片为网站logo
	if(flink == '') {
		lk = 'http://' + window.location.host + '/static/images/logo.png';
	}
	//如果是上传的图片则进行绝对路径拼接
	if(flink.indexOf('/uploads/') != -1) {
		lk = 'http://' + window.location.host + flink;
	}
	//百度编辑器自带图片获取
	if(flink.indexOf('ueditor') != -1) {
		lk = flink;
	}
	//qq空间接口的传参
	if(stype == 'qzone') {
		window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + lk);
	}
	//新浪微博接口的传参
	if(stype == 'sina') {
		window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=' + ftit + '&pic=' + lk + '&appkey=2706825840');
	}
	//qq好友接口的传参
	if(stype == 'qq') {
		window.open('http://connect.qq.com/widget/shareqq/index.html?url=' + document.location.href + '?sharesource=qzone&title=' + ftit + '&pics=' + lk);
	}
	//生成二维码给微信扫描分享，php生成，也可以用jquery.qrcode.js插件实现二维码生成
	if(stype == 'wechat') {
		window.open('http://zixuephp.net/inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
	}

}