<template>
	<div class="card">
		<div class="title">
			婚姻状态
		</div>
		<div class="biaoshi">
			内部标识符：1089C10000070000
		</div>
		<div class="zhiyu">
			值域：GB/T2261.2-2003
		</div>
		<div class="jigou">
			提交机构：区民政局、法院
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	.card {
		width: 22.5%;
		height: 31%;
		margin-left: 2.5%;
		margin-bottom: 1.5%;
		border: 2px solid #14377D;
		position: relative;
		cursor: pointer;

		.title {
			position: absolute;
			left: 40%;
			top: 3%;
			color: #04FCFF;
			position: absolute;
			font-weight: bold;
			font-size: 20px;
		}

		.biaoshi,
		.zhiyu,
		.jigou {
			position: absolute;
			color: #FFFFFF;
			font-size: 16px;
			left: 10%;
		}

		.biaoshi {
			top: 27%;
		}

		.zhiyu {
			top: 48%;
		}

		.jigou {
			top: 70%;
		}

		.biaoshi::before,.zhiyu::before,.jigou::before {
			content: "";
			width: 10px;
			height: 10px;
			position: absolute;
			background: #04FCFF;
			left: -22px;
			top: 6px;
			border-radius: 65px;
			box-shadow:  2px 2px 4px rgba(0, 0, 0, 0.4);
			// box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
		}
	}
</style>
