var runtime = require('art-template/lib/runtime');

/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */
runtime.dateFormat =  function (date, format) {
	
    if(typeof date === "string"){
        var mts = date.match(/(\/Date\((\d+)\)\/)/);
        if(mts && mts.length >= 3){
            date = parseInt(mts[2]);
        }
    }
    date = new Date(date);
    if(!date || date.toUTCString() == "Invalid Date"){
        return "";
    }

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    
    return format;
};

runtime.timestamp = function(value){
	return value * 1000
};

//url decode
runtime.decodeUrl = function(str){
	return decodeURIComponent(str);
}

//处理xss攻击
runtime.escapeFormat = function(str){
    if(!str || str == '' || str == "null" || str == "undefined"){
        str = "";
    }
    return String(str).replace(/&(?!\w+;)/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');						
}


//网址文本转成可点击的链接
var textToLink = function(text){
	var reg = /(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;
	if(!!text){
		text = text.replace(reg, function(a, e){
			var prefix = /^https?/gm.test(a);
			return '<a href="' + (prefix ? a : '//' + a) + '" target="_blank">' + a + '</a>';
		});  
	}
	 
	return text;
}

runtime.galleryLabel = function(data){
	var arr = data.split(",");
	var html = '';
	if(arr.length > 0){
		for(var i = 0; i < arr.length; i++){
			html += '<a>' + arr[i] + '</a>';
		} 
	}
	return html;
}

runtime.formatUndefined = function(s){
	if(typeof s == "undefined"){
		s = "";
	}
	return s;
	
}

/*
 	互换坊格式化
*/
runtime.formatAuctionTime = function(data){
	var start = new Date(data.auctionStartTime).getTime();
	var end = new Date(data.auctionEndTime).getTime();
	var text = "";
	if(data.auctioStatus == 2){
		text = "距离结束" + new Date(end - start).format("dd天hh时mm分ss秒");
	}else if(data.auctioStatus == 1){
		text = "即将开始"
	}else if(data.auctioStatus == 3){
		text = "已成交"
	}else if(data.auctioStatus == 4){
		text = "已流拍"
	}
	return text;
}

runtime.formatImg = function(url){
	if(typeof url == "undefined" && !url){
		return "";
	}else if(url.indexOf("pa95ui71l.bkt.clouddn.com") != -1){
		return url.replace('pa95ui71l.bkt.clouddn.com', 'image.gacjc.com');
	}else if(url.indexOf("http") == 0 || url.indexOf("../../") == 0){
		return url;
	}else{
		return  "http://image.gacjc.com/" + url
	}
}

//新旧程度
runtime.formatDep = function(str){
	var text = "";
	if(str == 3){
		text = "三成以下"
	}else if(str == 4){
		text = "四成新"
	}else if(str == 5){
		text = "五成新"
	}else if(str == 6){
		text = "六成新"
	}else if(str == 7){
		text = "七成新"
	}else if(str == 8){
		text = "八成新"
	}else if(str == 9){
		text = "九成新"
	}else if(str == 10){
		text = "全新"
	}
	return text
}

runtime.formatPayType = function(str){
	return g_const.payType[str]
}
module.exports = runtime;