<template>
	<div ref="main" style="width:80%;height:600px;" class="ct">
	 	
	</div>
</template>
<script>
	import e from 'echarts'
	export default {
    	name: 'echarts',
    	props:['xAxis','series'],
    	data(){
    		return {
    			myChart:null,
    			option:{
				    legend: {
				        data:['点击数','点赞数','评论数']
				    },
				    xAxis: {
				        data: null
				    },
				    yAxis: {},
				    series: null
				}
    		}
    	},
    	watch: {
		    xAxis(){
		    	this.setOption()
	      		this.myChart.setOption(this.option)
		    },
		    series(){
		    	this.setOption()
	      		this.myChart.setOption(this.option)
		    }
		},
	    methods:{
	    	setOption(){
	    		this.option.xAxis.data = this.xAxis
	    		this.option.series = this.series.map(function(item){
	    			item.type = 'line'
	    			return item
	    		})
	    	}
	    },
	    mounted() {
	      	this.myChart = e.init(this.$refs.main)
	      	this.setOption()
	      	this.myChart.setOption(this.option)
	    },
  	}
</script>

<style>
	.ct{
		margin-top:40px;
	}
</style>