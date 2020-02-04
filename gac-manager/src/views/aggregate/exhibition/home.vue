<template>
  <div>
    <div class="block">
      <h4>展示大图</h4>
      <el-table
        :data="data1"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(1,'VR')"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="block">
      <h4>主题墙</h4>
      <el-table
        :data="data2"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(2)"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="block">
      <h4>珠宝展</h4>
      <el-table
        :data="data3"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(3)"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="block">
      <h4>珠宝大市场</h4>
      <el-table
        :data="data4"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(4,'VR')"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="block">
      <h4>珠宝博物馆 </h4>
      <el-table
        :data="data5"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(5,'VR')"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
    <div class="block">
      <h4>珠宝小镇</h4>
      <el-table
        :data="data6"
        size="medium"
      >
        <el-table-column
          prop="orderBy"
          label="排序"
          width="400"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="ID"
          width="400"
          align='center'
        >
          <template slot-scope="{ row }">
            <el-input
              placeholder="name"
              v-model="row.name"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-row width='200px'>
          <el-button
            type="primary"
            @click="save(6,'VR')"
            class="btnMargin"
            size="width:150px;"
          >保存</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getHomePage,
  setHomePage,
  getHomePageHR,
  setHomePageHR
} from '@/api/aggregate/exhibition'
export default {
  data() {
    return {
      openUpdata: false,
      activeName: [],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      bannerUrl: null,
      pcUrl: null,
      phonePath: [],
      banner: [],
      changeUpdata: false,
      setId: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getHomePageHR({
        classIFY: 1,
        num: 1
      }).then(res => {
        const data = []
        for (let i = 1; i < 2; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data1 = data
      })
      getHomePage({
        classIFY: 2,
        num: 6
      }).then(res => {
        const data = []
        for (let i = 1; i < 7; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data2 = data
      })
      getHomePage({
        classIFY: 3,
        num: 3
      }).then(res => {
        const data = []
        for (let i = 1; i < 4; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data3 = data
      })
      getHomePageHR({
        classIFY: 4,
        num: 6
      }).then(res => {
        const data = []
        for (let i = 1; i < 7; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data4 = data
      })
      getHomePageHR({
        classIFY: 5,
        num: 6
      }).then(res => {
        const data = []
        for (let i = 1; i < 7; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data5 = data
      })
      getHomePageHR({
        classIFY: 6,
        num: 6
      }).then(res => {
        const data = []
        for (let i = 1; i < 7; i++) {
          data.push({
            orderBy: i,
            name: res.data[i - 1] ? res.data[i - 1].id : null
          })
        }
        this.data6 = data
      })
    },
    save(id, hr) {
      let num = ''
      const datas = [this.data1, this.data2, this.data3, this.data4, this.data5, this.data6]
      const data = []
      const aaa = id - 1
      datas[aaa].map(item => {
        const ies = `${item.orderBy},${item.name}`
        data.push(ies)
      })
      num = data.join(';')
      const xuJ = {
        ids: num,
        classIFY: id
      }
      if (!xuJ.ids) {
        this.$message({
          message: '内容不可为空',
          type: 'warning'
        })
        return
      }
      if (hr == 'VR') {
        setHomePageHR(xuJ).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '发送成功'
            })
          }
        })
      } else {
        setHomePage(xuJ).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '发送成功'
            })
          }
        })
      }

      // console.log(this.tableData)
    }

  }
}
</script>
<style scoped>
.block {
  margin: 20px;
  width: 800px;
  overflow: hidden;
}

.posit {
  position: absolute;
  right: 5px;
  bottom: 5px;
  font-size: 14px;
  cursor: auto !important;
  color: #1890ff;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>