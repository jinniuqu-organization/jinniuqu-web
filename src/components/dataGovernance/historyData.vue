<template>
	<div class="content1">
		<div class="date">
			<div class="totalData">
				<div>{{versionData.updateTime | dateFilter(1)}}</div>
				<div class="blue">{{versionData.updateTime | dateFilter(2)}}</div>
			</div>
		</div>
		<div class="tableData" :style="{backgroundImage: 'url(' + (showType == '人口' ? src1 : src2) + ')'}">
			<table width="100%" v-if="showType == '人口'" @click="showHistoryInfo1">
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
					<td>
						{{versionData.name | nullFilter}}
					</td>
					<td>
						{{versionData.sex | nullFilter}}
					</td>
					<td>
						{{versionData.idCard | nullFilter}}
					</td>
					<td>
						{{versionData.nationality | nullFilter}}
					</td>
					<td>
						{{versionData.birthDate | nullFilter}}
					</td>
					<td>
						{{versionData.eduLevel | nullFilter}}
					</td>
					<td>
						{{versionData.polity | nullFilter}}
					</td>
					<td>
						{{versionData.marriageType | nullFilter}}
					</td>
					<td>
						{{versionData.rprStatus | nullFilter}}
					</td>
					<td>
						{{versionData.rprAddress | nullFilter}}
					</td>
					<td>
						{{versionData.presentAddress | nullFilter}}
					</td>
					<td>
						{{versionData.dataVersion | nullFilter}}
					</td>
				</tr>
			</table>

			<table width="100%" v-if="showType == '法人'" @click="showHistoryInfo2">
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
					<td>
						{{versionData.unifyCode | nullFilter}}
					</td>
					<td>
						{{versionData.orgName | nullFilter}}
					</td>
					<td>
						{{versionData.orgType | nullFilter}}
					</td>
					<td>
						{{versionData.legalperson | nullFilter}}
					</td>
					<td>
						{{versionData.bussinessScope | nullFilter}}
					</td>
					<td>
						{{versionData.jylb | nullFilter}}
					</td>
					<td>
						{{versionData.clDate | nullFilter}}
					</td>
					<td>
						{{versionData.epState | nullFilter}}
					</td>
					<td>
						{{versionData.valiDate | nullFilter}}
					</td>
					<td>
						{{versionData.regAddress | nullFilter}}
					</td>
					<td>
						{{versionData.telephone | nullFilter}}
					</td>
					<td>
						{{versionData.dataVersion | nullFilter}}
					</td>
				</tr>
			</table>
		</div>
		<el-dialog :visible.sync="historyFlag1" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeHistoryDialog1">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">姓名</th>
					<td width="38%">{{versionData.name | nullFilter}}</td>
					<th width="12%">政治面貌</th>
					<td width="38%">{{versionData.polity | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">性别</th>
					<td width="38%">{{versionData.sex | nullFilter}}</td>
					<th width="12%">婚姻状态</th>
					<td width="38%">{{versionData.marriageType | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">身份证号</th>
					<td width="38%">{{versionData.idCard | nullFilter}}</td>
					<th width="12%">个人户籍状态</th>
					<td width="38%">{{versionData.rprStatus | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">民族</th>
					<td width="38%">{{versionData.nationality | nullFilter}}</td>
					<th width="12%">户籍地址</th>
					<td width="38%">{{versionData.rprAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">出生日期</th>
					<td width="38%">{{versionData.birthDate | nullFilter}}</td>
					<th width="12%">现居住地址</th>
					<td width="38%">{{versionData.presentAddress | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">文化程度</th>
					<td width="38%">{{versionData.eduLevel | nullFilter}}</td>
					<th width="12%">版本号</th>
					<td width="38%">{{versionData.dataVersion | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
		<el-dialog :visible.sync="historyFlag2" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeHistoryDialog2">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">社会信用代码</th>
					<td width="38%">{{versionData.unifyCode | nullFilter}}
					<td>
					<th width="12%">成立时间</th>
					<td width="38%">{{versionData.clDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业名称</th>
					<td width="38%">{{versionData.orgName | nullFilter}}</td>
					<th width="12%">存续状态</th>
					<td width="38%">{{versionData.epState | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">企业类型</th>
					<td width="38%">{{versionData.orgType | nullFilter}}</td>
					<th width="12%">营业(有效)结束日期</th>
					<td width="38%">{{versionData.valiDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业法人姓名</th>
					<td width="38%">{{versionData.legalperson | nullFilter}}</td>
					<th width="12%">住所信息</th>
					<td width="38%">{{versionData.regAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">经营范围</th>
					<td width="38%">{{versionData.bussinessScope | nullFilter}}</td>
					<th width="12%">联系电话</th>
					<td width="38%">{{versionData.telephone | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">行业门类</th>
					<td width="38%">{{versionData.jylb | nullFilter}}</td>
					<th width="12%">版本号</th>
					<td width="38%">{{versionData.dataVersion | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	export default {
		props: ['versionData', 'tableItem'],
		data() {
			return {
				src1: require('../../assets/historyBack.png'),
				src2: require('../../assets/history2Back.png'),
				historyFlag1: false,
				historyFlag2: false,
			}
		},
		mounted() {
		},
		methods:{
			// 查看详情
			showHistoryInfo1() {
				this.historyFlag1 = true
			},
			showHistoryInfo2() {
				this.historyFlag2 = true
			},
			//关闭对话框
			closeHistoryDialog1() {
				this.historyFlag1 = false
			},
			//关闭对话框
			closeHistoryDialog2() {
				this.historyFlag2 = false
			},
		},
		computed: {

			...mapState({
				showType: state => state.dataGovernance.showType,
			}),
		},
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
			background: url('../../assets/lishi_1.png') no-repeat;
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

				// 蓝色
				.blue {
					color: rgba(0, 255, 234, 1);
				}
			}
		}

		.tableData {
			top: 4%;
			left: 8.5%;
			position: absolute;
			width: 93%;
			height: 80%;
			// background: url('../../assets/historyBack.png');
			background-size: 100% 100%;
			
			table tr td,
			table tr th {
				// background: rgba(4, 31, 69, 0.41);
				// border: 2px solid rgba(16, 77, 164, 1);
			}

			table {
				height: 100%;
				// width: 100%;
				// border-collapse: collapse;
				// border-collapse: separate;
				table-layout: fixed;
				cursor: pointer;
			}

			.tr1 {

				td,
				th {
					// border: 1px solid white;
					color: #04FCFF;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 1.25rem;
				}
			}

			.tr2 {

				td,
				th {
					// border: 1px solid white;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 1rem;
					padding-left: 0.4%;
					padding-right: 0.1%;
				}

				td {
					color: #FFFFFF;
					font-weight: medium;
					cursor: pointer;
				}

				th {
					color: #04FCFF;
					font-weight: bold;
				}
			}
		}
		.info2 /deep/ .el-dialog {
			opacity: 1;
			width: 56%;
			height: 39.44%;
			background: url('../../assets/info4Back.png');
			background-size: 100% 100%;
		}
		
		.info2 {
		
			// 右上角关闭按钮
			.closeBtn {
				width: 2%;
				height: 5%;
				background: url(../../assets/closeBtn.png) no-repeat;
				background-size: 100% 100%;
				opacity: 0.35;
				position: absolute;
				top: 2%;
				right: 1%;
				cursor: pointer;
				z-index: 99;
			}
		}
		
		.info2 /deep/ .el-dialog__header {
			display: none;
		}
		
		.info2 /deep/ .el-dialog__body {
			width: 100%;
			height: 100%;
			padding: 5.6% 0.2% 5.6% 0.2%;
		
			// overflow: hidden;
			table {
				width: 100%;
				height: 100%;
				border: none;
		
				tr {
		
					font-size: 1.125rem;
		
					th {
						font-weight: bold;
						color: #04FCFF;
						padding-left: 0.6%;
					}
		
					td {
						font-weight: 500;
						color: #FFFFFF;
					}
				}
		
				.single {
					background: url('../../assets/tiao.png');
					background-size: 100% 100%;
				}
			}
		}
	}
</style>
