<template>
	<div class="footerTime">
		<span>页面数据刷新时间：{{time}}</span>
		<span class="line" v-if="isExplain"></span>
		<span class="explain" v-if="isExplain" @click="showDialog">
			统计指标解释
		</span>
		<el-dialog class="indexBox" title="统计指标解释" :modal-append-to-body="false" :visible.sync="dialogVisible" width="55%"
		 top="21vh">
			<div class="header">
				<p class="name">指标名</p>
				<p class="explains" style="text-align: center">指标解释</p>
			</div>
			<div class="body" v-for="(item, i) in list" :key="i">
				<p class="name">{{item.indexName}}</p>
				<p class="explains">{{item.indexExplain}}</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		getTimeAndIndex
	} from '../api/index.js';
	export default {
		name: 'footerTime',
		props: ["isExplain", "screenId"],
		data() {
			return {
				dialogVisible: false,
				time: '',
				list: []
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				// 2  汇集监控   3 运行监控01   4 运行监控02   7  质量监控  0 首页
				let params = {
					screenId: this.screenId
				};
				getTimeAndIndex(params).then(res => {
					if (res.code == 200) {
						this.time = res.data.time.updateTime;
						this.list = res.data.index;
					}
				});
			},
			showDialog() {
				if (this.screenId == 0) {
					this.$emit('showMask')
				} else {
					this.dialogVisible = true
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.footerTime {
		width: 100%;
		height: 3.75rem;
		padding: 0rem 1rem;
		background: rgba(48, 68, 212, 0.15);
		position: fixed;
		bottom: 0rem;
		left: 0rem;
		z-index: 2;
		color: #FEFCFD;
		line-height: 3.75rem;
		font-size: 1.25rem;
		font-family: "SourceHanSansCN-Medium";

		span {
			margin-left: 2rem;
		}

		.line {
			border-left: 2px solid #FEFCFD;
		}

		.explain {
			color: #FDB72F;
			padding-left: 1.75rem;
			background: url("../assets/explain.png") no-repeat left center;
			background-size: 1.25rem;
			cursor: pointer;
		}
	}
</style>
<style lang="less">
	.indexBox {
		.el-dialog__header {
			background: #002d9e;
			text-align: center;

			.el-dialog__title {
				font-size: 1.875rem; // 设计稿原尺寸
				font-family: SOURCEHANSANSCN-MEDIUM;
				font-weight: 500;
				color: #ffff;
				line-height: 0px;
			}

			.el-dialog__headerbtn {
				top: 1rem;

				.el-dialog__close {
					font-size: 1.375rem;
					color: #fff;
				}
			}
		}

		.el-dialog__body {
			height: 55vh;
			overflow: auto;

			>div {
				display: flex;
				text-align: center;
				border: 1px solid #e5e5e5;
			}

			.header {
				font-size: 1.75rem;
				font-weight: 700;
			}

			.body {
				font-size: 1.25rem;
			}

			.name {
				width: 20%;
				border-right: 1px solid #e5e5e5;
				padding: 0.5rem 0rem;
			}

			.explains {
				width: 80%;
				padding: 0.5rem 0rem;
        text-align: left;
			}
		}
	}
</style>
