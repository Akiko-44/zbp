export function getLocation(){
	return new Promise(function (resolve, reject) {
		var city = localStorage.getItem('cityName')
		if(city) {
			resolve(city)
			return
		}
		var map = new BMap.Map("allmap")
	  var geoc = new BMap.Geocoder()

	  var geolocation = new BMap.Geolocation()
	  geolocation.getCurrentPosition(function(r){
	      if(this.getStatus() == BMAP_STATUS_SUCCESS){
	          var pt = r.point;
	
	          geoc.getLocation(pt, function(rs){
	              var addComp = rs.addressComponents
	              
								localStorage.setItem('cityName', addComp.city)
	              resolve(addComp.city)
	              /*console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);*/
	          });    
	      }
	      else {
	          console.log('failed'+this.getStatus())
	          reject()
	      }        
	  },{enableHighAccuracy: true})
	}).catch(function (r) {

	})
	
}