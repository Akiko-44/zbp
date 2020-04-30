export function isEmail (chars) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    chars
  )
}

export function isMobile (chars) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|17[0-9]|14[57])[0-9]{8}$/.test(
    chars
  )
}


//根据url参数名称获取参数的值
export function getUrlParam (url, name) {
	var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i")
    if (reg.test(url)) return unescape(RegExp.$2.replace(/\+/g, " "))
    return ""
}
