<template>
  <div class="app-container calendar-list-container">
    <div class="findpwd">
      <div
        class="stepWrap"
        style="height: 65px;"
      >
        <ul class="clearfix">
          <li class="fl cur">
            <span>1</span>
            <p>验证手机号</p>
          </li>
          <li
            class="fl cur"
            style="margin-left: 160px"
          >
            <span>2</span>
            <p>修改密码</p>
          </li>
          <li class="fr">
            <span>3</span>
            <p>修改成功</p>
          </li>
        </ul>
      </div>
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-position="left"
        label-width="120px"
      >
        <el-form-item
          label="新密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入新密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认新密码"
          prop="confirmPassword"
        >
          <el-input
            type="password"
            v-model="form.confirmPassword"
            placeholder="请再次输入新密码"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            @click="save()"
          >
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { resetPassword } from '@/api/admin/user'

export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        password: '',
        confirmPassword: ''
      },
      rules: {
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        }
        ],
        confirmPassword: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '密码长度最少为6位',
          trigger: 'blur'
        },
        {
          validator: validatePass2,
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.uuid = this.$route.query.uuid
          resetPassword(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success',
              duration: 3000
            })
            this.$router.push({
              path: '/login'
            })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          /* this.$notify({
            title: '警告',
            message: '请务必填写必选项',
            type: 'warning'
          }) */
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
ul {
  padding: 0;
}
li {
  list-style: none;
}
.app-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  .findpwd {
    position: absolute;
    left: 0;
    right: 0;
    width: 580px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
    background: #ffffff;
  }
  .stepWrap {
    margin-bottom: 50px;
    margin-top: 20px;
    ul {
      width: 510px;
      position: relative;
      margin: 0 auto;
      color: #cccccc;
      margin-bottom: 40px;
      overflow: hidden;
    }
    &:after {
      position: absolute;
      height: 2px;
      width: 470px;
      content: "";
      top: 75px;
      left: 56px;
      right: 20px;
      background: #e5e5e5;
    }
    li {
      width: 70px;
      text-align: center;
      position: relative;
      z-index: 2;
    }
    li span {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #cccccc;
      color: #fff;
      border-radius: 50%;
      font-size: 24px;
      line-height: 40px;
    }
    li.cur span {
      background: #409eff;
    }
    li p {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 14px;
    }
    li.cur p {
      color: #606266;
    }
  }
}
</style>

