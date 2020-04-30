<template>
  <chain-data-detail :result="result" />
</template>

<script>
import { getNewContractTxDetail } from '@/api/browser'
import chainDataDetail from '../components/chainDataDetail'

export default {
  components: {
    chainDataDetail
  },
  data() {
    return {
      listParams: {
        id: ''
      },
      result: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.listParams.id = this.$route.query.id
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      getNewContractTxDetail(this.listParams).then(data => {
        this.result = JSON.parse(data.data.data)
        this.result.hash = data.data.hash
        this.result.blockNumber = data.data.blockNumber
      })
      // this.result = {
      //   "supplierName": "线下供应商",
      //   "supplierAddress": "河北省秦皇岛市山海关区号",
      //   "item": {
      //     "id": "20200420981252208892079767553",
      //     "orderId": "20200420881252208892079767552",
      //     "goodsId": "5910c1571a06468f814bac078a612456",
      //     "attrSku": "{\"goodsSpecData\":[{\"attrKey\":\"重量\",\"goodsSpecsAttrs\":[{\"attrValue\":\"24K\",\"symbol\":0},{\"attrValue\":\"12K\",\"symbol\":1}]}],\"attrValue0\":\"12K\",\"attrSymbolPath\":\"1\"}",
      //     "goodsName": "同心结",
      //     "picPath": "group1/M00/04/0D/wKgI1F6dSVqAL1OXAAEQfXTwUwA271.jpg",
      //     "price": 1.00,
      //     "sourceCode": "SYM200420192027000001",
      //     "twoDimensionalUrl": "https://cloud.hsz88.com.cn/group1/M00/04/21/wKgI1F6dhX-APWtGAAF5z02blLs995.png",
      //     "brandId": "554bf86b9db143ae91e5fc498b71ed49",
      //     "code": "625016764834808",
      //     "brandName": "有机",
      //     "reserve": ""
      //   },
      //   "wareHouse": {
      //     "warehouseName": "西丽义仓",
      //     "sort": 0,
      //     "address": "天津市天津市河西区******号",
      //     "contacts": "水电费",
      //     "iphone": "17655555555",
      //     "platformCode": "cloud"
      //   },
      //   "retailerName": "粉黛眉",
      //   "retailerAddress": "河北省唐山市路北区费",
      //   "dealer": {
      //     "dealerName": "史蒂夫",
      //     "sort": 12235,
      //     "contacts": "是大法官",
      //     "iphone": "18211111111",
      //     "address": "河北省唐山市路南区66",
      //     "validTime": "2020-03-30至2020-04-06",
      //     "certificatePath": ""
      //   },
      //   "brandCompanyAddress": "海南省省直辖县级行政单位屯昌县66号",
      //   "brandCompany": "有机蔬菜商",
      //   "supplierId": "5af4a421fe2440dea969069a00ee1e6c",
      //   "orderInfo": {
      //     "id": "20200420881252208892079767552",
      //     "userId": "2aef7db0badf4505b6652adf1ae1dbac",
      //     "receiveId": "f7ad881dc715432f97e739f4dbccd873",
      //     "logisticsId": "76fac290c4a248179384a26f9378bb1d",
      //     "dealerId": "79a76dfc241147d4aa7e2a150d7437d6",
      //     "warehouseId": "1f0c666c3a4843698b9de3c95538094e",
      //     "orderTime": 1587384839000,
      //     "payTime": 1587384989000,
      //     "payType": "1",
      //     "orderStatus": "5",
      //     "sourceType": "1",
      //     "orderMoney": "2.00",
      //     "buyerMessage": "",
      //     "orderReceive": {
      //       "receiveId": "f7ad881dc715432f97e739f4dbccd873",
      //       "receiver": "狗哥",
      //       "receiverMobile": "15811111111",
      //       "province": "广西壮族自治区",
      //       "city": "贺州市",
      //       "town": "昭平县",
      //       "receiverAddress": "66号",
      //       "platformCode": "cloud"
      //     },
      //     "orderDealer": {
      //       "dealerName": "史蒂夫",
      //       "sort": 12235,
      //       "contacts": "是大法官",
      //       "iphone": "18211111111",
      //       "address": "河北省唐山市路南区66",
      //       "validTime": "2020-03-30至2020-04-06",
      //       "certificatePath": ""
      //     },
      //     "orderWarehouse": {
      //       "warehouseName": "西丽义仓",
      //       "sort": 0,
      //       "address": "天津市天津市河西区******号",
      //       "contacts": "水电费",
      //       "iphone": "17655555555",
      //       "platformCode": "cloud"
      //     },
      //     "logistics": {
      //       "logisticsNo": "123213",
      //       "logisticsCompany": "百世快递",
      //       "logisticsCompanyType": "huitongkuaidi",
      //       "sendTime": 1587385401000,
      //       "sendRemark": "754"
      //     },
      //     "items": [{
      //       "orderId": "20200420881252208892079767552",
      //       "goodsName": "同心结",
      //       "picPath": "group1/M00/04/0D/wKgI1F6dSVqAL1OXAAEQfXTwUwA271.jpg",
      //       "orderForm": "0",
      //       "number": 1,
      //       "price": 1.00,
      //       "money": 1.00,
      //       "attrSku": "{\"goodsSpecData\":[{\"attrKey\":\"重量\",\"goodsSpecsAttrs\":[{\"attrValue\":\"24K\",\"symbol\":0},{\"attrValue\":\"12K\",\"symbol\":1}]}],\"attrValue0\":\"12K\",\"attrSymbolPath\":\"1\"}",
      //       "seller": "5af4a421fe2440dea969069a00ee1e6c",
      //       "saleAfterState": "0",
      //       "sourceStatus": "0",
      //       "sourceCode": "SYM200420192027000001",
      //       "twoDimensionalUrl": "https://cloud.hsz88.com.cn/group1/M00/04/21/wKgI1F6dhX-APWtGAAF5z02blLs995.png",
      //       "goodsId": "5910c1571a06468f814bac078a612456",
      //       "brandCompany": "有机蔬菜商"
      //     }, {
      //       "orderId": "20200420881252208892079767552",
      //       "goodsName": "同心结",
      //       "picPath": "group1/M00/04/0D/wKgI1F6dSVqAL1OXAAEQfXTwUwA271.jpg",
      //       "orderForm": "0",
      //       "number": 1,
      //       "price": 1.00,
      //       "money": 1.00,
      //       "attrSku": "{\"goodsSpecData\":[{\"attrKey\":\"重量\",\"goodsSpecsAttrs\":[{\"attrValue\":\"24K\",\"symbol\":0},{\"attrValue\":\"12K\",\"symbol\":1}]}],\"attrValue0\":\"24K\",\"attrSymbolPath\":\"0\"}",
      //       "seller": "5af4a421fe2440dea969069a00ee1e6c",
      //       "saleAfterState": "0",
      //       "sourceStatus": "0",
      //       "sourceCode": "SYM200420192027000002",
      //       "twoDimensionalUrl": "https://cloud.hsz88.com.cn/group1/M00/04/21/wKgI1F6dhX-AG5saAAF51Q4ZPL8470.png",
      //       "goodsId": "5910c1571a06468f814bac078a612456",
      //       "brandCompany": "有机蔬菜商"
      //     }],
      //     "buyerAccount": "17611111111",
      //     "buyerName": "刘大拿"
      //   },
      //   "userMap": {
      //     "exclusive": {
      //       "name": "ssss",
      //       "iphone": "15626266323"
      //     },
      //     "operational": null
      //   }
      // }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
