
<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">

    <el-form-item label="代金券名称" prop="couponsName">
      <el-input v-model="form.couponsName" placeholder="请输入名称"></el-input>
    </el-form-item>

      <el-form-item label="抵扣金额" prop="couponsPrice">
          <el-input v-model="form.couponsPrice"></el-input>
      </el-form-item>

      <el-form-item label="消费金额" prop="couponsScale">
          <el-input v-model="form.couponsScale"></el-input>
      </el-form-item>
      <el-form-item label="起止时间" prop="timeVal">
        <el-date-picker
          v-model="timeVal"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <!--<el-form-item label="开始时间" prop="startDate">
          <el-date-picker v-model="form.startDate" type="date" @change="" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">          
          </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间" prop="endDate">
          <el-date-picker v-model="form.endDate" type="date" @change="" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">          
          </el-date-picker>
      </el-form-item>-->

      <el-form-item label="优惠券数量" prop="total">
          <el-input v-model="form.total"></el-input>
      </el-form-item>

      <el-form-item label="关联商品">
          <el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.caseName" placeholder="请输入商品名称"> </el-input>
          <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
          <el-transfer :titles="['可选商品', '已选商品']" v-model="selectValue" @change="handleChange" :data="data" style="margin-top: 20px;"></el-transfer>
      </el-form-item>



    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save()">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import waves from '@/directive/waves' // 水波纹指令
import { domain } from '@/api/qiniu'
import { getObj, putObj, getGoods } from '@/api/makeMerchant/discounts'
import Cookies from 'js-cookie'

export default {
  directives: {
    waves
  },
  components: {
    Tinymce
  },
  data() {
    return {
      domain,
      loading: false,
      data:[],
      selectValue: [],
      timeVal: '',
      form: {
        couponsName: '',
        couponsPrice: '',
        couponsScale: '',
        startDate: '',
        endDate: '',
        total: '',
        merchantId: Cookies.get('merchantId'),
        ctgList: [],
        couponsType: 3
      },
      listQuery: {
        goodsSource: 6,
        caseName: ''
      },
      listParams: {
        offset: 1,
        limit: 20
      },
      rules: {
        couponsName: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        couponsPrice: [
          {
            required: true,
            message: '请输入抵扣金额',
            trigger: 'blur'
          }
        ],
        couponsScale: [
          {
            required: true,
            message: '请输入消费金额',
            trigger: 'blur'
          }
        ],
        startDate: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        endDate: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        total: [
          {
            required: true,
            message: '请输入优惠券数量',
            trigger: 'blur'
          }
        ]
      },
      editStatus: true,
      timeout: null
    }
  },
  watch: {
    timeVal(value) {
      this.form.startDate = value ? value[0] : undefined
      this.form.endDate = value ? value[1] : undefined
    }
  },
  created() {
    this.handleFilter()
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async beforeRouteEnter(to, from, next) {
    let form
    if (to.query.id) {
      form = await getObj(to.query.id).then(data => data.data)
    }
    
    next(vm => {
      setTimeout(() => {
        if (form) {
          vm.form = form
          vm.timeVal = [vm.form.startDate, vm.form.endDate]
          vm.getList()
          var arr = []
          vm.form.ctgList.forEach(function(v){
            arr.push(v.goodsId)
          })
          vm.selectValue = [...new Set(arr)];
        }
      }, 10)
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      getGoods(this.listQuery, this.listParams, 3)
        .then(succ => {
          const generateData = _ => {
            const data = []
            succ.data.records.forEach(function(v, i, arr) {
              data.push({
                key: v.caseId,
                label: v.caseName
              })
            })
            return data
          }
          
          this.data = generateData()
        })
    },
    handleFilter() {
      this.getList()
    },
    handleChange(value, direction, movedKeys) {
      let self = this
      self.form.ctgList = []
      movedKeys.forEach(function(val, j, arr) {
        self.data.forEach(function(v, i, arr) {
          if(v.key === val) {
            self.form.ctgList.push({
              goodsId: v.key,
              goodsName: v.label
            })
          }
        })
      })
    },
    save() {
      const set = this.$refs
      this.handleChange(null,null,this.selectValue)
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          putObj(this.form, 3).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({
              name: 'discountsList'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus) {
        if (window.confirm('确定要放弃当前的操作吗？')) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
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
.el-col-6 {
  margin-bottom: 20px;
}
</style>
