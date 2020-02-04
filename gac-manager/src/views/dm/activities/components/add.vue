<template>
  <div>
    <!--<div class="block" style="borderBottom: 1px solid #000;">
      <h4>添加/编辑活动</h4>
    </div>-->
    <div class="block"
         style="paddingRight:40px">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="80px">
        <el-form-item label="活动名称"
                      prop="title">
          <el-input style="width: 200px"
                    v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="图片上传">
          <el-row class="row"
                  v-show="ruleForm.phonePath.length">
            <draggable class="list-group"
                       v-model="ruleForm.phonePath"
                       :options="dragOptions"
                       :move="onMove"
                       @start="isDragging=true"
                       @end="isDragging=false">
              <el-col class="col"
                      :span="6"
                      v-for="(item, index) in ruleForm.phonePath"
                      :key="index">
                <el-card :body-style="{ padding: '0px' }">
                  <a target="_blank"
                     :href="item.url | setImg"
                     class="image"
                     :style="getImageStyle(item)"></a>
                  <div style="padding: 14px;">
                    <!--<p>{{item.name}}</p>-->
                    <div class="bottom clearfix">
                      <!--<el-button type="text" icon="el-icon-edit" @click="handleUpdateOrCreate('update', item, index)"></el-button>-->
                      <el-button type="text"
                                 icon="el-icon-delete"
                                 @click="handleDelete(index)"></el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </draggable>
          </el-row>
          <ImageUpload :multiple="true"
                       :checkFile="checkFile"
                       prefix="gallery"
                       @successCBK="uploadSuccess" />
        </el-form-item>
        <el-form-item label="正文内容"
                      prop="content">
          <Tinymce :height="500"
                   ref="editor"
                   v-model="ruleForm.content"></Tinymce>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="onSubmit">保存成功</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ImageUpload from '@/components/Upload'
import { setImg } from '@/filters'
import Draggable from 'vuedraggable'
import Tinymce from '@/components/Tinymce'
import {
  saveGalleryActivity,
  getGalleryActivityById,
  updateGalleryActivityById
} from '@/api/gallery/listActivities'
export default {
  props: {
    supType: [String, Number],
    routerName: {
      type: String
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      dragOptions: {
        animation: 150,
        disabled: false,
        ghostClass: 'ghost',
        scroll: true,
        preventOnFilter: true,
        handle: '.col'
      },
      ruleForm: {
        title: '',
        phonePath: [],
        content: ''
      },
      rules: {
        title: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 30,
          message: '长度在 1 到 30 个字符',
          trigger: 'blur'
        }
        ],
        content: [{
          required: true,
          message: '请填写正文内容',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    ImageUpload,
    Draggable,
    Tinymce
  },
  created() {
    this.getAdd()
  },
  methods: {
    getAdd() {
      const da = this.$route.query.id
      if (!da) {
        return
      }
      getGalleryActivityById(da).then(res => {
        this.ruleForm = {
          id: da,
          title: res.data.title,
          content: res.data.content,
          phonePath: [{
            name: '',
            url: res.data.phonePath
          }]
        }
      })
    },
    onSubmit() { // 保存
      let phonePath
      if (this.ruleForm.phonePath.length > 0) {
        phonePath = this.ruleForm.phonePath[0].url
      } else {
        phonePath = ''
      }
      const date = {
        title: this.ruleForm.title,
        content: this.ruleForm.content,
        phonePath: phonePath
      }
      if (this.$route.query.id) {
        date['id'] = this.$route.query.id
        updateGalleryActivityById(date).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({
            name: this.routerName
          })
        })
      } else {
        date['supType'] = this.supType
        saveGalleryActivity(date).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.$router.push({
            name: this.routerName
          })
        })
      }
    },
    handleRemove(file, fileList) {

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDelete(index) {
      this.ruleForm.phonePath.splice(index, 1)
    },
    getImageStyle(item) {
      return {
        backgroundImage: 'url(' + setImg(item.url, {
          w: 500
        }) + ')'
      }
    },
    onMove({
      relatedContext,
      draggedContext
    }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    handleUpdateOrCreate(status, row, index) {
      const dialog = this.$refs.dialog
      dialog.dialogStatus = status
      dialog.dialogFormVisible = true
      dialog.resetForm('form', () => {
        if (row) {
          dialog.form = JSON.parse(JSON.stringify(row))
          this.editIndex = index
        } else {
          this.editIndex = undefined
        }
      })
    },
    updateOrcreateSuccess(row) {
      if (this.editIndex !== undefined) {
        this.form.phonePath.splice(this.editIndex, 1, row)
      } else {
        this.form.phonePath.push(row)
      }
    },
    uploadSuccess(imgs) {
      imgs.forEach(img => {
        this.ruleForm.phonePath.push({
          url: img,
          name: '这个主人很懒，什么都没留下'
        })
      })
    },
    checkFile(file, img) {
      // const size = this.bannerRule[this.form.location - 1]
      // if (img.width !== size.width || img.height !== size.height) {
      //   return '图片尺寸不对，请重新上传'
      // }
    }
  }

}
</script>
<style scoped>
.block {
  padding: 20px 0 10px 20px;
  width: 100%;
  overflow: hidden;
}

.image {
  display: block;
  max-width: 100%;
  height: 280px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>