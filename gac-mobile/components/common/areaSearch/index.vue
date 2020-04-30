<template>
  <AppView
    title="选择城市"
    class="area"
  >
    <div class="widget-citys">
      <div class="widget-citys-content">
        <div class="widget-citys-header bdb">
          <div class="widget-citys-iptbox">
            <van-icon
              class="item-center"
              name="search"
              color="#999"
            />
            <input
              type="text"
              placeholder="请输入城市名称"
              v-model="input"
            />
          </div>
          <a
            href="javascript:void(0)"
            @click="hide"
          >取消</a>
        </div>
        <div
          class="widget-citys-local bdb"
          @click="chooseLocal"
        >当前城市：{{location || "无法定位当前城市"}}</div>
        <div
          class="widget-citys-list"
          v-if="input == ''"
        >
          <dl>
            <template v-for="(item, index) in letterList">
              <template v-if="index == 'star'">
                <dt><em class="star-big"></em>热门城市</dt>
              </template>
              <template v-else>
                <dt v-if="isNaN(index)">{{index}}</dt>
              </template>
              <template v-for="(item2, key) in item">
                <dd
                  class="bdb"
                  @click="chooseOne(item2)"
                >{{item2.cityName}}</dd>
              </template>
            </template>
          </dl>
        </div>
        <div
          class="widget-citys-searchlist"
          v-if="input !== ''"
        >
          <ul v-if="searchList.length!==0">
            <li
              class="bdb"
              v-for="item in searchList"
              @click="chooseOne(item)"
            >{{item.cityName}}</li>
          </ul>
          <div
            v-else
            class="nomatch"
          >没有匹配城市</div>
        </div>
      </div>
      <div
        class="widget-citys-nav"
        v-if="input == ''"
        @touchmove="touchLetters"
      >
        <ol>
          <template v-for="(item, index) in letterList">
            <li
              v-if="isNaN(index) && index=='star'"
              @click="chooseLetter"
              data-type="starCity"
            ><em
                class='star-small'
                data-type="starCity"
              ></em></li>
            <li
              v-else
              @click="chooseLetter"
              data-type="letter"
            >{{index}}</li>
          </template>
        </ol>
      </div>
    </div>
  </AppView>
</template>

