import {
  guid
} from '@/utils'
import request from '@/utils/request'

// 获取token的时间间隔，没有超过此时间则取缓存数据
const time = 60 * 1000 * 0.5

// 开始时间
let date

// 响应数据缓存
let token

export function getToken() {
  return new Promise(resolve => {
    // 超过时间则请求接口
    if (!date || Date.now() - date > time) {
      request({
        url: '/api/qiniu/token',
        method: 'get'
      }).then(result => {
        token = result.data
        // 更新时间
        date = Date.now()
        resolve(token)
      })
    } else {
      resolve(token)
    }
  })
}

export function getKey(prefix, width, height, type) {
  // {prefix}_{id}_{width}_{height}.{imageType}
  return `${prefix}_${guid()}_${width}_${height}.${type}`
}

//export const domain = 'http://pa95ui71l.bkt.clouddn.com'
export const domain = 'http://image.gacjc.com'
export const uploadUrl = 'http://up-z2.qiniup.com/'
// 图片压缩
export function uploadSectionFile(f, maxSize) { //	附件上传
  let self = this;
  let Orientation;
  let ndata;
  return new Promise((resolved, rejected) => {
    if (f.size <= maxSize * 1024 * 1024) {
      //判断图片是否小于maxSize M,是就直接上传
      ndata = f;
      resolved(ndata);
    } else {
      console.log('大于', maxSize, 'M', '进行压缩了。。。')
      //反之压缩图片
      let reader = new FileReader();
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(f)
      // 读取成功后的回调
      reader.onloadend = function () {
        let result = this.result;
        let img = new Image();
        img.src = result;
        img.onload = function () {
          ndata = compress(img, Orientation);
          //BASE64转图片
          var arr = ndata.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          ndata = new File([u8arr], f.name, {
            type: mime
          })
          resolved(ndata);
        }
      }
    }
  })
}
export function compress(img, Orientation) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  //瓦片canvas
  let tCanvas = document.createElement("canvas");
  let tctx = tCanvas.getContext("2d");
  let initSize = img.src.length;
  let width = img.width;
  let height = img.height;
  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  // 		铺底色
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    let nw = ~~(width / count);
    let nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  //修复ios上传图片的时候 被旋转的问题
  if (Orientation != "" && Orientation != 1) {
    switch (Orientation) {
      case 6: //需要顺时针（向左）90度旋转
        this.rotateImg(img, 'left', canvas);
        break;
      case 8: //需要逆时针（向右）90度旋转
        this.rotateImg(img, 'right', canvas);
        break;
      case 3: //需要180度旋转
        this.rotateImg(img, 'right', canvas); //转两次
        this.rotateImg(img, 'right', canvas);
        break;
    }
  }
  //进行最小压缩
  let ndata = canvas.toDataURL('image/jpeg', 0.5);
  return ndata;
}
