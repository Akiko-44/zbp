<template>
	<AppView class="up-and-down" title="上下游服务" :clickLeft="back">
		<van-row gutter="50">
			<van-col span="12">
				<div class="record-box">
					<span class="serve">服务</span>
					<p>我的查看历史</p>
					<p>查询以往查询过的店家</p>
				</div>
			</van-col>
			<van-col span="12">
				<div class="record-box">
					<span class="serve">服务</span>
					<p>我的消息</p>
					<p>消息记录</p>
				</div>
			</van-col>
		</van-row>
		<div class="content">
			<div class="left-menu">
				<van-badge-group :active-key="activeKey">
					<van-badge :key="index" :title="item.name" @click="handleCategory" v-for="(item,index) in categorysList" />
				</van-badge-group>
			</div>
			<div class="right-main">
				<template v-for="(item,index) in categoryServices">
				<div class="title-line">
					<span class="tips">{{item.category.name}}</span>
				</div>
				<ul class="main-list clearfix">
					<li class="item fl" v-for="(value,key) in item.services" :key="key" @click="handleCollapseItem(value,key)">
						<div class="icon-box"><img src="../../../components/common/upload/camera.png"></div>
						<p class="text">{{value.name}}</p>
					</li>
				</ul>
				</template>
			</div>
		</div>
	</AppView>
</template>

<script>
	import ListModule from '~/components/common/list'
	export default {
		data() {
			return {
				activeKey: 0,
				categorysList: [],
				categoryServices: [],
			}
		},
		beforeMount() {
			this.getCategorys()
		},
		methods: {
			handleCategory() {
				this.activeKey = key;
			},
			getCategorys() { //栏目列表
				this.$service('categorys').then(result => {
					var data = result.data.categorys;
					
					this.getCategoryServices(data[0].id)
					this.categorysList = data
				}).catch(() => {

				})
			},
			getCategoryServices(pid){
				this.$service('category_services',{
					resources: [pid],
				}).then(result => {
					var data = result.data;
					this.categoryServices = data
					console.log(data,2222)
				}).catch(() => {

				})
			},
			handleCollapseItem(item){
				this.$router.push({
					path:"/up/categoryServices",
					query:{
						id:item.id,
						title: item.name
					}
				})
			},
			back () {
				if (this.$native.isApp()) {
					this.$native.goToHome()
				} else {
					history.back()
				}
			}
		},
		components: {
			ListModule
		}
	}
</script>

<style lang="postcss" scoped>
.up-and-down {
  & .record-box {
    border: 1px solid #eee;
    position: relative;
    height: 71px;
    font-size: 13px;
    padding: 10px;
    line-height: 1.4;
    & .serve {
      position: absolute;
      right: 0;
      top: 0;
      width: 32px;
      height: 15px;
      line-height: 15px;
      font-size: 12px;
      background-color: #c2a374;
      text-align: center;
    }
  }
}

.title-line {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 65%;
  margin: 15px auto 0;
  &:before,
  &:after {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    content: "";
    border-top: 1px solid #e5e5e5;
  }
  & .tips {
    padding: 0 1em;
    color: #999999;
    position: relative;
    top: -0.5em;
  }
  & :after {
  }
}

.content {
  position: relative;
  background: #f8f8f8;
  height: calc(100vh - 149px);
  margin-top: 10px;
  & .left-menu {
    width: 85px;
  }
  & .right-main {
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 85px;
    right: 0;
    & .main-list {
      text-align: center;
      font-size: 14px;
      & .item {
        margin: 25px 20px;
        & .icon-box {
          width: 40px;
          margin: auto;
          & img {
            width: 100%;
          }
        }
        & .text {
          line-height: 1.4;
        }
      }
    }
  }
}
</style>