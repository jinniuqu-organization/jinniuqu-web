<template>
	<div class="content1">
		<div class="date">
			<div class="totalData">
				<div>{{date | dateFilter(1)}}</div>
				<div class="grey">{{date | dateFilter(2)}}</div>
			</div>
		</div>
		<div class="tableData" :style="{backgroundImage: 'url(' + (showType == '人口' ? src3 : src4) + ')'}">
			<table width="100%" v-if="showType == '人口'">
				<tr class="tr1" align="center">
					<th width="4.7%">
						姓名
					</th>
					<th width="4.6%">
						性别
					</th>
					<th width="12.5%">
						身份证号
					</th>
					<td width="5.2%">
						民族
					</td>
					<th width="8.5%">
						出生日期
					</th>
					<th width="8.1%">
						文化程度
					</th>
					<th width="8.0%">
						政治面貌
					</th>
					<th width="8.0%">
						婚姻状态
					</th>
					<th width="7.6%">
						个人户籍状态
					</th>
					<th width="12.8%">
						户籍地址
					</th>
					<th width="12.4%">
						现居住地址
					</th>
					<th width="4%">
						版本号
					</th>
				</tr>
				<tr class="tr2" align="center">
					<td v-for="(value, key, index) in historyTableItem">
						\
					</td>
				</tr>
			</table>
			<table width="100%" v-if="showType == '法人'">
				<tr class="tr1" align="center">
					<th width="7.66%">
						<!-- 统一社会 -->
						信用代码
					</th>
					<th width="10%">
						企业名称
					</th>
					<th width="6.8%">
						企业类型
					</th>
					<td width="6.2%">
						<!-- 企业 -->
						法人姓名
					</td>
					<th width="9.3%">
						经营范围
					</th>
					<th width="10%">
						行业门类
					</th>
					<th width="6.5%">
						成立时间
					</th>
					<th width="6.5%">
						存续状态
					</th>
					<th width="8%">
						营业(有效)结束日期
					</th>
					<th width="17.5%">
						住所信息
					</th>
					<th width="9.6%">
						联系电话
					</th>
					<th width="4.7%">
						版本号
					</th>
				</tr>
				<tr class="tr2" align="center">
					<td v-for="(value, key, index) in historyTableItem1">
						\
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	import {
		getNowDate
	} from '../../utils/tool.js'
	export default {
		props: ['tableItem'],
		data() {
			return {
				date: '',
				src3: require('../../assets/history3Back.png'),
				src4: require('../../assets/history4Back.png')
			}
		},
		computed: {
			...mapState({
				//历史数据
				showType: state => state.dataGovernance.showType,
			}),
			...mapGetters({
				//历史数据
				historyTableItem: 'dataGovernance/historyTableItem',
				historyTableItem1: 'dataGovernance/historyTableItem1',
			})
		},
		mounted() {
			this.date = getNowDate(new Date())
			// this.date = 2018-12-12
		}
	}
</script>

<style lang="less" scoped="scoped">
	.content1 {
		width: 100%;
		height: 25%;
		position: relative;

		.date {
			position: absolute;
			width: 7%;
			height: 75%;
			top: 7.6%;
			left: 1%;
			background: url('../../assets/lishi_2.png') no-repeat;
			background-size: 100% 100%;

			// 数据总量
			.totalData {
				position: absolute;
				top: 30%;
				left: 32%;
				font-size: 1rem;
				color: #FFFFFF;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				//灰色
				.grey {
					color: #78797A;
				}
			}
		}

		.tableData {
			top: 4%;
			left: 8.5%;
			position: absolute;
			width: 93%;
			height: 80%;
			background-size: 100% 100%;

			table tr td,
			table tr th {
				// background: #1C203A;
				// border: 2px solid #5D6164;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			table {
				height: 100%;
				// border-collapse: separate;
				// border-collapse: collapse;
				table-layout: fixed;
			}

			.tr1 {

				td,
				th {
					color: #78797A;
					font-weight: bold;
					font-size: 1.25rem;
				}
			}

			.tr2 {
				td {
					color: #FFFFFF;
					font-weight: medium;
				}

				th {
					color: #04FCFF;
					font-weight: bold;
				}

				td,
				th {
					font-size: 1rem;
				}
			}
		}
	}
</style>
