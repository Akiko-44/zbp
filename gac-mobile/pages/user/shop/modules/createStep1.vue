<template>
<div class="main">
  <h4 class="title">选择认证主体</h4>
  <van-radio-group v-model="form.registType" checked-color="#c2a374" class="radio-group">
	  <van-radio :name="2">企业</van-radio>
	  <van-radio :name="1">个人</van-radio>
	</van-radio-group>
  <van-button type="primary" block class="primary-btn block" @click="submit">下一步</van-button>
</div>
</template>

<style lang="postcss" scoped>
/*.main {
  background-color: var(--bg);
}*/
.title{
	position: static!important;
}
.radio-group{
	text-align: center;
}
.block {
  margin: 25px auto;
  width: 90%;
}
>>> .van-radio{
	display: inline-flex;
	margin: 10px 20px;
}
</style>

<script>
export default {
	props: {
    merchantType: [String, Number],
    form1: {
    	Type: Object,
    	default: () => {
    		return {
    			registType: 1
    		}
    	}
    }
  },
  data () {
    return {
      form: {
      	registType: '2'
      }
    }
  },
  watch: {
  	merchantType(val) {
  		if(val == 2) {  			
				this.form.registType = 1
			}else if(val == 3) {
				this.form.registType = 2
			}else {
				this.$set(this.form, 'registType', 2)
			}
  	},
  	form1: {
			handler(newValue, oldValue) {
				Object.assign(this.form, newValue)
			},
			deep: true
　　	}
  },
  methods: {
    submit () {
			localStorage.setItem('form', JSON.stringify({registType: this.form.registType}))
      this.$emit('submit', this.form, 1)
    }
  }
}
</script>
