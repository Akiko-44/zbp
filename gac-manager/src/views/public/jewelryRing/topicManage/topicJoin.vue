<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      话题名称：{{topicName}}
    </div>
    <div class="filter-container">
      <el-form
        :inline="true"
        :model="listParams"
        ref="topicListQueryForm"
        label-width="100px"
        class="topicListQueryForm"
      >
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入参与人名称"
            v-model="listParams.name"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            @keyup.enter.native="handleFilter"
            style="width: 195px;"
            placeholder="请输入手机号码"
            v-model="listParams.phoneNum"
          > </el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            start-placeholder="开始"
            end-placeholder="结束"
            style="width:380px"
            v-model="createTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="参与人类型:">
          <el-select
            v-model="listParams.contentOwnerType"
            clearable
            placeholder="请选择参与人类型"
          >
            <el-option
              v-for="(value, key) in types"
              :key="key"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          v-waves
          icon="el-icon-search"
          @click="handleFilter"
        >查询</el-button>
        <el-button
          class="fr"
          type="primary"
          plain
          @click="getExportList"
        >导出</el-button>
        <a id="downlink"></a>
        <!--错误信息提示-->
        <el-dialog
          title="提示"
          v-model="errorDialog"
          size="tiny"
        >
          <span>{{errorMsg}}</span>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              type="primary"
              @click="errorDialog=false"
            >确认</el-button>
          </span>
        </el-dialog>
      </el-form>
    </div>

    <el-table
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50px"
        align="center"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        width="150px"
        align="center"
        label="参与人名称"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="手机号码"
      >
        <template slot-scope="{ row }">
          <span>{{row.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        align="center"
        label="参与人类型"
      >
        <template slot-scope="{ row }">
          <span>{{types[row.contentOwnerType]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="blue"
        align="center"
        label="内容名称"
      >
        <template slot-scope="{ row }">
          <!-- <span @click="$router.push({ name: 'contentManageDetail', query: {id: row.contentId, isDraft: 0}})">{{row.content}}</span> -->
          <span @click="preView(row.contentId)">{{row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="200px"
        align="center"
        label="参与时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.createTime}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listParams.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listParams.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
    <div class="btns">
      <el-button
        size="small"
        type="primary"
        @click="$router.go(-1)"
      >返回</el-button>
    </div>
    <!-- 内容预览 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="375px"
      center
      class="preview-dialog"
    >
      <div
        class="preview-bg img"
        v-if="contentForm.type == 1"
      >
        <div class="main">
          <h3>{{contentForm.title}}</h3>
          <p>
            <span>{{time | formatDate('yyyy-MM-dd hh:mm')}}</span>
          </p>
          <div class="author-info">
            <img
              :src="contentForm.authorLogo"
              width="35"
            />
            <span>{{contentForm.authorName}}</span>
            <span class="concern"><i class="el-icon-plus"></i>关注</span>
          </div>
          <div
            class="preview-content"
            v-html="contentForm.content"
          ></div>
          <div style="margin-bottom: 10px;font-size: 18px;">相关推荐</div>
          <div v-if="contentForm.contentToGoodsDTOS && contentForm.contentToGoodsDTOS.length">
            <div class="recommend-detail-img">
              <img :src="contentForm.contentToGoodsDTOS[0].imgUrl" />
              <div>
                <div class="name">{{contentForm.contentToGoodsDTOS[0].goodsName}}</div>
                <div class="sub">￥{{contentForm.contentToGoodsDTOS[0].lowPrice}}~￥{{contentForm.contentToGoodsDTOS[0].highPrice}}</div>
              </div>
            </div>
          </div>
          <div v-if="contentForm.contentToMerchantDTOS && contentForm.contentToMerchantDTOS.length">
            <div class="recommend-detail-img">
              <img :src="contentForm.contentToMerchantDTOS[0].logo" />
              <div>
                <div class="name">{{contentForm.contentToMerchantDTOS[0].name}}</div>
                <div
                  class="sub"
                  v-if="contentForm.contentToMerchantDTOS[0].categoryList && contentForm.contentToMerchantDTOS[0].categoryList.length"
                >
                  主营：<span
                    v-for="(categoryItem, categoryI) in contentForm.contentToMerchantDTOS[0].categoryList"
                    :key="categoryI"
                  >{{categoryItem.secondCatName}} </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="contentForm.contentToExternalLinks && contentForm.contentToExternalLinks.length">
            <div
              class="recommend-detail-img"
              style="padding: 0;"
            >
              <img
                :src="contentForm.contentToExternalLinks[0].mobilePicture"
                style="width: 355px!important;height: 86px;border: 0;"
              />
            </div>
          </div>
        </div>
        <div class="footer">
          <span>
            <img src="../../../../assets/image/edit.png" />说点什么...
          </span>
          <span>
            <img src="../../../../assets/image/like.png" />0
          </span>
          <span>
            <img src="../../../../assets/image/collect.png" />0
          </span>
          <span>
            <img src="../../../../assets/image/comments.png" />0
          </span>
        </div>
      </div>
      <div
        class="preview-bg video"
        v-else
      >
        <div class="preview-content">
          <video
            id="videoDialog"
            v-if="contentForm.content && contentForm.content.includes('<s>')"
            :src="contentForm.content.match(/<span>(\S*)<\/p>/)[1]"
          ></video>
          <video
            id="videoDialog"
            v-else-if="contentForm.content"
            :src="contentForm.content"
          ></video>
        </div>
        <div class="recommend-info">
          <div class="author-info">
            <img
              :src="contentForm.authorLogo"
              width="35"
            />
            <span>{{contentForm.authorName}}</span>
            <span class="concern"><i class="el-icon-plus"></i>关注</span>
          </div>
          <div v-if="contentForm.contentToGoodsDTOS && contentForm.contentToGoodsDTOS.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToGoodsDTOS[0].goodsName}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
          <div v-if="contentForm.contentToMerchantDTOS && contentForm.contentToMerchantDTOS.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToMerchantDTOS[0].name}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
          <div v-if="contentForm.contentToExternalLinks && contentForm.contentToExternalLinks.length">
            <div class="recommend-detail">
              <span>{{contentForm.contentToExternalLinks[0].name}}</span>
              <span>查看详情<i class="el-icon-d-arrow-right"></i></span>
            </div>
          </div>
        </div>
        <div class="footer">
          <span>
            <img src="../../../../assets/image/vedit.png" />说点什么...
          </span>
          <span>
            <img src="../../../../assets/image/vlike.png" />0
          </span>
          <span>
            <img src="../../../../assets/image/vcollect.png" />0
          </span>
          <span>
            <img src="../../../../assets/image/vcomments.png" />0
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入xlsx
var XLSX = require('xlsx')
import { topicJoinNumList, jewelryContentList } from '@/api/public/jewelryRing'
import waves from '@/directive/waves' // 水波纹指令
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  data() {
    return {
      createTime: '',
      list: [],
      exportList: [],
      total: null,
      listLoading: false,
      dialogVisible: false,
      topicName: undefined,
      contentForm: {},
      listParams: {
        offset: 1,
        limit: 20,
        topicId: undefined,
        name: undefined,
        phoneNum: undefined,
        contentOwnerType: undefined,
        startTime: undefined,
        endTime: undefined
      },
      listQuery: {
        offset: 1,
        limit: 20,
        topicId: undefined,
        name: undefined,
        phoneNum: undefined,
        contentOwnerType: undefined,
        startTime: undefined,
        endTime: undefined
      },
      types: {
        1: '会员',
        2: '商家',
        3: '外发账号'
      },
      // 导出文件
      outFile: '', // 导出文件el
      errorDialog: false, // 错误信息弹窗
      errorMsg: '', // 错误信息内容
      excelTitle: [{
        name: '参与人名称',
        mobilePhone: '手机号码',
        contentOwnerType: '参与人类型',
        content: '内容名称',
        createTime: '参与时间'
      }]
    }
  },
  created() {
    if (this.$route.query.id) {
      this.listParams.topicId = this.$route.query.id
    }
    if (this.$route.query.topicName) {
      this.topicName = this.$route.query.topicName
    }
    this.getList()
  },
  mounted() {
    this.outFile = document.getElementById('downlink')
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listParams.startTime = this.createTime ? this.createTime[0] : ''
      this.listParams.endTime = this.createTime ? this.createTime[1] : ''

      topicJoinNumList(this.listParams).then(data => {
        this.list = [...data.data.records, ...[{
          name: '参与人名称',
          mobilePhone: '手机号码',
          contentOwnerType: 1,
          content: '内容名称',
          contentId: '1401',
          createTime: '参与时间'
        }]]
        this.total = data.data.total
        this.listLoading = false
      })
    },
    getExportList() {
      topicJoinNumList({
        name: this.listParams.name,
        phoneNum: this.listParams.phoneNum,
        contentOwnerType: this.listParams.contentOwnerType,
        startTime: this.listParams.startTime,
        endTime: this.listParams.endTime
      }).then(data => {
        this.exportList = data.data.records
        this.downloadFile()
      })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listParams.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listParams.offset = val
      this.getList()
    },
    preView(contentId) {
      jewelryContentList({ id: contentId, userType: Cookies.get('userType') }, 0).then(data => {
        this.contentForm = data.data.records[0]
      })
      this.dialogVisible = true
      this.time = new Date()
      if (!document.querySelector('#videoDialog')) {
        return
      }
      setTimeout(() => {
        const vW = document.querySelector('#videoDialog').videoWidth
        const vH = document.querySelector('#videoDialog').videoHeight
        if (vW > vH) {
          document.querySelector('#videoDialog').style.top = '50%'
          document.querySelector('#videoDialog').style.transform = 'translateY(-50%)'
        }
      }, 100)
    },
    downloadFile() { // 点击导出按钮
      const listData = this.exportList
      for (let i = 0; i < listData.length; i++) {
        listData[i].contentOwnerType = this.types[listData[i].contentOwnerType]
      }
      const data = this.excelTitle.concat(listData)
      this.downloadExl(data, '参与人数')
    },
    downloadExl(json, downName, type) { // 导出到excel
      const keyMap = [] // 获取键
      for (const k in json[0]) {
        keyMap.push(k)
      }
      const tmpdata = [] // 用来保存转换好的json
      json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
        v: v[k],
        position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
      }))).reduce((prev, next) => prev.concat(next)).forEach(function (v) {
        tmpdata[v.position] = {
          v: v.v
        }
      })
      const outputPos = Object.keys(tmpdata) // 设置区域,比如表格从A1到D10
      const tmpWB = {
        SheetNames: ['mySheet'], // 保存的表标题
        Sheets: {
          'mySheet': Object.assign({},
            tmpdata, // 内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
            })
        }
      }
      const tmpDown = new Blob([this.s2ab(XLSX.write(tmpWB,
        { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' } // 这里的数据是用来定义导出的格式类型
      ))], {
        type: ''
      }) // 创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown) // 创建对象超链接
      this.outFile.download = downName + '.xlsx' // 下载名称
      this.outFile.href = href // 绑定a标签
      this.outFile.click() // 模拟点击实现下载
      setTimeout(function () { // 延时释放
        URL.revokeObjectURL(tmpDown) // 用URL.revokeObjectURL()来释放这个object URL
      }, 100)
    },
    s2ab(s) { // 字符串转字符流
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF
      }
      return buf
    },
    getCharCol(n) { // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
      let s = ''
      let m = 0
      while (n > 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
      }
      return s
    },
    fixdata(data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    moreState(tab, event) {
      if (tab == 'more') {
        console.log('/////', tab, event)
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
.auditBtn {
  margin-left: 0;
  margin-bottom: 5px;
}
/deep/ td.blue {
  color: #409eff;
  cursor: pointer;
}
.btns {
  margin: 20px 0;
  text-align: center;
}
// 预览样式
.preview-bg {
  position: relative;
  width: 375px;
  height: 667px;
  padding-bottom: 50px;
  text-align: center;
  & .el-dialog--center .el-dialog__body {
    padding: 0;
  }
  & .main {
    height: 617px;
    padding: 0 10px;
    text-align: left;
    color: #606266;
    overflow-x: hidden;
    overflow-y: auto;
  }
  & .preview-content {
    text-align: left;
    padding: 0 10px;
    & /deep/ img {
      width: 350px !important;
      height: auto;
    }
  }
  & p {
    & img {
      width: 100% !important;
    }
  }
  & img {
    width: 350px !important;
  }
  & .recommend-info {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    padding: 0 10px;
  }
  & .author-info {
    margin-bottom: 10px;
    text-align: left;
    img {
      width: 35px !important;
      vertical-align: middle;
    }
    .concern {
      float: right;
      color: #df735a;
      border: 1px solid;
      border-radius: 15px;
      padding: 0 10px;
      margin-top: 5px;
    }
  }
  & .recommend-detail {
    & span {
      display: inline-block;
      text-align: left;
      &:first-child {
        width: 240px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 18px;
      }
      &:last-child {
        vertical-align: top;
        text-align: right;
        width: 100px;
        color: #fb746e;
      }
    }
  }
  & .recommend-detail-img {
    padding: 10px;
    width: 100%;
    height: 86px;
    background: #f2f2f2;
    border-radius: 6px;
    & > img {
      float: left;
      width: 66px !important;
      border: 3px solid #fff;
    }
    & > div {
      margin-left: 76px;
      overflow: hidden;
      & .name {
        padding: 9px 0;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .sub {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fb746e;
      }
    }
  }
  & .footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    line-height: 30px;
    padding: 9px;
    display: flex;
    background: #ffffff;
    border-top: 1px solid #e5e5e5;
    & span {
      flex: 1;
      &:first-child {
        flex: 2;
        text-align: left;
        padding-left: 15px;
        width: 150px;
        color: #aaaaaa;
        background: #f2f2f2;
        border-radius: 16px;
      }
      & img {
        max-width: 17px;
        margin-right: 4px;
        vertical-align: middle;
      }
    }
  }
  &.video {
    background: #000000;
    & .preview-content {
      padding: 0;
      & video {
        position: absolute;
        width: 100%;
        height: 100%;
        max-height: 667px;
      }
    }
    & .footer {
      background: rgba(0, 0, 0, 0.5);
      & span {
        color: #fff;
        &:first-child {
          color: #fff;
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
}
</style>
