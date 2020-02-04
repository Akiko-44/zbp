<template>
	<div>
		<template v-if="type==1">
			<twg :data="data"/>
		</template>
		<template v-if="type==2">
			<hyzs :data="data"/>
		</template>
		<template v-if="type==3">
			<zbz :data="data" :position="position"/>
		</template>
	</div>
</template>
<script>
import Twg from './twg'
import Hyzs from './hyzs'
import Zbz from './zbz'
export default {
	props: ['type','data','position'],
  	components: {
	    Twg,Hyzs,Zbz
	}
}
</script>
<style>

</style>