<template>
	<div class="dataHistoryVersion">
		<div class="lineLeft"></div>
		<div class="content">
			<HistoryData :tableItem="historyTableItem" v-for="(item, index) in historyData" :versionData="item" :key="index">
			</HistoryData>
			<EmptyHistoryData :tableItem="historyTableItem" v-if="index < emptyCount" v-for="(item, index) in [1,2,3,4]" :key="'a'+index">
			</EmptyHistoryData>
		</div>
	</div>
</template>

<script>
	// 历史数据组件
	import HistoryData from './historyData.vue'
	import EmptyHistoryData from './emptyHistoryData.vue'
	import {
		mapActions,
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {

		components: {
			HistoryData,
			EmptyHistoryData
		},
		data() {
			return {
				length: 0
			}
		},
		created() {

		},
		methods: {},
		mounted() {},
		computed: {
			...mapState({
				//历史数据
				historyData: state => state.dataGovernance.historyData,
				// 历史空数据条数
				emptyCount: state => state.dataGovernance.emptyCount,
			}),
			...mapGetters(
				// 元数据信息搜索条件值
				{
					historyTableItem: 'dataGovernance/historyTableItem',
				})
		}
	}
</script>

<style lang="less" scoped="scoped">
	.dataHistoryVersion {
		width: 100%;
		height: 100%;
		padding: 2%;
		padding-top: 1.5%;
		position: relative;
		font-family: SOURCEHANSANSCN-REGULAR;

		.lineLeft {
			width: 1.4%;
			height: 70%;
			background: url('../../assets/lishi.png') no-repeat;
			background-size: 100% 100%;
			position: absolute;
			top: 13%;
			left: 1%;
		}

		.content {
			position: relative;
			width: 98%;
			height: 100%;

			.content1 {
				width: 100%;
				height: 25%;
				position: relative;

				.date {
					position: absolute;
					width: 7%;
					height: 82%;
					top: 5.5%;
					left: 1%;
					background: url('../../assets/lishi_1.png') no-repeat;
					background-size: 100% 100%;

					// 数据总量
					.totalData {
						position: absolute;
						top: 30%;
						left: 32%;
						font-size: 16px;
						color: #FFFFFF;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
					}
				}

				.tableData {
					top: 3%;
					left: 8.5%;
					position: absolute;
					width: 93.8%;
					height: 80%;

					table tr td,
					table tr th {
						background: rgba(4, 31, 69, 0.41);
						border: 2px solid rgba(16, 77, 164, 1);
					}

					table {
						height: 100%;
						border-collapse: collapse;
						table-layout: fixed;
					}

					.tr1 {

						td,
						th {
							color: #04FCFF;
							font-weight: bold;
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
					}
				}
			}
		}

		// 字体样式
		// 蓝色
		.blue {
			color: rgba(0, 255, 234, 1);
		}

		// 黄色
		.yellow {
			color: rgba(253, 183, 47, 1);
		}

		// 发光
		.faguang {
			color: rgba(254, 254, 255, 1);
		}
	}
</style>
