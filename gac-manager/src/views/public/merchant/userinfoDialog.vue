<template>
  <el-dialog
    title="会员信息"
    width="600px"
    :visible.sync="dialogFormVisible"
  >
    <div class="user-info">
      <p>
        <span class="label">会员ID：</span>
        <span class="value">{{userinfo.id}}</span>
      </p>
      <p v-if="userinfo.realname">
        <span class="label">用户姓名：</span>
        <span class="value">{{userinfo.realname}}</span>
      </p>
      <p>
        <span class="label">会员头像：</span>
        <img
          class="user-logo"
          id="userLogo"
          :src="userinfo.userLogo"
        >
      </p>
      <p v-if="userinfo.birthday">
        <span class="label">出生年月：</span>
        <span class="value">{{userinfo.birthday}}</span>
      </p>
      <p v-if="userinfo.marriageState">
        <span class="label">是否已婚：</span>
        <span class="value">{{userinfo.marriageState === 1 ? '已婚' : '未婚'}}</span>
      </p>
      <p v-if="userinfo.region">
        <span class="label">所在城市：</span>
        <span class="value">{{userinfo.region}}</span>
      </p>
      <p v-if="userinfo.occupation">
        <span class="label">职业：</span>
        <span class="value">{{userinfo.occupation}}</span>
      </p>
      <p v-if="userinfo.hobby">
        <span class="label">爱好：</span>
        <span class="value">{{userinfo.hobby}}</span>
      </p>
      <p v-if="userinfo.email">
        <span class="label">邮箱：</span>
        <span class="value">{{userinfo.email}}</span>
      </p>
    </div>
    <!-- <el-form
      :model="form"
      ref="form"
    >
      <el-form-item
        label="所属标签"
        label-width="80px"
        prop="labelId"
      >
        <el-radio-group v-model="form.labelId">
          <el-radio
            v-for="item in labelList"
            :key="item.id"
            :label="item.id"
          >{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form> -->
    <!-- <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="cancel"
        type="primary"
      >确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      userinfo: {
        id: undefined,
        labelId: undefined
      }
    }
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .el-dialog__body {
  padding-bottom: 0;
  text-align: center;
}
.user-info {
  & .label {
    display: inline-block;
    width: 280px;
    text-align: right;
  }
  & .user-logo {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    border-radius: 50%;
  }
}
</style>
