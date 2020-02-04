<template>
  <div class="code-image">
    <img v-if="code.src" :src="code.src" @click="refresh">
  </div>
</template>

<script>
import shortid from 'js-shortid'

function getCode () {
  const uuid = shortid.uuid()
  return {
    uuid,
    src: `/api/userCenter/verifyCode/getCode/${uuid}`
  }
}

export default {
  data () {
    return {
      code: {}
    }
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh () {
      this.code = getCode()
      this.$emit('refresh', this.code)
    }
  }
}
</script>

<style lang="postcss" scoped>
.code-image {
  width: 92px;
  height: 30px;
  background-color: var(--light-gray);
  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
