<template>
	<div class="governance">
		<div class="head">
			<!-- 导航 -->
			<div class="nav">
				<div class="nav_left">
					<div :class="navIndex===1?'nav_active':'nav_box'" @click="navTo(1)">
						<div class="nav_word">
              主数据查询服务
            </div>
					</div>

					<div :class="navIndex===2?'nav_active':'nav_box'" @click="navTo(2)">
						<div class="nav_word">API接口服务</div>
					</div>

					<!--<div :class="navIndex==3?'nav_active':'nav_box'" @click="navTo(3)">-->
						<!--<div class="nav_word">元数据信息</div>-->
					<!--</div>-->
				</div>

				<!--<div class="arrow arrow1" v-show="navIndex === 1">-->

				<!--</div>-->
				<!--<div class="arrow arrow2" v-show="navIndex === 2">-->

				<!--</div>-->
				<!--<div class="arrow arrow3" v-show="navIndex === 3">-->

				<!--</div>-->
			</div>
      <div class="search" v-show="navIndex === 2" style="text-align: right; margin-right: 1.2rem;">
        <div style="color: #ffffff; font-size: 1.5rem; padding: 10px" @click="showApiDoc">
          <span style="color: #04FCFF; cursor: pointer">查看接口文档</span>
        </div>
      </div>
		</div>
		<!-- 内容展示 （选项卡模式）-->
		<div class="content">
			<MasterDataQuery v-if="navIndex==1"></MasterDataQuery> <!-- 首次加载时默认显示 -->
			<InterfaceService v-if="navIndex==2"></InterfaceService><!-- API接口服务 -->
			<!--<MetadataInformation v-if="navIndex==3"></MetadataInformation>-->
		</div>

    <!-- 显示接口文档 -->
    <el-dialog
      :visible.sync="showDocFlag"
      width="80%"
      class="apiPdfBox"
    >
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfUrl"
        :page="i"
        style="display: block; width: 70%; margin: 0 auto;"
      >
      </pdf>
    </el-dialog>
	</div>
</template>

<script>
  import pdf from 'vue-pdf';
	import elementUI from 'element-ui'
	import DataGoldVersion from "./dataGoldVersion.vue"; //数据黄金版本
	import DataHistoryVersion from "./dataHistoryVersion.vue"; //数据历史版本
	import MetadataInformation from "./metadataInformation.vue"; //元数据信息

  import MasterDataQuery from "./masterDataQuery"; // 主数据查询服务
  import InterfaceService from "./InterfaceService"; /// API接口服务

	import {
		mapActions,
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		testIdCard,
		testUnifyCode
	} from '../../utils/tool.js'
	export default {
		data() {
			return {
				navIndex: 1,
				typeList: [{
						'name': '人口'
					},
					{
						'name': '法人'
					}
				],
				// 下拉列表
				showOption: false,
				// 搜索值
				inputValue: '',
        defaultIdCard: '230206195006070216', // 人口-公司：230206195006070216 科信：000000190801021223
        defaultUnifyCode: '92110102L631498176', // 法人-公司：92110102L631498176 科信：91110102633768124U
        // PDF预览
        pdfUrl: "",
        numPages: 0,
        showDocFlag: false,
        path: '../../../static/对外API服务接口文档v1.0.pdf'
			}
		},
		components: {
		  pdf,
			DataGoldVersion, //数据黄金版本
			DataHistoryVersion, //数据历史版本
			MetadataInformation, //元数据信息
      MasterDataQuery, // 主数据查询服务
      InterfaceService // Api接口服务
		},
		computed: {

			...mapState({
				// 人口/法人 黄金、原始、历史
				personType: state => state.dataGovernance.personType,
				showType: state => state.dataGovernance.showType,
				// 元数据信息搜索条件值
				metaType: state => state.dataGovernance.metaType,
			}),
		},
		methods: {
			...mapActions({
				getAllMeta: 'dataGovernance/getAllMeta',
				// 查询黄金数据和原始数据(人口)
				findAllPerson: 'dataGovernance/findAllPerson',
				// 查询黄金数据和原始数据(法人)
				findAllLegalperson: 'dataGovernance/findAllLegalperson',
				// 查询历史数据(人口)
				personHistory: 'dataGovernance/personHistory',
				// 查询历史数据(法人)
				legalpersonHistory: 'dataGovernance/legalpersonHistory',
			}),
			//点击导航按钮，记录导航按钮参数，进行页面展示
			navTo(params) {
				this.navIndex = params;
			},
			// 打开自定义下拉菜单
			openValue() {
				this.showOption = !this.showOption;
			},
			// 选择元数据信息搜索条件
			getvalue(item) {
				this.showOption = false;
				this.$store.commit('dataGovernance/setMetaType', item.name)
				let query = {
					metaType: this.metaType
				};
				this.getAllMeta(query)
			},
			// 格式验证
			verify(type) {
				if (type == 1) {
					// 验证身份证号
					return testIdCard(this.inputValue)
				} else if (type == 2) {
					// 验证社会机构代码
					return testUnifyCode(this.inputValue)
				}
			},
			// 查询数据
			search() {
				if (this.personType == '人口') {
					//验证身份证格式
					if (this.verify(1)) {
						// 根据人口搜索 黄金数据和原始数据
						let query = {
							// 000000190801021223
              // 230206195006070216 公司服务器
              idCard: this.inputValue == '' ? this.defaultIdCard : this.inputValue,
						}
						this.findAllPerson(query)
						let query2 = {
							idCard: this.inputValue == '' ? this.defaultIdCard : this.inputValue,
							dataVersion: 4
						}
						// 根据人口搜索 历史数据
						this.personHistory(query2)
					} else {
						elementUI.Message("请输入正确的身份证号")
					}
				} else if (this.personType == '法人') {
					if (this.verify(2)) {
						// 根据法人搜索 黄金数据和原始数据 92110102L631498176 公司  91110102633768124U科信
						let query = {
							unifyCode: this.inputValue == '' ? this.defaultUnifyCode : this.inputValue
						}
						this.findAllLegalperson(query)

						let query2 = {
							unifyCode: this.inputValue == '' ? this.defaultUnifyCode : this.inputValue,
							dataVersion: 4
						}
						// 根据法人搜索 历史数据
						this.legalpersonHistory(query2)
					} else {
						elementUI.Message("请输入正确的统一社会信用代码")
					}
				}
			},
			// 改变黄金、原始、历史数据搜索类型
			changePersonType() {
				let type = document.getElementById('radio1').checked ? '人口' : '法人';
				this.$store.commit('dataGovernance/changePersonType', type);
				this.inputValue = '';
				if (type == '人口') {
					// 根据人口搜索 黄金数据和原始数据
					let query = {
						idCard: this.defaultIdCard,
					}
					this.findAllPerson(query)
					let query2 = {
						idCard: this.defaultIdCard,
						dataVersion: 4
					}
					// 根据统一社会信用代码搜索 历史数据
					this.personHistory(query2)
				} else {
					// 根据人口搜索 黄金数据和原始数据
					let query = {
						unifyCode: this.defaultUnifyCode,
					}
					this.findAllLegalperson(query)
					let query2 = {
						unifyCode: this.defaultUnifyCode,
						dataVersion: 4
					}
					// 根据人口搜索 历史数据
					this.legalpersonHistory(query2)
				}
			},

      // 显示接口文档
      showApiDoc() {
        let self = this;
        let loadingTask = pdf.createLoadingTask(this.path);
        loadingTask.then(pdf => {
          self.pdfUrl = loadingTask;
          self.numPages = pdf.numPages;
          // 弹框显示
          self.showDocFlag = true;
        }).catch((err) => {
          this.$message.error('文件加载失败');
        })
      }
		},
		created() {
		},
		mounted() {
		}
	}
