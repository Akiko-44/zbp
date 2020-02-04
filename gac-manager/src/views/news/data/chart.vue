<template>
	<el-container style="padding:0 20px">
		<el-header class="header">
			<el-col :span="12" class="search">
				<el-button type="text" @click="to7">最近7天</el-button>
				<el-button type="text" @click="to30">最近30天</el-button>
				<el-date-picker
			      v-model="date1"
			      type="date"
			      class="bt"
			      value-format="yyyy-MM-dd"
			      placeholder="开始日期">
			   </el-date-picker> 	
			    <el-date-picker
			      v-model="date2"
			      type="date"
			      value-format="yyyy-MM-dd"
			      placeholder="结束日期">
			    </el-date-picker>
				<el-button type="primary" class="tn" icon="el-icon-search" @click="search">搜索</el-button>
	
			</el-col>
		</el-header>
		<echarts :xAxis="xAxis" :series="series"/>
	</el-container>
</template>

<script>
	import echarts from './echarts'
	import { getSeries } from '@/api/news/data'
	export default {
    	name: 'chart',
    	data(){
    		return {
    			date1:null,
    			date2:null,
    			start:null,
    			end:null,
    			series:[
	    			{
				        name: '点击数',
				        data: [200, 132, 366, 140, 210, 245, 800]
				    },
				    {
				        name: '点赞数',
				        data: [521, 220, 336, 120, 110, 240, 234]
				    },
				    {
				        name: '评论数',
				        data: [25, 240, 316, 120, 130, 250, 50]
				    }
    			]
    		}
    	},
    	components: {
			echarts
		},
		computed:{
			xAxis(){
	            let result = []
	            if(this.start && this.end){
	            	let beginDay = this.start.split("-")
		            let endDay = this.end.split("-")
		            let diffDay = new Date()
		            let dateList = new Array
		            let i = 0
		            diffDay.setDate(beginDay[2])
		            diffDay.setMonth(beginDay[1]-1)
		            diffDay.setFullYear(beginDay[0])
		            result.push(this.start)
		            while(i == 0){
		                let countDay = diffDay.getTime() + 24 * 60 * 60 * 1000
		                diffDay.setTime(countDay)
		                dateList[2] = diffDay.getDate()
		                dateList[1] = diffDay.getMonth() + 1
		                dateList[0] = diffDay.getFullYear()
		                if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]}
		                if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]}
		                result.push(dateList[0]+"-"+dateList[1]+"-"+dateList[2])
		                if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1
		                }
		            }
	            }
	            return result
	       }
		},
	    methods:{
	    	getSeries,
	    	getNowFormatDate(aa){
		        let date1 = new Date(),
		        time1=date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate()
		        let date2 = new Date(date1)
		        date2.setDate(date1.getDate()+aa)
		        let time2 = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate()
		        return time2
		    },
		    to7(){
		    	this.init(this.getNowFormatDate(-6),this.getNowFormatDate(0))
		    },
		    to30(){
		    	this.init(this.getNowFormatDate(-29),this.getNowFormatDate(0))
		    },
	    	search(){
	    		this.start = this.date1
				this.end = this.date2
				this.init(this.date1,this.date2)
	    	},
	    	async init(startTime,endTime){
	    		let { data } = await getSeries({startTime,endTime})
	    		if(data[0]=='') data = []
	    		this.start = startTime
				this.end = endTime
	    		console.log(data)
	    	}
	    },
	    created() {
			this.init(this.getNowFormatDate(-6),this.getNowFormatDate(0))
	    },
  	}
</script>

<style scoped>
	.header{
		margin:20px 0;
	}
	.bt{
		margin-left:10px;
	}
	.tn{
		margin-left:4px;
	}
</style>