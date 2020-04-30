<template>
  <div>
    <div>
      <el-tabs
        @tab-click="tabClick"
        class="pt-1"
        ref="tab"
      >
        <el-tab-pane
          label="01 基础信息"
          target="#BaseInfo"
        ></el-tab-pane>
        <el-tab-pane
          label="02 销售信息"
          target="#SellInfo"
        ></el-tab-pane>
        <el-tab-pane
          label="03 图文描述"
          target="#GraphicDescription"
        ></el-tab-pane>
        <el-tab-pane
          label="04 物流信息"
          target="#LogisticsInfo"
        ></el-tab-pane>
        <el-tab-pane
          label="05 售后服务"
          target="#SalesService"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >

        <div class="block baseInfo">
          <!--所属分类-->
          <el-form-item
            label="所属分类："
            prop="cat"
          >
            <template v-if="!look">
              <el-select
                v-model="form.primaryCgyId"
                :disabled="look"
                @change="getCategoriesSecond"
                placeholder="请选择一级分类"
                class="short-input"
              >
                <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.catName"
                  :value="String(item.id)"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.secondaryCgyId"
                :disabled="look"
                @change="getCategoriesThird"
                placeholder="请选择二级分类"
                class="short-input"
              >
                <el-option
                  v-for="item in categoriesSecond"
                  :key="item.id"
                  :label="item.catName"
                  :value="String(item.id)"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.thridaryCgyId"
                :disabled="look"
                @change="getSku"
                placeholder="请选择三级分类"
                class="short-input"
              >
                <el-option
                  v-for="item in categoriesThird"
                  :key="item.id"
                  :label="item.catName"
                  :value="String(item.id)"
                ></el-option>
              </el-select>
            </template>
            <template v-else>
              <span class="input-value">{{form.catName}}</span>
            </template>
          </el-form-item>

          <!--所属品牌-->
          <el-form-item
            label="所属品牌："
            v-if="brandList.length"
          >
            <template v-if="!look">
              <el-select
                v-model="form.brandId"
                @change="brandChange"
                placeholder="请选择品牌"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.brandId"
                  :label="item.brandName"
                  :value="item.brandId"
                ></el-option>
              </el-select>
            </template>
            <template v-else>
              <span class="input-value">{{form.brandName}}</span>
            </template>
          </el-form-item>

          <!--商品名称-->
          <el-form-item
            label="商品名称："
            prop="goodsName"
          >
            <el-input
              v-if="!look"
              v-model="form.goodsName"
              :maxlength="30"
              placeholder="商品标题名称长度，最长30个汉字"
            ></el-input>
            <span
              v-else
              class="input-value"
            >{{form.goodsName}}</span>
          </el-form-item>

          <!--商品简介-->
          <el-form-item
            label="商品简介："
            prop="designIdea"
          >
            <el-input
              v-if="!look"
              v-model="form.designIdea"
              :maxlength="50"
              placeholder="用于分享商品时的介绍，最长50个汉字"
            ></el-input>
            <span
              v-else
              class="input-value"
            >{{form.designIdea}}</span>
          </el-form-item>

          <!--商品货号-->
          <el-form-item
            label="商品货号："
            prop="goodsNO"
          >
            <template v-if="!look">
              <el-input
                v-model="form.goodsNO"
                :maxlength="20"
                placeholder="最多可输入20个字符，支持输入字母、数字、_、/、-和小数点"
              ></el-input>
              <p class="input-tip">商品货号是指商家个人管理商品的编号，买家不可见</p>
            </template>
            <template v-else>
              <span class="input-value">{{form.goodsNO}}</span>
            </template>
          </el-form-item>

          <!--商品标签-->
          <el-form-item label="商品标签：">
            <el-input
              v-if="!look"
              v-model="form.keywords"
              :maxlength="50"
              placeholder="每个标签之间用符号“|”隔开，50字以内"
            ></el-input>
            <span
              v-else
              class="input-value"
            >{{form.keywords}}</span>
          </el-form-item>

          <el-form-item
            label="所属专区："
            prop="zoneIdList"
          >
            <template v-if="!look">
              <el-checkbox-group
                v-model="form.zoneIdList"
                :max="3"
              >
                <el-checkbox
                  v-for="item in zoneList"
                  :key="item.id"
                  :label="item.id"
                  @change="$forceUpdate()"
                >{{item.zoneName}}</el-checkbox>
              </el-checkbox-group>
            </template>
            <span
              v-else
              class="input-value"
            >{{form.zoneName}}</span>
          </el-form-item>

          <el-form-item
            label="类目属性："
            v-if="categoryAttributesList.length"
          >
            <div
              class="category-attr"
              v-if="!look"
            >
              <el-form
                :model="categoryAttributes"
                inline
                :rules="rules"
                ref="categoryAttrForm"
                label-width="150px"
                class="category-attr-form"
              >
                <div
                  v-for="(item, index) in categoryAttributesList"
                  :key="index"
                  style="display:inline-block;"
                >
                  <el-form-item
                    :label="item.attributesName"
                    v-if="!item.attributesType"
                    :prop="categoryAttributes[item.id]"
                    :rules="{
      required: !item.isMust, message: '此项不能为空', trigger: 'blur' }"
                  >
                    <el-input
                      v-model="categoryAttributes[item.id]"
                      :disabled="look"
                      placeholder="请输入"
                      class="category-attr-input"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :label="item.attributesName"
                    v-if="item.attributesType === 1"
                    :prop="categoryAttributes[item.id]"
                    :rules="{
      required: !item.isMust, message: '此项不能为空', trigger: 'blur'
    }"
                  >
                    <el-select
                      v-model="categoryAttributes[item.id]"
                      :disabled="look"
                      class="category-attr-input"
                      placeholder="请选择"
                      @change="$forceUpdate()"
                    >
                      <el-option
                        v-for="subItem in item.subsidiaryAttributesVOs"
                        :key="subItem.id"
                        :label="subItem.subsidiaryName"
                        :value="String(subItem.id)"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <div v-if="item.attributesType === 2">
                    <!-- 鉴定标识类目属性 -->
                    <el-form-item
                      :label="item.attributesName"
                      :prop="categoryAttributes[item.id]"
                      :rules="{
      required: !item.isMust, message: '此项不能为空', trigger: 'blur'
    }"
                    >
                      <el-select
                        v-model="categoryAttributes[item.id]"
                        :disabled="look"
                        @change="getIdentifyTypeList"
                        class="category-attr-input"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="subItem in item.subsidiaryAttributesVOs"
                          :key="subItem.id"
                          :label="subItem.subsidiaryName"
                          :value="String(subItem.id)"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="鉴定类别"
                      :prop="categoryAttributes.identificationCategoryId"
                      :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                      v-if="categoryAttributes['1040'] === '1545' || categoryAttributes['1040'] === '1546'"
                    >
                      <el-select
                        v-model="categoryAttributes.identificationCategoryId"
                        :disabled="look"
                        class="category-attr-input"
                        placeholder="请选择"
                        @change="$forceUpdate()"
                      >
                        <el-option
                          v-for="thirdItem in identifyTypeList"
                          :key="thirdItem.id"
                          :label="thirdItem.name"
                          :value="String(thirdItem.id)"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="认证标识"
                      :prop="categoryAttributes.authIdentificationId"
                      :rules="{
      required: true, message: '此项不能为空', trigger: 'blur'
    }"
                      v-if="categoryAttributes['1040'] === '1545'"
                    >
                      <el-select
                        v-model="categoryAttributes.authIdentificationId"
                        :disabled="look"
                        class="category-attr-input"
                        placeholder="请选择"
                        @change="$forceUpdate()"
                      >
                        <el-option
                          v-for="elseItem in item.authIdentifications"
                          :key="elseItem.id"
                          :label="elseItem.name"
                          :value="String(elseItem.id)"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>

                </div>
              </el-form>
            </div>
            <template v-else>
              <div class="category-attr-look row">
                <div
                  class="span24-8"
                  v-for="(item,i ) in form.goodsCategoryAttributesVOS"
                  :key="i"
                >
                  <span>{{item.attributesName}}：</span>
                  <span>{{item.subsidiaryAttributesValue}}</span>
                </div>
              </div>
            </template>
          </el-form-item>
        </div>

        <div class="block">
          <!--销售信息-->
          <h4 id="SellInfo">销售信息</h4>
          <template v-if="!look">
            <el-form-item
              :label="ele.specsName"
              v-for="(ele,index) in specsList"
              :key="index"
            >
              <div class="category-attr sku-box">
                <div>
                  <el-input
                    v-model="skuAttrValue[index]"
                    :maxlength="20"
                    :disabled="look"
                    placeholder="请输入自定义值，20个字以内"
                    style="width: 220px;"
                  ></el-input>
                  <span
                    class="pointer text-primary"
                    v-if="!look"
                    @click="addSkuAttr(skuAttrValue[index],ele.specsAttrsList,skuAttr[index]);skuAttrValue[index]=''"
                  >添加</span>
                </div>
                <el-checkbox-group
                  v-model="skuAttr[index]"
                  @change="initGoodsSpecTableData"
                  :disabled="look"
                >
                  <div
                    class="sku-attr-item"
                    v-for="(item, i) in ele.specsAttrsList"
                    :key="i"
                  >
                    <el-checkbox
                      :label="item.attrValue"
                      v-if="!item.custom"
                      :name="String(ele.id)"
                    ></el-checkbox>
                    <template v-else>
                      <el-checkbox
                        :label="item.attrValue"
                        :name="String(ele.id)"
                      ></el-checkbox>
                      <span class="custom-item">
                        <el-popover
                          placement="top"
                          @show="showAttrEditPop(i, ele.specsAttrsList)"
                          width="160"
                          v-model="showAttrEdit[index][i]"
                        >
                          <el-input
                            v-model="skuAttrEdit"
                            :maxlength="10"
                            style="margin-bottom: 10px;"
                          ></el-input>
                          <div style="text-align: right; margin: 0">
                            <el-button
                              size="mini"
                              type="text"
                              @click="showAttrEdit[index].splice(i, 1, false)"
                            >取消</el-button>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="editAttr(index, i, ele.specsAttrsList)"
                            >确定</el-button>
                          </div>
                          <i
                            class="el-icon-edit"
                            slot="reference"
                          ></i>
                        </el-popover>

                        <i
                          class="el-icon-delete"
                          @click="deleteCustomItem(ele.specsAttrsList, i)"
                        ></i>
                      </span>
                    </template>
                  </div>

                </el-checkbox-group>
              </div>
              <p class="input-tip">自定义值可进行删除和更改</p>
            </el-form-item>

            <el-form-item
              class="custom-form-item"
              v-if="specsList.length < 4 && form.thridaryCgyId"
            >
              <el-input
                class="custom-attr"
                :disabled="look"
                placeholder="如：规格"
                @change="initGoodsSpecTableData"
                v-model="customAttrName"
                style="width:90px;"
              ></el-input>
              <div class="category-attr sku-box">
                <div>
                  <el-input
                    v-model="customAttrValue"
                    :disabled="look"
                    :maxlength="20"
                    placeholder="请输入自定义值，20个字以内"
                    style="width: 220px;"
                  ></el-input>
                  <span
                    class="pointer text-primary"
                    v-if="!look"
                    @click="addSkuAttr(customAttrValue,customAttrList,customAttr,'custom')"
                  >添加</span>
                </div>
                <el-checkbox-group
                  v-model="customAttr"
                  @change="initGoodsSpecTableData"
                  :disabled="look"
                >
                  <div
                    class="sku-attr-item"
                    v-for="(item, i) in customAttrList"
                    :key="i"
                  >
                    <el-checkbox
                      :label="item.attrValue"
                      name="skuAttr"
                    ></el-checkbox>
                    <span class="custom-item">
                      <el-popover
                        placement="top"
                        @show="showAttrEditPop(i, customAttrList)"
                        width="160"
                        v-model="showAttrEdit[3][i]"
                      >
                        <el-input
                          v-model="skuAttrEdit"
                          :maxlength="10"
                          style="margin-bottom: 10px;"
                        ></el-input>
                        <div style="text-align: right; margin: 0">
                          <el-button
                            size="mini"
                            type="text"
                            @click="showAttrEdit[3].splice(i, 1, false)"
                          >取消</el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="editAttr(3, i, customAttrList)"
                          >确定</el-button>
                        </div>
                        <i
                          class="el-icon-edit"
                          slot="reference"
                        ></i>
                      </el-popover>

                      <i
                        class="el-icon-delete"
                        @click="deleteCustomItem(customAttrList, i)"
                      ></i>
                    </span>
                  </div>
                </el-checkbox-group>
              </div>
              <p class="input-tip">自定义值可进行删除和更改</p>
            </el-form-item>
          </template>

          <el-form-item label="价格/库存：">
            <p style="margin: 0 0 10px;">
              在标题栏填充价格及库存后，点击右侧按钮，可批量填充；
              <el-button
                @click="fill"
                class="plain-btn-sm fr"
              >批量填充</el-button>
            </p>
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
                :render-header="renderHeaderPrice"
              >
                <template slot-scope="{ row }">
                  <el-input
                    v-if="!type"
                    placeholder="输入价格"
                    v-model.number="row.price"
                  ></el-input>
                  <span
                    class="input-value"
                    v-else
                  >{{row.price}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :render-header="renderHeaderStock"
              >
                <template slot-scope="{ row }">
                  <el-input
                    v-if="!type"
                    placeholder="输入库存"
                    @change="stockChange"
                    v-model.number="row.stock"
                  ></el-input>
                  <span
                    class="input-value"
                    v-else
                  >{{row.stock}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="活动库存"
                prop="activityStock"
                v-if="look"
              ></el-table-column>
              <el-table-column
                align="center"
                :render-header="renderHeaderCode"
              >
                <template slot-scope="{ row }">
                  <el-input
                    v-if="!look"
                    placeholder="输入商家编码"
                    v-model.number="row.businessCode"
                  ></el-input>
                  <span
                    class="input-value"
                    v-else
                  >{{row.businessCode}}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                :render-header="renderHeaderBarCode"
              >
                <template slot-scope="{ row }">
                  <el-input
                    v-if="!look"
                    placeholder="输入商品条形码"
                    v-model.number="row.businessBarcode"
                  ></el-input>
                  <span
                    class="input-value"
                    v-else
                  >{{row.businessBarcode}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item
            label="总库存："
            prop="stock"
          >
            <el-input
              v-if="!look"
              v-model.number="form.stock"
              readonly
            ></el-input>
            <span
              class="input-value"
              v-else
            >{{form.stock}}</span>
          </el-form-item>
        </div>

        <div class="block">
          <!--图文描述-->
          <h4 id="GraphicDescription">图文描述</h4>
          <el-form-item
            label="商品主图："
            prop="goodsGallerys"
          >

            <div v-if="form.goodsGallerys.length < 5 && !look">
              <ImageUpload
                class="mb-1"
                :multiple="true"
                prefix="work"
                @successCBK="workUploadSuccess"
              />
            </div>
            <div class="line-h-sm text-light-gray font-12">
              共<span class="danger">{{form.goodsGallerys.length}}</span>张，还能上传<span class="danger">{{5 - form.goodsGallerys.length}}</span>张；第一张图片默认为商品主图；图片尺寸：600*600以上；数量：5张以内；格式：jpg、jpeg、png、gif；大小：单张图片不超过3m
            </div>
            <div
              class="d-flex"
              v-if="form.goodsGallerys.length"
            >
              <div
                class="pic-item"
                v-for="(item, index) in form.goodsGallerys"
                :key="index"
              >
                <a
                  target="_blank"
                  :href="item.imgUrl | setImg"
                  class="image"
                  :style="getImageStyle(item.imgUrl)"
                ></a>
                <i
                  class="el-icon-delete pointer"
                  v-if="!look"
                  @click.stop="form.goodsGallerys.splice(index, 1)"
                ></i>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="主图视频：">
            <video
              controls="controls"
              v-if="form.videoUrl"
              style="width: 450px; height: 250px;"
              :src="form.videoUrl"
            >
              您的浏览器不支持 html5 video 属性，下载视频查看：
              <el-button
                size="mini"
                type="text"
              >
                <a
                  :href="form.videoUrl"
                  target="_blank"
                >下载视频</a>
              </el-button>
            </video>
            <el-button
              v-if="form.videoUrl"
              :disabled="look"
              type="text"
              @click="form.videoUrl = ''"
            >删除视频</el-button>
            <template v-if="!form.videoUrl && !look">
              <video-upload @success="videoUploadScccess" />
            </template>
          </el-form-item>

          <el-form-item
            label="商品描述："
            prop="goodsDesc"
          >
            <div
              v-if="look"
              v-html="form.goodsDesc"
              class="goods-desc"
            ></div>
            <Tinymce
              v-else
              :height="500"
              ref="editor"
              v-model="form.goodsDesc"
            ></Tinymce>
          </el-form-item>
        </div>

        <div class="block">
          <!--物流信息-->
          <h4 id="LogisticsInfo">物流信息</h4>
          <el-form-item
            label="运费设置："
            prop="freightType"
          >
            <template v-if="!look">
              <el-radio-group v-model="form.freightType">
                <el-radio :label="0">包邮</el-radio>
                <el-radio :label="1">到付</el-radio>
                <el-radio :label="2">
                  一次性收费:
                  <el-input
                    v-model.number="form.freightPrice"
                    :disabled="look"
                    placeholder="请输入运费"
                    class="freight-input"
                  ></el-input>
                  元
                </el-radio>
              </el-radio-group>
            </template>
            <span
              v-else
              class="input-value"
            >{{form.freightType === 0 ? '包邮' : form.freightType === 1 ? '到付' : '一次性收费:'+form.form.freightPrice+'元' }}</span>
          </el-form-item>
        </div>

        <div class="block">
          <!--售后服务-->
          <h4 id="SalesService">售后服务</h4>
          <el-form-item label="售后保障：">
            <template v-if="!look">
              <el-checkbox
                v-model="restoreChecked"
                @change="restoreChange"
              >7天无理由退货</el-checkbox>
              <el-checkbox
                :disabled="look"
                v-model="genuineChecked"
                @change="genuineChange"
              >正品担保</el-checkbox>
            </template>
            <span
              v-if="look && restoreChecked"
              class="input-value"
            >7天无理由退货
            </span>
            <span
              v-if="look && genuineChecked"
              class="input-value"
            >正品担保
            </span>
          </el-form-item>

          <el-form-item label="专用发票：">
            <template v-if="!look">
              <el-radio-group v-model="form.isSupportInvoice">
                <el-radio :label="0">支持</el-radio>
                <el-radio :label="1">不支持</el-radio>
              </el-radio-group>
            </template>
            <span
              v-else
              class="input-value"
            >{{form.isSupportInvoice === 0 ? '支持' : '不支持'}}
            </span>
          </el-form-item>

          <el-form-item
            label="上架时间："
            style="padding-bottom: 30px;"
            v-if="showAutomatic"
          >
            <el-radio-group
              v-model="form.automatic"
              v-if="!look"
            >
              <el-radio :label="0">立刻上架(审核通过后自动上架)</el-radio>
              <el-radio :label="1">手动上架(审核通过后在商品列表手动上架)</el-radio>
            </el-radio-group>
            <span
              v-else
              class="input-value"
            >{{form.automatic === 0 ? '立刻上架(审核通过后自动上架)' : '手动上架(审核通过后在商品列表手动上架)'}}
            </span>
          </el-form-item>

          <el-form-item class="footer_btn">
            <el-button
              type="primary"
              @click="goBack"
              class="primary-btn-md"
            >返回</el-button>
            <el-button
              type="primary"
              @click="preView"
              class="primary-btn-md"
            >预览</el-button>
            <el-button
              type="primary"
              :loading="draftLoading"
              v-if="!$route.query.id || form.goodsType === 3"
              @click="saveDraft(1)"
              class="primary-btn-md"
            >保存到草稿箱</el-button>
            <el-button
              type="primary"
              :loading="loading"
              :disabled="notSale"
              @click="saveWork"
              class="primary-btn-md"
              v-if="!type"
            >提交商品信息</el-button>
          </el-form-item>
        </div>

      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <div class="preview-bg">
        <img
          v-if="form.goodsGallerys && form.goodsGallerys.length"
          :src="form.goodsGallerys[0].imgUrl"
          class="work-pic"
        >
        <div class="right-box">
          <h1 class="brandName">{{form.brandName}}</h1>
          <p class="goodsName">{{form.goodsName}}</p>
          <p class="goodsBrief">{{form.designIdea}}</p>
          <p class="price-box">
            ￥ <span
              class="price"
              v-if="goodsSpecTableData.length"
            >{{goodsSpecTableData[0].price}}</span>
            <span>
              (运费：
              <span v-if="form.freightType === 0">包邮</span>
              <span v-if="form.freightType === 1">到付</span>
              <span v-if="form.freightType === 2">￥{{form.freightPrice}}元</span>
              <span v-if="serveChecked.includes('0')">，支持七天无理由退货</span>
              )
            </span>
          </p>
        </div>
        <div class="sku-box">
          <div
            class="sku"
            v-for="item in goodsSpecData"
            :key="item.id"
          >
            <span>{{item.specsName}}</span>
            <span
              class="sku-attr"
              :class="{'active' : i === 0}"
              v-for="(subItem,i) in item.goodsSpecsAttrs"
              :key="subItem.id"
            >{{subItem.attrValue}}</span>
          </div>
        </div>
        <div class="stock">{{form.stock}}</div>
        <div class="storeName">{{storeName}}</div>
        <div
          class="work-info"
          v-html="form.goodsDesc"
        >
        </div>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import ImageUpload from '@/components/Upload'
import VideoUpload from '@/components/VideoUpload'
import { setImg } from '@/filters'
import { domain } from '@/api/qiniu'
import Tinymce from '@/components/Tinymce'
import { getObj, putObj, getBrand } from '@/api/jewelryMerchant/works'
import { categoryList, getZoneList } from '@/api/public/system'
import { getParamSettings } from '@/api/public/system'

export default {
  directives: {
    waves
  },
  components: {
    ImageUpload,
    VideoUpload,
    Tinymce
  },
  data() {
    return {
      domain,
      loading: false,
      draftLoading: false,
      showAutomatic: false,
      // 分类
      categories: [],
      categoriesSecond: [],
      categoriesThird: [],
      // 专区
      zoneList: [],
      // 类目属性
      categoryAttributes: {},
      categoryAttributesList: [],
      // sku模板属性数组
      specsList: [],
      // 自定义sku属性值编辑
      showAttrEdit: [[], [], [], []],
      skuAttrEdit: '',
      // 新增的sku属性值
      skuAttrValue: [],
      // 选中的sku属性
      skuAttr: [[], [], [], []],
      // 自定义sku属性
      customAttrName: '',
      customAttrValue: '',
      customAttr: [],
      customAttrList: [],
      // sku表格顶部变量
      price: '',
      stock: '',
      businessCode: '',
      businessBarcode: '',
      // 售后服务
      serveChecked: ['0', '1'],
      serveCheckList: [{
        id: '0',
        menu: '7天无理由退货'
      }, {
        id: '1',
        menu: '正品担保'
      }],
      genuineChecked: true,
      restoreChecked: true,
      form: {
        brandId: '',
        brandName: '',
        id: undefined,
        goodsName: undefined,
        intro: undefined,
        subtitle: undefined,
        keywords: undefined,
        goodsNO: undefined,
        barCode: undefined,
        remark: undefined,
        associateGoodsId: [],
        catList: [],
        zoneIdList: [],
        genuine: 0,
        restore: 1,
        primaryCgyId: undefined,
        primaryCgyName: undefined,
        secondaryCgyId: undefined,
        secondaryCgyName: undefined,
        thridaryCgyId: undefined,
        thridaryCgyName: undefined,
        price: null,
        originalPrice: null,
        designIdea: undefined,
        freightPrice: undefined,
        batchNum: undefined,
        stock: undefined,
        //      caseType: 1,
        imgUrl: '',
        freightType: 0,
        isSupportInvoice: 1,
        automatic: 0,
        videoUrl: undefined,
        goodsDesc: undefined,
        goodsSource: 1,
        goodsGallerys: [],
        caseAttrsDTOList: [],
        goodsCategoryAttributes: [],
        catAttrAndSubAttrDTOs: [],
        isDraft: 0
      },
      associateGoods: [],
      rules: {
        goodsName: [{
          required: true,
          message: '请输入商品名称，30字以内',
          trigger: 'blur'
        }],
        goodsNO: [{
          pattern: /^[-/_.0-9a-zA-Z]+$/,
          message: '请输入正确格式的商品货号',
          trigger: 'blur'
        }],
        designIdea: [{
          required: true,
          message: '请输入商品简介，50字以内',
          trigger: 'blur'
        }],
        keywords: [{
          required: true,
          message: '请输入商品关键字',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          validator: this.checkPrice,
          trigger: 'blur'
        }],
        originalPrice: [{
          required: true,
          validator: this.checkOriginalPrice,
          trigger: 'blur'
        }],
        stock: [{
          required: true,
          message: '请先完善商品sku相关信息',
          trigger: 'blur'
        }],
        freightPrice: [{
          required: true,
          validator: this.checkFreightPrice,
          trigger: 'blur'
        }],
        batchNum: [{
          required: true,
          message: '请输入最小购买量',
          trigger: 'change'
        }],
        goodsDesc: [{
          required: true,
          message: '请输入商品详情',
          trigger: 'blur'
        }],
        goodsGallerys: [{
          required: true,
          message: '请上传商品图片',
          type: 'array',
          trigger: 'blur'
        }],
        caseAttrsDTOList: [{
          required: true,
          message: '请添加商品参数',
          type: 'array',
          trigger: 'blur'
        }],
        cat: [{
          required: true,
          message: '请选择分类',
          trigger: 'blur'
        }],
        zoneIdList: [{
          type: 'array',
          required: true,
          message: '请至少选择一个专区',
          trigger: 'change'
        }]
      },
      editStatus: true,
      timeout: null,
      goodsSpecData: [],
      goodsSpecTableData: [],
      brandList: [],
      identifyTypeList: [],
      // 修改初始化
      editCreate: false,
      dialogVisible: false,
      storeName: '',
      look: false,
      type: '',
      isDoExchange: true,
      notSale: false
    }
  },
  beforeRouteLeave(to, from, next) {
    this.onbeforeunloadHandler(next)
  },
  async created() {
    this.type = this.$route.query.type
    if (this.$route.query.id) {
      this.isDoExchange = false
      const form = await getObj(this.$route.query.id).then(data => data.data)
      if (typeof form.associateGoodsId === 'string') form.associateGoodsId = []
      form.associateGoodsId.forEach(goods => {
        this.associateGoods.push(goods)
      })
      this.form = form
      this.form.catList.map((item, i) => {
        if (i === 0) {
          this.form.primaryCgyId = item.catId
          this.form.primaryCgyName = item.catName
        } else if (i === 1) {
          this.form.secondaryCgyId = item.catId
          this.form.secondaryCgyName = item.catName
        } else if (i === 2) {
          this.form.thridaryCgyId = item.catId
          this.form.thridaryCgyName = item.catName
        }
      })
      //    this.serveChecked = form.serveType.split(',')
      this.serveChecked = ''
      this.genuineChecked = this.form.genuine === 0
      this.restoreChecked = this.form.restore === 1
      //    this.form.caseType = String(form.caseType)
      this.goodsSpecData = form.goodsSpecs
      this.goodsSpecTableData = form.goodsSkus
      this.form.goodsCategoryAttributes = form.goodsCategoryAttributes
      this.form.goodsCategoryAttributes = this.form.goodsCategoryAttributes.sort(function(a, b) {
        return a.categoryAttributesId - b.categoryAttributesId
      })
      this.editCreate = true
      this.look = !((this.form.isCheck === 0 || this.form.isCheck === 2))
      this.notSale = this.form.isOnSale === 3
    } else {
      this.timeout = setInterval(() => {
        if (!this.form.goodsName) return
        this.saveDraft(0)
      }, 1000 * 60 * 15)
    }
    this.getCategory()
    this.getZoneList()
    this.getBrand()
    this.getParamSettings()
    this.stockChange()
  },
  beforeDestroy() {
    clearInterval(this.timeout)
    this.timeout = null
  },
  watch: {
    goodsSkus: {
      handler(newValue, oldValue) {
        //				this.isDoExchange = true
        console.log('newValue=', newValue)
      },
      deep: true
    }
  },
  methods: {
    // 获取所有专区
    getZoneList() {
      getZoneList().then(data => {
        this.zoneList = data.data
      }).catch(() => { })
    },
    // 获取系统设置
    getParamSettings() {
      getParamSettings().then(data => {
        this.showAutomatic = !!data.data.goodsAuditSwitch
      }).catch(() => { })
    },
    // 获取品牌
    getBrand() {
      getBrand().then(data => {
        this.brandList = data.data
      }).catch(() => { })
    },
    brandChange(brandId) {
      const brandObj = this.brandList.find(item => item.brandId === brandId)
      this.form.brandName = brandObj.brandName
    },
    // 获取鉴定类别
    getIdentifyTypeList(id) {
      this.$forceUpdate()
      // delete this.categoryAttributes.identificationCategoryId
      this.categoryAttributesList.map(item => {
        if (item.attributesType === 2) {
          item.subsidiaryAttributesVOs.map(subItem => {
            if (subItem.id == id) {
              this.identifyTypeList = subItem.identificationCategorys
            }
          })
        }
      })
    },
    // 获取所有分类
    getCategory() {
      categoryList(0).then(data => {
        this.categories = data.data
        if (this.editCreate) {
          this.getCategoriesSecond(this.form.primaryCgyId)
        }
      }).catch(() => { })
    },
    // 获取二级分类
    getCategoriesSecond(id) {
      if (!id) { return }
      categoryList(id).then(data => {
        this.categoriesSecond = data.data
        if (this.editCreate) {
          this.getCategoriesThird(this.form.secondaryCgyId)
        } else {
          this.form.secondaryCgyId = ''
          this.form.thridaryCgyId = ''
          this.categoryAttributesList = []
          this.specsList = []
          this.goodsSpecData = []
          this.goodsSpecTableData = []
          this.form.stock = undefined
          const firstObj = this.categories.find(item => item.id == id)
          this.form.primaryCgyName = firstObj.catName
        }
      }).catch(() => { })
    },
    // 获取三级分类及类目属性
    getCategoriesThird(id) {
      const secondObj = this.categoriesSecond.find(item => item.id == id)
      this.categoryAttributesList = secondObj.categoryAttributesList
      this.categoryAttributesList = this.categoryAttributesList.sort(function(a, b) {
        return a.id - b.id
      })
      this.form.secondaryCgyName = secondObj.catName
      categoryList(id).then(data => {
        this.categoriesThird = data.data
        if (this.editCreate) {
          this.getSku(this.form.thridaryCgyId)
          // 类目属性回显
          this.categoryAttributesList.map((item, i) => {
            if (item.id == '1040') {
              this.getIdentifyTypeList(this.form.goodsCategoryAttributes[i].subsidiaryAttributesId)
              this.categoryAttributes.identificationCategoryId = this.form.goodsCategoryAttributes[i].identificationCategoryId
              this.categoryAttributes.authIdentificationId = this.form.goodsCategoryAttributes[i].authIdentificationId
              this.categoryAttributes[item.id] = this.form.goodsCategoryAttributes[i].subsidiaryAttributesId
            } else {
              if (item.attributesType) {
                this.categoryAttributes[item.id] = this.form.goodsCategoryAttributes[i].subsidiaryAttributesId
              } else {
                this.categoryAttributes[item.id] = this.form.goodsCategoryAttributes[i].subsidiaryAttributesValue
              }
            }
          })
        } else {
          this.form.thridaryCgyId = ''
          this.specsList = []
          this.goodsSpecData = []
          this.goodsSpecTableData = []
          this.form.stock = undefined
        }
      }).catch(() => { })
    },
    // 获取sku
    getSku(id) {
      const thirdObj = this.categoriesThird.find(item => item.id == id)
      this.specsList = thirdObj.specsList
      this.form.thridaryCgyName = thirdObj.catName
      if (this.editCreate) {
        this.editCreate = false
        const goodSspecsName = []
        const specSspecsName = []
        this.goodsSpecData.map(specItem => {
          goodSspecsName.push(specItem.specsName)
          this.specsList.map((item, index) => {
            specSspecsName.push(item.specsName)
            if (item.specsName === specItem.specsName) {
              const goodsSpecsAttrs = []
              const specsAttrsList = []
              specItem.goodsSpecsAttrs.map(specSubItem => {
                goodsSpecsAttrs.push(specSubItem.attrValue)
                item.specsAttrsList.map(subItem => {
                  specsAttrsList.push(subItem.attrValue)
                  if (subItem.attrValue === specSubItem.attrValue) {
                    this.skuAttr[index].push(subItem.attrValue)
                  }
                })
              })
              // 获取回显的自定义sku属性值
              goodsSpecsAttrs.map((attrItem, attrIndex) => {
                if (!specsAttrsList.includes(attrItem)) {
                  this.specsList[index].specsAttrsList.push({ attrValue: attrItem, custom: true })
                  this.skuAttr[index].push(attrItem)
                }
              })
            }
          })
        })
        // 获取回显的自定义sku属性
        goodSspecsName.map((goodItem, goodIndex) => {
          if (!specSspecsName.includes(goodItem)) {
            this.customAttrName = this.goodsSpecData[goodIndex].specsName
            this.customAttrList = this.goodsSpecData[goodIndex].goodsSpecsAttrs
            this.goodsSpecData[goodIndex].goodsSpecsAttrs.map(goodSubItem => {
              this.customAttr.push(goodSubItem.attrValue)
            })
          }
        })
        this.doExchange()
      }
    },
    // 添加自定义sku值
    addSkuAttr(skuAttrValue, skuAttrList, skuAttr, type) {
      if (type === 'custom' && !this.customAttrName) {
        this.$notify({
          title: '警告',
          message: '请先填写自定义属性名',
          type: 'warning'
        })
        return
      }
      if (skuAttrValue) {
        skuAttrList.push({ attrValue: skuAttrValue, custom: true })
        skuAttr.push(skuAttrValue)
        skuAttrValue = ''
        this.customAttrValue = ''
      } else {
        this.$notify({
          title: '警告',
          message: '请填写自定义属性值',
          type: 'warning'
        })
      }
      this.initGoodsSpecTableData()
    },
    // 展开自定义sku属性编辑框
    showAttrEditPop(i, arr) {
      this.skuAttrEdit = arr[i].attrValue
    },
    // 保存自定义sku属性值
    editAttr(index, i, arr) {
      if (!this.look) {
        arr[i].attrValue = this.skuAttrEdit
        this.showAttrEdit[index].splice(i, 1, false)
        this.initGoodsSpecTableData()
      }
    },
    // 删除自定义sku属性值
    deleteCustomItem(list, i) {
      if (!this.look) {
        list.splice(i, 1)
        this.initGoodsSpecTableData()
      }
    },
    // 生成表格
    initGoodsSpecTableData() {
      this.isDoExchange = true
      // 生成表格列
      this.goodsSpecData = []
      this.specsList.map((item, index) => {
        const goodsSpecsAttrs = []
        if (!this.skuAttr[index].length) { return }
        item.specsAttrsList.map(subItem => {
          if (this.skuAttr[index].includes(subItem.attrValue)) {
            goodsSpecsAttrs.push({ attrValue: subItem.attrValue })
          }
        })
        this.goodsSpecData.push({
          specsName: item.specsName,
          goodsSpecsAttrs: goodsSpecsAttrs
        })
      })
      // 加入自定义sku属性
      if (this.customAttr.length) {
        const customGoodsSpecsAttrs = []
        this.customAttrList.map(customItem => {
          if (this.customAttr.includes(customItem.attrValue)) {
            customGoodsSpecsAttrs.push({ attrValue: customItem.attrValue })
          }
        })
        this.goodsSpecData.push({
          specsName: this.customAttrName,
          goodsSpecsAttrs: customGoodsSpecsAttrs
        })
      }
      // 生成表格行
      var arrTemp = []
      this.goodsSpecData.forEach((sub1, index1) => {
        sub1.goodsSpecsAttrs.forEach((sub2, index2) => {
          arrTemp.push(sub2)
        })
      })
      this.goodsSpecTableData.forEach((sub, index) => {
        var attrValue = sub.attrSymbolPath.split(',')
        attrValue.forEach((sub2, index2) => {
          arrTemp.forEach((sub3, index3) => {
            if (sub2 === sub3.symbol) {
              sub['attrValue' + index2] = sub3.attrValue
            }
          })
        })
      })
      this.doExchange()
    },
    // 填充表格
    fill() {
      this.goodsSpecTableData.map(item => {
        this.stock && (item.stock = this.stock)
        this.price && (item.price = this.price)
        this.activityStock && (item.activityStock = this.activityStock)
        this.businessCode && (item.businessCode = this.businessCode)
        this.businessBarcode && (item.businessBarcode = this.businessBarcode)
      })
      this.stockChange()
    },
    // 合成后台的类目属性
    composeCategoryAttributes() {
      this.form.goodsCategoryAttributes = []
      this.categoryAttributesList.map(item => {
        const identificationCategoryId = item.id == '1040' ? this.categoryAttributes.identificationCategoryId : undefined
        const authIdentificationId = item.id == '1040' ? this.categoryAttributes.authIdentificationId : undefined
        const subsidiaryAttributesId = item.attributesType ? this.categoryAttributes[item.id] : ''
        const subsidiaryAttributesValue = !item.attributesType ? this.categoryAttributes[item.id] : ''
        const obj = {
          catgoryAttributesId: item.id,
          subsidiaryAttributesId: subsidiaryAttributesId,
          identificationCategoryId: identificationCategoryId,
          authIdentificationId: authIdentificationId,
          subsidiaryAttributesValue: subsidiaryAttributesValue
        }
        this.form.goodsCategoryAttributes.push(obj)
      })
      this.form.catAttrAndSubAttrDTOs = this.form.goodsCategoryAttributes
    },
    // 计算总库存
    stockChange() {
      let subStock = 0
      this.goodsSpecTableData.forEach((sub, index) => {
        subStock = subStock + Number(sub.stock) + Number(sub.activityStock)
      })
      this.form.stock = subStock
    },
    doExchange() {
      if (this.isDoExchange) {
        this.goodsSpecData.forEach((sub, index) => {
          if (sub.goodsSpecsAttrs) {
            sub.goodsSpecsAttrs.forEach((sub2, index2) => {
              index = index < 10 ? '0' + index : index
              index2 = index2 < 10 ? '0' + index2 : index2
              sub2.symbol = Number(index + '' + index2)
            })
          }
        })
      }

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
          businessCode: '',
          businessBarcode: '',
          id: ''
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
          if (sub.attrSymbolPath.split(',').sort().join(',') == sub2.attrSymbolPath.split(',').sort().join(',')) {
            sub2.stock = sub.stock
            sub2.price = sub.price
            sub2.activityStock = sub.activityStock
            sub2.businessCode = sub.businessCode
            sub2.businessBarcode = sub.businessBarcode
            sub2.id = sub.id
          }
        })
      })

      this.goodsSpecTableData = obj
    },
    // 售后服务绑定值
    serveTypeChange() {
      this.form.serveType = this.serveChecked.join(',')
    },
    restoreChange(val) {
      this.form.restore = val ? 1 : 0
    },
    genuineChange(val) {
      this.form.genuine = val ? 0 : 1
    },
    preView() {
      this.dialogVisible = true
      this.initGoodsSpecTableData()
    },
    saveDraft(isToList) {
      if (!this.form.goodsName) {
        this.$notify({
          title: '提示',
          message: '存草稿时，商品名称必填',
          type: 'warning'
        })
        return
      }
      this.form.isDraft = 1
      this.form.goodsSpecs = this.goodsSpecData
      this.form.goodsSkus = this.goodsSpecTableData
      this.form.cat = (this.form.primaryCgyId && this.form.secondaryCgyId && this.form.thridaryCgyId) ? this.form.primaryCgyId : ''
      if (this.form.cat) {
        this.form.catList = [{
          catId: this.form.primaryCgyId,
          catLevel: '1',
          catName: this.form.primaryCgyName
        }, {
          catId: this.form.secondaryCgyId,
          catLevel: '2',
          catName: this.form.secondaryCgyName
        }, {
          catId: this.form.thridaryCgyId,
          catLevel: '3',
          catName: this.form.thridaryCgyName
        }]
      }
      this.composeCategoryAttributes()
      this.draftLoading = true
      this.save(isToList)
    },
    saveWork() {
      this.form.isDraft = 0
      this.form.goodsSpecs = this.goodsSpecData
      this.form.goodsSkus = this.goodsSpecTableData

      this.form.cat = (this.form.primaryCgyId && this.form.secondaryCgyId && this.form.thridaryCgyId) ? this.form.primaryCgyId : ''
      this.form.catList = [{
        catId: this.form.primaryCgyId,
        catLevel: '1',
        catName: this.form.primaryCgyName
      }, {
        catId: this.form.secondaryCgyId,
        catLevel: '2',
        catName: this.form.secondaryCgyName
      }, {
        catId: this.form.thridaryCgyId,
        catLevel: '3',
        catName: this.form.thridaryCgyName
      }]
      if (!this.checkMust()) {
        return
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          // if (this.checkMust()) {
          this.composeCategoryAttributes()
          this.loading = true
          this.save()
          // }
        } else {
          this.$notify({
            title: '警告',
            message: '请务必填写必填项',
            type: 'warning'
          })
          return false
        }
      })
    },
    save(isToList = 1) {
      this.form.associateGoodsId = this.associateGoods
      if (this.form.goodsGallerys && this.form.goodsGallerys.length > 0) {
        this.form.imgUrl = this.form.goodsGallerys[0].imgUrl
      }
      putObj(this.form).then(data => {
        this.editStatus = false
        this.$notify({
          title: '成功',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        if (isToList) {
          this.$router.push({
            name: 'worksList'
          })
        }
        this.loading = false
        this.draftLoading = false
      }).catch(() => {
        this.loading = false
        this.draftLoading = false
      })
    },
    // 检查其他必填项
    checkMust() {
      let flag = true
      this.categoryAttributesList.map(item => {
        const isMust = !item.isMust && !this.categoryAttributes[item.id]
        const isIdentify = (item.id === '1040' && this.categoryAttributes[item.id] === '1545' && (!this.categoryAttributes.identificationCategoryId || !this.categoryAttributes.authIdentificationId))
        const isAuth = (item.id === '1040' && this.categoryAttributes[item.id] === '1546' && !this.categoryAttributes.identificationCategoryId)
        if (isMust || isIdentify || isAuth) {
          this.$notify({
            title: '提示',
            message: '请完善类目属性必填信息',
            type: 'warning'
          })
          flag = false
        }
      })

      if (!this.goodsSpecData.length || !this.goodsSpecTableData) {
        this.$notify({
          title: '提示',
          message: '请完善销售信息',
          type: 'warning'
        })
        flag = false
      }
      this.goodsSpecTableData.forEach((item, index) => {
        if (item.attrSymbolPath === '' || item.price === '' || item.stock === '') {
          this.$notify({
            title: '提示',
            message: '请完善销售信息',
            type: 'warning'
          })
          flag = false
        }
      })
      return flag
    },
    reset() {
      this.$refs.form.resetFields()
    },
    getImageStyle(picUrl) {
      return {
        backgroundImage: 'url(' + setImg(picUrl, {
          w: 500
        }) + ')'
      }
    },
    onSubmit() {
      this.$router.push({
        name: 'freightList'
      })
    },
    workUploadSuccess(imgs) {
      imgs.forEach((key, i) => {
        this.form.goodsGallerys.push({
          imgUrl: key,
          imgType: i
        })
      })
      if (this.form.goodsGallerys.length > 5) {
        this.form.goodsGallerys.splice(5, this.form.goodsGallerys.length)
        this.$notify({
          title: '提示',
          message: '最多只能添加5张图片，已删除多余图片',
          type: 'warning'
        })
      }
      this.form.imgUrl = this.form.goodsGallerys[0].imgUrl
    },
    videoUploadScccess(key) {
      this.form.videoUrl = key
    },
    onbeforeunloadHandler(next) {
      if (this.editStatus && !this.type) {
        // 此处必须要加延迟执行，主要解决浏览器前进后退带来的闪现
        setTimeout(() => {
          this.$confirm('此页面想询问您是否要离开 - 您输入的数据可能不会被保存。', '温馨提示', {
            confirmButtonText: '离开此页面',
            cancelButtonText: '留在此页面',
            customClass: 'custom-confirm'
          })
            .then(() => {
              next()
            })
            .catch(() => {
              next(false)
            })
        }, 200)
      } else {
        next()
      }
    },
    // 顶部tab切换
    tabClick(vm) {
      const target = document.querySelector(vm.$attrs.target)
      if (target) {
        window.scrollTo(0, target.offsetTop - 120)
      }
    },
    getExChange(goodsSpecData, goodsSpecTableData) {
      this.form.goodsSpecs = goodsSpecData
      this.form.goodsSkus = goodsSpecTableData
    },
    getStock(stock) {
      this.form.stock = stock
    },
    goBack() {
      this.$router.go(-1)
    },
    renderHeaderPrice(h, data) {
      const _this = this
      return h('el-input', {
        attrs: {
          placeholder: '*价格/元'
        },
        domProps: {
          value: this.price
        },
        on: {
          input: function(value) {
            _this.price = value
          }
        }
      })
    },
    renderHeaderStock(h, data) {
      const _this = this
      return h('el-input', {
        attrs: {
          placeholder: '*库存/件'
        },
        domProps: {
          value: this.stock
        },
        on: {
          input: function(value) {
            _this.stock = value
          }
        }
      })
    },
    renderHeaderCode(h, data) {
      const _this = this
      return h('el-input', {
        attrs: {
          placeholder: '商家编码',
          disabled: _this.look
        },
        domProps: {
          value: this.businessCode
        },
        on: {
          input: function(value) {
            _this.businessCode = value
          }
        }
      })
    },
    renderHeaderBarCode(h, data) {
      const _this = this
      return h('el-input', {
        attrs: {
          placeholder: '商品条形码',
          disabled: _this.look
        },
        domProps: {
          value: this.businessBarcode
        },
        on: {
          input: function(value) {
            _this.businessBarcode = value
          }
        }
      })
    },
    checkPrice(rule, value, callback) {
      if (!value || value === '0') {
        return callback(new Error('商品价格不能为空'))
      }
      setTimeout(() => {
        var reg = /^[0-9]+(.[0-9]{1,2})?$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值，如果有小数点则保留两位小数'))
        } else {
          callback()
        }
      }, 200)
    },
    checkOriginalPrice(rule, value, callback) {
      if (!value || value === '0') {
        return callback(new Error('商品原价不能为空'))
      }
      setTimeout(() => {
        var reg = /^[0-9]+(.[0-9]{1,2})?$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值，如果有小数点则保留两位小数'))
        } else {
          callback()
        }
      }, 200)
    },
    checkFreightPrice(rule, value, callback) {
      if (value == undefined || value == null) {
        return callback(new Error('商品运费不能为空'))
      }
      setTimeout(() => {
        var reg = /^[0-9]+(.[0-9]{1,2})?$/
        if (!reg.test(value)) {
          callback(new Error('请输入数字值，如果有小数点则保留两位小数'))
        } else {
          callback()
        }
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
// 商品主图
.pic-item {
  position: relative;
  margin-top: 20px;
  margin-right: 20px;
  .image {
    display: block;
    width: 86px;
    height: 86px;
    border-radius: 8px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
  }
}
.danger {
  color: #f56c6c;
}
.block {
  margin-bottom: 10px;
  background: #fff;
  padding: 10px 120px 20px 20px;
  &.baseInfo {
    padding-top: 30px;
  }
  h4 {
    margin-bottom: 20px;
    line-height: 42px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    border-bottom: 1px solid #f2f2f2;
  }
}

.footer_btn {
  display: flex;
}
.category-attr {
  padding: 30px 0px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.category-attr.sku-box {
  padding: 10px;
  .sku-attr-item {
    display: inline-block;
    margin: 10px 10px 0 0;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    & .custom-item {
      margin-left: 10px;
    }
  }
}
.category-attr-look {
  padding: 0 10px;
  line-height: 32px;
  font-size: 12px;
  color: #333333;
  background: #f2f2f2;
}
.custom-form-item {
  position: relative;
}
.custom-attr {
  position: absolute;
  left: -102px;
  width: 90px;
  height: 36px;
  text-align: right;
}
/deep/ .el-table th {
  background: #f3f3f3;
}
/deep/ .el-table .el-input {
  padding: 0;
  width: 100%;
}
/deep/ .el-checkbox-group {
  font-size: 16px;
}
/deep/ .el-dialog {
  width: 1200px;
}
/deep/ .el-dialog__body {
  padding: 30px 0;
}
.preview-bg {
  position: relative;
  width: 1200px;
  min-height: 883px;
  background-image: url('../../../assets/image/template.jpg');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  & .work-pic {
    position: absolute;
    top: 6px;
    left: 10px;
    width: 500px;
    height: 496px;
  }
  & .right-box {
    position: absolute;
    right: 7px;
    padding: 0 150px;
    width: 684px;
    height: 495px;
    text-align: center;
    & .brandName {
      padding-top: 30px;
    }
    & .goodsName {
      font-size: 20px;
      margin-bottom: 10px;
      line-height: 25px;
    }
    & .goodsBrief {
      font-size: 14px;
      margin-bottom: 40px;
      line-height: 20px;
      height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    & .price-box {
      color: #999999;
      font-size: 12px;
      & .price {
        font-size: 20px;
        font-weight: 600;
        color: red;
      }
    }
  }
  & .sku-box {
    position: absolute;
    top: 520px;
    left: 10px;
    width: 600px;
    font-size: 12px;
    & .sku {
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 20px;
      // width: 280px;
    }
    & .sku-attr {
      display: inline-block;
      padding: 0 5px;
      margin-left: 10px;
      height: 24px;
      text-align: center;
      line-height: 22px;
      border: 1px solid #ccc;
      &.active {
        border-color: #e6b75b;
      }
    }
  }
  & .stock {
    position: absolute;
    top: 532px;
    right: 277px;
  }
  & .storeName {
    overflow: hidden;
    position: absolute;
    top: 620px;
    left: 10px;
    width: 250px;
    text-align: center;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  & .work-info {
    padding-top: 660px;
    margin-left: 280px;
    width: 900px;
    height: 100%;
    & /deep/ img {
      max-width: 100%;
    }
  }
}
.goods-desc /deep/ p {
  margin: 0;
}
.goods-desc /deep/ img {
  max-width: 100%;
}

// 顶部tab栏
/deep/ .el-tabs__nav-wrap::after {
  height: 0;
}
/deep/ .el-tabs__header {
  margin: 0;
}
/deep/ .el-tabs__item {
  padding-left: 20px !important;
  margin: 0 5px;
  width: 129px;
  height: 54px;
  line-height: 54px;
  color: #ffffff;
  background: #287bff;
  border-radius: 8px 8px 0 0;
}
/deep/ .el-tabs--top .el-tabs__item:nth-child(2) {
  margin-left: 0;
}
/deep/ .el-tabs--top .el-tabs__item:nth-child(3) {
  background: #3d87fd;
}
/deep/ .el-tabs--top .el-tabs__item:nth-child(4) {
  background: #609dff;
}
/deep/ .el-tabs--top .el-tabs__item:nth-child(5) {
  background: #79acff;
}
/deep/ .el-tabs--top .el-tabs__item:nth-child(6) {
  background: #94bdff;
}
/deep/ .el-tabs__item.is-active {
  width: 151px;
  margin-right: -5px;
  background: url('../../../assets/image/works/bj_1.png');
  color: #3d87fd;
}
/deep/ .el-tabs__item.is-active:nth-child(3),
/deep/ .el-tabs__item.is-active:nth-child(4),
/deep/ .el-tabs__item.is-active:nth-child(5),
/deep/ .el-tabs__item.is-active:nth-child(6) {
  margin: 0 -5px;
  padding-left: 30px !important;
  width: 160px;
  background: url('../../../assets/image/works/bj.png') !important;
}
/deep/ .el-tabs__active-bar {
  height: 0;
}

// 输入框
.input-value {
  font-size: 12px;
  color: #333333;
}
/deep/ .el-input {
  width: 640px;
  font-size: 12px;
}
/deep/ .freight-input.el-input {
  width: 200px;
}
/deep/ .short-input .el-input {
  margin-right: 17px;
  width: 200px;
}
/deep/ .category-attr-input.el-input,
/deep/ .category-attr-input .el-input {
  margin-bottom: 10px;
  width: 200px;
}
</style>
