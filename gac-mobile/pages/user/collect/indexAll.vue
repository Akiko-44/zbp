<template>
  <AppView
    title="收藏"
    class="Info"
    :clickLeft="clickLeft"
  >

    <van-tabs
      v-model="activeName"
      @click="changeTab"
    >
      <van-tab
        title="商品"
        name="goods"
      >

        <div v-if="showList && hasLoad && goodsList.length">
          <p class="edit-box">
            <span>你收藏了 <span class="red">{{ total }}</span> 件商品</span>
            <span
              class="fr edit-btn"
              @click="edit(goodsList)"
            >{{
          active ? "完成" : "编辑"
        }}</span>
          </p>
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
            :class="active ? 'active-list-box' : ''"
          >
            <div
              class="collect-block-item vertical"
              v-for="(goods, i) in goodsList"
              :key="i"
            >
              <van-checkbox
                v-show="active"
                class="checkbox"
                @click.native="goodsItemClick(goods.checked, i, goodsList)"
                v-model="goods.checked"
              ></van-checkbox>
              <AppCard
                :class="active ? 'edit-card-item' : ''"
                :data="{
                  collectSource: goods.collectSource,
	                imgUrl: goods.thumbUrl,
	                title: goods.goodsName,
	                price: '￥' + (goods.goodsPrice)
	              }"
                @click.native="toDetail(goods.goodsId, goods.collectSource)"
              />
            </div>
          </div>
          <div
            class="height-span"
            v-if="active"
          >
            <div class="cart-footer van-hairline--top row-between vertical">
              <div class="select-all item-center">
                <van-checkbox
                  class="checkbox"
                  v-model="allChecked"
                  @click.native="checkAll(goodsList)"
                ></van-checkbox>
                <span class="select-all-text">全选（{{ total }}条）</span>
              </div>
              <div class="clearing item-center">
                <van-button
                  @click="remove"
                  class="primary-btn"
                  type="primary"
                >
                  删除
                </van-button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="no-content"
          v-if="!showList && hasLoad"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有收藏的商品</p>
        </div>

        <!-- <div
          class="tab-content"
          ref="collectItem"
        >
          <div
            class="collect-block-item vertical"
            v-for="(goods, i) in goodsList"
            :key="i"
            v-if="goodsList && goodsList.length"
          >
            <van-checkbox
              class="checkbox"
              v-model="goods.checked"
            ></van-checkbox>
            <AppCard
              :data="{
                  collectSource: goods.collectSource,
	                imgUrl: goods.thumbUrl,
	                title: goods.goodsName,
	                price: '￥' + (goods.goodsPrice)
	              }"
              @click.native="toDetail(goods.goodsId, goods.collectSource)"
            />
          </div>

          <div
            class="footer"
            v-if="goodsList && goodsList.length > 0"
          >
            <div class="collect-footer">
              <van-button
                @click="remove(goodsList)"
                class="primary-btn"
                type="primary"
              >
                删除
              </van-button>
            </div>
          </div>
        </div> -->
      </van-tab>
      <van-tab
        title="珠宝圈"
        name="jewelryCircle"
      >
        <div v-if="showList && hasLoad && circleGoodsList.length">
          <p class="edit-box">
            <span>你收藏了 <span class="red">{{ circleTotal }}</span> 条珠宝圈内容</span>
            <span
              class="fr edit-btn"
              @click="edit(circleGoodsList)"
            >{{
          active ? "完成" : "编辑"
        }}</span>
          </p>
          <div
            class="list-box"
            ref="listBox"
            id="listBox"
            :class="active ? 'active-list-box' : ''"
          >
            <div
              class="collect-block-item vertical"
              v-for="(goods, i) in circleGoodsList"
              :key="i"
            >
              <van-checkbox
                v-show="active"
                class="checkbox"
                @click.native="goodsItemClick(goods.checked, i, circleGoodsList)"
                v-model="goods.checked"
              ></van-checkbox>
              <CircleCard
                :class="active ? 'edit-card-item' : ''"
                :data="{
              imgUrl: goods.thumbnail,
              title: goods.title,
              brief: goods.brief,
              columnName: goods.columnName,
              likeNumber: goods.likeNumber
            }"
                @click.native="toCircleDetail(goods.type, goods.id)"
              />
            </div>
          </div>
          <div
            class="height-span"
            v-if="active"
          >
            <div class="cart-footer van-hairline--top row-between vertical">
              <div class="select-all item-center">
                <van-checkbox
                  class="checkbox"
                  v-model="allChecked"
                  @click.native="checkAll(circleGoodsList)"
                ></van-checkbox>
                <span class="select-all-text">全选（{{ circleTotal }}条）</span>
              </div>
              <div class="clearing item-center">
                <van-button
                  @click="removeCircle"
                  class="primary-btn"
                  type="primary"
                >
                  删除
                </van-button>
              </div>
            </div>
          </div>
        </div>

        <div
          class="no-content"
          v-if="showList && hasLoad && !circleGoodsList.length"
        >
          <img
            src="../../../assets/images/no-content.png"
            alt=""
          />
          <p>您还没有收藏的珠宝圈内容</p>
          <p>快去<span class="red">珠宝圈</span>逛逛吧</p>
          <van-button
            type="danger"
            class="link-jewelry-circle"
            @click.native="linkJewelryCircle"
          >去逛逛吧</van-button>
        </div>
      </van-tab>
    </van-tabs>

  </AppView>
