<template>
  <div class="app-filter row-between">
    <slot />
  </div>
</template>

<script>
export default {
  mounted () {
    this.$children.forEach(item => {
      item.callback = this.show
    })
  },
  methods: {
    show (name) {
      this.$children.forEach(item => {
        if (item.name !== name) {
          item.active = false
        }
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
:root {
  --height: 38px;
}
.app-filter {
	position: absolute;
	top: 0;
	width: 100%;
  height: var(--height);
  line-height: var(--height);
  background-color: white;
  z-index: 500;
}
</style>
