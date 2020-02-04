<template>
	<div>
	  <WorkDetail ref="detail" :showAudit="true" />
  </div>
</template>

<script>
import WorkDetail from '@/components/app/work/detail'
import { getObj } from '@/api/dm/works'

export default {
  async beforeRouteEnter(to, from, next) {
    const form = await getObj(to.query.id).then(data => data.data)
    next(vm => {
      setTimeout(() => {
        vm.$refs.detail.form = form
        vm.$refs.detail.form.caseInfo = form.caseInfo.replace(/pa95ui71l.bkt.clouddn/g, 'image.gacjc')
      }, 10)
    })
  },
  components: {
    WorkDetail
  }
}
</script>

