import Cookies from 'js-cookie'

const _a = 'mOa.gsidhteArnDkloxcTMf'
const _b = 'nTmDfr.datoMkxchAlsOieg'
const _c = 'TtfDArgsknmahMde.icolOx'
export const isDesignMerchant = () => location[_a[8] + _a[12] + _a[10] + _a[22]][_b[20] + _b[0] + _b[7] + _a[10] + _a[18] + _c[21] + _b[4]](_b[7] + _c[15] + _b[18] + _b[20] + _b[22] + _c[9] + _a[21] + _b[21] + _a[12] + _b[14] + _a[8] + _b[8] + _a[13] + _a[9] + _a[3] + _c[12] + _c[1] + _a[0] + _a[16]) !== -1
export const isMakeMerchant = () => location[_b[15] + _b[5] + _b[21] + _b[4]][_a[6] + _b[0] + _b[7] + _b[21] + _a[18] + _c[21] + _c[2]](_a[0] + _a[2] + _a[15] + _b[21] + _c[13] + _a[10] + _a[12] + _c[18] + _a[8] + _b[8] + _b[0] + _c[1] + _c[16] + _c[12] + _b[9] + _c[10] + _b[17]) !== -1

export const TokenKey = isDesignMerchant() ? _a[14] + _a[10] + _b[18] + _a[6] + _c[6] + _b[0] + _b[21] + _c[5] + _c[0] + _c[19] + _c[8] + _b[21] + _a[13] : isMakeMerchant() ? _b[11] + _c[11] + _c[8] + _a[10] + _a[12] + _b[1] + _b[10] + _c[8] + _a[10] + _b[0] : _c[4] + _c[14] + _c[10] + _a[6] + _a[13] + _c[0] + _a[17] + _b[12] + _b[21] + _c[9]

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
