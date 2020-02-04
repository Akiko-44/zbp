<template>
  <AppView class="Release" title="拍卖信息发布">
    <Validator :model="form" :rules="rules" ref="validator">
      <van-cell-group>
        <van-field
          v-model.trim="form.recycleName"
          label="回收标题"
          type="input"
          placeholder="请输入回收标题"
          required
        />

        <van-cell required>
          <template slot="title">
            <div class="upload-title">标题图片</div>
            <VUpload
              ref="uploader"
              :limit="1"
              :imgs="form.imgUrl ? [{src: form.imgUrl, progress: 100}] : []"
              @success="img => form.imgUrl = img.src"
              @remove="form.imgUrl = ''"
            />
          </template>
        </van-cell>

        <van-cell
          title="回收分类"
          :value="categoryText"
          required
          is-link
          @click="$refs.categoryCascader.show = true"
        />

        <van-cell
          title="所在城市"
          :value="form.provinceName + ' ' + form.cityName + ' ' + (form.areaName || '')"
          required
          is-link
          @click="$refs.cityPicker.show = true"
        />

        <van-field
          v-model.trim="form.recycleDesc"
          label="回收描述"
          type="textarea"
          placeholder="请具体描述您需要回收的信息内容"
          rows="1"
          autosize
          required
        />
      </van-cell-group>
    </Validator>

    <Cascader
      :options="categories"
      v-model="form.categoryId"
      @confirm="categoryConfirm"
      :props="{value: 'id', label: 'catName'}"
      ref="categoryCascader"
    />

    <VCity
      ref="cityPicker"
      :provinceId="form.provinceId"
      :cityId="form.cityId"
      :areaId="form.areaId"
      @confirm="cityConfirm"
    />

    <div class="actions">
      <van-button
        :loading="releasing"
        @click="release"
        class="primary-btn fixed-btn"
        type="primary"
      >
        立即发布
      </van-button>
    </div>
  </AppView>
</template>

<script>
import VUpload from '~/components/common/upload'
import Validator from '~/components/common/validator'
import VCity from '~/components/common/city'
import Cascader from '~/components/common/cascader'

export default {
  components: {
    VUpload,
    Validator,
    VCity,
    Cascader
  },
  data () {
    const rules = {
      recycleName: [{ required: true, message: '请输入回收标题' }],
      categoryId: [{ required: true, message: '请选择回收分类' }],
      cityId: [{ required: true, message: '请选择所在城市' }],
      recycleDesc: [{ required: true, message: '请输入回收描述' }],
      imgUrl: [{ required: true, message: '请上传图片' }]
    }
    return {
      rules,
      complete: false,
      releasing: false,
      form: {
        recycleName: '',
        provinceId: '',
        cityId: '',
        recycleDesc: '',
        imgUrl: '',
        categoryId: '',
        src: 2,
        provinceName: '',
        cityName: ''
      },
      categoryText: '',
      datePickerShow: false
    }
  },
  computed: {
    categories () {
      return this.$store.state.data.swapCategories
    }
  },
  beforeMount () {
    this.$store.dispatch('data/get', {
      name: 'swapCategories',
      service: this.$service('swapCategories')
    })
  },
  activated () {
    const id = this.$route.query.id
    if (id) {
      this.$loading(this.$service('swapUserRecycleDetail', {resources: [id]}))
        .then(result => {
          const data = result.data
          const form = {}
          Object.keys(data).forEach(key => {
            if (this.form.hasOwnProperty(key)) {
              form[key] = data[key]
            }
          })
          this.form = form
          this.categoryText = data.categoryName
        })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!this.complete) {
      this.$dialog.confirm({
        message: '是否放弃当前的发布？',
        beforeClose (action, done) {
          if (action === 'confirm') {
            next()
          }
          done()
        }
      })
      next(false)
    } else {
      next()
    }
  },
  methods: {
    check () {
      const uploader = this.$refs.uploader
      const validator = this.$refs.validator
      return (
        uploader.check() &&
        validator.checkAll(errors => this.$toast(errors[0]))
      )
    },
    release () {
      if (this.check()) {
        this.releasing = true
        this.$service('swapReleaseRecycleGoods', { data: this.form })
          .then(() => {
            this.releasing = false
            this.success(`您的回收信息已发布成功，系统会在2个工作日内进行审核！`)
          })
          .catch(() => { this.releasing = false })
      }
    },
    success (message) {
      const self = this
      this.complete = true
      this.$dialog.confirm({
        message,
        cancelButtonText: '立即查看',
        confirmButtonText: '返回继续发布',
        beforeClose (action, done) {
          if (action === 'cancel') {
            // 立即查看
            this.$router.push({name: 'swap-mine-info-recycle'})
          } else {
          // 返回继续发布
            self.$router.go(-1)
          }
          done()
        }
      })
    },
    categoryConfirm (items) {
      const item = items[items.length - 1]
      this.form.categoryId = item.id
      this.categoryText = item.catName
    },
    cityConfirm (items) {
      const names = ['province', 'city', 'area']
      names.forEach((name, index) => {
        if (items[index].regionId) {
          const fieldName = `${name}Name`
          const fieldId = `${name}Id`
          this.form[fieldName] = items[index].regionName
          this.form[fieldId] = items[index].regionId
        }
      })
    }
  }
}
</script>

<style lang="postcss">
.Release {
  & .upload-title {
    margin-bottom: 5px;
  }
  & .van-field__control {
    line-height: inherit;
  }
  & .actions {
    height: 100px;
  }
}
</style>
