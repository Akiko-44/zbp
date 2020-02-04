
<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        class="filter-item"
        placeholder="姓名或账户"
        v-model="listQuery.name"
      > </el-input>
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button>
      <el-button
        class="filter-item"
        v-if="userManager_btn_add"
        style="margin-left: 10px;"
        @click="handleCreate"
        type="primary"
        icon="edit"
      >添加</el-button>
    </div>
    <el-table
      :key='tableKey'
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        width="200px"
        align="center"
        label="姓名"
      >
        <template slot-scope="{ row }">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="账户"
      >
        <template slot-scope="{ row }">
          <span>{{row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="性别"
      >
        <template slot-scope="{ row }">
          <span>{{row.sex}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="备注"
      >
        <template slot-scope="{ row }">
          <span>{{row.description}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="创建时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.crtTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="180px"
        align="center"
        label="最后时间"
      >
        <template slot-scope="{ row }">
          <span>{{row.updTime}}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="110px"
        align="center"
        label="最后更新人"
      >
        <template slot-scope="{ row }">
          <span>{{row.updName}}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        align="center"
        label="操作"
        width="150"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            v-if="userManager_btn_edit"
            size="small"
            type="success"
            @click="handleUpdate(row, $index)"
          >编辑
          </el-button>
          <el-button
            v-if="row.status === null || +row.status === 1"
            size="small"
            type="danger"
            @click="handleDelete(row, 0)"
          >禁用</el-button>
          <el-button
            v-else
            size="small"
            type="primary"
            @click="handleDelete(row, 1)"
          >启用</el-button>
        </template>
      </el-table-column>

    </el-table>

    <div
      v-show="!listLoading"
      class="pagination-container"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.offset"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item
          label="姓名"
          prop="name"
        >
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="账户"
          prop="username"
        >
          <el-input
            v-if="dialogStatus == 'create'"
            v-model="form.username"
            placeholder="请输入账户"
          ></el-input>
          <el-input
            v-else
            v-model="form.username"
            placeholder="请输入账户"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          placeholder="请输入密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            v-if="dialogStatus == 'create'"
            :maxlength="16"
          ></el-input>
          <el-input
            v-else
            v-model="form.password"
            :maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            class="filter-item"
            v-model="form.sex"
            placeholder="请选择"
          >
            <el-option
              v-for="item in  sexOptions"
              :key="item"
              :label="item"
              :value="item"
            > </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="logo:"
          prop="userLogo"
        >
          <el-card
            v-if="form.userLogo"
            style="width:200px;"
            :body-style="{ padding: '0px' }"
          >
            <img
              :src="form.userLogo | setImg"
              class="image"
              width="100%"
            >
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  @click="form.userLogo = ''"
                >删除</el-button>
              </div>
            </div>
          </el-card>
          <el-button
            v-else
            @click="cropShow = true"
            type="primary"
          >上传</el-button>
          <ImageCropper
            ref="cropper"
            v-model="cropShow"
            :noCircle="true"
            :noSquare="true"
            :withCredentials="true"
            imgFormat="jpg"
            :width="500"
            :height="500"
            prefix="userLogo"
            @crop-upload-success="uploadSuccess"
          />
          <div>支持jpg/jpeg/png/gif格式，大小2M以内，尺寸500*500</div>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            :maxlength="200"
            placeholder="请输入内容"
            v-model="form.description"
          > </el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="create('form')"
        >确 定</el-button>
        <el-button
          v-else
          type="primary"
          @click="update('form')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  addObj,
  delObj,
  putObj
} from '@/api/admin/user'
import ImageCropper from '@/components/ImageCropper'
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'user',
  directives: {
    waves
  },
  components: {
    ImageCropper
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '******' || (value && value.length > 16)) {
        callback()
      } else {
        if (!(/^[0-9a-zA-Z]{6,16}$/).test(value)) {
          callback(new Error('请输入登录密码，由6-16位数字或大小写字母组成'))
        } else {
          callback()
        }
      }
    }
    return {
      cropShow: false,
      form: {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        description: undefined,
        userLogo: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入用户',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 20,
            message: '长度在 2 到 20 个字符',
            trigger: 'blur'
          }
        ],
        username: [
          {
            required: true,
            message: '请输入账户',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        /* password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ], */
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ],
        description: [
          { required: true, message: '请输入描述，200字以内', trigger: 'blur' }
        ],
        userLogo: [
          { required: true, message: '请上传Logo', trigger: 'blur' }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        offset: 1,
        limit: 20,
        name: undefined
      },
      sexOptions: ['男', '女'],
      dialogFormVisible: false,
      dialogStatus: '',
      userManager_btn_edit: true,
      userManager_btn_del: true,
      userManager_btn_add: true,
      textMap: {
        update: '编辑',
        create: '创建'
      },
      tableKey: 0,
      // 当前编辑的row的索引
      rowIndex: undefined
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 上传图片
    uploadSuccess(key) {
      this.form.userLogo = key
      this.cropShow = false
      this.$refs.cropper.setStep(1)
    },
    getList() {
      this.listLoading = true
      page(this.listQuery)
        .then(data => {
          this.list = data.data.records
          this.list.map(item => {
            item.password = '******'
          })
          this.total = data.data.total
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.offset = val
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleUpdate(row, $index) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.rowIndex = $index
    },
    handleDelete(row, status) {
      const text = +status === 1 ? '启用' : '禁用'
      this.$confirm(`确定${text}账户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delObj(row.id, +status)
            .then(() => {
              this.$notify({
                title: '成功',
                message: `${text}成功`,
                type: 'success',
                duration: 2000
              })
              row.status = +status
            })
        })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          if (this.form.password == '******') {
            this.form.password = undefined
          }
          const {
            id, name, sex, description, username, password, userLogo
          } = this.form
          putObj({ id, name, sex, description, username, password, userLogo }).then(() => {
            this.dialogFormVisible = false
            this.getList()
            // 本地更新数据，不请求服务端(已修改，仍旧请求了后台接口getList())
            this.list[this.rowIndex].name = name
            this.list[this.rowIndex].sex = sex
            this.list[this.rowIndex].description = description
            this.list[this.rowIndex].password = password
            this.list[this.rowIndex].userLogo = userLogo
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    },
    resetTemp() {
      this.form = {
        username: undefined,
        name: undefined,
        sex: '男',
        password: undefined,
        userLogo: undefined,
        description: undefined
      }
    }
  }
}
</script>
