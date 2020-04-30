<template>
  <div class="app-container">
    <div class="content-container">
      <div
        v-if="result.hash || result.blockNumber"
        class="result-box"
      >
        <p>
          <span class="result-label">交易hash</span>
          <span
            class="result-value blue-link"
            @click="$router.push({name: 'transactionHash',query: { hash: result.hash }})"
          >{{ result.hash }}</span>
        </p>
        <p>
          <span class="result-label">区块号</span>
          <span
            class="result-value blue-link"
            @click="
              $router.push({
                name: 'blockHeight',
                query: { blockNumber: result.blockNumber }
              })
            "
          >{{ result.blockNumber }}</span>
        </p>
      </div>
      <!-- 中宝平订单信息 -->
      <template v-if="result.item && !result.item.sourceCode">
        <div class="result-box-container">
          <h4>商家信息</h4>
          <el-row class="result-box-container-body">
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">商家名称</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">联系电话</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">详细地址</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="result-box-container">
          <h4>订单信息</h4>
          <el-row class="result-box-container-body">
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">订单编号</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">订单状态</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">创建时间</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">商品名称</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">商品图片</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">SKU</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">商品价格</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">购买数量</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">订单金额</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="result-box-container">
          <h4>收货信息</h4>
          <el-row class="result-box-container-body">
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">收货人</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">收货人联系电话</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">收货地址</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">物流公司</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">物流单号</div>
                <div class="result-value">设计室</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="d-flex">
                <div class="result-label">物流详情</div>
                <div class="result-value blue-link">查看详情</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </template>
      <!-- 好实再订单信息 -->
      <template v-if="result.item && result.item.sourceCode">
        <!-- 生产商 -->
        <div
          v-if="result.producer"
          class="result-box-container"
        >
          <h4>生产商</h4>
          <el-row class="result-box-container-body">
            <el-col
              v-if="result.producer.producerName"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">生产商名称</div>
                <div class="result-value">{{ result.producer.producerName }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.contacts"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">联系人</div>
                <div class="result-value">{{ result.producer.contacts }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.iphone"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">手机号码</div>
                <div class="result-value">{{ result.producer.iphone }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.licence"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">营业执照</div>
                <div
                  class="result-value blue-link"
                  @click="showBigImg(getPicPath(result.producer.licence))"
                >
                  <img
                    :src="getPicPath(result.producer.licence)[0]"
                    alt="营业执照"
                    height="40"
                  >
                </div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.agentLicence"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">法人授权证书</div>
                <!-- <div
                  v-if="result.producer.agentLicence"
                  class="result-value blue-link"
                  @click="showBigImg(result.producer.agentLicence)"
                >查看大图</div> -->
                <div
                  class="result-value blue-link"
                  @click="showBigImg(getPicPath(result.producer.agentLicence))"
                >
                  <img
                    :src="getPicPath(result.producer.agentLicence)[0]"
                    alt="法人授权证书"
                    height="40"
                  >
                </div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.certificate"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">开户许可证</div>
                <!-- <div
                  class="result-value blue-link"
                  @click="showBigImg(result.producer.certificate)"
                >查看大图</div> -->
                <div
                  class="result-value blue-link"
                  @click="showBigImg(getPicPath(result.producer.certificate))"
                >
                  <img
                    :src="getPicPath(result.producer.certificate)[0]"
                    alt="开户许可证"
                    height="40"
                  >
                </div>
              </div>
            </el-col>
            <el-col
              v-if="result.producer.registrationNumber"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">统一社会信用代码</div>
                <div class="result-value">{{ result.producer.registrationNumber }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div
          v-if="result.supplierName || result.userMap"
          class="result-box-container"
        >
          <h4>供应商</h4>
          <el-row class="result-box-container-body">
            <el-col
              v-if="result.supplierName"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">供应商名称</div>
                <div class="result-value">{{ result.supplierName }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.supplierAddress"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">供应商地址</div>
                <div class="result-value">{{ result.supplierAddress }}</div>
              </div>
            </el-col>
            <template v-if="result.userMap && result.userMap.exclusive">
              <el-col
                v-if="result.userMap.exclusive.name"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">供应商客服姓名</div>
                  <div class="result-value">{{ result.userMap.exclusive.name }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.userMap.exclusive.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">供应商客服联系电话</div>
                  <div class="result-value">{{ result.userMap.exclusive.iphone }}</div>
                </div>
              </el-col>
            </template>
            <template v-if="result.userMap && result.userMap.operational">
              <el-col
                v-if="result.userMap.operational.name"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">官方服务客服姓名</div>
                  <div class="result-value">{{ result.userMap.operational.name }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.userMap.operational.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">官方服务客服联系电话</div>
                  <div class="result-value">{{ result.userMap.operational.iphone }}</div>
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
        <!-- 仓库 -->
        <template v-if="result.orderInfo && result.orderInfo.orderWarehouse">
          <div class="result-box-container">
            <h4>仓库</h4>
            <el-row class="result-box-container-body">
              <el-col
                v-if="result.orderInfo.orderWarehouse.warehouseName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">仓库名称</div>
                  <div class="result-value">{{ result.orderInfo.orderWarehouse.warehouseName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderWarehouse.address"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">仓库地址</div>
                  <div class="result-value">{{ result.orderInfo.orderWarehouse.address }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderWarehouse.contacts"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">联系人</div>
                  <div class="result-value">{{ result.orderInfo.orderWarehouse.contacts }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderWarehouse.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">手机号码</div>
                  <div class="result-value">{{ result.orderInfo.orderWarehouse.iphone }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else-if="result.wareHouse">
          <div class="result-box-container">
            <h4>仓库</h4>
            <el-row class="result-box-container-body">
              <el-col
                v-if="result.wareHouse.warehouseName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">仓库名称</div>
                  <div class="result-value">{{ result.wareHouse.warehouseName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.wareHouse.address"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">仓库地址</div>
                  <div class="result-value">{{ result.wareHouse.address }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.wareHouse.contacts"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">联系人</div>
                  <div class="result-value">{{ result.wareHouse.contacts }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.wareHouse.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">手机号码</div>
                  <div class="result-value">{{ result.wareHouse.iphone }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <!-- 经销商 -->
        <template v-if="result.orderInfo && result.orderInfo.orderDealer">
          <div class="result-box-container">
            <h4>经销商</h4>
            <el-row class="result-box-container-body">
              <el-col
                v-if="result.orderInfo.orderDealer.dealerName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">经销商名称</div>
                  <div class="result-value">{{ result.orderInfo.orderDealer.dealerName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderDealer.contacts"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">联系人</div>
                  <div class="result-value">{{ result.orderInfo.orderDealer.contacts }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderDealer.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">手机号码</div>
                  <div class="result-value">{{ result.orderInfo.orderDealer.iphone }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderDealer.address"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">详细地址</div>
                  <div class="result-value">{{ result.orderInfo.orderDealer.address }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderDealer.certificatePath"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">证书</div>
                  <!-- <div
                    class="result-value blue-link"
                    @click="showBigImg(result.orderInfo.orderDealer.certificatePath)"
                  >查看大图</div> -->
                  <div
                    class="result-value blue-link"
                    @click="showBigImg(getPicPath(result.orderInfo.orderDealer.certificatePath))"
                  >
                    <img
                      :src="getPicPath(result.orderInfo.orderDealer.certificatePath)[0]"
                      alt="证书"
                      height="40"
                    >
                  </div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.orderDealer.validTime"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">证书有效期</div>
                  <div class="result-value">{{ result.orderInfo.orderDealer.validTime }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else-if="result.dealer">
          <div class="result-box-container">
            <h4>经销商</h4>
            <el-row class="result-box-container-body">
              <el-col
                v-if="result.dealer.dealerName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">经销商名称</div>
                  <div class="result-value">{{ result.dealer.dealerName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.dealer.contacts"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">联系人</div>
                  <div class="result-value">{{ result.dealer.contacts }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.dealer.iphone"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">手机号码</div>
                  <div class="result-value">{{ result.dealer.iphone }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.dealer.address"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">详细地址</div>
                  <div class="result-value">{{ result.dealer.address }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.dealer.certificatePath"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">证书</div>
                  <!-- <div
                    class="result-value blue-link"
                    @click="showBigImg(result.dealer.certificatePath)"
                  >查看大图</div> -->
                  <div
                    class="result-value blue-link"
                    @click="showBigImg(getPicPath(result.dealer.certificatePath))"
                  >
                    <img
                      :src="getPicPath(result.dealer.certificatePath)[0]"
                      alt="证书"
                      height="40"
                    >
                  </div>
                </div>
              </el-col>
              <el-col
                v-if="result.dealer.validTime"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">证书有效期</div>
                  <div class="result-value">{{ result.dealer.validTime }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <!-- 品牌商 -->
        <div
          v-if="result.brandCompany"
          class="result-box-container"
        >
          <h4>品牌商</h4>
          <el-row class="result-box-container-body result-box-short">
            <el-col
              v-if="result.brandCompany"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">品牌商名称</div>
                <div class="result-value">{{ result.brandCompany }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.brandCompanyAddress"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">品牌商地址</div>
                <div class="result-value">{{ result.brandCompanyAddress }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 零售商 -->
        <div
          v-if="result.retailerName"
          class="result-box-container"
        >
          <h4>零售商</h4>
          <el-row class="result-box-container-body result-box-short">
            <el-col
              v-if="result.retailerName"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">零售商名称</div>
                <div class="result-value">{{ result.retailerName }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.retailerAddress"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">零售商地址</div>
                <div class="result-value">{{ result.retailerAddress }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 订单信息 -->
        <div
          v-if="result.orderInfo"
          class="result-box-container"
        >
          <h4>订单信息</h4>
          <el-row class="result-box-container-body">
            <el-col
              v-if="result.orderInfo.id"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">订单编号</div>
                <div class="result-value">{{ result.orderInfo.id }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.orderTime"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">创建时间</div>
                <div class="result-value">{{ getTime(result.orderInfo.orderTime) }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.payTime"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">支付时间</div>
                <div class="result-value">{{ getTime(result.orderInfo.payTime) }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.payType"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">支付方式</div>
                <div class="result-value">线下转账</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.orderStatus"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">订单状态</div>
                <div class="result-value">{{ sourceStatusMap[result.orderInfo.orderStatus] }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.orderMoney"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">订单金额</div>
                <div class="result-value">￥{{ result.orderInfo.orderMoney }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.buyerName"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">购买人</div>
                <div class="result-value">{{ result.orderInfo.buyerName }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.buyerAccount"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">购买人账号</div>
                <div class="result-value">{{ result.orderInfo.buyerAccount }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- 商品信息 -->
        <template v-if="result.orderInfo && result.orderInfo.items">
          <div class="result-box-container">
            <h4>商品信息</h4>
            <el-row
              v-for="(goodsItem,index) in result.orderInfo.items"
              :key="index"
              class="result-box-container-body"
            >
              <el-col
                v-if="goodsItem.goodsId"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品ID</div>
                  <div class="result-value">{{ goodsItem.goodsId }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.sourceCode"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">溯源码</div>
                  <div class="result-value">{{ goodsItem.sourceCode }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.brandCompany"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品品牌</div>
                  <div class="result-value">{{ goodsItem.brandCompany }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.goodsName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品名称</div>
                  <div class="result-value">{{ goodsItem.goodsName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.picPath"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品图片</div>
                  <!-- <div
                    class="result-value blue-link"
                    @click="showBigImg(getPicPath(goodsItem.picPath))"
                  >查看大图</div> -->
                  <div
                    class="result-value blue-link"
                    @click="showBigImg(getPicPath(goodsItem.picPath))"
                  >
                    <img
                      :src="getPicPath(goodsItem.picPath)[0]"
                      alt="商品图片"
                      height="40"
                    >
                  </div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.attrSku"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">SKU</div>
                  <div class="result-value">{{ getSkuText(goodsItem.attrSku) }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.price"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品价格</div>
                  <div class="result-value">￥{{ goodsItem.price }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.number"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">购买数量</div>
                  <div class="result-value">{{ goodsItem.number }}</div>
                </div>
              </el-col>
              <el-col
                v-if="goodsItem.money"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">订单金额</div>
                  <div class="result-value">￥{{ goodsItem.money }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>
        <template v-else>
          <div class="result-box-container">
            <h4>商品信息</h4>
            <el-row class="result-box-container-body">
              <el-col
                v-if="result.item.code"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品编码</div>
                  <div class="result-value">{{ result.item.code }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.goodsId"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品ID</div>
                  <div class="result-value">{{ result.item.goodsId }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.sourceCode"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">溯源码</div>
                  <div class="result-value">{{ result.item.sourceCode }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.goodsName"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品名称</div>
                  <div class="result-value">{{ result.item.goodsName }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.picPath"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品图片</div>
                  <div
                    class="result-value blue-link"
                    @click="showBigImg(getPicPath(result.item.picPath))"
                  >
                    <img
                      :src="getPicPath(result.item.picPath)[0]"
                      alt="商品图片"
                      height="40"
                    >
                  </div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.attrSku"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">SKU</div>
                  <div class="result-value">{{ getSkuText(result.item.attrSku) }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.price"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品价格</div>
                  <div class="result-value">￥{{ result.item.price }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.item.price"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">商品品牌</div>
                  <div class="result-value">{{ result.item.brandName }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </template>

        <div
          v-if="result.orderInfo && result.orderInfo.orderReceive"
          class="result-box-container"
        >
          <h4>收货信息</h4>
          <el-row class="result-box-container-body">
            <el-col
              v-if="result.orderInfo.orderReceive.receiver"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">收货人</div>
                <div class="result-value">{{ result.orderInfo.orderReceive.receiver }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.orderReceive.receiverMobile"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">收货人联系电话</div>
                <div class="result-value">{{ result.orderInfo.orderReceive.receiverMobile }}</div>
              </div>
            </el-col>
            <el-col
              v-if="result.orderInfo.orderReceive.receiverAddress"
              :span="8"
            >
              <div class="d-flex">
                <div class="result-label">收货地址</div>
                <div class="result-value">{{ result.orderInfo.orderReceive.province + result.orderInfo.orderReceive.city + result.orderInfo.orderReceive.town + result.orderInfo.orderReceive.receiverAddress }}</div>
              </div>
            </el-col>
            <template v-if="result.orderInfo.logistics">
              <el-col
                v-if="result.orderInfo.logistics.logisticsCompany"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">物流公司</div>
                  <div class="result-value">{{ result.orderInfo.logistics.logisticsCompany }}</div>
                </div>
              </el-col>
              <el-col
                v-if="result.orderInfo.logistics.logisticsNo"
                :span="8"
              >
                <div class="d-flex">
                  <div class="result-label">物流单号</div>
                  <div class="result-value">{{ result.orderInfo.logistics.logisticsNo }}</div>
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
      </template>

      <div class="btn-box text-center mt-5">
        <el-button
          class="back-btn"
          type="primary"
          @click="goBack"
        >返回</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <div class="block text-center">
        <el-carousel
          height="500px"
          :autoplay="false"
          trigger="click"
        >
          <el-carousel-item
            v-for="item in bigImgUrl"
            :key="item"
          >
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img
              :src="item"
              style="max-width:100%;height:500px;"
            >
          </el-carousel-item>
        </el-carousel>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: '1'
    },
    result: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      bigImgUrl: [],
      skuText: '',
      sourceStatusMap: {
        '1': '未付款',
        '4': '待审核',
        '2': '待发货',
        '3': '待收货',
        '5': '已完成',
        '6': '已取消',
        '7': '已关闭'
      }
    }
  },
  watch: {
    result: {
      handler(val) {
        console.log(val)
      },
      deep: true
    }
  },
  methods: {
    // 好实在解析sku
    getSkuText(attrSku) {
      var skuText = []
      const attrSkuObj = JSON.parse(attrSku)
      attrSkuObj.goodsSpecData.map((item, index) => {
        skuText.push(item.attrKey + '：' + attrSkuObj['attrValue' + index])
      })
      return skuText.join('，')
    },
    // 好实在解析图片
    getPicPath(picPath) {
      // if (picPath.indexOf('https://cloud.hsz88.com') === -1) {
      //   picPath = 'https://cloud.hsz88.com/' + picPath
      // }
      return picPath.split(',')
    },
    // 时间戳解析
    getTime(timestamp) {
      var d = new Date(timestamp)
      var date = ''
      date = (d.getFullYear()) + '-' +
        (d.getMonth() + 1) + '-' +
        (d.getDate()) + ' ' +
        (d.getHours()) + ':' +
        (d.getMinutes()) + ':' +
        (d.getSeconds())
      return date
    },
    showBigImg(imgUrl) {
      this.dialogVisible = true
      this.bigImgUrl = imgUrl
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.result-box {
  margin-bottom: 15px;
  width: 100%;
  line-height: 50px;
  border: 1px solid #e5e5e5;
}
.result-box .result-title {
  margin: 0;
  padding-left: 10px;
  font-size: 18px;
  font-weight: 400;
  background: #f5f5f5;
  border-bottom: 2px solid #e5e5e5;
}
.result-box p {
  display: flex;
  margin: 0;
  padding-left: 10px;
  border-bottom: 1px solid #e5e5e5;
}
.result-box p:last-child {
  border-bottom: 0;
}
.result-label {
  width: 250px;
  color: #333333;
}
.result-value {
  display: inline-block;
  word-wrap: break-word;
  word-break: break-all;
  width: calc(100% - 250px);
}
.result-input-value.result-value {
  overflow-y: scroll;
  margin: 10px 10px 10px 0;
  padding: 10px;
  height: 100px;
  line-height: 20px;
  font-size: 14px;
  color: #666666;
  background: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.blue {
  color: $light-blue;
  cursor: pointer;
}
.result-box-container {
  text-align: center;
  // line-height: 50px;
  h4 {
    text-align: left;
    font-size: 18px;
    line-height: 60px;
  }
  .result-box-container-body {
    margin-bottom: 10px;
    font-size: 14px;
    // border-top: 1px solid #e5e5e5;
    // border-left: 1px solid #e5e5e5;
    // border: 1px solid #e5e5e5;
    &.result-box-short {
      border: 0;
      .result-label,
      .result-value {
        border: 1px solid #e5e5e5;
      }
    }
  }
  .result-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50px;
    background: #f5f5f5;
    // border-right: 1px solid #e5e5e5;
    // border-bottom: 1px solid #e5e5e5;
    border: 1px solid #e5e5e5;
  }
  .result-value {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;
    width: 50%;
    height: 50px;
    // border-right: 1px solid #e5e5e5;
    // border-bottom: 1px solid #e5e5e5;
    border: 1px solid #e5e5e5;
  }
}
.back-btn {
  width: 120px;
}
</style>
