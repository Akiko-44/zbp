import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
	const inFifteenMinutes = new Date(new Date().getTime() + 23 * 60 * 60 * 1000)
	return Cookies.set(TokenKey, token, {
	    expires: inFifteenMinutes
	})
//	return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}


/**
 * window对象在nuxt打包中报错，不影响开发和打包上服务器
 * 能正常使用，window
 * **/
export function wechatToken (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); 
	return null;
}

export function isWechatToken (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null && decodeURI(r[2]) != 0) return true; 
	return null;
}

export function AppToken (name) {
	var r = Cookies.get(name);
	if (name != null && name != undefined) return r; 
	return null;
}

export function isAppToken (name) {
	var r = Cookies.get(name);
	if (!name) return true; 
	return null;
}