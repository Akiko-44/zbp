<template>
  <div class="refund-goods">
  	<NavBar title="退货"/>
  	<div class="address">
  		<p>请将商品退回至：</p>
  		<p>{{refundAddrDetail}}</p>
  	</div>
    <van-cell-group>
		  <van-cell title="物流公司" required :value="form.expressCompany" @click="show=true"/>
		  <van-field 
		   	v-model="form.expressNum" 
		   	label="物流单号"
		   	placeholder="请输入物流单号" 
		   	required
		  />
		  <textarea placeholder="请输入备注" v-model="form.remark"></textarea>
		</van-cell-group>
		<van-popup v-model="show"  position="bottom" :overlay="false">
			<van-picker
			  show-toolbar
			  :columns="columns"
			  @cancel="onCancel"
			  @confirm="onConfirm"
			/>
		</van-popup>
		<p style="padding: 16px;"><van-button @click="save" :loading="loading" type="primary" block class="primary-btn block">提交</van-button></p>
  </div>
</template>
<script>
import NavBar from '~/components/dm/navbar/noAppIndex'
export default {
	components: {
    NavBar
  },
  data () {
    return {
    	show: false,
    	columns: ['123'],
    	loading: false,
    	refundAddrDetail: '',
    	form: {
    		orderId: this.$route.query.id,
    		expressCompany: '请选择物流公司',
    		expressNum: '',
    		remark: ''
    	}
    }
  },
  deactivated () {
    this.$destroy()
  },
  mounted() {
  	this.$service('expressMap')
	  .then(result => {
	  	let expressArr = []
	  	for(let keys in result.data){
	  		expressArr.push(keys)
	  	}
	  	this.columns = expressArr
	  })
	  
	  this.$service('refundAddr', { resources: [ this.$route.query.sellUserId ] })
	  .then(result => {
	  	this.refundAddrDetail = result.data.addr
	  })
  },
  methods: {
    onConfirm(value, index) {
      this.form.expressCompany = value
      this.show = false
    },
    onCancel(){
    	this.show = false
    },
    save(){
    	let that = this
    	if(this.form.expressCompany == '请选择物流公司' || this.form.expressNum == ''){
    		this.$toast('请输入完整信息')
    		return false
    	}
    	this.loading = true
    	this.$service('expressSave', { data: this.form })
		  .then(result => {
		  	this.$toast.success('提交退货信息成功')
		  	this.loading = false
		  	setTimeout(function(){
		  		that.$router.go(-1)
		  	},1000)
		  })
    }
  }
}
</script>

<style lang="postcss" scoped>
.refund-goods {
  background: #FFFFFF;
  & .address{
  	padding: 16px;
  	line-height: 30px;
  	font-size: 16px ;
  }
}
textarea{
	width: 100%;
	box-sizing: border-box;
	height: 150px;
	resize: none;
	padding: 15px 20px;
	border: none;
}
</style>
