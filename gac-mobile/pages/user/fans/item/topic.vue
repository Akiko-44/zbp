<template>
  <div class="app-card-item">
    <div class="card-main flex-row">
      <div class="card-info">
        <div class="card-name text-hidden">
          # {{ data.topicName }}
        </div>
        <div class="bottom">
          <p class="card-number">
            <span>{{joinNum}}人参与</span>
          </p>
        </div>
        <van-button
          class="btn collect-btn"
          color="#999999"
          v-if="isConcern"
          @click.native.stop="concern(0)"
          plain
        >已关注</van-button>
        <van-button
          class="btn collect-btn"
          color="#DF735A"
          v-if="!isConcern"
          @click.native.stop="concern(1)"
        >关注</van-button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { setImg } from "~/utils/qiniu";

export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isConcern: true,
      joinNum: undefined
    }
  },
  created() {
    this.topicName = this.data.topicName
    this.joinNum = this.data.joinNum
  },
  methods: {
    setImg,
    concern(type) {
      this.$service("topicDeleteConcern", {
        resources: [this.data.id, type]
      }).then(result => {
        this.isConcern = !this.isConcern
        this.$emit('collectTopicSuccess', this.isConcern)
      })
    }
  }
};
</script>

<style lang="postcss" scoped>
.app-card-item {
  padding: 13px 15px;
  font-size: 14px;
  color: var(--black);
  background-color: white;
  line-height: 18px;
  & .card-name {
    margin-bottom: 7px;
    width: 100%;
  }
  & .card-number {
    font-size: 12px;
    color: #aaaaac;
    & span {
      margin-right: 20px;
    }
  }
  & .new {
    color: #df735a;
    font-size: 10px;
  }
  & .btn {
    position: absolute;
    right: 10px;
    top: 26px;
    padding: 0;
    width: 47px;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    border-radius: 3px;
  }
}
</style>
