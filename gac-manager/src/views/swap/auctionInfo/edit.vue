<template>
<div class="app-container" style="padding-right: 40px">
  <el-form :model="form" :rules="rules" ref="form" label-width="100px">

    <el-form-item label="商品名称" prop="goodsName">
      <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
    </el-form-item>

    <el-form-item label="商品分类" prop="categoryId">
      <el-cascader
        :options="categories"
        v-model="selectedCategory"
        @change="handleChange"
        :props="{value: 'id', label: 'name'}"
      >
      </el-cascader>
    </el-form-item>

    <el-form-item label="商品品牌" prop="brandId">
      <el-select v-model="form.brandId" placeholder="商品品牌">
        <el-option
          v-for="item in brands"
          :key="item.id"
          :label="item.brandName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="新旧程度" prop="deprecition">
      <el-select v-model="form.deprecition" placeholder="新旧程度">
        <el-option
          v-for="item in deprecitionStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="起拍价" prop="upsetPrice">
      <el-input v-model.number="form.upsetPrice" type="number" maxlength="10" placeholder="请输入起拍价"></el-input>
    </el-form-item>

    <el-form-item label="最小加价" prop="skipPrice">
      <el-input v-model.number="form.skipPrice" type="number" maxlength="10" placeholder="买家每次出价的最小加价幅度"></el-input>
    </el-form-item>
    <el-form-item label="保留价" prop="reservePrice">
      <el-input v-model.number="form.reservePrice" type="number" maxlength="10" placeholder="请输入保留价"></el-input>
    </el-form-item>
    <el-form-item label="保证金" prop="deposit">
      <el-input v-model.number="form.deposit" type="number" maxlength="10" placeholder="买家竞拍需事先交纳的款项，保证金不可高于保留价"></el-input>
    </el-form-item>
    <el-form-item label="竞拍时间" prop="auctionEndTime">
      <el-date-picker
        v-model="dateValue"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      >
      </el-date-picker>
    </el-form-item>

    <el-form-item label="商品图片" prop="imgs">
      <el-row class="row" v-show="form.imgs.length">
        <el-col class="col" :span="6" v-for="(item, index) in form.imgs" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <a target="_blank" :href="item.imgUrl | setImg" class="image" :style="getImageStyle(item)"></a>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-tag v-if="item.imgType === 1">封面</el-tag>
                <el-button v-else type="text" @click="setCover(item)">设为封面</el-button>
                <el-button type="text" icon="el-icon-delete" @click="handleDelete(index)"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
       <ImageUpload
        :multiple="true"
        prefix="swap"
        @successCBK="goodsUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="鉴定证书" prop="hsMark.hsMarkUrl">
      <el-card v-if="form.hsMark.hsMarkUrl" style="width:250px;" :body-style="{ padding: '0px' }">
        <img :src="form.hsMark.hsMarkUrl | setImg" width="100%">
        <div style="padding: 14px;">
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="form.hsMark.hsMarkUrl = ''">删除</el-button>
          </div>
        </div>
      </el-card>
      <ImageUpload
        v-show="!form.hsMark.hsMarkUrl"
        :multiple="false"
        prefix="swap"
        @successCBK="cerUploadSuccess"
      />
    </el-form-item>

    <el-form-item label="商品描述" prop="goodsDesc">
      <Tinymce :height="500" ref="editor" v-model="form.goodsDesc"></Tinymce>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import Tinymce from '@/components/Tinymce'
import { page as getBrands } from '@/api/swap/brand'
import { getGoodsDesc } from '@/api/swap/goods'
import { getObj, putObj } from '@/api/swap/auctionInfo'
import store from '@/store'
import { deprecitionState, category } from '@/utils/mixins/swap'
import { setImg } from '@/filters'