<script>
import { getCurrentCityName } from '~/utils/location'
import sortAreaList from '~/assets/data/sortAreaList'
export default {
  props: {
    chooseCity: String
  },
  data() {
    return {
      input: '',
      list: '',
      targetLetter: '',
      searchList: [], //搜索结果
      hotList: [],
      letterList: [],
      result: '',
      defaultTrigger: true,
      isShow: true,
      simple: false,
      localCity: {},
      starCity: [],
      cityData: [],
      initCity: null,
      location: '',
      sortAreaList
    }
  },
  mounted() {
    this.getCityInfo()
    this.getLoc()

  },
  activated() {
    for (let key in this.sortAreaList.data.cities) {
      this.sortAreaList.data.cities[key].map(item => {
        item.cityId = item.id
        item.cityName = item.name
        item.citySpell = item.spell
        item.cityFirstLetter = key
        this.cityData.push(item)
      })
    }
  },
  watch: {
    cityData: function () {
      if (this.cityData && this.cityData.length > 0) {
        this.formatCityList(this.cityData)
      }
    },
    input: function () {
      this.search()
    },
    targetLetter: function () {
      this.scrollView()
    }
  },
  activate: function (done) {
    var _this = this

    done()
    if (this.cityData && this.cityData.length > 0) {
      this.formatCityList(this.cityData)
    }
  },
  methods: {
    getCurrentCityName,
    async getLoc() {
      getCurrentCityName().then((city) => {
        this.location = city.replace('市', '')
      })
    },
    show: function () {
      // this.isShow = true
    },
    hide: function () {
      // this.isShow = false
      this.input = ''
      this.searchList = []
      this.close && this.close()
      this.$emit('getCity', this.chooseCity)
    },
    _chooseDefault: function () {
      let _this = this
      let arr = this.list.filter(function (item) {
        return _this.localCity.cityId == item.cityId
      })
      if (arr.length > 0) {
        _this.chooseOne(arr[0])
      } else {
        _this.chooseOne(this.list[0])
      }
    },
    /**
     * 点击字母
     */
    chooseLetter: function (e) {
      let symbol = e.target.getAttribute('data-type')

      if (symbol == 'starCity') {
        this.targetLetter = '热门城市'
      } else {
        this.targetLetter = e.target.innerText
      }
    },
    /**
     * slide letters list
     */
    touchLetters: function (e) {
      e.preventDefault()

      let ol = document.querySelector('.widget-citys-nav ol'),
        liNum = document.querySelectorAll('.widget-citys-nav li').length,
        olHei = ol.clientHeight, //ol height
        liHei = Math.round(olHei / liNum), //li height
        olTop = ol.offsetTop + ol.offsetParent.offsetTop,
        olBot = olTop + olHei,
        touchY = e.touches[0].pageY,
        $wrapper = document.querySelector('.widget-citys')

      switch (e.type) {
        case 'touchstart':
          if (touchY < olTop) {
            // 回顶
            $wrapper.scrollTop = 0
          } else if (touchY > olBot) {
            // 到底
            $wrapper.scrollTop = 10000
          }
          break
        case 'touchmove':
          if (touchY < olBot && touchY > olTop) {
            let olTouchY = touchY - olTop,
              targetIndex = Math.ceil(olTouchY / liHei),
              target = document.querySelectorAll('.widget-citys-nav li')[targetIndex - 1]

            if (target.getAttribute('data-type') == 'starCity') {
              this.targetLetter = '热门城市'
            } else {
              this.targetLetter = target.innerText
            }
          } else if (touchY <= olTop) {
            // 回顶
            $wrapper.scrollTop = 0
          } else {
            // 到底
            $wrapper.scrollTop = 10000
          }
          break
      }
    },
    /**
     * 滚动可视区 - Triggered by 'chooseLetter'
     */
    scrollView: function () {
      let dtList = document.querySelectorAll('.widget-citys-list dt'),
        _this = this,
        _dtList = Array.prototype.slice.call(dtList)

      if (_dtList) {
        _dtList.forEach((value, index, array) => {
          if (value.innerText === _this.targetLetter) {
            let wrapper = document.querySelector('.widget-citys')
            let scrollTop = document.querySelector('.widget-citys-list').offsetTop + value.offsetTop

            wrapper.scrollTop = scrollTop

            // setTimeout(function() {
            //     // 解决ios下 元素滚动的bug  现象是触发scroll时会导致部分滚动元素消失到二次元
            //     wrapper.style.width = (100 + (Math.round(Math.random() * 1000)) / 1000) + '%'
            // }, 0)
            return false
          }
        })
      }
    },
    /**
     * search city
     */
    search: function () {
      var reg = new RegExp(this.input == '' ? 'xxyy' :
        this.input, 'ig')

      var _arr = []
      for (var i in this.letterList) {
        for (var j = 0;j < this.letterList[i].length;j++) {
          if (
            reg.test(this.letterList[i][j][
              'cityName'
            ]) ||
            reg.test(this.letterList[i][j][
              'cityFirstLetter'
            ]) ||
            reg.test(this.letterList[i][j][
              'citySpell'
            ])
          ) {
            _arr.push(this.letterList[i][j])
          }
        }
      }
      this.searchList = [...new Set(_arr)]
    },
    /**
     * format data of city
     * @param  {[Array]} arr [cityList]
     */
    formatCityList: function (arr) {
      var letterArr = {}

      /*if(this.simple) {
        for(var i = 0; i < arr.length; i++) {
          letterArr[i] = [];
          letterArr[i].push(arr[i]);
        }
      } else {*/
      // 添加热门城市
      if (this.starCity && this.starCity.length > 0) {
        let _starCity = this.starCity

        _starCity.forEach((value, index, array) => {
          if (!('star' in letterArr)) {
            letterArr['star'] = []
            letterArr['star'].unshift(value)
          } else {
            letterArr['star'].unshift(value)
          }
        })
      }
      for (var i = 0;i < arr.length;i++) {
        if (!(arr[i]['cityFirstLetter'] in letterArr)) {
          letterArr[arr[i]['cityFirstLetter']] = []
          letterArr[arr[i]['cityFirstLetter']].push(arr[i])
        } else {
          letterArr[arr[i]['cityFirstLetter']].push(arr[i])
        }
      }
      /*}*/
      this.letterList = letterArr
    },
    chooseOne: function (obj) {
      /*this.$router.push({name: 'index', query: {chooseCity: obj.cityName}})*/
      this.$emit('getCity', obj.cityName)
    },
    chooseLocal: function () {
      this.$emit('getCity', this.location)
    },
    getCityInfo: function () {
      this.starCity = [{
        cityId: 44,
        cityName: "武汉",
        citySpell: "wuhan",
        cityFirstLetter: "W",
      },
      {
        cityId: 8,
        cityName: "成都",
        citySpell: "chengdu",
        cityFirstLetter: "C",
      },
      {
        cityId: 2,
        cityName: "重庆",
        citySpell: "chongqing",
        cityFirstLetter: "C",
      },
      {
        cityId: 4,
        cityName: "天津",
        citySpell: "tianjin",
        cityFirstLetter: "T",
      },
      {
        cityId: 37,
        cityName: "深圳",
        citySpell: "shenzhen",
        cityFirstLetter: "S",
      },
      {
        cityId: 13,
        cityName: "广州",
        citySpell: "guangzhou",
        cityFirstLetter: "G",
      },
      {
        cityId: 3,
        cityName: "上海",
        citySpell: "shanghai",
        cityFirstLetter: "S",
      },
      {
        cityId: 1,
        cityName: "北京",
        citySpell: "beijing",
        cityFirstLetter: "B",
      },
      ]
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}

.widget-citys {
  -webkit-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 10000;
  font-size: 0.14rem;
  color: #333;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  & .widget-citys-content {
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 0.03rem;
    & .widget-citys-header {
      height: 32px;
      padding: 10px;
      display: flex;
      background: #fafafa;
      & .widget-citys-iptbox {
        position: relative;
        flex: 1;
        height: 100%;
        & .item-center {
          position: absolute;
          left: 0;
          width: 30px;
          height: 100%;
          font-size: 14px;
        }
        & input {
          width: 100%;
          height: 100%;
          line-height: 32px;
          padding-left: 30px;
          display: block;
          border: none;
          font-size: 14px;
          background: #f0f0f0;
          box-sizing: border-box;
          border-radius: 15px;
        }
        & input::-webkit-input-placeholder {
          color: #cdcdcd;
          text-align: left;
        }
      }
      & a {
        width: 40px;
        height: 100%;
        line-height: 32px;
        text-align: center;
        color: #999999;
        font-size: 14px;
        display: block;
      }
    }
    & .widget-citys-local {
      height: 50px;
      line-height: 50px;
      text-indent: 16px;
      font-size: 14px;
    }
    & .widget-citys-list {
      position: relative;
      & dl {
        & dt {
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          color: #878787;
          background: #f0f0f0;
          text-indent: 16px;
          & em {
            position: relative;
            margin-right: 6px;
          }
        }
        & dd {
          padding: 0 16px;
          height: 40px;
          line-height: 40px;
          font-size: 13px;
          border-bottom: 1px solid #eaebf0;
          color: var(--black);
        }
      }
    }
  }
  & .widget-citys-searchlist {
    position: absolute;
    top: 52px;
    width: 100%;
    bottom: 0;
    z-index: 10001;
    background: #fff;
    overflow: auto;
    & li {
      margin: 0 16px;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
    }
    & .nomatch {
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      color: #aaa;
    }
  }
  /***** 1px border *****/
  & .bdt,
  & .bdb,
  & .bdtb,
  & .bdl,
  & .bdr,
  & .bdlr {
    position: relative;
  }
  & .bdl:before,
  & .bdr:after,
  & .bdlr:before,
  & .bdlr:after,
  & .bdt:before,
  & .bdb:after,
  & .bdtb:before,
  & .bdtb:after {
    background-size: 100% 100%;
    position: absolute;
    content: '';
    z-index: 10;
  }
  & .bdl:before,
  & .bdr:after,
  & .bdlr:before,
  & .bdlr:after {
    top: 0;
    width: 1px;
    height: 100%;
  }
  & .bdt:before,
  & .bdb:after,
  & .bdtb:before,
  & .bdtb:after {
    left: 0;
    height: 1px;
    width: 100%;
  }
  /*下边框*/
  & .bdb:after {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0MwNUE4NEVENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0MwNUE4NEZENjJEMTFFNTk0MzA4M0I3N0Q3NjAwQUIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQzA1QTg0Q0Q2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQzA1QTg0REQ2MkQxMUU1OTQzMDgzQjc3RDc2MDBBQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsGoW24AAAAVSURBVHjaYvjw4QMDEwMDw3+AAAMAF5MD0jmBIYUAAAAASUVORK5CYII=');
    bottom: 0;
  }
}

.widget-citys-nav {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 48px;
  z-index: 10002;
  display: -webkit-box;
  -webkit-box-align: center;
  & section {
    -webkit-box-flex: 1;
  }
  & ol {
    text-align: right;
    padding-bottom: 48px;
    & li {
      padding: 5px;
      color: #666666;
      font-size: 12px;
      width: 100%;
      line-height: 100%;
      box-sizing: border-box;
      text-align: center;
    }
  }
}

.slide-enter,
.slide-leave-active {
  transform: translateX(100%) !important;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.star-big {
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: cover;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NUIzQTM3OTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NUIzQTM3QTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1QjNBMzc3N0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1QjNBMzc4N0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+ZnVAOAAAAZhJREFUeNpinDlzJgMZwBZKHyZVIwsDeaAGiP/Sy0JTIHaDso2B+CwpmpnI9B0MVJGqmVQL9YDYF4kfAMSatLSwGogZ0fRX0cpCDSAOwSIeAcRKtLCwCod6UMIrpbaFIB9E4pFPBGIpalgoCMR2QNxLIAuxQ9VYA7EAMfmQB4i1gFgXidYm1tVIcRkBZT8B4mtAfBmJvg7EX0AWdkLjgJGBekAGit2QxP4DcTcsWc9ioD2YAbKLCVomZgBxKw0tawLiLJBdTGhFViHU69QC/4A4D4jrcaXSCUAcD8R/qGDZLyCOBeLJhLLFYiAOBOLvFFj2FYj9gXgZsflwCxAHUWChFxDvIDXj/6bAwh/klDTmFFhoSY6FFhRYaDHoLVQBYlEKLFQAYglSLDTDY9hzIM6F4uekxiMpFr4B4nIgVgbiKVCsDBV7S2ywMhHhuo9A3AA1vAutQPgOFQNV0I1A/JkcCzmA2ACIv0GrLmWoYZ/wBN8nqKNAFndDHWKCrdLGZqEOEM+EWlSBI7hwAVCwl0H1LsDWhAQIMACcSkm+eKvWYQAAAABJRU5ErkJggg==');
}

.star-small {
  width: 12px;
  height: 12px;
  display: inline-block;
  background-size: cover;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NUIzQTM3RDdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NUIzQTM3RTdEODIxMUU2OUY3OURCQzgxN0I4RjkwMCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ1QjNBMzdCN0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ1QjNBMzdDN0Q4MjExRTY5Rjc5REJDODE3QjhGOTAwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kvZSAAAAAWVJREFUeNpiTEtLYyAB2ELpw8RqYGEgDdQA8V9aWWAKxG5QtjEQnyVGExOJroeBKmI1EWuBHhD7IvEDgFiTmhZUAzEjmr4qalmgAcQhWMQjgFiRGhZU4lAHSiBlpKYiEF8FiHWAWBuKA/HoTwRiISC+AsTXoPRdIP6DbGAKEDsCsRYUs5GQstiBOAyKYeAnEF+HWrgf5PUjQGwNxAYkGo7PUgOomYdBFtyAFgHXGagHrkEtuAmLvMdQS05RwfATULOeoqeit0DsDMR7KDB8BxC7APE7XMn0CxB7A/FqMgxfBsT+QPyVUD74BcS1ZFhQCtVLVEYzJcMCc1JysgUZFlgMGgu4gFgfhyG/sIUzFJhgq8CwWWCMReE/IF4ErQM0oex/xDiMiUAE/wfiNdDCLx6I70ExiK0LlfuPL5iwWWAJpbdCvR2Koxi5BpUDOWgbKRZ8h5YjPkB8jojIPQvNnLbY4gcgwAAXbkHtR5mBDgAAAABJRU5ErkJggg==');
}
</style>
