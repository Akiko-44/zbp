<template>
  <el-form-item label="商品规格">
    <span style="position:absolute;left:-78px;color: #f56c6c;">*</span>

    <el-table
      style="margin-bottom: 10px;"
      :data="goodsSpecTableData"
      border
    >
      <el-table-column
        align="center"
        :label="item.specsName"
        :prop="'attrValue' + index"
        :class="[item.specsName, '222', 'attrValue' + index]"
        v-for="(item, index) in goodsSpecData"
        :key="index"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="总库存"
      >
        <template slot-scope="{ row }">
          <span>{{ row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="活动库存"
      >
        <template slot-scope="{ row, $index }">
          <el-input-number
            placeholder="输入活动库存数量"
            v-model="row.activityStock"
            @change="vaidateStock(row, $index)"
            :controls="false"
            :precision="0"
            :min="0"
            :max="row.stock"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="原价"
      >
        <template slot-scope="{ row }">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="活动价"
        v-if="type !== 2"
      >
        <template slot-scope="{ row, $index }">
          <!-- <el-input-number
            placeholder="输入活动价格"
            v-model="row.groupPrice"
            @change="vaidatePrice(row, $index)"
            :precision="2"
            :controls="false"
            :min="0"
          ></el-input-number> -->
          <el-input
            placeholder="输入活动价格"
            v-model="row.groupPrice"
            @change="vaidatePrice(row, $index)"
            :min="0"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="折扣"
        v-if="type !== 2"
      >
        <template slot-scope="{ row }">
          <span>{{
            (row.groupPrice / row.price).toFixed(1) * 10 < 0.1
              ? 0.1
              : (row.groupPrice / row.price).toFixed(1) * 10
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="促销活动价"
        v-if="type === 2"
      >
        <template slot-scope="{ row, $index }">
          <el-input-number
            placeholder="输入活动价格"
            v-model="row.promotionPrice"
            @change="vaidatePrice(row, $index)"
            :precision="2"
            :controls="false"
            :min="0"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="折扣"
        v-if="type === 2"
      >
        <template slot-scope="{ row }">
          <span>{{
            (row.promotionPrice / row.price).toFixed(1) * 10 < 0.1
              ? 0.1
              : (row.promotionPrice / row.price).toFixed(1) * 10
          }}</span>
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
  props: ['type', 'goodsSpec', 'goodsSpecTable', 'look'],
  watch: {
    goodsSpec: {
      handler(curVal, oldVal) {
        this.init()
      },
      deep: true
    },
    goodsSpecTableData: {
      handler(curVal, oldVal) {
        console.log(curVal)
      },
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (!this.goodsSpec || !this.goodsSpec) {
        return
      }
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
    vaidateStock(val, i) {
      this.$nextTick(() => {
        this.goodsSpecTableData[i].activityStock = parseInt(val.activityStock)
      })
    },
    vaidatePrice(val, i) {
      this.$nextTick(() => {
        /* this.goodsSpecTableData[i].groupPrice = Number(
          val.groupPrice.toFixed(2)
        )
        this.goodsSpecTableData[i].promotionPrice = Number(
          val.promotionPrice.toFixed(2)
        ) */
        this.goodsSpecTableData[i].groupPrice = this.NumberCheck(val.groupPrice)
        this.goodsSpecTableData[i].promotionPrice = this.NumberCheck(val.promotionPrice)
      })
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
          price: '',
          activityStock: '',
          groupPrice: '',
          promotionPrice: ''
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
          if (
            sub.attrSymbolPath
              .split(',')
              .sort()
              .join(',') ==
            sub2.attrSymbolPath
              .split(',')
              .sort()
              .join(',')
          ) {
            sub2.stock = sub.stock
            sub2.activityStock = sub.activityStock
            sub2.price = sub.price
            sub2.groupPrice = sub.groupPrice
            sub2.promotionPrice = sub.promotionPrice
          }
        })
      })

      this.$emit('exChange', this.goodsSpecData, obj)
      this.goodsSpecTableData = obj
    },
    saveSpec() {
      console.log('exChange', this.goodsSpecData, this.goodsSpecTableData)
    },
    NumberCheck(num) {
      num = num.replace(/^[\.]/, '').replace(/[^\d.]/g, '')
      const str = Number(num.replace(/(.*)\.([\d]{2})(\d*)/g, '$1.$2')).toFixed(2)
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input-number--medium {
  width: 100%;
}
</style>
