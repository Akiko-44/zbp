<template>
  <div class="app-container" style="padding-right: 40px">
  <el-form label-width="120px">

    <el-form-item label="展会名称">
      <span>{{form.name}}</span>
    </el-form-item>

    <!-- <el-form-item label="推荐权重">
      <span>{{form.grade}}</span>
    </el-form-item> -->

    <el-form-item label="展会地址">
      <span>{{form.provinceName}} {{form.cityName}} {{form.address}}</span>
    </el-form-item>

    <el-form-item label="头部banner图">
      <el-row class="row">
        <el-col class="col" :span="6">
          <el-card style="width:250px;" :body-style="{ padding: '0px' }">
            <a v-if="form.banner" target="_blank" :href="form.banner | setImg" class="image" :style="getImageStyle(form.banner)"></a>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="显示周期" prop="caseTypes">
      <span>{{form.startTime}} 至 {{form.endTime}}</span>
    </el-form-item>

    <el-form-item label="状态">
      <span>{{showStatus[form.showStatus]}}</span>
    </el-form-item>

    <el-form-item label="参展店铺总数">
      <span>{{form.merList.length}}家</span>
    </el-form-item>

    <el-form-item label="参展店铺">
      <el-table
        style="max-width: 600px;"
        :data="form.merList"
        border
      >
        <el-table-column align="center" label="店铺名">
          <template slot-scope="{ row }">
            <span>{{row.merchantName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button size="small" type="primary" @click="showDialog(row)">管理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item label="展会鸟瞰图" prop="airscapeList">
      <el-row class="row" v-show="form.airscapeList.length">
        <el-col class="col" :span="6" v-for="(item, index) in form.airscapeList" :key="index">
          <el-card style="width:250px;" :body-style="{ padding: '0px' }">
            <a style="min-height: 200px;" target="_blank" :href="item.airscape | setImg" class="image" :style="getImageStyle(item.airscape)"></a>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="分类标签">
      <el-tag style="margin-right: 10px;" v-for="(item, index) in form.labelList" :key="index">{{item.label}}</el-tag>
    </el-form-item>

    <el-form-item label="创建时间">
      <span>{{form.createTime}}</span>
    </el-form-item>

    <el-form-item label="操作">
      <el-button size="small" type="primary" @click="$router.push({ name: 'addExhibitionPartner', query: { id: form.id } })">修改</el-button>
    </el-form-item>

  </el-form>
  
  <ShopDialog :exhibitionId="form.id" :merchantName="merchantName" :merchantId="merchantId" ref="dialog" />

</div>
</template>

<script>
import { getObj, getDetailMerPic } from '@/api/aggregate/exhibitionPartner'
import { setImg } from '@/filters'
import ShopDialog from './shopDialog'

export default {
  components: {
    ShopDialog
  },
  data() {
    return {
      showStatus: {
        0: '待展示',
        1: '展示中',
        2: '已过期'
      },
      form: {
        merList: [],
        airscapeList: [],
        id: undefined
      },
      merchantName: '',
      merchantId: ''
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    if (typeof form.merList === 'string') form.merList = []
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    showDialog(row) {
      getDetailMerPic(row.id).then(response => {
        const dialog = this.$refs.dialog
        dialog.list = response.data
        dialog.dialogFormVisible = true
        this.merchantName = row.merchantName
        this.merchantId = row.id
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.image {
  display: block;
  max-width: 100%;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.danger {
  color: #F56C6C;
}
.el-col-6 {
  margin-bottom: 20px;
}
</style>


