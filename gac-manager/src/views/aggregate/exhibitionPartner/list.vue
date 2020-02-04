<template>
	<div class="app-container calendar-list-container">
		<div class="filter-container">
			<label class="filter-label">展会名称：</label>
			<el-input @keyup.enter.native="handleFilter" style="width: 195px;" v-model="listQuery.title"> </el-input>

			&nbsp;
			<label class="filter-label">状态：</label>
			<el-select v-model="listQuery.past" clearable placeholder="状态">
				<el-option v-for="(item, index) in past" :key="index" :label="item.name" :value="item.value">
				</el-option>
			</el-select>

			&nbsp;
			<label class="filter-label">时间：</label>
			<el-date-picker v-model="dateValue" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
			</el-date-picker>

		</div>

		<div class="filter-container">
			<el-button type="primary" v-waves @click="$router.push({ name: 'addExhibitionPartner' })">新建展会</el-button>
			<el-button type="primary" icon="el-icon-search" v-waves @click="handleFilter">查询</el-button>
			<el-button type="text" @click="resetQuery">清空条件</el-button>
		</div>

		<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

			<el-table-column width="100px" align="center" label="序号">
				<template slot-scope="{ row }">
					<span>{{row.id}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="会展名称">
				<template slot-scope="{ row }">
					<span>{{row.title}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="地区">
				<template slot-scope="{ row }">
					<span>{{row.regionName}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="展会图片">
				<template slot-scope="{ row }">
					<img :src="row.showPrint | setImg({ w: 300 })" style="max-width: 100%" />
				</template>
			</el-table-column>

			<el-table-column width="300px" align="center" label="展示周期">
				<template slot-scope="{ row }">
					<span>{{row.startTime}} - {{row.finishTime}}</span>
				</template>
			</el-table-column>

			<el-table-column width="110px" align="center" label="状态">
				<template slot-scope="{ row }">
					<span>{{showState[row.past]}}</span>
				</template>
			</el-table-column>

			<el-table-column fixed="right" align="left" label="操作">
				<template slot-scope="{ row, $index }">
					<el-button size="small" v-if="row.stick == 1" @click="delStick(row.id,'0')">取消置顶</el-button>
					<el-button size="small" v-if="row.stick == 0" @click="delStick(row.id,'1')">置顶</el-button>
					<el-button size="small" @click="getPersonne(row.id)">查看预约人员</el-button>
					<el-button size="small" type="primary" @click="$router.push({ name: 'newaddExhibitionPartner', query: { id: row.id } })">编辑</el-button>
					<el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div v-show="!listLoading" class="pagination-container">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.offset" :page-sizes="[10,20,30,50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
		</div>
		<el-dialog title="预约人名单" :visible.sync="Personne">
			<el-table :data="gridData">
				<el-table-column property="reName" label="姓名"></el-table-column>
				<el-table-column property="rePhone" label="手机号"></el-table-column>
				<el-table-column property="reSex" label="性别">
					<template slot-scope="scope" >
						{{sex[scope.row.reSex]}}
					</template>
				</el-table-column>
				<el-table-column property="reEmail" label="邮箱"></el-table-column>
				<el-table-column property="reFollow" label="关注珠宝种类"></el-table-column>
				<el-table-column property="reAdress" label="个人地址"></el-table-column>
				<el-table-column property="reZipcode" label="邮编"></el-table-column>
			</el-table>
			<div v-show="!listLoading" class="pagination-container">
				<el-pagination @size-change="handleSize" @current-change="handleCurrent" :current-page.sync="Query.offset" :page-sizes="[10,20,30,50]" :page-size="Query.limit" layout="total, sizes, prev, pager, next, jumper" :total="totals"> </el-pagination>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		page,
		delObj,
		allLength,
		Stick,
		subscribeListNum,
		subscribeList
	} from '@/api/aggregate/exhibition'
	import waves from '@/directive/waves' // 水波纹指令

	const getInitQuery = () => {
		return {
			offset: 1,
			limit: 20,
			past: undefined, // 状态 showStatus
			title: undefined, // name
			startTime: undefined,
			finishTime: undefined // nedTime
		}
	}

	export default {
		directives: {
			waves
		},
		data() {
			return {
				sex: ['','男','女'],
				past: [{
						name: '展示',
						value: 1
					},
					{
						name: '过期',
						value: 0
					}
				],
				showState: {
					1: '展示',
					0: '过期'
				},
				Query: {
					limit: 20,
					offset: 1,
				},
				gridData: [],
				list: null,
				total: null,
				totals: null,
				listLoading: true,
				listQuery: getInitQuery(),
				tableKey: 0,
				dateValue: '',
				Personne: false,
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
							picker.$emit('pick', [start, end])
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date()
							const start = new Date()
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
							picker.$emit('pick', [start, end])
						}
					}]
				},
				pdzhid: []
			}
		},
		computed: {},
		watch: {
			dateValue(value) {
				this.listQuery.startTime = value ? value[0] : undefined
				this.listQuery.finishTime = value ? value[1] : undefined
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.listLoading = true
				this.allLength()
				this.listQuery.startTime = this.listQuery.startTime ? this.listQuery.startTime.split(' ')[0] : undefined
				this.listQuery.finishTime = this.listQuery.finishTime ? this.listQuery.finishTime.split(' ')[0] : undefined
				page(this.listQuery)
					.then(data => {
						this.list = data.data
						this.pdzhid = []
						this.list.map(item => {
							if(item.stick == 1){
								this.pdzhid.push(true)
							}
						})
						console.log(this.pdzhid)
						// this.total = data.data.total
						this.listLoading = false
					})
			},
			getsubList(ids) {
				subscribeList(this.Query, ids).then(res => {
					if(res.success) {
						console.log(res.data, 4444)
						this.gridData = res.data
					}
				})
			},
			getPersonne(id) {
				this.Personne = true
				subscribeListNum(id).then(({
					data
				}) => {

					this.totals = data
				})
				this.getsubList(id)
			},
			allLength() {
				let {
					title,
					past,
					startTime,
					finishTime
				} = this.listQuery
				let all = {
					title,
					past,
					startTime,
					finishTime
				}
				allLength(all).then(({
					data
				}) => {
					this.total = data
				})
			},
			handleFilter() {
				this.getList()
			},
			handleSizeChange(val) {
				this.listQuery.limit = val
				this.getList()
			},
			handleCurrentChange(val) {
				this.listQuery.offset = val
				this.getList()
			},
			handleSize(val) {
				this.Query.limit = val
				// this.getList()
			},
			handleCurrent(val) {
				this.Query.offset = val
				// this.getList()
			},
			handleDelete(row) {
				this.$confirm(`确定删除当前展会？`, '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					.then(() => {
						delObj(row.id)
							.then(() => {
								this.$notify({
									title: '成功',
									message: '删除成功',
									type: 'success',
									duration: 2000
								})
								const index = this.list.indexOf(row)
								this.list.splice(index, 1)
							})
					})
			},
			resetQuery() {
				this.listQuery = getInitQuery()
				this.dateValue = ''
			},
			delStick(id, stick) {
				let params = {
					id,
					stick
				}
				if(stick == 0) {
					Stick(params).then(res => {
						if(res.success) {
							this.pdzhid = this.pdzhid.pop()
							this.$message({
								type: 'success',
								message: '取消置顶成功'
							})
						}
					})
				} else if(stick == 1) {
					if(this.pdzhid.length < 4) {
						Stick(params).then(res => {
							this.pdzhid.push(true)
							if(res.success) {
								this.$message({
									type: 'success',
									message: '修改成功'
								})
							}
						})
					}else{
						this.$message({
								type: 'success',
								message: '最多只能有四个置顶'
							})
					}

				}
				this.getList()
			}
		}
	}
</script>

<style lang="postcss" scoped>
	.filter-label {
		font-size: 14px;
		color: #909399;
		font-weight: normal;
	}
	
	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}
	
	.el-icon-arrow-down {
		font-size: 12px;
	}
</style>