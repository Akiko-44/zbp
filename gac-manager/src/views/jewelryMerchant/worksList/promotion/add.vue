<template>
  <div
    class="app-container"
    style="padding-right: 40px"
  >
    <el-form label-width="120px">
      <el-form-item label="商品名称：">
        <span> {{ form.goodsName }} </span>
        <el-button
          type="primary"
          class="btn select-btn"
          @click="openDialog"
        >{{
          form.goodsName ? "修改商品" : "选择商品"
        }}</el-button>
      </el-form-item>

      <template v-if="form.goodsName">
        <el-form-item label="商品ID：">
          <span>{{ form.goodsId }}</span>
        </el-form-item>

        <el-form-item label="所属品牌：">
          <span>{{ form.brandName }}</span>
        </el-form-item>

        <el-form-item label="商品分类：">
          <span>{{ form.categoryName }}</span>
        </el-form-item>

        <el-form-item label="总库存：">
          <span>{{ form.stockNum }}</span>
        </el-form-item>

        <el-form-item label="销售价格：">
          <span>{{ `￥${form.lowPrice}` }}</span>
          <span v-if="form.lowPrice !== form.hightPrice">{{
            `~ ￥${form.hightPrice}`
          }}</span>
        </el-form-item>

        <GoodsSpec
          :type="type"
          :goodsSpec="goodsSpecData"
          :goodsSpecTable="goodsSpecTableData"
        ></GoodsSpec>
      </template>

      <el-form-item
        label="拼团人数："
        v-if="type === 1"
      >
        <span>2人</span>
      </el-form-item>

      <el-form-item
        label="拼团截止时间："
        v-if="type === 1"
      >
        <el-radio
          v-model="form.forever"
          class="radio-block"
          :label="1"
          @change="changeForever"
        >不限时间</el-radio>
        <el-radio
          v-model="form.forever"
          :label="0"
          @change="changeForever"
        >截止时间
          <el-date-picker
            :disabled="!!form.forever"
            v-model="form.endTime"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-radio>
      </el-form-item>

      <el-form-item
        label="促销起止时间："
        v-if="type === 2"
      >
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          start-placeholder="开始"
          end-placeholder="结束"
          style="width:380px"
          v-model="createTime"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button
          size="small"
          @click="goBack"
        >返回</el-button>
        <el-button
          size="small"
          type="primary"
          @click="save"
        >保存</el-button>
      </el-form-item>
    </el-form>

    <goods-dialog
      ref="goodsDialog"
      @selectGoods="selectGoods"
    ></goods-dialog>
  </div>
</template>

<script>
import { groupDetail, saveGroup } from '@/api/jewelryMerchant/works'
import GoodsSpec from '@/components/GoodsSpec/group'
import goodsDialog from './chooseGoods'
export default {
  components: {
    GoodsSpec,
    goodsDialog
  },
  props: ['type', 'from'],
  data() {
    return {
      checked: true,
      form: {
        id: undefined,
        name: '',
        goodsName: '',
        groupNumber: 2,
        activityType: 1,
        goodsId: '',
        forever: 1,
        startTime: '',
        endTime: '',
        goodsSkus: []
      },
      createTime: [],
      goodsSpecData: [],
      goodsSpecTableData: []
    }
  },
  async mounted() {
    this.form.activityType = this.type
    if (this.$route.query.id) {
      const form = await groupDetail({ id: this.$route.query.id }).then(
        data => data.data
      )
      setTimeout(() => {
        this.form = form
        this.form.activityType = this.type
        this.createTime = [this.form.startTime, this.form.endTime]
        this.goodsSpecData = form.goodsSpecs
        this.goodsSpecTableData = form.goodsSkus
        this.goodsSpecTableData.map(item => {
          item.stock += item.activityStock
        })
      }, 10)
    } else {
      if (this.type === 2) {
        this.form.forever = 0
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    save() {
      this.form.name = this.form.goodsName
      if (this.createTime && this.createTime.length) {
        this.form.startTime = this.createTime.length ? this.createTime[0] : ''
        this.form.endTime = this.createTime.length ? this.createTime[1] : ''
      }
      if (!this.form.goodsId) {
        this.$notify({
          title: '警告',
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      if (!this.form.forever && !this.form.endTime) {
        this.$notify({
          title: '警告',
          message: '请选择具体日期',
          type: 'warning'
        })
        return
      }
      let flag = true
      this.form.goodsSkus.map(item => {
        if (!item.groupPrice || item.activityStock === '') {
          flag = false
        }
      })
      if (!flag) {
        this.$notify({
          title: '警告',
          message: '请完善商品规格',
          type: 'warning'
        })
        return
      }

      saveGroup(this.form).then(data => {
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({
          name: this.from
        })
      })
    },
    changeForever(val) {
      if (val) {
        this.form.endTime = ''
      }
    },
    // 选择商品
    openDialog() {
      this.$refs.goodsDialog.dialogTableVisible = true
      this.$refs.goodsDialog.getList()
    },
    selectGoods(selected) {
      this.form.goodsName = selected.goodsName
      this.form.brandName = selected.brandName
      this.form.categoryName = selected.categoryName
      this.form.stockNum = selected.stockNum
      this.form.lowPrice = selected.lowPrice
      this.form.hightPrice = selected.hightPrice
      this.form.goodsSkus = selected.goodsSkus
      this.form.goodsId = selected.goodsId
      this.goodsSpecData = selected.goodsSpecs
      this.goodsSpecTableData = selected.goodsSkus
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
.imgss p img {
  width: 600px;
}
.wscnph {
  max-width: 500px !important;
  height: auto !important;
}
</style>
