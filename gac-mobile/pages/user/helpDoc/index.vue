<template>
  <AppView
    class="help"
    title="帮助手册"
  >
    <div class="help-doc">
      <van-cell-group>
        <van-cell
          title="珠宝店（企业）认证申请"
          is-link
          @click="$router.push({ name: 'user-helpDoc-detail-jewelryCompany' })"
        >
        </van-cell>
        <van-cell
          title="珠宝店（个人）认证申请"
          is-link
          @click="$router.push({ name: 'user-helpDoc-detail-jewelry' })"
        >
        </van-cell>
        <van-cell
          title="设计师认证申请"
          is-link
          @click="$router.push({ name: 'user-helpDoc-detail-designer' })"
        >
        </van-cell>
        <van-cell
          title="制造间认证申请"
          is-link
          @click="$router.push({ name: 'user-helpDoc-detail-maker' })"
        >
        </van-cell>
        <!--<van-cell
          title="珠宝店（企业）认证申请"
          is-link
          @click="download(companySrc)"
        >
        </van-cell>
        <van-cell
          title="珠宝店（个人）认证申请"
          is-link
          @click="download(jewelrySrc)"
        >
        </van-cell>
        <van-cell
          title="设计师认证申请"
          is-link
          @click="download(designSrc)"
        >
        </van-cell>
        <van-cell
          title="制造间认证申请"
          is-link
          @click="download(makeSrc)"
        >
        </van-cell>-->
      </van-cell-group>
    </div>
  </AppView>
</template>

<style lang="postcss" scoped>
.help-doc {
  padding: 10px;
  & >>> .van-cell-group {
    border-radius: 6px;
    overflow: hidden;
  }
  & >>> .van-cell:not(:last-child)::after {
    left: 0;
  }
  & >>> .van-cell {
    padding: 18px 12px;
    font-size: 17px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      jewelrySrc: 'http://app.gacjc.com/app/download/help/jewelrySettledStandards.docx',
      designSrc: 'http://app.gacjc.com/app/download/help/designerSettledStandards.docx',
      makeSrc: 'http://app.gacjc.com/app/download/help/makerSettledStandards.docx',
      companySrc: 'http://app.gacjc.com/app/download/help/jewelryCompanySettledStandards.docx',
    }
  },
  methods: {
    download(src) {
      let form = document.createElement('form')
      form.action = src
      document.getElementsByTagName('body')[0].appendChild(form)
      form.submit()
    }
  }
}

</script>