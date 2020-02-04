<template>
  <ErrorPage
    :error="{
      code: error.statusCode,
      message: error.statusCode === 404 ? '页面不存在' : error.statusCode
    }"
  />
</template>

<script>
import ErrorPage from '~/components/common/errorPage'

export default {
  props: ['error'],
  components: {
    ErrorPage
  }
}
</script>
