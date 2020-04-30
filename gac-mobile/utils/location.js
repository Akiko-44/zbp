// 暂未找到报错原因，先使用下面一个方法
export function getLocation() {
  return new Promise(function (resolve, reject) {
    var city = localStorage.getItem('cityName')
    if (city) {
      // alert(city)
      //resolve(city)
      // return
    }
    var map = new BMap.Map("allmap")
    var geoc = new BMap.Geocoder()

    var geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var pt = r.point;
        geoc.getLocation(pt, function (rs) {
          var addComp = rs.addressComponents
          localStorage.setItem('cityName', addComp.city)
          resolve(addComp.city)
        });
      } else {
        console.log('failed' + this.getStatus())
        reject()
      }
    }, {
      enableHighAccuracy: true
    })
  }).catch(function (r) {})
}
//百度地图获取城市名称的方法
export function getCurrentCityName() {
  return new Promise(function (resolve, reject) {
    // let myCity = new BMap.LocalCity()
    // myCity.get(function (result) {
    //   resolve(result.name)
    // })
    let geo = new BMap.Geolocation()
    let geoLoc = new BMap.LocalCity()
    geoLoc.get((r) => {
      resolve(r.name)
    })
  })
}
//百度地图获取地址
export function getCurrentAddress() {
  return new Promise(function (resolve, reject) {
    let geolocation = new BMap.Geolocation()
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //获取当前位置经纬度
        var myGeo = new BMap.Geocoder()
        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
          if (result) {
            resolve(result)
          }
        })
      }
    })
  })
}
// export function getCurrentAddress() {
//   return new Promise(function (resolve, reject) {
//     if (navigator.geolocation) {
//       alert(66)
//       alert(JSON.stringify(navigator.geolocation))
//       navigator.geolocation.getCurrentPosition((position) => {
//         alert(JSON.stringify(position))
//         let lat = position.coords.latitude;
//         let lng = position.coords.longitude;
//         const pointBak = new BMap.Point(lng, lat);
//         const convertor = new BMap.Convertor();
//         convertor.translate([pointBak], 1, 5, function (resPoint) {
//           if (resPoint && resPoint.points && resPoint.points.length > 0) {
//             lng = resPoint.points[0].lng;
//             lat = resPoint.points[0].lat;
//           }
//           const point = new BMap.Point(lng, lat)
//           const geo = new BMap.Geocoder()
//           geo.getLocation(point, (res) => {
//             if (res) {
//               resolve(res)
//             }
//           })
//         })
//       })
//     } else {
//       let geolocation = new BMap.Geolocation()
//       geolocation.enableSDKLocation();
//       geolocation.getCurrentPosition(function (r) {
//         if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//           //获取当前位置经纬度
//           var myGeo = new BMap.Geocoder()
//           myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
//             if (result) {
//               resolve(result)
//             }
//           })
//         }
//       })
//     }
//   })
// }