</script>

<style lang="less" scoped="scoped">
	.governance {
		width: 100%;
		height: 100%;

		.head {
			width: 100%;
			height: 12%;
			margin-top: 1.5%;
			position: relative;

			//导航
			.nav {
				width: 38%;
				padding: 0 0.6%;
				height: 100%;
				position: absolute;
				top: 10%;
				left: 2%;
				z-index: 99;
				display: flex;
				justify-content: space-between;
				font-family: SOURCEHANSANSCN-MEDIUM;

				.nav_left {
					width: 100%;
					height: 90%;
					display: flex;
					justify-content: space-between;

          .nav_box{
            width: 45.77%;
            height: 70%;
            background: url("../../assets/blueTab.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 5%;

            .nav_word {
              font-size: 1.4rem;
              // white-space: nowrap;
              // font-size: 1.3rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
            }
          }

					.nav_active {
						width: 45.77%;
						height: 100%;
						background: url("../../assets/blueTab.png") no-repeat;
						background-size: 100% 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-right: 5%;

						.nav_word {
							font-size: 1.4rem;
							// white-space: nowrap;
							// font-size: 1.3rem;
							font-weight: bold;
							color: rgba(255, 255, 255, 1);
              margin-top: -1.5rem;
						}
					}

					.nav_active {
						cursor: pointer;
						background: url("../../assets/orangeTab_2.png") no-repeat;
						background-size: 100% 100%;

						& .nav_word {
              margin-top: -1.5rem;
							color: rgba(253, 183, 47, 1);
						}
					}

					.nav_box:hover {
            height: 100%;
						cursor: pointer;
						background: url("../../assets/orangeTab_2.png") no-repeat;
						background-size: 100% 100%;

						& .nav_word {
              margin-top: -1.5rem;
							color: rgba(253, 183, 47, 1);
						}
					}
				}

				.arrow {
					background: url("../../assets/icon_down.png") no-repeat;
					background-size: 100% 100%;
					width: 3.5%;
					height: 17%;
					position: absolute;
					bottom: 1%;
				}

				.arrow1 {
					left: 21.8%;
				}

				.arrow2 {
					left: 70%;
				}

				.arrow3 {
					left: 78%;
				}
			}

			.search {
				width: 26%;
				padding: 0 2.6%;
				height: 80.6%;
				position: absolute;
				top: 10%;
				right: 0;

				form {
					position: relative;
					width: 100%;
					height: 60%;
					margin: 0 auto;
				}

				input,
				button {
					border: none;
					outline: none;
				}

				input {
					width: 100%;
					height: 100%;
					padding-left: 4%;
					// border-radius: 42px;
					border: 2px solid #04FCFF;
					background-color: transparent;
					color: #04FCFF;
				}

				input:focus {
					width: 100%;
				}

				img {
					height: 50%;
					width: 10.8%;
					cursor: pointer;
					position: absolute;
					top: 21%;
					right: 2%;
					padding-left: 2%;
					padding-right: 2%;
					border-left: 1px solid #04FCFF;
				}
			}

			.select1 {
				width: 18%;
				height: 16%;
				position: absolute;
				top: 65%;
				right: 5%;
				font-size: 14px;
				padding-left: 1%;
				display: flex;

				label {
					width: 30%;
					display: inline-block;
					margin-left: 0%;
					margin-right: 10%;
					color: #FDFDFD;
					cursor: pointer;
					white-space: nowrap;
					font-family: SOURCEHANSANSCN-REGULAR;
					font-size: 0.9rem;
				}

				.radio_type {
					width: 5%;
					height: 100%;
					appearance: none;
					position: relative;
					border: none;
					outline: none;
				}

				.radio_type:before {
					content: '';
					width: 80%;
					height: 80%;
					border: 1px solid #7d7d7d;
					display: inline-block;
					border-radius: 50%;
					vertical-align: center;
					cursor: pointer;
				}

				.radio_type:checked:before {
					content: '';
					width: 80%;
					height: 80%;
					border: 1px solid #c59c5a;
					background: #04FCFF;
					display: inline-block;
					border-radius: 50%;
					vertical-align: center;
					cursor: pointer;
				}

				// 单选框内显示对号
				// .radio_type:checked:after {
				// 	content: '';
				// 	width: 10px;
				// 	height: 5px;
				// 	border: 2px solid white;
				// 	border-top: transparent;
				// 	border-right: transparent;
				// 	text-align: center;
				// 	display: block;
				// 	position: absolute;
				// 	top: 6px;
				// 	left: 5px;
				// 	vertical-align: middle;
				// 	transform: rotate(-45deg);
				// }

				.radio_type:checked+label {
					color: #04FCFF;
				}
			}

			.select2 {
				width: 7%;
				height: 100%;
				position: absolute;
				top: 10%;
				right: 2.7%;

				ul li {
					list-style: none;
				}

				form {
					width: 100%;
					height: 33.3%;
					position: relative;

					// border: 2px solid #04FCFF;
					input {
						border: none;
						outline: none;
						width: 100%;
						height: 100%;
						padding-left: 13%;
						background-color: transparent;
						color: #04FCFF;
						border: 2px solid #04FCFF;
						border-right: 2px solid #04FCFF;
						font-family: SOURCEHANSANSCN-REGULAR;
						font-size: 1.125rem;
						cursor: pointer;
					}

					.right {
						width: 19%;
						height: 100%;
						top: 0%;
						right: 0%;
						position: absolute;
						cursor: pointer;
						border-left: 2px solid #04FCFF;

						img {
							width: 50%;
							height: 25%;
							top: 35%;
							right: 28%;
							position: absolute;
							cursor: pointer;
						}
					}
				}

				.list {

					width: 100%;
					height: 66.7%;
					position: relative;
					cursor: pointer;
					font-size: 14px;
					color: #04FCFF;
				}

				.list ul li {
					width: 100%;
					height: 50%;
					cursor: pointer;
					padding-left: 13%;
					background-color: #004050;
					font-family: SOURCEHANSANSCN-REGULAR;
					font-size: 1.125rem;
				}

				.list ul li:hover {
					background-color: #00707B;
				}
			}
		}

		.content {
			width: 100%;
			height: 80%;
			overflow: hidden;
		}

    .apiPdfBox {
      /deep/ .el-dialog__headerbtn {
        font-size: 2rem;
      }
    }
	}

	::-webkit-input-placeholder {
		/* Chrome/Opera/Safari */
		color: #04FCFF;
		font-size: 14px;
	}

	::-moz-placeholder {
		/* Firefox 19+ */
		color: #04FCFF;
		font-size: 14px;
	}

	:-ms-input-placeholder {
		/* IE 10+ */
		color: #04FCFF;
		font-size: 14px;
	}

	:-moz-placeholder {
		/* Firefox 18- */
		color: #04FCFF;
		font-size: 14px;
	}
</style>

<style lang="less">
  .apiPdfBox > .el-dialog {
    height: 78%;
    overflow: auto;
  }
</style>
