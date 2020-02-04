<template>
<div>
  <BannerSettings :getBanners="getBanners" :saveBanners="saveBanners" />
  <RecommendSetting
    title="设计室"
    :getData="getHomeDesignroomList"
    :setData="homeDesignroomSetting"
    :min="5"
    :width="390"
    :height="200"
    :fields="{id: 'designroomId', thumbnail: 'homePic'}"
  />
  <RecommendSetting
    title="制造间"
    :getData="getHomeManuList"
    :setData="homeManuSetting"
    :min="5"
    :width="390"
    :height="200"
    :fields="{id: 'manuId', thumbnail: 'homePic'}"
  />
  <RecommendSetting
    title="图文馆"
    :getData="getHomeGalleryList"
    :setData="homeGallerySetting"
    :min="8"
    :fields="{id: 'galleryId', thumbnail: 'homePic'}"
  />
  <RecommendSetting
    title="行业之声"
    :getData="getHomeIndustryList"
    :setData="homeIndustrySetting"
    :min="4"
    :fields="{id: 'industryId', thumbnail: 'homePic'}"
  >
    <el-table-column width="180px" align="center" label="标题">
      <template slot-scope="{ row }">
        <el-input v-model="row.title" :placeholder="'请输入标题'"></el-input>
      </template>
    </el-table-column>
  </RecommendSetting> 
  <RecommendSetting
    title="珠宝展"
    :getData="getHomeLiveshowList"
    :setData="homeLiveshowSetting"
    :min="4"
    :fields="{id: 'liveshowId', thumbnail: 'homePic'}"
  /> 
</div>
</template>

<script>
import BannerSettings from '@/components/app/bannerSettings/banner'
import RecommendSetting from '@/components/app/recommend'
import {
  getBanners, saveBanners,
  homeDesignroomSetting, getHomeDesignroomList,
  homeManuSetting, getHomeManuList,
  homeGallerySetting, getHomeGalleryList,
  homeIndustrySetting, getHomeIndustryList,
  homeLiveshowSetting, getHomeLiveshowList
} from '@/api/public/homeSettings'

export default {
  components: {
    BannerSettings,
    RecommendSetting
  },
  methods: {
    getBanners, saveBanners,
    homeDesignroomSetting, getHomeDesignroomList,
    homeManuSetting, getHomeManuList,
    homeGallerySetting, getHomeGalleryList,
    homeIndustrySetting, getHomeIndustryList,
    homeLiveshowSetting, getHomeLiveshowList
  }
}
</script>
