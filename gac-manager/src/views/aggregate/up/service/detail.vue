<template>
  <div class="app-container" style="padding-right: 40px">
  <el-form label-width="120px">

    <el-form-item label="ID">
      <span>{{ form.id }}</span>
    </el-form-item>

    <el-form-item label="公司名称">
      <span>{{ form.company }}</span>
    </el-form-item>

    <el-form-item label="公司简介介绍">
      <span>{{ form.companyDesc }}</span>
    </el-form-item>

    <el-form-item label="公司业务介绍">
      <span>{{ form.serviceDesc }}</span>
    </el-form-item>

    <el-form-item label="组织机构代码证/营业执照">
      <el-row class="row" v-if="form.licenseUrl">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.licenseUrl | setImg" class="image" :style="getImageStyle(form.licenseUrl)"></a>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="确认书扫描件">
      <el-row class="row" v-if="form.confirmationUrl">
        <el-col class="col" :span="6">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="form.confirmationUrl | setImg" class="image" :style="getImageStyle(form.confirmationUrl)"></a>
          </el-card>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item label="联系手机">
      <span>{{form.mobile}}</span>
    </el-form-item>

    <el-form-item label="提供的服务">
      <span>{{form.mobile}}</span>
    </el-form-item>

    <el-form-item label="所在地">
      <span>{{form.provinceName}}{{form.cityName}}{{form.addr}}</span>
    </el-form-item>

    <h4>实名认证</h4>
    <el-table :data="detail.orderGoodVOList" style="width: 620px">
      <el-table-column width="110px" align="center" label="姓名">
        <template slot-scope="{ row }">
          <span>{{row.skuName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="300px" align="center" label="省份证证件号">
        <template slot-scope="{ row }">
          <span>{{row.skuId}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="身份证照片">
        <template slot-scope="{ row }">
          <span>{{row.unitPrice}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="状态">
        <template slot-scope="{ row }">
          <span>{{row.goodsNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="操作">
        <template slot-scope="{ row }">
          <a target="_blank" href="">查看照片</a>
        </template>
      </el-table-column>
    </el-table>

    <el-form-item label="手机号验证">
      <span>{{form.experience}}</span>
    </el-form-item>

    <el-form-item label="审核意见">
      <el-select v-model="form.checkStatus" clearable placeholder="选择审核意见">
        <el-option
          v-for="(value, key) in auditState"
          :key="key"
          :label="value"
          :value="key">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="不通过原因">
      <el-input :autosize="{ minRows: 3, maxRows: 5}" type="textarea" v-model="checkDetail" placeholder=""></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="handleAudit">审核</el-button>
    </el-form-item>

  </el-form>

  <!-- <el-table
    :data="form.designerAuditLogList"
  >
    <el-table-column label="审核记录" align="center">
      <el-table-column
        prop="createTime"
        label="日期"
        width="200"
      >
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{auditState[row.auditState]}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="opinion"
        label="意见"
        width="500"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="auditName"
        label="审核人"
        width="100"
      >
      </el-table-column>
    </el-table-column>
  </el-table> -->
</div>
</template>

<script>
import { domain } from '@/api/qiniu'
import { setImg } from '@/filters'
import { getObj, audit } from '@/api/aggregate/upService'

export default {
  components: {
  },
  data() {
    return {
      domain,
      form: {},
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      },
      checkDetail: '',
      loading: false
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
      }, 10)
    })
  },
  created() {
  },
  methods: {
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
    },
    handleAudit() {
      this.loading = true
      audit({
        checkStatus: this.form.checkStatus,
        checkDetail: this.checkDetail,
        id: this.form.id
      })
        .then(() => {
          this.$notify({
            title: '成功',
            message: '审核成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
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