export default {
  directives: {
    waves
  },
  computed: {
    brands() {
      return this.$store.state.data.swapBrands.records
    },
    deprecitionStatus() {
      return Object.keys(deprecitionState).map(key => {
        return { value: key, label: deprecitionState[key] }
      })
    }
  },
  watch: {
    dateValue(value) {
      this.form.auctionStartTime = value ? value[0] : undefined
      this.form.auctionEndTime = value ? value[1] : undefined
    }
  },
  data() {
    const rules = {
      goodsName: [
        {
          required: true,
          message: '请输入商品名称',
          trigger: 'blur'
        },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
      ],
      categoryId: [
        {
          required: true,
          message: '请选择商品分类',
          trigger: 'blur'
        }
      ],
      brandId: [
        {
          required: true,
          message: '请选择商品品牌',
          trigger: 'blur'
        }
      ],
      deprecition: [
        {
          required: true,
          message: '请选择新旧程度',
          trigger: 'blur'
        }
      ],
      upsetPrice: [
        {
          required: true,
          message: '请输入起拍价',
          trigger: 'blur'
        }
      ],
      skipPrice: [
        {
          required: true,
          message: '请输入最小加价',
          trigger: 'blur'
        }
      ],
      reservePrice: [
        {
          required: true,
          message: '请输入保留价',
          trigger: 'blur'
        }
      ],
      deposit: [
        {
          required: true,
          message: '请输入保证金',
          trigger: 'blur'
        }
      ],
      imgs: [
        {
          required: true,
          message: '请上传商品图片',
          trigger: 'blur'
        }
      ],
      auctionEndTime: [
        {
          required: true,
          message: '请选择竞拍起止时间',
          trigger: 'blur'
        }
      ],
      'hsMark.hsMarkName': [
        {
          required: true,
          message: '请输入鉴定机构',
          trigger: 'blur'
        }
      ],
      'hsMark.hsMarkUrl': [
        {
          required: true,
          message: '请上传鉴定证书',
          trigger: 'blur'
        }
      ],
      goodsDesc: [
        {
          required: true,
          message: '请填写商品描述',
          trigger: 'blur'
        }
      ]
    }

    return {
      rules,
      categories: [],
      selectedCategory: [],
      loading: false,
      form: {
        id: undefined,
        categoryId: undefined,
        goodsName: undefined,
        brandId: undefined,
        deprecition: undefined,
        upsetPrice: undefined,
        skipPrice: undefined,
        reservePrice: undefined,
        deposit: undefined,
        imgs: [],
        hsMark: {
          hsMarkUrl: '',
          hsMarkName: 'default'
        },
        goodsDesc: ''
      },
      editStatus: true,
      dateValue: '',
      pickerOptions: {}
    }
  },
  async beforeRouteEnter(to, from, next) {
    const queue = [
      store.dispatch('data/get', { name: 'swapBrands', service: getBrands }),
      category.get()
    ]
    if (to.query.id) {
      queue.push(getObj(to.query.id).then(data => data.data))
      queue.push(getGoodsDesc(to.query.id).then(data => data.data ? data.data.goodsDesc : ''))
    }
    const [, categories, form, goodsDesc] = await Promise.all(queue)
    next(vm => {
      setTimeout(() => {
        vm.categories = categories
        if (form) {
          vm.form = form
          vm.form.goodsDesc = goodsDesc
          vm.selectedCategory = category.getParentId(vm.form.categoryId)
          vm.dateValue = [vm.form.auctionStartTime, vm.form.auctionEndTime]
        }
      }, 10)
    })
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  methods: {
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
    },
    handleDelete(index) {
      this.form.imgs.splice(index, 1)
    },
    getImageStyle(item) {
      return {
        backgroundImage: 'url(' + setImg(item.imgUrl, { w: 500 }) + ')'
      }
    },
    goodsUploadSuccess(imgs) {
      imgs.forEach(img => {
        this.form.imgs.push({ imgUrl: img.key, imgType: 2 })
      })
      if (this.form.imgs.length === 1) {
        // 设置一张为封面
        this.form.imgs[0].imgType = 1
      }
    },
    cerUploadSuccess(imgs) {
      this.form.hsMark.hsMarkUrl = imgs[0].key
    },
    save() {
      const set = this.$refs
      set.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.form.swapble = +this.form.swapble
          putObj(this.form).then(data => {
            this.editStatus = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ name: 'auctionInfo' })
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
    async setCover(img) {
      this.form.imgs.forEach(item => {
        if (item.imgType === 1) {
          item.imgType = 2
        }
      })
      img.imgType = 1
    },
    handleChange(data) {
      this.form.categoryId = data[data.length - 1]
    }
  },
  components: {
    ImageUpload,
    Tinymce
  }
}
</script>

<style scoped>
.image{
  display: block;
  max-width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.row {
  position: relative;
  left: -20px;
  margin-top: 10px;
}
.col {
  margin-bottom: 20px;
  margin-left: 20px;
  max-width: 22.8%;
  max-height: 400px;
}
</style>
