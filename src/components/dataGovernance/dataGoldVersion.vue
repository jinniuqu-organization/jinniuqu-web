<template>
	<div class="dataGoldVersion" :style="{backgroundImage: 'url(' + (showType == '人口' ? src1 : src2) + ')'}">
		<div class="table">
			<div :class="originalData.length>3 ? 'left' : 'leftDisabled'" @click="toLeft"></div>
			<div :class="originalData.length>3 ?'right' : 'rightDisabled'" @click="toRight"></div>
			<table width="100%" v-if="showType == '人口'" @click="showGoldInfo1">
				<tr class="tr1" align="center">
					<th width="4.65%">
						姓名
					</th>
					<th width="4.37%">
						性别
					</th>
					<th width="13.63%">
						身份证号
					</th>
					<td width="4.75%">
						民族
					</td>
					<th width="7.93%">
						出生日期
					</th>
					<th width="7.5%">
						文化程度
					</th>
					<th width="7.5%">
						政治面貌
					</th>
					<th width="7.5%">
						婚姻状态
					</th>
					<th width="9.84%">
						个人户籍状态
					</th>
					<th width="14.2%">
						户籍地址
					</th>
					<th width="16%">
						现居住地址
					</th>
				</tr>
				<tr class="tr2" align="center">
					<td>
						{{goldData.name | nullFilter}}
					</td>
					<td>
						{{goldData.sex | nullFilter}}
					</td>
					<td>
						{{goldData.idCard | nullFilter}}
					</td>
					<td>
						{{goldData.nationality | nullFilter}}
					</td>
					<td>
						{{goldData.birthDate | nullFilter}}
					</td>
					<td>
						{{goldData.eduLevel | nullFilter}}
					</td>
					<td>
						{{goldData.polity | nullFilter}}
					</td>
					<td>
						{{goldData.marriageType | nullFilter}}
					</td>
					<td>
						{{goldData.rprStatus | nullFilter}}
					</td>
					<td>
						{{goldData.rprAddress | nullFilter}}
					</td>
					<td>
						{{goldData.presentAddress | nullFilter}}
					</td>
				</tr>
			</table>
			<table width="100%" v-if="showType == '法人'" @click="showGoldInfo2">
				<tr class="tr1" align="center">
					<th width="7.2%">
						统一社会信用代码
					</th>
					<th width="11%">
						企业名称
					</th>
					<th width="5.7%">
						企业类型
					</th>
					<td width="5.6%">
						企业法人姓名
					</td>
					<th width="9.3%">
						经营范围
					</th>
					<th width="9.8%">
						行业门类
					</th>
					<th width="6.3%">
						成立时间
					</th>
					<th width="5.2%">
						存续状态
					</th>
					<th width="10.5%">
						营业(有效)结束日期
					</th>
					<th width="17.9%">
						住所信息
					</th>
					<th width="9.6%">
						联系电话
					</th>
				</tr>
				<tr class="tr2" align="center">
					<td>
						{{goldData.unifyCode | nullFilter}}
					</td>
					<td>
						{{goldData.orgName | nullFilter}}
					</td>
					<td>
						{{goldData.orgType | nullFilter}}
					</td>
					<td>
						{{goldData.legalperson | nullFilter}}
					</td>
					<td>
						{{goldData.bussinessScope | nullFilter}}
					</td>
					<td>
						{{goldData.jylb | nullFilter}}
					</td>
					<td>
						{{goldData.clDate | nullFilter}}
					</td>
					<td>
						{{goldData.epState | nullFilter}}
					</td>
					<td>
						{{goldData.valiDate | nullFilter}}
					</td>
					<td>
						{{goldData.regAddress | nullFilter}}
					</td>
					<td>
						{{goldData.telephone | nullFilter}}
					</td>
				</tr>
			</table>
		</div>
		<div class="title">
			数据原始版本
		</div>
		<div class="card">
			<table v-if="showType == '人口'">
				<tr class="tr3" align="center">
					<th width="15.3%"></th>
					<th @click="showOriginalInfo1(item)" width="28%" v-for="(item, index) in originalData" v-show="index<3" :class="{'animate-left': animateLeft,'animate-right': animateRight}">
						{{item.department | nullFilter}}
					</th>
				</tr>
				<tr v-for="(value, key, index) in originalTableItem" class="tr4" align="center">
					<td width="15.3%">
						{{value | nullFilter}}
					</td>
					<td @click="showOriginalInfo1(item)" width="28%" v-for="(item, index) in originalData" v-show="index<3" :class="{'animate-left': animateLeft,'animate-right': animateRight}">
						{{item[key] | nullFilter}}
					</td>
				</tr>
			</table>
			<table v-if="showType == '法人'">
				<tr class="tr3" align="center">
					<th width="15.3%"></th>
					<th @click="showOriginalInfo2(item)" width="28%" v-for="(item, index) in originalData" v-if="index<3" :class="{'animate-left': animateLeft,'animate-right': animateRight}">
						{{item.department | nullFilter}}
					</th>
				</tr>
				<tr v-for="(value, key, index) in originalTableItem1" class="tr4" align="center">
					<td width="15.3%">
						{{value | nullFilter}}
					</td>
					<td @click="showOriginalInfo2(item)" width="28%" v-for="(item, index) in originalData" v-show="index<3" :class="{'animate-left': animateLeft,'animate-right': animateRight}">
						{{item[key] | nullFilter}}
					</td>
				</tr>
			</table>
		</div>
		<el-dialog :visible.sync="goldFlag1" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeGoldDialog1">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">姓名</th>
					<td width="38%">{{goldData.name | nullFilter}}</td>
					<th width="12%">政治面貌</th>
					<td width="38%">{{goldData.polity | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">性别</th>
					<td width="38%">{{goldData.sex | nullFilter}}</td>
					<th width="12%">婚姻状态</th>
					<td width="38%">{{goldData.marriageType | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">身份证号</th>
					<td width="38%">{{goldData.idCard | nullFilter}}</td>
					<th width="12%">个人户籍状态</th>
					<td width="38%">{{goldData.rprStatus | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">民族</th>
					<td width="38%">{{goldData.nationality | nullFilter}}</td>
					<th width="12%">户籍地址</th>
					<td width="38%">{{goldData.rprAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">出生日期</th>
					<td width="38%">{{goldData.birthDate | nullFilter}}</td>
					<th width="12%">现居住地址</th>
					<td width="38%">{{goldData.presentAddress | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">文化程度</th>
					<td width="38%">{{goldData.eduLevel | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
		<el-dialog :visible.sync="goldFlag2" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeGoldDialog2">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">社会信用代码</th>
					<td width="38%">{{goldData.unifyCode | nullFilter}}
					<td>
					<th width="12%">成立时间</th>
					<td width="38%">{{goldData.clDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业名称</th>
					<td width="38%">{{goldData.orgName | nullFilter}}</td>
					<th width="12%">存续状态</th>
					<td width="38%">{{goldData.epState | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">企业类型</th>
					<td width="38%">{{goldData.orgType | nullFilter}}</td>
					<th width="12%">营业(有效)结束日期</th>
					<td width="38%">{{goldData.valiDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业法人姓名</th>
					<td width="38%">{{goldData.legalperson | nullFilter}}</td>
					<th width="12%">住所信息</th>
					<td width="38%">{{goldData.regAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">经营范围</th>
					<td width="38%">{{goldData.bussinessScope | nullFilter}}</td>
					<th width="12%">联系电话</th>
					<td width="38%">{{goldData.telephone | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">行业门类</th>
					<td width="38%">{{goldData.jylb | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
		<el-dialog :visible.sync="originalFlag1" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeOriginalDialog1">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">姓名</th>
					<td width="38%">{{indexOriginal1.name | nullFilter}}</td>
					<th width="12%">政治面貌</th>
					<td width="38%">{{indexOriginal1.polity | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">性别</th>
					<td width="38%">{{indexOriginal1.sex | nullFilter}}</td>
					<th width="12%">婚姻状态</th>
					<td width="38%">{{indexOriginal1.marriageType | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">身份证号</th>
					<td width="38%">{{indexOriginal1.idCard | nullFilter}}</td>
					<th width="12%">个人户籍状态</th>
					<td width="38%">{{indexOriginal1.rprStatus | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">民族</th>
					<td width="38%">{{indexOriginal1.nationality | nullFilter}}</td>
					<th width="12%">户籍地址</th>
					<td width="38%">{{indexOriginal1.rprAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">出生日期</th>
					<td width="38%">{{indexOriginal1.birthDate | nullFilter}}</td>
					<th width="12%">现居住地址</th>
					<td width="38%">{{indexOriginal1.presentAddress | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">文化程度</th>
					<td width="38%">{{indexOriginal1.eduLevel | nullFilter}}</td>
					<th width="12%">数据更新时间</th>
					<td width="38%">{{indexOriginal1.updateTime | nullFilter}}</td>
				</tr>
			</table>
		</el-dialog>
		<el-dialog :visible.sync="originalFlag2" class="info2" top="16.3%" :show-close="false">
			<div class="closeBtn" @click="closeOriginalDialog2">
			</div>
			<table border rules="none">
				<tr class="single" align="center">
					<th width="12%">社会信用代码</th>
					<td width="38%">{{indexOriginal2.unifyCode | nullFilter}}</td>
					<th width="12%">成立时间</th>
					<td width="38%">{{indexOriginal2.clDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业名称</th>
					<td width="38%">{{indexOriginal2.orgName | nullFilter}}</td>
					<th width="12%">存续状态</th>
					<td width="38%">{{indexOriginal2.epState | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">企业类型</th>
					<td width="38%">{{indexOriginal2.orgType | nullFilter}}</td>
					<th width="12%">营业(有效)结束日期</th>
					<td width="38%">{{indexOriginal2.valiDate | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">企业法人姓名</th>
					<td width="38%">{{indexOriginal2.legalperson | nullFilter}}</td>
					<th width="12%">住所信息</th>
					<td width="38%">{{indexOriginal2.regAddress | nullFilter}}</td>
				</tr>
				<tr class="single" align="center">
					<th width="12%">经营范围</th>
					<td width="38%">{{indexOriginal2.bussinessScope | nullFilter}}</td>
					<th width="12%">联系电话</th>
					<td width="38%">{{indexOriginal2.telephone | nullFilter}}</td>
				</tr>
				<tr align="center">
					<th width="12%">行业门类</th>
					<td width="38%">{{indexOriginal2.jylb | nullFilter}}</td>
					<th width="12%">数据更新时间</th>
					<td width="38%">{{indexOriginal2.updateTime | nullFilter}}</td>
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
	import {
		cloneObjectFn
	} from '../../utils/tool.js'
	export default {

		data() {
			return {
				// 是否开启左移动画效果
				animateLeft: false,
				// 是否开启右移动画效果
				animateRight: false,
				// 右键是否可以点击
				canToRight: false,
				// 左键是否可以点击
				canToLeft: false,
				// 人口数据黄金版本对话框
				goldFlag1: false,
				// 法人数据黄金版本对话框
				goldFlag2: false,
				// 人口数据原始版本对话框
				originalFlag1: false,
				// 法人数据原始版本对话框
				originalFlag2: false,
				// 人口数据原始版本对话框数据
				indexOriginal1: {},
				// 法人数据原始版本对话框数据
				indexOriginal2: {},
				// 查询人口数据时界面大背景图
				src1: require('../../assets/personTableBack.jpg'),
				// 查询法人数据时界面大背景图
				src2: require('../../assets/person2TableBack.jpg')
			}
		},
		computed: {

			...mapState({
				showType: state => state.dataGovernance.showType,
				personType: state => state.dataGovernance.personType,
				tableItem: state => state.dataGovernance.tableItem,
				originalTableItem: state => state.dataGovernance.originalTableItem,
				originalTableItem1: state => state.dataGovernance.originalTableItem1,
				goldTableItem: state => state.dataGovernance.goldTableItem,
				goldData: state => state.dataGovernance.goldData,
				originalData: state => state.dataGovernance.originalData,
				realOriginalData: state => state.dataGovernance.realOriginalData
			}),
		},
		mounted() {
			setTimeout(() => {
				this.left()
			}, 300)

			setTimeout(() => {
				this.right()
			}, 300)
		},
		methods: {
			// 查看详情
			showGoldInfo1() {
				this.goldFlag1 = true
			},
			showGoldInfo2() {
				this.goldFlag2 = true
			},
			showOriginalInfo1(item) {
				this.indexOriginal1 = item
				this.originalFlag1 = true
			},
			showOriginalInfo2(item) {
				this.indexOriginal2 = item
				this.originalFlag2 = true
			},
			//关闭对话框
			closeGoldDialog1() {
				this.goldFlag1 = false
			},
			closeGoldDialog2() {
				this.goldFlag2 = false
			},
			closeOriginalDialog1() {
				this.originalFlag1 = false
			},
			closeOriginalDialog2() {
				this.originalFlag2 = false
			},
			// 左翻页键
			toLeft() {
				if (this.originalData.length <= 3) {
					return
				}
				this.animateRight = true
				setTimeout(() => {
					// this.$store.commit('dataGovernance/unshift')
					this.originalData.unshift(this.originalData[this.originalData.length - 1])
					this.originalData.pop()
					// this.$store.commit('dataGovernance/pop')
					this.animateRight = false
				}, 500)
				setTimeout(() => {
					this.left()
					this.right()
				}, 650)
			},
			// 右翻页键
			toRight() {

				// console.log(this.originalData,this.realOriginalData);
				if (this.originalData.length <= 3) {
					return
				}
				let temp = cloneObjectFn(this.originalData[0])
				for (let key in this.originalData[0]) {
					this.originalData[0][key] = '我自定义的空'
				}
				// this.originalData[0] = {}
				// this.$store.commit('dataGovernance/test')
				// let needKey = ['personId', 'department', 'idCard', 'name', 'sex','nationality','birthDate', 'eduLevel',
				// 	'polity', 'marriageType', 'rprAddress', 'presentAddress', 'rprStatus', 'updateTime', 'dataVersion'
				// ]
				// needKey.forEach(item => {
				// 	this.originalData[0][item] = '我自定义的空'
				// })
				this.animateLeft = true
				setTimeout(() => {
					// this.$store.commit('dataGovernance/shift')
					this.originalData.shift()
					// this.$store.commit('dataGovernance/push', temp)
					this.originalData.push(temp)
					this.animateLeft = false
				}, 500)
				setTimeout(() => {
					this.left()
					this.right()
				}, 650)
			},
			// 判断是否可以向右翻页
			right() {
				// this.$store.commit('dataGovernance/test')
				let length = this.realOriginalData.length
				if (length == 0) {
					return
				}
				if (length <= 3) {
					this.canToRight = false
					return
				}
				// if (this.originalData[2].department == this.realOriginalData[length - 1].department) {
				// 	this.canToRight = false
				// 	return
				// }
				this.canToRight = true
			},
			// 判断是否可以向左翻页
			left() {
				let length = this.realOriginalData.length
				if (length == 0) {
					return
				}
				if (length <= 3) {
					this.canToLeft = false
					return
				}
				// if (this.originalData[0].department == this.realOriginalData[0].department) {
				// 	this.canToLeft = false
				// 	return
				// }
				this.canToLeft = true
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.dataGoldVersion {
		width: 100%;
		height: 100%;
		padding: 2%;
		margin-top: 1%;
		padding-top: 0%;
		// background: url('../../assets/personTableBack.jpg');
		background-size: 100% 100%;
		// background-position: 1% 10%;
		font-family: SOURCEHANSANSCN-REGULAR;

		.table {

			width: 99.2%;
			height: 13%;
			padding-left: 0.5%;

			.left,
			.right,
			.leftDisabled,
			.rightDisabled {
				position: absolute;
				background-size: 100% 100%;
				width: 3%;
				height: 5.3%;
				top: 67%;
				cursor: pointer;
			}

			.left {
				background: url('../../assets/btn_left_highlight.png') no-repeat;
				background-size: 100% 100%;
				left: 19%;
			}

			.leftDisabled {
				background: url('../../assets/btn_left_disable.png') no-repeat;
				background-size: 100% 100%;
				left: 19%;
			}

			.right {
				background: url('../../assets/btn_right_highlight.png') no-repeat;
				background-size: 100% 100%;
				right: 5%;
			}

			.rightDisabled {
				background: url('../../assets/btn_right_disable.png') no-repeat;
				background-size: 100% 100%;
				right: 5%;
			}

			table tr td,
			table tr th {
				// background: rgba(4, 31, 69, 0.41);
				// border: 2px solid rgba(16, 77, 164, 1);
			}

			table {
				height: 94.5%;
				border: none;
				cursor: pointer;
				// border-spacing:0px 5px;
				// border-collapse: separate;
				// border-collapse: collapse;
				// 是否自适应宽高
				table-layout: fixed;
			}

			.tr1 {

				td,
				th {
					// border: 1px solid white;
					padding-top: 0.22%;
					color: #04FCFF;
					font-weight: bold;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				th {
					font-size: 1.125rem;
				}

				td {
					font-size: 1rem;
				}
			}

			.tr2 {

				td {
					padding-left: 0.3%;
					padding-right: 0.1%;
					font-size: 1rem;
					color: #FFFFFF;
					font-weight: medium;
					// 超出一行省略
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 1rem;
					// 超出两行省略
					// overflow: hidden;
					// text-overflow: ellipsis;
					// display: -webkit-box;
					// // display: -webkit-inline-box;
					// -webkit-line-clamp: 2;
					// -webkit-box-orient: vertical;
					// // -webkit-box-orient: horizontal;
					// word-wrap: break-word;
					// word-break: break-all;
				}

				th {
					color: #04FCFF;
					font-weight: bold;
					font-size: 1.125rem;
				}
			}
		}

		.title {
			// border-left: 4px solid rgba(253, 183, 47, 1);
			font-size: 1.5rem;
			font-weight: bold;
			color: rgba(0, 228, 255, 1);
			margin-top: 0.4%;
			margin-left: 2.7%;
			padding-left: 0.6%;
		}

		.card {
			width: 100%;
			height: 77%;
			margin-top: 0%;
			padding: 0 0.5%;
			

			table {
				border: none;
				// border: 10px red solid;
				height: 100%;
				width: 100%;
				// border-collapse: collapse;
				table-layout: fixed;
				overflow: hidden;

				.dark {
					background-color: #123068;
				}

				tr {
					width: 100%;
				}

				.tr3 {
					transition: all 0.5s;
					// position: relative;

					.animate-left {
						transition: all 0.5s ease-in-out;
						transform: translateX(-100%);
					}

					.animate-right {
						transition: all 0.5s ease-in-out;
						transform: translateX(100%);
					}

					th {
						cursor: pointer;
						color: #04FCFF;
						font-weight: bold;
						font-size: 1.25rem;
						padding-top: 0.75%;
						height: 8.4%;
						// border: 4px solid black;
					}

					th:nth-child(1) {
						// background: url(../../assets/tdBack.png);
						border: none;
						position: absolute;
						z-index: 99;
						height: 4.4%;
						cursor: default;
					}

					// td {
					// 	overflow: hidden;
					// 	text-overflow: ellipsis;
					// 	white-space: nowrap;
					// }
				}

				.tr4 {
					transition: all 0.5s;
					// position: relative;

					.animate-left {
						transition: all 0.5s ease-in-out;
						transform: translateX(-100%);
					}

					.animate-right {
						transition: all 0.5s ease-in-out;
						transform: translateX(100%);
					}

					td {
						cursor: pointer;
						padding-top: 0.45%;
						color: #FFFFFF;
						font-weight: medium;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-size: 1rem;
						
						// border: 4px solid black;
					}

					td:nth-child(1) {
						color: #04FCFF;
						font-weight: bold;
						border: none;
						// background: url(../../assets/tdBack.png);
						// background-size: auto 100%;
						padding-top: 0.5%;
						position: absolute;
						z-index: 99;
						font-size: 1.25rem;
						height: 4.4%;
					}
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

						// div{
						// 	max-height: 200px;
						// 	overflow: hidden;
						// }
					}
				}

				.single {
					background: url('../../assets/tiao.png');
					background-size: 100% 100%;
				}

				.double {}
			}
		}
	}
</style>