</template>

<script>
import { tabsList } from '~/utils/mixins'
import AppCard from './item'
import CircleCard from './item/circle'
import AppList from "~/components/common/list";

export default {
  data() {
    return {
      dataLoading: true,
      activeName: 'goods',
      active: false,
      showList: false,
      postData: {
        offset: 1,
        limit: 50
      },
      query: {
        offset: 1,
        limit: 50
      },
      goodsList: [],
      circleGoodsList: [],
      total: 0,
      circleTotal: 0,
      allChecked: false,
      hasLoad: false
    }
  },
  components: {
    AppList,
    AppCard,
    CircleCard
  },
  mixins: [tabsList],
  activated() {
    this.getList()
    this.getCircleList()
    if (this.$native.isApp()) {
      this.$native.getTitle("收藏")
    }
  },
  deactivated() {
    this.$destroy()
  },
  head() {
    return {
      title: '收藏'
    }
  },
  methods: {
    getList() {
      this.dataLoading = true
      this.$loading(this.$service('userCollectList', {
        resources: [1]
      })).then(result => {
        this.dataLoading = false
        this.hasLoad = true;
        if (result.data.length) {
          this.showList = true;
          this.goodsList = result.data
          this.total = result.data.length
          console.log(this.total)
          this.goodsList.forEach(goods => {
            goods.checked = false
          });
        } else {
          this.showList = false
        }
      }).catch(() => {
        this.dataLoading = false
      })
    },
    getCircleList() {
      this.dataLoading = true
      this.$loading(this.$service('circleCollectList', { data: this.query })).then(result => {
        this.dataLoading = false
        this.hasLoad = true;
        if (result.data.total) {
          this.showList = true
          this.circleGoodsList = result.data.records
          this.circleTotal = result.data.total
          this.circleGoodsList.forEach(goods => {
            goods.checked = false
          })
        } else {
          this.showList = false
        }
      }).catch(() => {
        this.dataLoading = false
      })
    },
    changeTab() {
      this.active = false
      this.allChecked = false
    },
    clickLeft() {
      if (this.$native.isApp()) {
        this.$native.goToHome()
      } else {
        this.$router.go(-1)
      }
    },
    toDetail(goodsId, source) {
      let name = ''
      if (source == 1) {
        name = 'jewelry-work'
      } else if (source == 5) {
        name = 'design-work'
      } else if (source == 6) {
        name = 'maker-work'
      }
      this.$router.push({ name: name, query: { id: goodsId } })
    },
    async remove(list) {
      let newGoodsList = []
      let removeGoodsList = list.filter(item => {
        if (item.checked) {
          return true
        } else {
          newGoodsList.push(item)
        }
      })
      this.goodsList = newGoodsList
      let checked = []
      let source = ''
      if (removeGoodsList.length == 0) {
        this.$toast('请至少选择一项')
      } else {
        removeGoodsList.forEach(item => {
          checked.push(item.goodsId)
          source = item.collectSource
        })

        await this.$loading(this.$service('userDeleteCollect', {
          resources: [checked.join(','), source]
        }), '').then(result => {
          this.$toast('取消收藏成功')
        })
      }
    },
    goodsItemClick(value, index, list) {
      list[index].checked = !value;
      let flag = true
      list.map((item, i) => {
        if (item.checked === false) {
          flag = false
        }
      })
      if (flag) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
      this.$forceUpdate();
    },
    checkAll(list) {
      this.allChecked = !this.allChecked
      list.forEach(goods => {
        goods.checked = this.allChecked
      })
      this.$forceUpdate()
    },
    edit(list) {
      this.active = !this.active;
      list.forEach(goods => {
        goods.checked = false;
      });
    },
    linkJewelryCircle() {
      if (this.$native.isApp()) {
        this.$native.goToJewelryCircle();
      } else {
        this.$router.push({ name: "news-jewelryCircle" });
      }
    },
    toCircleDetail(type, id) {
      if (type === 1) {
        this.$router.push({
          name: "news-jewelryCircle-detail",
          query: { id: id }
        });
      } else {
        if (this.$native.isApp()) {
          this.$native.goToJewelryVideo(id);
        } else {
          this.$router.push({
            name: "news-jewelryCircle-videoDetail",
            query: { id: id }
          });
        }
      }
    },
    removeCircle() {
      let removeGoodsList = this.circleGoodsList.filter(item => item.checked);
      let checked = [];
      if (removeGoodsList.length == 0) {
        this.$toast("请至少选择一项");
      } else {
        removeGoodsList.forEach(item => {
          checked.push(item.id);
        });
        this.$service("userDeleteLike", {
          data: { ids: checked.join(",") }
        }).then(result => {
          this.$toast("取消点赞成功");
          this.getList();
        });
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.no-content {
  padding-top: 70px;
  text-align: center;
  font-size: 15px;
  color: #999;
  & img {
    width: 330px;
  }
  & p {
    margin-bottom: 15px;
  }
  & .link-jewelry-circle {
    width: 110px;
    height: 44px;
    background: #df735a;
    border-color: #df735a;
  }
}
.edit-box {
  position: fixed;
  margin: 10px;
  box-sizing: border-box;
  width: calc(100% - 20px);
  padding: 0 20px;
  line-height: 45px;
  color: #333;
  font-size: 14px;
  z-index: 9;
  background: #fff;
  border-radius: 5px;
  & .edit-btn {
    color: #2d68c2;
  }
}
.list-box {
  padding-top: 55px;
}
.list-box.active-list-box {
  padding-bottom: 44px;
}
.collect-block-item {
  background: white;
  position: relative;
  margin: 10px;
  border-radius: 5px;
  overflow: hidden;
  & .animate {
    position: relative;
    transition: transform 0.3s;
    transform: translate3d(0, 0, 0);
    z-index: 2;
    &.active {
      transform: translate3d(-60px, 0, 0);
    }
  }
  & .checkbox {
    margin-left: 10px;
    margin-right: 10px;
    width: 20px;
  }
  & .app-card-item {
    /* flex: 1; */
    width: 355px;
    &.edit-card-item {
      width: 324px;
      padding-left: 0;
    }
  }
}
.cart-footer {
  padding-left: 10px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  & .select-all-text {
    display: inline-block;
    margin-left: 10px;
  }
}
.primary-btn {
  width: 100px;
  background: #fb746e;
  border-color: #fb746e;
  border-radius: 0;
}
>>> .van-tabs__nav {
  background: #f2f2f2;
}
>>> .van-tabs__content {
  overflow: hidden;
}
</style>
