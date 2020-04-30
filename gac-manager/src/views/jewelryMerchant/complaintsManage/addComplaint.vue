<template>
  <div class="app-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
    >
      <el-form-item label="申诉标题">
        {{title}}
      </el-form-item>
      <el-form-item
        label="申诉类型"
        prop="reportOrAppealTypeId"
      >
        <el-select
          v-model="form.reportOrAppealTypeId"
          placeholder="请选择申诉类型"
        >
          <el-option
            v-for="item in reportTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="申诉理由"
        prop="reason"
      >
        <el-input
          v-model="form.reason"
          :maxlength="300"
          type="textarea"
          :rows="3"
          placeholder="请输入申诉理由，300字以内"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="图片证据"
        prop="evidence"
      >
        <el-row
          class="row"
          v-if="form.evidence.length"
        >
          <el-col
            class="col"
            :span="4"
            v-for="(item, index) in form.evidence"
            :key="index"
          >
            <el-card
              style="width:250px;"
              :body-style="{ padding: '0px' }"
            >
              <a
                target="_blank"
                :href="item | setImg"
                class="image"
                :style="getImageStyle(item)"
              ></a>
              <div style="padding: 14px;">
                <div class="bottom clearfix">
                  <el-button
                    type="text"
                    class="button"
                    @click="form.evidence.splice(index, 1)"
                  >删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div v-if="form.evidence.length < 5">
          <ImageUpload
            :multiple="true"
            @successCBK="imgUploadSuccess"
          />
          <div>请上传图片证据，1至5张</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="submit"
          style="width: 150px;"
        >提交</el-button>
        <el-button
          type="primary"
          @click="$router.go(-1)"
          style="width: 150px;"
          plain
        >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import { reportTypeList } from '@/api/public/jewelryRing'
import { reportUpdate } from '@/api/jewelryMerchant/report'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload
  },
  data() {
    return {
      domain,
      loading: false,
      title: undefined,
      form: {
        id: undefined,
        contentId: undefined,
        reportOrAppealTypeId: undefined,
        reason: undefined,
        evidence: [],
        type: 2
      },
      reportTypeList: [],
      rules: {
        reportOrAppealTypeId: [{
          required: true,
          message: '请选择申诉类型',
          trigger: 'blur'
        }],
        reason: [{
          required: true,
          message: '请输入申诉理由，300字以内',
          trigger: 'blur'
        }],
        evidence: [{
          required: true,
          message: '请上传图片证据，1至5张',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getReportTypeList()
    this.title = this.$route.query.title
    this.form.id = this.$route.query.id
    this.form.contentId = this.$route.query.contentId
  },
  methods: {
    getReportTypeList() {
      reportTypeList({
        offset: 1,
        limit: 200,
        type: 2
      }).then(data => {
        this.reportTypeList = data.data.records
      })
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          reportUpdate(this.form).then(data => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.go(-1)
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必填项',
            type: 'warning'
          })
          return false
        }
      })
    },
    imgUploadSuccess(evidence) {
      evidence.forEach((key, i) => {
        this.form.evidence.push(key)
      })
      if (this.form.evidence.length > 5) {
        this.form.evidence.splice(5, this.form.evidence.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加5张图片，已删除多余图片',
          type: 'warning'
        })
      }
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, {
          w: 500
        }) + ')'
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
</style>
