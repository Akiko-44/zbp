<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form label-width="100px">
      <h4>基础信息</h4>
      <el-form-item label="标题">
        <span>{{ reportContent.title }}</span>
      </el-form-item>
      <el-form-item label="作者">
        <span>{{ reportContent.authorName }}</span>
      </el-form-item>
      <el-form-item label="被举报次数">
        <span>{{ reportContent.reportedCount }}</span>
      </el-form-item>
      <el-form-item label="发布时间">
        <span>{{ reportContent.contentCreateTime }}</span>
      </el-form-item>
      <el-form-item label="内容状态">
        <span>{{ reportContent.contentStatus }}</span>
      </el-form-item>
      <template v-if="appealDetail">
        <h4>申诉详情</h4>
        <el-form-item label="申诉类型">
          <span>{{ appealDetail.appealName }}</span>
        </el-form-item>
        <el-form-item label="申诉日期">
          <span>{{ appealDetail.appealTime }}</span>
        </el-form-item>
        <el-form-item label="申诉理由">
          <span>{{ appealDetail.appealReason }}</span>
        </el-form-item>
        <el-form-item
          label="图片证据"
          v-if="appealDetail.appealEvidenceArr && appealDetail.appealEvidenceArr.length"
        >
          <div class="materials-list">
            <span
              class="card"
              v-for="(item, index) in appealDetail.appealEvidenceArr"
              :key="index"
            ><img
                :src="item"
                title="双击查看大图"
                @dblclick="lookImg(item)"
              /></span>
          </div>
        </el-form-item>
      </template>
      <template>
        <h4>举报详情</h4>
        <div
          v-for="(listItem, listIndex) in showListArr"
          :key="listIndex"
        >
          <el-form-item label="举报人">
            <span>{{ listItem.reportPerson }}</span>
          </el-form-item>
          <el-form-item label="举报类型">
            <span>{{ listItem.reportTypeName }}</span>
          </el-form-item>
          <el-form-item label="举报日期">
            <span>{{ listItem.reportTime }}</span>
          </el-form-item>
          <el-form-item label="举报理由">
            <span>{{ listItem.reportReason }}</span>
          </el-form-item>
          <el-form-item
            label="图片证据"
            v-if="listItem.reportEvidenceArr.length"
          >
            <div class="materials-list">
              <span
                class="card"
                v-for="(item, index) in listItem.reportEvidenceArr"
                :key="index"
              ><img
                  :src="item"
                  title="双击查看大图"
                  @dblclick="lookImg(item)"
                /></span>
            </div>
          </el-form-item>
        </div>
      </template>
      <el-button
        class="auditBtn"
        size="small"
        type="primary"
        v-if="appealStatus == 0"
        @click="$router.push({name: 'jcaddComplaint', query: {id: id,contentId: contentId, title: title}})"
      >立即申诉</el-button>
      <el-button
        size="small"
        type="primary"
        @click="$router.go(-1)"
        plain
      >返回</el-button>
      <el-button
        size="small"
        type="text"
        @click.stop="expand()"
        v-if="(index+1) < showList.length"
      >展开更多举报</el-button>
    </el-form>

    <el-dialog
      title="大图"
      fullscreen='fullscreen'
      :visible.sync="dialogImgVisible"
    >
      <div style="text-align: center;">
        <img
          :src="bigImgSrc"
          width="50%"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reportDetail } from '@/api/public/jewelryRing'

export default {
  data() {
    return {
      form: {},
      dialogImgVisible: false,
      dialogVisible: false,
      fullscreen: true,
      bigImgSrc: '',
      showList: [],
      index: 0,
      showListArr: [],
      reportContent: {},
      reportDetailList: [],
      appealDetail: {},
      id: '',
      contentId: '',
      type: 2,
      title: '',
      reportedType: '',
      reportStatus: '',
      appealStatus: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await reportDetail(to.query.id, { type: to.query.type }).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
        vm.id = to.query.id
        vm.contentId = to.query.contentId
        vm.type = to.query.type
        vm.title = to.query.title
        vm.reportedType = to.query.reportedType
        vm.reportStatus = to.query.reportStatus
        vm.appealStatus = to.query.appealStatus
        vm.reportContent = vm.form.reportContent
        vm.reportDetailList = vm.form.reportDetailList
        vm.appealDetail = vm.form.appealDetail
        vm.renderData()
      }, 10)
    })
  },
  methods: {
    renderData() {
      const result = []
      for (let i = 0; i < this.reportDetailList.length; i += 5) {
        result.push(this.reportDetailList.slice(i, i + 5))
      }
      this.showList = result
      this.showListArr = this.showList[0]
    },
    lookImg(imgSrc) {
      this.dialogImgVisible = true
      this.bigImgSrc = imgSrc
    },
    expand() {
      this.index++
      this.showListArr = [...this.showListArr, ...this.showList[this.index]]
      console.log(this.showList)
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  display: inline-block;
  width: 20%;
  margin: 10px;
  max-width: 500px;
}
.idcard {
  display: inline-block;
  width: 100px;
}
.card img {
  max-width: 300px;
  width: 100%;
}
.idcard img {
  width: 100%;
}
</style>


