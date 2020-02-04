<template>
  <div>
    <BannerSettings :getBanners="getBanners" :saveBanners="saveBanners" />
    <JewelryTalent/>
  </div>
</template>

<script>
import BannerSettings from '@/components/app/bannerSettings/banner'
import { getBanners, saveBanners } from '@/api/swap/homeSettings'
import JewelryTalent from '@/views/dm/homeSettings/components/jewelryTalent'

export default {
  components: {
    BannerSettings,
    JewelryTalent
  },
  methods: {
    getBanners,
    saveBanners
  }
}
</script>
