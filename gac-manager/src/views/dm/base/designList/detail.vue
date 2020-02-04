<template>
  <div class="app-container"
       style="padding-right: 40px">
    <div class="title">
      <a @click="$router.go(-1)"><i class="el-icon-d-arrow-left"> 返回 </i></a>
      <span>|</span>
      <span>设计师详情</span>
    </div>

    <el-form label-width="120px">
      <el-form-item label="ID">
        <span>{{ form.id }}</span>
      </el-form-item>

      <el-form-item label="姓名">
        <span>{{ form.userName }}</span>
      </el-form-item>

      <el-form-item label="头像">
        <el-row class="row"
                v-if="form.userLogo">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.userLogo | setImg"
                 class="image"
                 :style="getImageStyle(form.userLogo)"></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="性别">
        {{form.sex == 0 ? '男' : '女'}}
      </el-form-item>

      <el-form-item label="联系手机">
        <span>{{form.mobile}}</span>
      </el-form-item>

      <el-form-item label="设计年限">
        <span>{{form.ageLimit}}</span>
      </el-form-item>

      <el-form-item label="行业资历">
        <span>{{form.experience}}</span>
      </el-form-item>

      <el-form-item label="证书与奖励">
        <span>{{form.honor}}</span>
      </el-form-item>

      <el-form-item label="描述图片">
        <el-row class="row"
                v-if="form.picUrlList && form.picUrlList.length">
          <el-col class="col"
                  :span="6"
                  v-for="(picUrl, index) in form.picUrlList"
                  :key="index">
            <el-card style="width:250px;"
                     :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="picUrl | setImg"
                 class="image"
                 :style="getImageStyle(picUrl)"></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="分类">
        <span>{{form.cateFirst}} - {{form.cateSecond}} - {{form.cateThree}}</span>
      </el-form-item>

      <el-form-item label="设计师商户编号">
        <div class="merVoData"
             v-if="form.merVO && form.merVO.merchantName">
          <p>{{form.merVO.merchantName}}</p>
          <p>{{form.merVO.province }}{{ form.merVO.city }}{{ form.merVO.address }}</p>
        </div>
      </el-form-item>

      <el-form-item label="本人所在城市">
        <span>{{form.province}} {{form.city}} {{form.area}}</span>
      </el-form-item>

      <el-form-item label="视频介绍">
        <video controls="controls"
               v-if="form.videoUrl"
               style="width: 450px; height: 250px;"
               :src="domain + '/' + form.videoUrl">
          您的浏览器不支持 html5 video 属性，下载视频查看：
          <el-button size="mini"
                     type="text">
            <a :href="domain + '/' + form.videoUrl"
               target="_blank">下载视频</a>
          </el-button>
        </video>
      </el-form-item>

      <el-form-item label="身份证正面照片(国徽页)">
        <el-row class="row"
                v-if="form.idPicFront">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.idPicFront | setImg"
                 class="image"
                 :style="getImageStyle(form.idPicFront)"></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="身份证反面照片(人像页)">
        <el-row class="row"
                v-if="form.idPicBack">
          <el-col class="col"
                  :span="6">
            <el-card :body-style="{ padding: '0px' }">
              <a target="_blank"
                 :href="form.idPicBack | setImg"
                 class="image"
                 :style="getImageStyle(form.idPicBack)"></a>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>

      <!--<el-form-item label="收费标准" prop="chargeStandard">
      {{form.chargeStandard}} 元/小时
    </el-form-item>-->

      <el-form-item label="审核操作"
                    v-if="form.auditState === 1">
        <el-button v-if="form.auditState !== 2"
                   size="small"
                   type="primary"
                   @click="audit(2)">审核通过</el-button>
        <el-button v-if="form.auditState !== 3"
                   size="small"
                   type="warning"
                   @click="audit(3)">审核拒绝</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="form.designerAuditLogList">
      <el-table-column label="审核记录"
                       align="center">
        <el-table-column prop="createTime"
                         label="日期"
                         width="200">
        </el-table-column>
        <el-table-column width="120"
                         align="center">
          <template slot-scope="{ row }">
            <span>{{auditState[row.auditState]}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="opinion"
                         label="意见"
                         width="500">
        </el-table-column>
        <el-table-column align="center"
                         prop="auditName"
                         label="审核人"
                         width="100">
        </el-table-column>
      </el-table-column>
    </el-table>

    <audit-dialog ref="auditDialog"
                  @success="auditSuccess" />
  </div>
</template>

<script>
import auditDialog from './auditDialog'
import { domain } from '@/api/qiniu'
import { setImg } from '@/filters'
import { getObj } from '@/api/dm/designer'

export default {
  components: {
    auditDialog
  },
  data() {
    return {
      domain,
      form: {},
      auditState: {
        1: '审核中',
        2: '审核通过',
        3: '审核不通过'
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.form = form
        vm.form.designerAuditLogList = form.designerAuditLogList || []
      }, 10)
    })
  },
  methods: {
    audit(state) {
      const dialog = this.$refs.auditDialog
      dialog.dialogFormVisible = true
      dialog.form.designerId = this.form.id
      dialog.form.auditState = state
    },
    auditSuccess(form) {
      this.$notify({
        title: '成功',
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
      this.$router.push({
        name: 'designList'
      })
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, { w: 500 }) + ')'
      }
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
  color: #f56c6c;
}
.el-col-6 {
  margin-bottom: 20px;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.merVoData {
  padding-top: 10px;
  line-height: 22px;
  p {
    margin: 0;
    color: #606266;
  }
}
</style>


