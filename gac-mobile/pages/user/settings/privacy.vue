<template>
  <AppView title="隐私设置">
    <div class="top-box">珠宝圈设置：</div>
    <div class="box">
      <div>允许别人查看我的关注列表</div>
      <van-switch
        v-model="checkedConcern"
        @change="privacySetting(2)"
        active-color="#df735a"
      />
    </div>
    <div class="box">
      <div>允许别人查看我的粉丝列表</div>
      <van-switch
        v-model="checkedFans"
        @change="privacySetting(1)"
        active-color="#df735a"
      />
    </div>
  </AppView>
</template>

<script>
export default {
  data() {
    return {
      checkedConcern: true,
      checkedFans: true
    }
  },
  activated() {
    this.checkedConcern = !!(+this.$route.query.concernListStatus)
    this.checkedFans = !!(+this.$route.query.fansListStatus)
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    privacySetting(type) {
      this.$service("privacySetting", { resources: [type] }).then(result => {
        // console.log('success')
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.top-box {
  font-size: 15px;
  padding: 15px 13px 0;
}
.box {
  margin: 10px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 11px 15px;
  align-items: center;
}
</style>
