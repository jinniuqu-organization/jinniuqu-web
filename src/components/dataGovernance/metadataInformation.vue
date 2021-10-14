<template>
	<div class="metadataInformation">
		<div class="card" v-for="(item, index) in metadata" :key="index" @click="showInfo(item)">
			<div class="title">
				{{item.cnName | nullFilter}}
			</div>
			<div class="biaoshi">
				内部标识符：{{item.internalIdentifier | nullFilter}}
			</div>
			<div class="zhiyu">
				值域：{{item.domain | nullFilter}}
			</div>
			<div class="jigou">
				提交机构：{{item.submitInstitutions | nullFilter}}
			</div>
		</div>
		<el-dialog :visible.sync="infoFlag" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeDialog">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">中文名称</th>
					<td width="38%">{{dialogData.cnName | nullFilter}}<td>
					<th width="12%">说明</th>
					<td width="38%">{{dialogData.illustrate | nullFilter}}</td>
				</tr>
				<tr class="double" align="center">
					<th width="12%">英文名称</th>
					<td width="38%">{{dialogData.enName | nullFilter}}</td>
					<th width="12%">表示词</th>
					<td width="38%">{{dialogData.denote | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">汉语拼音缩写</th>
					<td width="38%">{{dialogData.cnTranslateAbbr | nullFilter}}</td>
					<th width="12%">数据类型</th>
					<td width="38%">{{dialogData.dataType | nullFilter}}</td>
				</tr>
				<tr class="double" align="center">
					<th width="12%">内部标识符</th>
					<td width="38%">{{dialogData.internalIdentifier | nullFilter}}</td>
					<th width="12%">数据格式</th>
					<td width="38%">{{dialogData.dataFormat | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">中文全拼</th>
					<td width="38%">{{dialogData.cnTranslate | nullFilter}}</td>
					<th width="12%">值域</th>
					<td width="38%">{{dialogData.domain | nullFilter}}</td>
				</tr>
				<tr class="double" align="center">
					<th width="12%">元数据类型</th>
					<td width="38%">{{dialogData.metaType | nullFilter}}</td>
					<th width="12%">提交机构</th>
					<td width="38%">{{dialogData.submitInstitutions | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
	</div>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {

		components: {},
		data() {
			return {
				// 对话框
				infoFlag: false,
			}
		},
		computed: {

			...mapState({
				metadata: state => state.dataGovernance.metadata,
				metaType: state => state.dataGovernance.metaType,
				dialogItem: state => state.dataGovernance.dialogItem,
				dialogData: state => state.dataGovernance.dialogData,
			}),
		},
		mounted() {

		},
		methods: {
			...mapActions({
				getMetaInfo: 'dataGovernance/getMetaInfo',
			}),
			// 查看详情
			showInfo(item) {
				this.infoFlag = true
				let query = {
					dataType: this.metaType,
					cnName: item.cnName
				}
				this.getMetaInfo(query)
			},
			//关闭对话框
			closeDialog() {
				this.infoFlag = false
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.metadataInformation {
		width: 100%;
		height: 100%;
		padding: 1% 2.7% 3% 0.2%;
		position: relative;
		overflow: scroll;
		display: flex;
		flex-flow: row wrap;
		// 固定尺寸 不伸缩
		flex: none;

		.card {
			width: 22.5%;
			height: 29%;
			margin-left: 2.5%;
			margin-bottom: 1.5%;
			// border: 2px solid #14377D;
			position: relative;
			cursor: pointer;
			white-space: nowrap;
			background: url('../../assets/metadataBack.png');
			background-size: 100% 100%;

			.title {
				width: 90%;
				height: 20%;
				padding-left: 5%;
				margin-top: 2%;
				color: #04FCFF;
				font-weight: bold;
				font-size: 1.5rem;
				font-family: SOURCEHANSANSCN-MEDIUM;
				text-align: center;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.biaoshi,
			.zhiyu,
			.jigou {
				position: absolute;
				color: #FFFFFF;
				font-size: 1.125rem;
				padding-left: 8%;
				width: 90%;
				height: 20%;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			.biaoshi::before,
			.zhiyu::before,
			.jigou::before {
				content: "";
				width: 3.5%;
				height: 32%;
				position: absolute;
				background: #04FCFF;
				left: 4%;
				top: 17%;
				border-radius: 65px;
				box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
				font-family: SOURCEHANSANSCN-REGULAR;
				// box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
			}

			.biaoshi {
				top: 30%;
			}

			.zhiyu {
				top: 51%;
			}

			.jigou {
				top: 73%;
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
			padding-top: 5.6%;
			padding-bottom: 5.6%;
			padding-left: 0.2%;
			padding-right: 0.2%;
			table {
				// margin-top: 10%;
				width: 100%;
				height: 100%;
				// table-layout: fixed;
				border: none;

				tr {
					// height: 16.6%;
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
					// background: url('../../assets/qian.png');
					background: url('../../assets/tiao.png');
					background-size: 100% 100%;
				}
				.double {
					// background: url('../../assets/shen.png');
					// background: url('../../assets/tiao.png');
					// background-size: 100% 100%;
				}
			}
		}
	}

	//去掉滚动条
	.metadataInformation::-webkit-scrollbar {
		display: none;
	}
</style>
