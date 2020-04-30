<template>
  <el-form-item label="商品规格">
    <span style="position:absolute;left:-78px;color: #f56c6c;">*</span>

    <template v-if="!look">
      <el-button
        size="small"
        plain
        type="primary"
        @click="addSpec()"
      >添加规格</el-button>
      <span>（请至少添加一个规格及规格项）</span>
      <el-card
        class="box-card"
        v-for="(card,cardIndex) in goodsSpecData"
        :key="cardIndex"
      >
        <div
          slot="header"
          class="clearfix"
        >
          <el-input
            style="width: 200px;"
            placeholder="输入规格"
            v-model="card.specsName"
          ></el-input>
          <el-button
            style=""
            type="text"
            @click="addSpecItem(card,cardIndex)"
          >添加规格项</el-button>
          <el-button
            style="color: red;"
            type="text"
            @click="removeSpec(card,cardIndex)"
          >删除</el-button>
        </div>
        <div
          v-for="(attr,attrIndex) in card.goodsSpecsAttrs"
          :key="attrIndex"
          class="text item"
        >
          <el-input
            style="width: 200px;"
            placeholder="输入规格项"
            v-model="attr.attrValue"
          ></el-input>
          <el-button
            style="color: red;"
            type="text"
            @click="removeSpecItem(card,attr,attrIndex)"
          >删除</el-button>
        </div>
      </el-card>
    </template>

    <el-table
      style="margin-bottom: 10px;"
      :data="goodsSpecTableData"
      border
    >
      <el-table-column
        align="center"
        :label="item.specsName"
        :prop="'attrValue'+index"
        :class="[item.specsName,'222','attrValue'+index]"
        v-for="(item,index) in goodsSpecData"
        :key="index"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="库存"
      >
        <template slot-scope="{ row }">
          <el-input
            placeholder="输入库存数量"
            @change="stockChange"
            v-model="row.stock"
            :disabled="look"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="价格"
      >
        <template slot-scope="{ row }">
          <el-input
            placeholder="输入价格"
            v-model.number="row.price"
            :disabled="look"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>

  </el-form-item>
</template>

<script>
export default {
  data() {
    return {
      goodsSpecData: [],
      goodsSpecTableData: []
    }
  },
  props: ['goodsSpec', 'goodsSpecTable', 'look'],
  watch: {
    goodsSpec: {
      handler(curVal, oldVal) {
        this.init()
      },
      deep: true
    },
    goodsSpecTableData: {
      handler(curVal, oldVal) {

      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (!this.goodsSpec || !this.goodsSpec) { return }
      this.goodsSpecData = this.goodsSpec
      var arrTemp = []
      this.goodsSpec.forEach((sub1, index1) => {
        sub1.goodsSpecsAttrs.forEach((sub2, index2) => {
          arrTemp.push(sub2)
        })
      })
      this.goodsSpecTableData = this.goodsSpecTable
      this.goodsSpecTableData.forEach((sub, index) => {
        var attrValue = sub.attrSymbolPath.split(',')
        attrValue.forEach((sub2, index2) => {
          arrTemp.forEach((sub3, index3) => {
            if (sub2 == sub3.symbol) {
              sub['attrValue' + index2] = sub3.attrValue
            }
          })
        })
      })
      // this.doExchange()
    },
    stockChange() {
      let subStock = 0
      this.goodsSpecTableData.forEach((sub, index) => {
        subStock += Number(sub.stock)
      })
      this.$emit('sendstock', subStock)
    },
    addSpec() {
      this.goodsSpecData.push({
        specsName: '',
        goodsSpecsAttrs: []
      })
    },
    addSpecItem(item) {
      item.goodsSpecsAttrs.push({
        attrValue: ''
      })
    },
    removeSpec(item, index) {
      this.goodsSpecData.splice(index, 1)
      this.stockChange()
    },
    removeSpecItem(cart, item, index) {
      cart.goodsSpecsAttrs.splice(index, 1)
    },
    doExchange() {
      this.goodsSpecData.forEach((sub, index) => {
        if (sub.goodsSpecsAttrs) {
          sub.goodsSpecsAttrs.forEach((sub2, index2) => {
            index = index < 10 ? '0' + index : index
            index2 = index2 < 10 ? '0' + index2 : index2
            sub2.symbol = Number(index + '' + index2)
          })
        }
      })

      /* 返回组合的数组*/
      function doExchange(arr) {
        var len = arr.length
        // 当数组大于等于2个的时候
        if (len >= 2) {
          // 第一个数组的长度
          var len1 = arr[0].length
          // 第二个数组的长度
          var len2 = arr[1].length
          // 2个数组产生的组合数
          var lenBoth = len1 * len2
          //  申明一个新数组

          var items = new Array(lenBoth)
          // 申明新数组的索引
          var index = 0

          for (var i = 0; i < len1; i++) {
            for (var j = 0; j < len2; j++) {
              if (arr[0][i] instanceof Array) {
                items[index] = arr[0][i].concat(arr[1][j])
              } else {
                items[index] = [arr[0][i]].concat(arr[1][j])
              }
              index++
            }
          }
          var newArr = new Array(len - 1)
          for (var i = 2; i < arr.length; i++) {
            newArr[i - 1] = arr[i]
          }
          newArr[0] = items
          return doExchange(newArr)
        } else {
          return arr[0]
        }
      }
      var arr = []
      this.goodsSpecData.forEach((sub, index) => {
        if (sub.goodsSpecsAttrs.length) {
          arr.push(sub.goodsSpecsAttrs)
        }
      })

      var arrTemp = doExchange(arr)
      var obj = []

      if (!arrTemp) {
        arrTemp = []
      }

      arrTemp.forEach((sub, index) => {
        var objTemp = {
          stock: '',
          price: ''
        }
        var attrSymbolPath = []
        if (sub instanceof Array) {
          sub.forEach((sub2, index2) => {
            objTemp['attrValue' + index2] = sub2.attrValue
            attrSymbolPath.push(sub2.symbol)
          })
          objTemp.attrSymbolPath = attrSymbolPath.join(',')
          obj.push(objTemp)
        } else {
          objTemp.attrValue0 = sub.attrValue
          attrSymbolPath.push(sub.symbol)
          objTemp.attrSymbolPath = attrSymbolPath.join(',')
          obj.push(objTemp)
        }
      })

      this.goodsSpecTableData.forEach((sub, index) => {
        obj.forEach((sub2, index2) => {
          debugger
          if (sub.attrSymbolPath.split(',').sort().join(',') == sub2.attrSymbolPath.split(',').sort().join(',')) {
            sub2.stock = sub.stock
            sub2.price = sub.price
          }
        })
      })

      this.$emit('exChange', this.goodsSpecData, obj)
      this.goodsSpecTableData = obj
    },
    saveSpec() {
      console.log('exChange', this.goodsSpecData, this.goodsSpecTableData)
    }
  }
}
</script>

<style>
</style>
