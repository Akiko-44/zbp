
<template>
<div class="app-container calendar-list-container">
  <div class="filter-container" v-if="!list.length">
    <el-button type="primary" @click="addAddr">新增退货地址</el-button>
  </div>
  <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
    <el-table-column width="260px" align="left" label="收货地址">
      <template slot-scope="{ row }">
        <span>{{row.addr}}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="收件人">
      <template slot-scope="{ row }">
        <span>{{row.consignee}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="收件人号码">
      <template slot-scope="{ row }">
        <span>{{row.mobileNum}}</span>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="操作">
      <template slot-scope="{ row }">
        <el-button type="primary" @click="edit">编辑</el-button>
      </template>
    </el-table-column>

  </el-table>
  <el-dialog title="退货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form" label-width="120px">
    	<el-form-item label="收货地址" prop="city">
        <v-city
          @change="cityChange"
          ref="city"
        />
	    </el-form-item>
	    <el-form-item label="详细地址" prop="detailAddr">
        <el-input v-model="form.detailAddr" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item label="收件人姓名" prop="consignee">
        <el-input v-model="form.consignee" placeholder="请输入收件人姓名"></el-input>
      </el-form-item>
      <el-form-item label="收件人手机号" prop="mobileNum">
        <el-input v-model="form.mobileNum" maxlength="11" placeholder="请输入收件人手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { page, putObj } from '@/api/designMerchant/refundAddr'
import VCity from '@/components/app/city'

export default {
	components: {
    VCity
  },
  data() {
    return {
      list: [],
      loading: false,
      listLoading: true,
      dialogFormVisible: false,
      selectedCity: [],
      form: {
      	id: undefined,
      	addr: undefined,
      	consignee: undefined,
      	mobileNum: undefined,
      	
      	province: undefined,
      	city: undefined,
      	area: undefined,
      	detailAddr: undefined
      },
      rules: {
      	city: [
          {
            required: true,
            message: '请选择城市',
            trigger: 'change'
          }
        ],
        detailAddr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '请输入收件人姓名', trigger: 'blur' }
        ],
        mobileNum: [
          { required: true, message: '请输入收件人手机号', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      page().then(data => {
      	this.list = []
	      const listObj = data.data
	      this.form.id = listObj.id
	      this.list.push(listObj)
	    	this.listLoading = false
	    })
      this.listLoading = false
    },
    cityChange(cities) {
      const fields = ['province', 'city', 'area']
      fields.forEach((value, index) => {
        this.form[value] = cities[index] && cities[index].regionName
      })
    },
    cancel(){
    	this.dialogFormVisible = false
    	this.form = {
      	id:undefined,
      	addr: undefined,
      	consignee: undefined,
      	mobileNum: undefined,
      	
      	province: undefined,
      	city: undefined,
      	area: undefined,
      	detailAddr: undefined
      }
    },
    edit() {
    	this.dialogFormVisible = true
    },
    addAddr() {
    	this.dialogFormVisible = true
    },
    update() {
    	this.$refs['form'].validate((valid) => {
	      if (valid) {
	        this.loading = true
		    	this.form.addr = this.form.province + this.form.city + this.form.area + this.form.detailAddr
		    	putObj(this.form).then(data => {
		    		this.$notify({
				      title: '成功',
				      message: '操作成功',
				      type: 'success',
				      duration: 2000
				    })
		    		this.dialogFormVisible = false
		    		this.loading = false
		    		this.getList()
		    	})
	      } else {
	        return false
	      }
	    })
    }
  }
}
</script>

<style scoped>
.filter-label {
  font-size: 14px;
  color: #909399;
  font-weight: normal;
}
</style>
