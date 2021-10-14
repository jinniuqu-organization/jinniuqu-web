<template>
  <hua-xiang v-if="cardIndex == 2" v-bind:cardIndex="cardIndex" v-on:changeTabIndex="changeTabIndex"></hua-xiang>
	<div v-else class="newMain">
		<!-- 左侧时间轴 -->
		<div class="left">
			<img :src="timeLine" />
		</div>
		<div class="circle" v-if="cardIndex == 0">
			<div class="item" v-for="(item, index) in timeArray">
				<img :src="timeClick" :style="{opacity: timeIndex1 == index?1:0}">

				</img>
				<span :class="index == timeIndex1 ? 'clickSpan' : null" @click="changeMonth1(index,item)">
					{{item}}
				</span>
			</div>
		</div>
		<div class="circle" v-else>
			<div class="item" v-for="(item, index) in timeArray2">
				<img :src="timeClick" :style="{opacity: timeIndex2 == index?1:0}">

				</img>
				<span :class="index == timeIndex2 ? 'clickSpan' : null" @click="changeMonth2(index,item)">
					{{item}}
				</span>
			</div>
		</div>
		<!-- 人口、企业切换 -->
		<div class="tabCard">
			<div :class="cardIndex == 0 ? 'clickCard': null" class="card" @click="changeTabIndex(0)">
				<span>人口</span>
			</div>
			<div :class="cardIndex == 1 ? 'clickCard': null" class="card" @click="changeTabIndex(1)">
				<span>企业</span>
			</div>
      <div :class="cardIndex == 2 ? 'clickCard': null" class="card" @click="changeTabIndex(2)">
        <span>画像</span>
      </div>
		</div>
		<!-- 中间数据项和地图 -->
		<div class="center">
			<!-- 数据项-->
			<div class="items">
				<!-- 人口数据 -->
				<template v-if="cardIndex == 0">
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								人口总量
							</div>
							<div class="num">
								{{gross}}&nbsp;<span>万</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								实有人口
							</div>
							<div class="num">
								{{inEffect}}&nbsp;<span>万</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								流动人口
							</div>
							<div class="num">
								{{stream}}&nbsp;<span>万</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								户籍人口
							</div>
							<div class="num">
								{{census}}&nbsp;<span>万</span>
							</div>
						</div>
					</div>
				</template>
				<!-- 企业数据 -->
				<template v-else>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								正&nbsp;&nbsp;&nbsp;常
							</div>
							<div class="num">
								{{gross2}}&nbsp;<span>条</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								吊销
							</div>
							<div class="num">
								{{cx}}&nbsp;<span>条</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								注销
							</div>
							<div class="num">
								{{zdx}}&nbsp;<span>条</span>
							</div>
						</div>
					</div>
					<div class="item">
						<img :src="unClick" />
						<div class="info">
							<div class="title">
								其他
							</div>
							<div class="num">
								{{qc}}&nbsp;<span>条</span>
							</div>
						</div>
					</div>
				</template>
			</div>
			<!-- 地图-->
			<div class="map">
				<!-- 德胜街道 -->
				<div class="desheng_img" :class="activeRoad == 'desheng'?'desheng_img_active':null" @click="changeRoad('desheng')"></div>

				<div class="desheng_info">
          <div class="num" :style="{opacity:activeRoad=='desheng'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.desheng.totalCnt}}</span>
              <span v-else>{{companyRoadData.desheng.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='desheng'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.desheng.actualCnt}}</span>
              <span v-else>{{companyRoadData.desheng.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='desheng'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.desheng.floatCnt}}</span>
              <span v-else>{{companyRoadData.desheng.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='desheng'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.desheng.regiterCnt}}</span>
              <span v-else>{{companyRoadData.desheng.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='desheng'?'1':'0'}">
						<img :src="roadIcon3"></img>
					</div>
					<div class="road">
						德胜街道
					</div>
				</div>
				<!-- 西长安街道 -->
				<div class="xichangan_img" :class="activeRoad == 'xichangan'?'xichangan_img_active':null" @click="changeRoad('xichangan')"></div>

				<div class="xichangan_info">
					<div class="num" :style="{opacity:activeRoad=='xichangan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xichangan.totalCnt}}</span>
              <span v-else>{{companyRoadData.xichangan.normalCnt}}</span>
            </div>
					</div>
          <div class="num" :style="{opacity:activeRoad=='xichangan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xichangan.actualCnt}}</span>
              <span v-else>{{companyRoadData.xichangan.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='xichangan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xichangan.floatCnt}}</span>
              <span v-else>{{companyRoadData.xichangan.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='xichangan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xichangan.regiterCnt}}</span>
              <span v-else>{{companyRoadData.xichangan.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='xichangan'?'1':'0'}">
						<img :src="roadIcon"></img>
					</div>
					<div class="road">
						西长安街街道
					</div>
				</div>
				<!-- 什刹海街道 -->
				<div class="shichahai_img" :class="activeRoad == 'shichahai'?'shichahai_img_active':null" @click="changeRoad('shichahai')"></div>

				<div class="shichahai_info">
          <div class="num" :style="{opacity:activeRoad=='shichahai'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.shichahai.totalCnt}}</span>
              <span v-else>{{companyRoadData.shichahai.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='shichahai'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.shichahai.actualCnt}}</span>
              <span v-else>{{companyRoadData.shichahai.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='shichahai'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.shichahai.floatCnt}}</span>
              <span v-else>{{companyRoadData.shichahai.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='shichahai'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.shichahai.regiterCnt}}</span>
              <span v-else>{{companyRoadData.shichahai.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='shichahai'?'1':'0'}">
						<img :src="roadIcon"></img>
					</div>
					<div class="road">
						什刹海街道
					</div>
				</div>
				<!-- 新街口街道 -->
				<div class="xinjiekou_img" :class="activeRoad == 'xinjiekou'?'xinjiekou_img_active':null" @click="changeRoad('xinjiekou')"></div>


				<div class="xinjiekou_info">
          <div class="num" :style="{opacity:activeRoad=='xinjiekou'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xinjiekou.totalCnt}}</span>
              <span v-else>{{companyRoadData.xinjiekou.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='xinjiekou'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xinjiekou.actualCnt}}</span>
              <span v-else>{{companyRoadData.xinjiekou.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='xinjiekou'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xinjiekou.floatCnt}}</span>
              <span v-else>{{companyRoadData.xinjiekou.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='xinjiekou'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.xinjiekou.regiterCnt}}</span>
              <span v-else>{{companyRoadData.xinjiekou.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='xinjiekou'?'1':'0'}">
						<img :src="roadIcon"></img>
					</div>
					<div class="road">
						新街口街道
					</div>
				</div>
				<!-- 展览路街道 -->
				<div class="zhanlanlu_img" :class="activeRoad == 'zhanlanlu'?'zhanlanlu_img_active':null" @click="changeRoad('zhanlanlu')"></div>

				<div class="zhanlanlu_info">
          <div class="num" :style="{opacity:activeRoad=='zhanlanlu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.zhanlanlu.totalCnt}}</span>
              <span v-else>{{companyRoadData.zhanlanlu.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='zhanlanlu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.zhanlanlu.actualCnt}}</span>
              <span v-else>{{companyRoadData.zhanlanlu.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='zhanlanlu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.zhanlanlu.floatCnt}}</span>
              <span v-else>{{companyRoadData.zhanlanlu.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='zhanlanlu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.zhanlanlu.regiterCnt}}</span>
              <span v-else>{{companyRoadData.zhanlanlu.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='zhanlanlu'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						展览路街道
					</div>
				</div>
				<!-- 金融街道 -->
				<div class="jinrongjie_img" :class="activeRoad == 'jinrongjie'?'jinrongjie_img_active':null" @click="changeRoad('jinrongjie')"></div>

				<div class="jinrongjie_info">
          <div class="num" :style="{opacity:activeRoad=='jinrongjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.jinrongjie.totalCnt}}</span>
              <span v-else>{{companyRoadData.jinrongjie.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='jinrongjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.jinrongjie.actualCnt}}</span>
              <span v-else>{{companyRoadData.jinrongjie.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='jinrongjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.jinrongjie.floatCnt}}</span>
              <span v-else>{{companyRoadData.jinrongjie.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='jinrongjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.jinrongjie.regiterCnt}}</span>
              <span v-else>{{companyRoadData.jinrongjie.otherCnt}}</span>
            </div>
          </div>
					<div class="icon">
						<img :src="roadIcon2" :style="{opacity:activeRoad=='jinrongjie'?'1':'0'}"></img>
					</div>
					<div class="road">
						金融街道
					</div>
				</div>
				<!-- 月坛街道 -->
				<div class="yuetanjie_img" :class="activeRoad == 'yuetanjie'?'yuetanjie_img_active':null" @click="changeRoad('yuetanjie')"></div>

				<div class="yuetanjie_info">
          <div class="num" :style="{opacity:activeRoad=='yuetanjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.yuetanjie.totalCnt}}</span>
              <span v-else>{{companyRoadData.yuetanjie.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='yuetanjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.yuetanjie.actualCnt}}</span>
              <span v-else>{{companyRoadData.yuetanjie.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='yuetanjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.yuetanjie.floatCnt}}</span>
              <span v-else>{{companyRoadData.yuetanjie.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='yuetanjie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.yuetanjie.regiterCnt}}</span>
              <span v-else>{{companyRoadData.yuetanjie.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='yuetanjie'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						月坛街道
					</div>
				</div>
				<!-- 广外街街道 -->
				<div class="guangwaijie_img" :class="activeRoad == 'guangwaijie'?'guangwaijie_img_active':null" @click="changeRoad('guangwaijie')"></div>

				<div class="guangwaijie_info">
          <div class="num" :style="{opacity:activeRoad=='guangwaijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangwaijie.totalCnt}}</span>
              <span v-else>{{companyRoadData.guangwaijie.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangwaijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangwaijie.actualCnt}}</span>
              <span v-else>{{companyRoadData.guangwaijie.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangwaijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangwaijie.floatCnt}}</span>
              <span v-else>{{companyRoadData.guangwaijie.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangwaijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangwaijie.regiterCnt}}</span>
              <span v-else>{{companyRoadData.guangwaijie.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='guangwaijie'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						广外街街道
					</div>
				</div>
				<!-- 白纸坊街道 -->
				<div class="baizhifang_img" :class="activeRoad == 'baizhifang'?'baizhifang_img_active':null" @click="changeRoad('baizhifang')"></div>

				<div class="baizhifang_info">
          <div class="num" :style="{opacity:activeRoad=='baizhifang'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.baizhifang.totalCnt}}</span>
              <span v-else>{{companyRoadData.baizhifang.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='baizhifang'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.baizhifang.actualCnt}}</span>
              <span v-else>{{companyRoadData.baizhifang.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='baizhifang'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.baizhifang.floatCnt}}</span>
              <span v-else>{{companyRoadData.baizhifang.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='baizhifang'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.baizhifang.regiterCnt}}</span>
              <span v-else>{{companyRoadData.baizhifang.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='baizhifang'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						白纸坊街道
					</div>
				</div>
				<!-- 椿树街道 -->
				<div class="chunshu_img" :class="activeRoad == 'chunshu'?'chunshu_img_active':null" @click="changeRoad('chunshu')"></div>

				<div class="chunshu_info">
          <div class="num" :style="{opacity:activeRoad=='chunshu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.chunshu.totalCnt}}</span>
              <span v-else>{{companyRoadData.chunshu.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='chunshu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.chunshu.actualCnt}}</span>
              <span v-else>{{companyRoadData.chunshu.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='chunshu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.chunshu.floatCnt}}</span>
              <span v-else>{{companyRoadData.chunshu.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='chunshu'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.chunshu.regiterCnt}}</span>
              <span v-else>{{companyRoadData.chunshu.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='chunshu'?'1':'0'}">
						<img :src="roadIcon"></img>
					</div>
					<div class="road">
						椿树街道
					</div>
				</div>
				<!-- 大栅栏街道 -->
				<div class="dashilan_img" :class="activeRoad == 'dashilan'?'dashilan_img_active':null" @click="changeRoad('dashilan')"></div>

				<div class="dashilan_info">
          <div class="num" :style="{opacity:activeRoad=='dashilan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.dashilan.totalCnt}}</span>
              <span v-else>{{companyRoadData.dashilan.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='dashilan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.dashilan.actualCnt}}</span>
              <span v-else>{{companyRoadData.dashilan.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='dashilan'?'1':'0'}">
            <div class="baseLabel">
            <span v-if="cardIndex == 0">流动人口：</span>
            <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
            <span v-if="cardIndex == 0">{{personRoadData.dashilan.floatCnt}}</span>
            <span v-else>{{companyRoadData.dashilan.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='dashilan'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.dashilan.regiterCnt}}</span>
              <span v-else>{{companyRoadData.dashilan.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='dashilan'?'1':'0'}">
						<img :src="roadIcon3"></img>
					</div>
					<div class="road">
						大栅栏街道
					</div>
				</div>
				<!-- 牛街街道 -->
				<div class="niujie_img" :class="activeRoad == 'niujie'?'niujie_img_active':null" @click="changeRoad('niujie')"></div>

				<div class="niujie_info">
          <div class="num" :style="{opacity:activeRoad=='niujie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.niujie.totalCnt}}</span>
              <span v-else>{{companyRoadData.niujie.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='niujie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.niujie.actualCnt}}</span>
              <span v-else>{{companyRoadData.niujie.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='niujie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.niujie.floatCnt}}</span>
              <span v-else>{{companyRoadData.niujie.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='niujie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.niujie.regiterCnt}}</span>
              <span v-else>{{companyRoadData.niujie.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='niujie'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						牛街街道
					</div>
				</div>
				<!-- 广内街街道 -->
				<div class="guangneijie_img" :class="activeRoad == 'guangneijie'?'guangneijie_img_active':null" @click="changeRoad('guangneijie')"></div>

				<div class="guangneijie_info">
          <div class="num" :style="{opacity:activeRoad=='guangneijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangneijie.totalCnt}}</span>
              <span v-else>{{companyRoadData.guangneijie.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangneijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangneijie.actualCnt}}</span>
              <span v-else>{{companyRoadData.guangneijie.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangneijie'?'1':'0'}">
            <div class="baseLabel">
                <span v-if="cardIndex == 0">流动人口：</span>
                <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangneijie.floatCnt}}</span>
              <span v-else>{{companyRoadData.guangneijie.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='guangneijie'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.guangneijie.regiterCnt}}</span>
              <span v-else>{{companyRoadData.guangneijie.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='guangneijie'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						广内街街道
					</div>
				</div>
				<!-- 陶然亭街道 -->
				<div class="taoranting_img" :class="activeRoad == 'taoranting'?'taoranting_img_active':null" @click="changeRoad('taoranting')"></div>

				<div class="taoranting_info">
          <div class="num" :style="{opacity:activeRoad=='taoranting'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.taoranting.totalCnt}}</span>
              <span v-else>{{companyRoadData.taoranting.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='taoranting'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.taoranting.actualCnt}}</span>
              <span v-else>{{companyRoadData.taoranting.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='taoranting'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.taoranting.floatCnt}}</span>
              <span v-else>{{companyRoadData.taoranting.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='taoranting'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.taoranting.regiterCnt}}</span>
              <span v-else>{{companyRoadData.taoranting.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='taoranting'?'1':'0'}">
						<img :src="roadIcon"></img>
					</div>
					<div class="road">
						陶然亭街道
					</div>
				</div>
				<!-- 天桥街道 -->
				<div class="tianqiao_img" :class="activeRoad == 'tianqiao'?'tianqiao_img_active':null" @click="changeRoad('tianqiao')"></div>

				<div class="tianqiao_info">
          <div class="num" :style="{opacity:activeRoad=='tianqiao'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">人口总量：</span>
              <span v-else>正&nbsp;&nbsp;&nbsp;常：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.tianqiao.totalCnt}}</span>
              <span v-else>{{companyRoadData.tianqiao.normalCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='tianqiao'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">实有人口：</span>
              <span v-else>吊&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.tianqiao.actualCnt}}</span>
              <span v-else>{{companyRoadData.tianqiao.revokeCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='tianqiao'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">流动人口：</span>
              <span v-else>注&nbsp;&nbsp;&nbsp;销：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.tianqiao.floatCnt}}</span>
              <span v-else>{{companyRoadData.tianqiao.cancelCnt}}</span>
            </div>
          </div>
          <div class="num" :style="{opacity:activeRoad=='tianqiao'?'1':'0'}">
            <div class="baseLabel">
              <span v-if="cardIndex == 0">户籍人口：</span>
              <span v-else>其&nbsp;&nbsp;&nbsp;他：</span>
            </div>
            <div class="baseValue">
              <span v-if="cardIndex == 0">{{personRoadData.tianqiao.regiterCnt}}</span>
              <span v-else>{{companyRoadData.tianqiao.otherCnt}}</span>
            </div>
          </div>
					<div class="icon" :style="{opacity:activeRoad=='tianqiao'?'1':'0'}">
						<img :src="roadIcon2"></img>
					</div>
					<div class="road">
						天桥街道
					</div>
				</div>
			</div>
		</div>

		<!-- 右侧数据展示 -->
		<div class="right1" v-if="cardIndex == 0">
			<div class="boxes">
        <div class="p_box1">
          <!-- 四角边框 -->
          <!-- 左上角 -->
          <div class="lt"></div>
          <!-- 右上角 -->
          <div class="rt"></div>
          <!-- 左下角 -->
          <div class="lb"></div>
          <!-- 右下角 -->
          <div class="rb"></div>
          <p class="tit">流动原因TOP5</p>
          <div class="floatTable">
            <el-table
              :data="floatData"
              size="small"
            >
              <el-table-column
                type="index"
                label="排名"
                width="60">
                <template slot-scope="scope">
                  <img v-if="scope.$index + 1 == 1" src="../../assets/main/new/1.png" width="40" height="40" class="head_pic"/>
            　　   <img v-if="scope.$index + 1 == 2" src="../../assets/main/new/2.png" width="40" height="40" class="head_pic"/>
                  <img v-if="scope.$index + 1 == 3" src="../../assets/main/new/3.png" width="40" height="40" class="head_pic"/>
                  <img v-if="scope.$index + 1 == 4" src="../../assets/main/new/4.png" width="40" height="40" class="head_pic"/>
                  <img v-if="scope.$index + 1 == 5" src="../../assets/main/new/5.png" width="40" height="40" class="head_pic"/>
                </template>
              </el-table-column>
              <el-table-column
                prop="floatReson"
                label="流动原因"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="floatCnt"
                label="人口数量"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="p_box2">
          <!-- 四角边框 -->
          <!-- 左上角 -->
          <div class="lt"></div>
          <!-- 右上角 -->
          <div class="rt"></div>
          <!-- 左下角 -->
          <div class="lb"></div>
          <!-- 右下角 -->
          <div class="rb"></div>
          <p class="tit">年龄结构</p>
          <div class="pieChart1" id="pieChart1" v-show="!empty1">

          </div>
        </div>
			</div>
			<div class="line">
				<!-- 四角边框 -->
				<!-- 左上角 -->
				<div class="lt"></div>
				<!-- 右上角 -->
				<div class="rt"></div>
				<!-- 左下角 -->
				<div class="lb"></div>
				<!-- 右下角 -->
				<div class="rb"></div>
				<p class="tit">各街道技防注册人员占比</p>
				<div class="noData" v-show="empty2">暂无数据</div>
				<div class="birthLine" id="birthLine" v-show="!empty2">

				</div>
			</div>
			<div class="bar">
				<!-- 四角边框 -->
				<!-- 左上角 -->
				<div class="lt"></div>
				<!-- 右上角 -->
				<div class="rt"></div>
				<!-- 左下角 -->
				<div class="lb"></div>
				<!-- 右下角 -->
				<div class="rb"></div>
				<p class="tit">各街道疫苗摸排人员情况</p>
				<!-- 各街道疫苗预约占比-柱状图 -->
				<div class="noData" v-show="empty3">暂无数据</div>
				<div class="genderBar" id="genderBar" v-show="!empty3">

				</div>
			</div>
		</div>
		<div class="right2" v-else>
			<div class="boxes">
				<div class="box1">
					<!-- 四角边框 -->
					<!-- 左上角 -->
					<div class="lt"></div>
					<!-- 右上角 -->
					<div class="rt"></div>
					<!-- 左下角 -->
					<div class="lb"></div>
					<!-- 右下角 -->
					<div class="rb"></div>
					<p class="tit">行业分布</p>
					<div class="noData" v-show="empty4">暂无数据</div>
					<div class="pieChart2" id="pieChart2" v-show="!empty4">

					</div>
					<img :src="pieCenter" v-show="!empty4">
					<img :src="pieOutSide" class="out" v-show="!empty4">
				</div>
				<div class="box2">
					<!-- 四角边框 -->
					<!-- 左上角 -->
					<div class="lt"></div>
					<!-- 右上角 -->
					<div class="rt"></div>
					<!-- 左下角 -->
					<div class="lb"></div>
					<!-- 右下角 -->
					<div class="rb"></div>
					<p class="tit">企业类型分布</p>
					<div class="noData" v-show="empty5">暂无数据</div>
					<div class="pieChart3" id="pieChart3" v-show="!empty5">

					</div>
					<img :src="pieCenter" v-show="!empty5">
					<img :src="pieOutSide" class="out" v-show="!empty5">
				</div>
			</div>
			<div class="line">
				<!-- 四角边框 -->
				<!-- 左上角 -->
				<div class="lt"></div>
				<!-- 右上角 -->
				<div class="rt"></div>
				<!-- 左下角 -->
				<div class="lb"></div>
				<!-- 右下角 -->
				<div class="rb"></div>
				<p class="tit">企业异常趋势</p>
				<div class="noData" v-show="empty6">暂无数据</div>
				<div class="numChange" id="numChange" v-show="!empty6">

				</div>
			</div>
			<div class="bar">
				<!-- 四角边框 -->
				<!-- 左上角 -->
				<div class="lt"></div>
				<!-- 右上角 -->
				<div class="rt"></div>
				<!-- 左下角 -->
				<div class="lb"></div>
				<!-- 右下角 -->
				<div class="rb"></div>
				<p class="tit">企业数量统计-状态</p>
				<div class="noData" v-show="empty7">暂无数据</div>
				<div class="numStatus" id="numStatus" v-show="!empty7">

				</div>
			</div>
		</div>

		<!-- 明细弹框 -人口 -->
		<div class="mask1" v-show="maskFlag1" @click.self="closeMask1">
			<div class="pop">
				<div class="closeBtn" @click="closeMask1"></div>
				<div class="title">
					<span>口径说明：</span>
				</div>
				<div class="content">
					<div>
						<span class="keySpan">人口总量：</span>
						<span align="center">
							指西城
							区在一定时间内的人口总和，为实有人口、流动人口、户籍人口等所有人口数据的汇总统计。
						</span>
					</div>
					<div>
						<span class="keySpan">
							实有人口：
						</span>
						<span>
							指实际居住在西城区辖区内的所有人口，限定于在西城区辖区内实际居住的人员，常住户口登记在西城区辖区但没有实际居住的
							人员不应登记为实有人口。军队、武警部队人员不作为实有人口登记。
						</span>
					</div>
					<div>
						<span class="keySpan">
							流动人口：
						</span>
						<span>
							指人户分离人口中不包括市辖区内人户分离的人口。市辖区内人户分离的人口是指一个直辖市或地级市所辖区内和区与区之间，
							居住地和户口登记地不在同一乡镇街道的人口
						</span>
					</div>
					<div>
						<span class="keySpan">
							户籍人口：
						</span>
						<span>
							指公民依照《中华人民共和国户口登记条例》已在其经常居住地的公安户籍管理机关登记了常住户口的人。
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- 明细弹框 -企业 -->
		<div class="mask2" v-show="maskFlag2" @click.self="closeMask2">
			<div class="pop">
				<div class="closeBtn" @click="closeMask2"></div>
				<div class="title">
					<span>口径说明：</span>
				</div>
				<div class="content">
					<div>
						<span class="keySpan">企业总量：</span>
						<span align="center">
							指西城区在一定时间内的企业总和，为存续、注吊销、迁出等所有企业数据的汇总统计。
						</span>
					</div>
					<div>
						<span class="keySpan">
							存续企业：
						</span>
						<span>
							企业依法注册并在运营内的企业总量，存续也被称作开业、正常、登记。
						</span>
					</div>
					<div>
						<span class="keySpan">
							注吊销企业：
						</span>
						<span>
							吊销、撤销和注销的企业总量。
						</span>
					</div>
					<div>
						<span class="keySpan">
							迁出企业：
						</span>
						<span>
							发生登记主管机关的变更行为的企业总量。
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 明细弹框 -企业 -->
		<div class="mask3" v-show="table1" @click.self="closeTable1">
			<div class="pop">
				<div class="closeBtn" @click="closeTable1"></div>
				<table>
					<tr class="tr1" align="center" valign="middle">
						<td width="9%" rowspan="2"><span>地域</span></td>
						<td width="8.588%" rowspan="2"><span>人口总量</span></td>
						<td width="8.6%" colspan="2"><span>性别</span></td>
						<td width="8.6%" colspan="2"><span>婚姻状况</span></td>
						<td width="33.2%" colspan="6"><span>年龄段分布</span></td>
						<td width="24.9%" colspan="4"><span>学历情况</span></td>
						<td width="7.39%" rowspan="2"><span>残疾人</span></td>
						<td width="6.1%" rowspan="2"><span>党员</span></td>
					</tr>
					<tr class="tr2" align="center" valign="middle">
						<td width="4.5%"><span>男</span></td>
						<td width="4.5%"><span>女</span></td>
						<td width="4.5%"><span>已婚</span></td>
						<td width="4.5%"><span>未婚</span></td>
						<td width="7.5%"><span>18岁以下</span></td>
						<td width="4.5%"><span>18-30</span></td>
						<td width="4.5%"><span>31-40</span></td>
						<td width="4.5%"><span>41-50</span></td>
						<td width="4.5%"><span>51-60</span></td>
						<td width="7.5%"><span>60岁以上</span></td>
						<td width="7.5%"><span>高中以下</span></td>
						<td width="4.5%"><span>高中</span></td>
						<td width="4.5%"><span>本科</span></td>
						<td width="5%"><span>硕博士</span></td>
					</tr>
					<tr class="tr3" :class="index%2==0?'double':'single'" v-for="(item, index) in personData" align="center" valign="middle">
						<td>{{item.areaName}}</td>
						<td>{{item.gross}}</td>
						<td>{{item.man}}</td>
						<td>{{item.woman}}</td>
						<td>{{item.married}}</td>
						<td>{{item.unmarried}}</td>
						<td>{{item.child}}</td>
						<td>{{item.eighteen}}</td>
						<td>{{item.thirty}}</td>
						<td>{{item.forty}}</td>
						<td>{{item.fifty}}</td>
						<td>{{item.sixty}}</td>
						<td>{{item.junior}}</td>
						<td>{{item.high}}</td>
						<td>{{item.undergraduate}}</td>
						<td>{{item.masterDoctor}}</td>
						<td>{{item.disability}}</td>
						<td>{{item.partyMember}}</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- 明细弹框 -企业 -->
		<div class="mask4" v-show="table2" @click.self="closeTable2">
			<div class="pop">
				<div class="closeBtn" @click="closeTable2"></div>
				<table>
					<tr class="tr1" align="center" valign="middle">
						<td width="12%" rowspan="2"><span>地域</span></td>
						<td width="8%" rowspan="2"><span>企业总量</span></td>
						<td width="5%" rowspan="2"><span>存续</span></td>
						<td width="6%" rowspan="2"><span>注吊销</span></td>
						<td width="5%" rowspan="2"><span>迁出</span></td>
						<td width="49%" colspan="6"><span>行业类别</span></td>
						<td width="45%" colspan="6"><span>企业类型</span></td>
					</tr>
					<tr class="tr2" align="center" valign="middle">
						<td width="12%"><span>卫生和社会工作</span></td>
						<td width="6%"><span>教育</span></td>
						<td width="6%"><span>金融业</span></td>
						<td width="6%"><span>制造业</span></td>
						<td width="10%"><span>批发和零售业</span></td>
						<td width="10%"><span>住宿和餐饮业</span></td>
						<td width="6%"><span>中外合资</span></td>
						<td width="10%"><span>股份有限公司</span></td>
						<td width="10%"><span>有限责任公司</span></td>
						<td width="6%"><span>国有全资</span></td>
						<td width="6%"><span>集体全资</span></td>
						<td width="5%"><span>联营</span></td>
					</tr>
					<tr class="tr3" :class="index%2==0?'double':'single'" v-for="(item, index) in companyData" align="center" valign="middle">
						<!-- <td v-for="(value,key,index) in item" v-if="index>0">
							{{value}}
						</td> -->
						<td>{{item.areaName}}</td>
						<td>{{item.gross}}</td>
						<td>{{item.cx}}</td>
						<td>{{item.zdx}}</td>
						<td>{{item.qc}}</td>
						<td>{{item.health}}</td>
						<td>{{item.education}}</td>
						<td>{{item.financial}}</td>
						<td>{{item.make}}</td>
						<td>{{item.retail}}</td>
						<td>{{item.hotel}}</td>
						<td>{{item.chinaForeign}}</td>
						<td>{{item.stockLimited}}</td>
						<td>{{item.dutyLimited}}</td>
						<td>{{item.stateOwned}}</td>
						<td>{{item.collective}}</td>
						<td>{{item.consortia}}</td>
					</tr>
				</table>
			</div>
		</div>
    <div v-if="cardIndex == 2"><hua-xiang></hua-xiang></div>
    <el-dialog
      :visible.sync="loginFlag"
      width="35%"
      top="10%"
      class="loginForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :modal-append-to-body="true"
     >
      <div style="margin-top: 5%">
        <!--用&nbsp;户&nbsp;登&nbsp;录-->
        <span class="login_title">西城区大数据治理</span>
      </div>

      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            autocomplete="off">
            <i slot="prefix" style="display: flex;align-items: center;">
              <img src="../../assets/icon-username.png"/>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" style="margin-top: 5%">
          <el-input
            type="password"
            v-model="ruleForm.password"
            placeholder="请输入密码"
            autocomplete="off"
            @keyup.enter.native="submitForm('ruleForm')"
          >
            <i slot="prefix" style="display: flex;align-items: center;">
              <img src="../../assets/icon-pwd.png"/>
            </i>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-left: -3%">
          <el-button
            style="background-color: #22ABFF"
            @click="resetForm('ruleForm')">重&nbsp;&nbsp;&nbsp;&nbsp;置</el-button>
          <el-button
            type="primary"
            style="margin-left: 3.1rem; background-color: #F8A717"
            @click="submitForm('ruleForm')"
          >提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
		 <!--更新时间-->
		<footerTime :isExplain="cardIndex == 0? true:false" :screenId="cardIndex == 0? 11 : 12" />
	</div>
</template>

<script>
	import footerTime from "../footerTime";
	import huaXiang from "./drawPortray.vue";
	import _ from "lodash";
  import md5 from 'js-md5';
	import {
    getFloatReason,
    getAgeStruct,
    getPersonYm,
    getPersonJf,
		getPersonTime,
		getPersonDetail,
		getPersonGross,
		getCompanyComArea,
		getCompanyArea,
		getCompanyCategory,
		getCompanyCompanyType,
		getCompanyDetail,
		getCompanyNumber,
		getCompanyTime
	} from '../../api/newMain.js'
	export default {
		components: {
			footerTime,
      huaXiang
		},
		data() {
			return {
			  // 登录标识
			  loginFlag: false,
        ruleForm: {
          username: '',
          password: ''
        },
        username: '7f8a7e16717038045bde322a743fb2dd',
        password: 'b2655a87fbc1cb6bbe171bb4985f6ff9',
				//折线颜色数组
				lineColor: ["#015bff", "#ffab05", "#09ce0b", "#015bff", "#ffab05", "#09ce0b", "#015bff", "#ffab05", "#09ce0b",
					"#015bff", "#ffab05"
				],
				percentage: 65.33,
				colors: 'rgba(255,168,0,1)',
				flag: true,
				timeLine: require('../../assets/main/timeLine.png'),
				timeClick: require('../../assets/main/timeClick.png'),
				unClick: require('../../assets/main/未点中.png'),
				mapBg: require('../../assets/main/bg.png'),
				// 各街道人口总量
				personRoadData: {
					desheng: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					shichahai: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					xinjiekou: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					zhanlanlu: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					yuetanjie: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					xichangan: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					guangwaijie: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					guangneijie: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					chunshu: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					dashilan: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					niujie: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					baizhifang: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					taoranting: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					tianqiao: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          },
					jinrongjie: {
            totalCnt: 1000,
            actualCnt: 1000,
            floatCnt: 1000,
            regiterCnt: 1000,
          }
				},
				// 各街道企业总量
				companyRoadData: {
					desheng: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					shichahai: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					xinjiekou: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					zhanlanlu: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					yuetanjie: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					xichangan: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					guangwaijie: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					guangneijie: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					chunshu: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					dashilan: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					niujie: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					baizhifang: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					taoranting: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					tianqiao: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          },
					jinrongjie: {
            normalCnt: 1000,
            revokeCnt: 1000,
            cancelCnt: 1000,
            otherCnt: 1000
          }
				},
				// 性别数据
				sexData: {
					female: {},
					male: {}
				},
				// 婚姻数据
				marriageData: {
					marriedHold: 0,
					unmarriedHold: 0
				},
				// 残疾、党员数据
				personLabel: {
					disabilityHold: 0,
					partyMemberHold: 0
				},
				// 学历数据
				educationData: {},
				eduData: [],
				eduItem: [],
				companyItem: [],
				jobItem: [],
				// 企业类型数据
				companyType: [],
				// 行业类型数据
				jobType: [],
				// 人口表格数据
				personData: [],
				// 企业表格数据
				companyData: [],
				// 人口时间轴数组
				timeArray: [],
				// 企业时间轴数组
				timeArray2: [],
				// 高亮月份
				timeIndex1: 0,
				timeIndex2: 0,
				// 0:人口 1：企业
				cardIndex: 0,
				// 人口总量
				gross: 0,
				// 实有人口
				inEffect: 0,
				// 流动人口
				stream: 0,
				// 户籍人口
				census: 0,
				// 企业总量
				gross2: 0,
				// 注吊销
				zdx: 0,
				// 迁出
				qc: 0,
				// 存续
				cx: 0,
				// 具体街道人口总量
				personTotal: 4355,
				// 具体街道企业总量
				companyTotal: 4355,
				table1: false,
				table2: false,
				// 高亮街道
				activeRoad: 'xichangan',
				roadIcon: require('../../assets/main/roadIcon.png'),
				roadIcon2: require('../../assets/main/roadIcon2.png'),
				roadIcon3: require('../../assets/main/roadIcon3.png'),
				pieCenter: require('../../assets/main/pieCenter.png'),
				pieOutSide: require('../../assets/main/pieOutSide.png'),
				maskFlag1: false,
				maskFlag2: false,
				canji: require('../../assets/main/canji.png'),
				dangyuan: require('../../assets/main/dangyuan.png'),
				circleWidth: 12,
				barWidth: 20,
				barX: [],
				barY1: [],
				barY2: [],
				barX2: [],
				barY3: [],
				barY4: [],
				barY5: [],
        barY6: [],
				lineX: [],
				lineY1: [],
				lineY2: [],
				lineYTotal: [],
				lineX2: [],
				lineY3: [],
				lineY4: [],
				lineY5: [],
				empty1: false,
				empty2: false,
				empty3: false,
				empty4: false,
				empty5: false,
				empty6: false,
				empty7: false,
				empty8: false,
				empty9: false,
				empty10: false,
				pieColor: ['rgba(1,200,243,1)', 'rgba(0,175,109,1)', 'rgba(172,78,211,1)', '#E6AF08', 'rgba(64,127,255,1)',
					'rgba(255,51,102)'
				],

        // 流动原因
        floatData: [
          {
            floatReson: '投靠亲友',
            floatCnt: '328335'
          }, {
            date: '2016-05-04',
            name: '王小虎'
          },{
            date: '2016-05-02',
            name: '王小虎'
          }, {
            date: '2016-05-04',
            name: '王小虎'
          },{
            date: '2016-05-02',
            name: '王小虎'
          }
        ]
			}
		},
		mounted() {
		  this.checkLogin();
			this.getTime();
			this.changeTabIndex(0);
		},
		methods: {
		  // 判断登录状态
		  checkLogin() {
		    if (sessionStorage.getItem("login")) {
          this.loginFlag = false
        } else {
		      this.loginFlag = true
        }
      },
		  // 用户登录判断
      submitForm(formName) {
        if (md5(this.ruleForm.username) === this.username && md5(this.ruleForm.password) === this.password) {
          sessionStorage.setItem("login", true);
          this.loginFlag = false
        } else {
          this.$message.error('用户名密码错误！请核对！');
        }
      },
      // 登录重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
			getTime() {
				// 人口时间轴查询
				getPersonTime().then(res => {
					if (res.code === 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.timeArray.push(res.data[i].dateId)
						}
						this.getPerson(this.timeArray[0])
					}
				});
				// 企业时间轴查询
				getCompanyTime().then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							this.timeArray2.push(res.data[i].dateId);
						}
						this.getCompany(this.timeArray2[0])
					}
				})
			},
			// 切换人口/企业选项卡
			changeTabIndex(index) {
				if (index == this.cardIndex) {
					return
				}
        if(this.cardIndex != 2) {
          this.clearChart(index)
        }
				this.cardIndex = index

				this.$nextTick(() => {
					if (index == 0) {
						this.getBarChart1();
						this.getLineChart1();
						this.getPersonAgeBar();
						// this.getPieChart1();
					} else if(index == 1) {
						this.getBarChart2();
						this.getLineChart2();
						this.getPieChart2();
						this.getPieChart3();
					}
				})
			},
			getCompany(item) {
				let data = {
				  dateId: item,
					updateTime: item
				};
				// 企业行业分布查询
				getCompanyCategory(data).then(res => {
					if (res.code == 200) {
						for (let i = 0; i < res.data.length; i++) {
							let data = {
								name: res.data[i].economicCode,
								value: res.data[i].dataCount
							};
							let item = res.data[i].economicCode;
							this.jobItem.push(item);
							this.jobType.push(data)
						}
						this.$nextTick(() => {
							this.getPieChart2()
						})
					} else {
						this.empty4 = true;
					}
				});
				// 企业类型查询
				getCompanyCompanyType(data).then(res => {
					if (res.code == 200) {
						this.empty5 = false;
						for (let i = 0; i < res.data.length; i++) {
							let data = {
								name: res.data[i].industryCode,
								value: res.data[i].dataCount
							};
							let item = res.data[i].industryCode;
							this.companyItem.push(item);
							this.companyType.push(data)
						}
						this.$nextTick(() => {
							this.getPieChart3()
						})
					} else {
						this.empty5 = true;
					}
				});

				// 企业异常趋势查询
				getCompanyNumber(data).then(res => {
					if (res.code == 200) {
						this.empty6 = false;
						for (let i = 0; i < res.data.length; i++) {
							this.lineX2.push(res.data[i].year);
							this.lineY3.push(res.data[i].companyAbnormalInfo);
							this.lineY4.push(res.data[i].companyIllegalInfo);
							this.lineY5.push(res.data[i].companyOwnTax);
						}
						for (let i = 0; i < this.lineY4.length; i++) {
							if (this.lineY3[i] == null) {
								this.lineY3[i] = 0
							}
							if (this.lineY4[i] == null) {
								this.lineY4[i] = 0
							}
							if (this.lineY5[i] == null) {
								this.lineY5[i] = 0
							}
						}

						this.$nextTick(() => {
							this.getLineChart2()
						})
					} else {
						this.empty6 = true;
					}
				});
				// 街道企业数量查询+企业数量统计-状态
				getCompanyArea(data).then(res => {
					if (res.code == 200) {
						this.empty7 = false;
						for (let i = 0; i < res.data.length; i++) {
						  if (res.data[i].street != '西城区') {
                this.barX2.push(res.data[i].street);
                this.barY3.push(res.data[i].normalCnt);
                this.barY4.push(res.data[i].revokeCnt);//
                this.barY5.push(res.data[i].cancelCnt);//  注销企业
                this.barY6.push(res.data[i].otherCnt);// 其他企业
              }
						}
						for (let i = 0; i < this.barY3.length; i++) {
							if (this.barY3[i] == null) {
								this.barY3[i] = 0
							}
							if (this.barY4[i] == null) {
								this.barY4[i] = 0
							}
							if (this.barY5[i] == null) {
								this.barY5[i] = 0
							}
              if (this.barY6[i] == null) {
                this.barY6[i] = 0
              }
						}
						this.$nextTick(() => {
							this.getBarChart2()
						})
					} else {
						this.empty7 = true;
					}
				});
				// 企业详情查询
				// getCompanyDetail(data).then(res => {
				// 	if (res.code == 200) {
				// 		this.companyData = res.data
				// 	} else {
				// 		this.companyData = []
				// 	}
				// });

				// 街道企业总量查询
				getCompanyComArea(data).then(res => {
					if (res.code == 200) {
						let companyRoadData = res.data;
						for (let i = 0; i < companyRoadData.length; i++) {
							switch (companyRoadData[i].street) {
								case '德胜街道':
									this.companyRoadData.desheng = companyRoadData[i];
									break;
								case '什刹海街道':
									this.companyRoadData.shichahai = companyRoadData[i];
									break;
								case '新街口街道':
									this.companyRoadData.xinjiekou = companyRoadData[i];
									break;
								case '展览路街道':
									this.companyRoadData.zhanlanlu = companyRoadData[i];
									break;
								case '广安门外街道':
									this.companyRoadData.guangwaijie = companyRoadData[i];
									break;
								case '广安门内街道':
									this.companyRoadData.guangneijie = companyRoadData[i];
									break;
								case '椿树街道':
									this.companyRoadData.chunshu = companyRoadData[i];
									break;
								case '大栅栏街道':
									this.companyRoadData.dashilan = companyRoadData[i];
									break;
								case '牛街街道':
									this.companyRoadData.niujie = companyRoadData[i];
									break;
								case '白纸坊街道':
									this.companyRoadData.baizhifang = companyRoadData[i];
									break;
								case '陶然亭街道':
									this.companyRoadData.taoranting = companyRoadData[i];
									break;
								case '天桥街道':
									this.companyRoadData.tianqiao = companyRoadData[i];
									break;
								case '月坛街道':
									this.companyRoadData.yuetanjie = companyRoadData[i];
									break;
								case '金融街街道':
									this.companyRoadData.jinrongjie = companyRoadData[i];
									break;
								case '西长安街街道':
									this.companyRoadData.xichangan = companyRoadData[i];
									break;
                case '西城区':
                  this.gross2 = companyRoadData[i].normalCnt;
                  this.cx = companyRoadData[i].revokeCnt;
                  this.zdx = companyRoadData[i].cancelCnt;
                  this.qc = companyRoadData[i].otherCnt;
							}
						}
					}
				})
			},
			getPerson(item) {
				let data = {
				  updateTime: item,
					dateId: item
				};

				//流动原因TOP5
        getFloatReason(data).then(res => {
          if (res.code == 200) {
            this.floatData = res.data;
          }
        });

        //年龄结构
        getAgeStruct(data).then(res => {
          if (res.code == 200) {
            this.sexData.female = res.data[0];
            this.sexData.male = res.data[1];
            this.getPersonAgeBar();
          }
        });

				// 街道疫苗预约占比(柱状图)
				getPersonYm(data).then(res => {
					if (res.code == 200) {
						this.empty3 = false;
						for (let i = 0; i < res.data.length; i++) {
							this.barX.push(res.data[i].areaName);
							this.barY1.push(res.data[i].yyjzCnt);
              this.barY2.push(res.data[i].wyjzCnt);
						}
						for (let i = 0; i < this.barY1.length; i++) {
							if (this.barY1[i] == null) {
								this.barY1[i] = 0
							}
              if (this.barY2[i] == null) {
                this.barY2[i] = 0
              }
						}
						this.$nextTick(() => {
							this.getBarChart1()
						})
					} else {
						this.empty3 = true;
					}
				});
				// 各街道技防注册人员占比查询(折线图)
				getPersonJf(data).then(res => {
					if (res.code == 200) {
						this.empty2 = false;

						for (let i = 0; i < res.data.length; i++) {
							this.lineX.push(res.data[i].areaName);
							this.lineY1.push(res.data[i].zcRatio);
						}
						for (let i = 0; i < this.lineY1.length; i++) {
							if (this.lineY1[i] == null) {
								this.lineY1[i] = 0
							}
						}
						this.$nextTick(() => {
							this.getLineChart1()
						})
					} else {
						this.empty2 = true;
					}
				});
				// 人口详情查询
				// getPersonDetail(data).then(res => {
				// 	if (res.code == 200) {
				// 		this.personData = res.data
				// 	} else {
				// 		this.personData = []
				// 	}
				// });
				// 街道人口总量查询
				getPersonGross(data).then(res => {
					if (res.code == 200) {
						let personRoadData = res.data;
						for (let i = 0; i < personRoadData.length; i++) {
							switch (personRoadData[i].areaName) {
								case '德胜街道':
									this.personRoadData.desheng = personRoadData[i];
									break;
								case '什刹海街道':
									this.personRoadData.shichahai = personRoadData[i];
									break;
								case '新街口街道':
									this.personRoadData.xinjiekou = personRoadData[i];
									break;
								case '展览路街道':
									this.personRoadData.zhanlanlu = personRoadData[i];
									break;
								case '广安门外街道':
									this.personRoadData.guangwaijie = personRoadData[i];
									break;
								case '广安门内街道':
									this.personRoadData.guangneijie = personRoadData[i];
									break;
								case '椿树街道':
									this.personRoadData.chunshu = personRoadData[i];
									break;
								case '大栅栏街道':
									this.personRoadData.dashilan = personRoadData[i];
									break;
								case '牛街街道':
									this.personRoadData.niujie = personRoadData[i];
									break;
								case '白纸坊街道':
									this.personRoadData.baizhifang = personRoadData[i];
									break;
								case '陶然亭街道':
									this.personRoadData.taoranting = personRoadData[i];
									break;
								case '天桥街道':
									this.personRoadData.tianqiao = personRoadData[i];
									break;
								case '月坛街道':
									this.personRoadData.yuetanjie = personRoadData[i];
									break;
								case '金融街街道':
									this.personRoadData.jinrongjie = personRoadData[i];
									break;
								case '西长安街街道':
									this.personRoadData.xichangan = personRoadData[i];
									break;
                case '西城区':
                  this.gross = Math.round(personRoadData[i].totalCnt/10000);
                  this.inEffect = Math.round(personRoadData[i].actualCnt/10000);
                  this.stream = Math.round(personRoadData[i].floatCnt/10000);
                  this.census = Math.round(personRoadData[i].regiterCnt/10000);
                  break;
							}
						}
					}
				})
			},
			// 切换出时销毁
			clearChart(type) {
				var vm = this
				if (type == 1) {
					var myChart1 = vm.$echarts.init(document.getElementById("pieChart1"));
					var myChart2 = vm.$echarts.init(document.getElementById("birthLine"));
					var myChart3 = vm.$echarts.init(document.getElementById("genderBar"));
					myChart1.dispose();
					myChart2.dispose();
					myChart3.dispose();
				} else if(type == 0) {
					var myChart1 = vm.$echarts.init(document.getElementById("pieChart2"));
					var myChart2 = vm.$echarts.init(document.getElementById("pieChart3"));
					var myChart3 = vm.$echarts.init(document.getElementById("numChange"));
					var myChart4 = vm.$echarts.init(document.getElementById("numStatus"));
					myChart1.dispose();
					myChart2.dispose();
					myChart3.dispose();
					myChart4.dispose()
				}
			},
			// 切换人口月份
			changeMonth1(index, item) {
				this.timeIndex1 = index;
				this.clearChart(1);
				this.clearChartData(0);
				this.$nextTick(() => {
					this.getPerson(item)
				})
			},
			// 切换企业月份
			changeMonth2(index, item) {
				this.clearChart(0)
				this.clearChartData(1)
				this.timeIndex2 = index
				this.$nextTick(() => {
					this.getCompany(item)
				})
			},
			// 清空图形数据
			clearChartData(type) {
				if (type == 0) {
					this.eduData = []
					this.eduItem = []
					this.barX = []
					this.barY1 = []
					this.barY2 = []
					this.lineX = []
					this.lineY1 = []
					this.lineY2 = []
					this.lineYTotal = []
				} else {
					this.jobItem = []
					this.jobType = []
					this.companyItem = []
					this.companyType = []
					this.barX2 = []
					this.barY3 = []
					this.barY4 = []
					this.barY5 = []
					this.lineX2 = []
					this.lineY3 = []
					this.lineY4 = []
					this.lineY5 = []
				}
			},
			// 去掉百分号
			removePercent(param) {
				return param.substring(0, param.length - 1)
			},

      // 人口年龄结构图
      getPersonAgeBar() {
        let vm = this;
        let dom = document.getElementById("pieChart1");
        let myChart = vm.$echarts.init(dom);
        let data = this.sexData;
        let yAxisData = new Set();
        let legendData = [];

        _.forEach(data, (d) => {
          legendData.push(d.name);
          _.forEach(d.dataviewPerAgeData, (item) => {
            yAxisData.add(item.ageRange);
          });
        });

        let top = 20;
        let bottom = 50;

        yAxisData = [...yAxisData];

        let option = {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            left: 'center',
            bottom: 16,
            itemWidth: 15,
            itemHeight: 11,
            itemGap: 20,
            borderRadius: 4,
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            data: legendData
          },
          grid: [{
            left: '12%',
            width: '28%',
            containLabel: true,
            bottom
          }, {
            left: '52%',
            width: '0%',
            bottom: bottom + 16
          }, {
            right: '12%',
            width: '28%',
            containLabel: true,
            bottom
          }].map(item => _.merge({
            top
          }, item)),
          xAxis: [{
            type: 'value',
            inverse: true,
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false // 分隔线
            }
          }, {
            gridIndex: 1,
            show: true
          }, {
            gridIndex: 2,
            type: 'value',
            axisLabel: {
              show: false // 刻度线
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }].map((item) => _.merge(item, {
            axisLabel: {
              color: '#949AA8',
              margin: 0
            },
            splitLine: {
              lineStyle: {
                color: '#E0E0E0',
                type: 'dashed'
              }
            },
          })),
          yAxis: [{
            position: 'right',
            axisLabel: {
              show: false
            },
            axisLine: {
              show: true
            }
          },
            {
              gridIndex: 1,
              position: 'center',
              axisLabel: {
                align: 'center',
                padding: [8, 0, 0, 0],
                fontSize: 12,
                color: `#fff`
              },
              axisLine: {
                show: false
              }
            },
            {
              gridIndex: 2,
              position: 'left',
              axisLabel: {
                show: false
              },
              axisLine: {
                show: true
              }
            }
          ].map((item) => {
            return _.merge(item, {
              type: 'category',
              inverse: false,
              axisLine: {
                lineStyle: {
                  color: '#E0E0E0'
                }
              },
              axisTick: {
                show: false
              },
              data: yAxisData
            });
          }),
          series: [{
            name: _.get(data, 'male.name'),
            label: {
              position: 'left'
            },
            itemStyle: {
              color: '#01C5B2',
              // barBorderRadius: [4, 0, 0, 4]
            },
            data: _.map(_.get(data, 'male.dataviewPerAgeData'), d => d.dataCount)
          },
            {
              xAxisIndex: 2,
              yAxisIndex: 2,
              name: _.get(data, 'female.name'),
              label: {
                position: 'right'
              },
              itemStyle: {
                color: '#FB6F6C',
                // barBorderRadius: [0, 4, 4, 0] // 柱的radius设置
              },
              data: _.map(_.get(data, 'female.dataviewPerAgeData'), d => d.dataCount)
            }
          ].map(item => _.merge(item, {
            type: 'bar',
            barWidth: 11,
            label: {
              show: false, // 数值展示
              fontFamily: 'Rubik-Medium',
              fontSize: 14,
              distance: 10
            }
          }))
        };
        myChart.setOption(option, true);
      },
			// 饼状图
			getPieChart1() {
				var vm = this;
				let dom = document.getElementById("pieChart1");
				let myChart = vm.$echarts.init(dom);
				let option = {
					color: vm.pieColor,
					tooltip: {
						trigger: 'item',
						fontSize: '13',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: '50%', //图例距离左的距离
						y: 'center',
						data: vm.eduItem,
						textStyle: {
							color: function(params) {}
						}
					},
					series: [{
						name: '学历情况',
						type: 'pie',
						radius: ['50%', '70%'],
						center: ['23%', '50%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						labelLine: {
							show: false
						},
						data: vm.eduData
					}]
				};
				myChart.setOption(option, true);
			},
			getPieChart2() {
				var vm = this;
				let dom = document.getElementById("pieChart2");
				let myChart = vm.$echarts.init(dom);

				let option = {
					color: vm.pieColor,
					tooltip: {
						trigger: 'item',
						fontSize: '13',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: '60%', //图例距离左的距离
						y: 'center',
						data: vm.jobItem,
						textStyle: {
						  color: '#fff'
							// color: function(params) {}
						}
					},
					series: [{
						name: '行业分布',
						type: 'pie',
						radius: ['50%', '70%'],
						center: ['28%', '50%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						labelLine: {
							show: false
						},
						data: vm.jobType
					}]
				};
				myChart.setOption(option, true);
			},
			getPieChart3() {
				var vm = this;
				let dom = document.getElementById("pieChart3");
				let myChart = vm.$echarts.init(dom);
				let option = {
					color: vm.pieColor,
					tooltip: {
						trigger: 'item',
						fontSize: '13',
						formatter: '{a} <br/>{b}: {c} ({d}%)'
					},
					legend: {
						orient: 'vertical',
						left: '60%', //图例距离左的距离
						y: 'center',
						data: vm.companyItem,
						textStyle: {
						  color: '#fff'
							// color: function(params) {}
						},
            formatter: function (name) {
              if (!name) return '';
              if (name.length > 5) {
                return name.slice(0,5)+ '...';
              } else {
                return name;
              }
            },
            tooltip: {
              show: true
            }
					},
					series: [{
						name: '企业类型分布',
						type: 'pie',
						radius: ['50%', '70%'],
						center: ['28%', '50%'],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: 'center'
						},
						labelLine: {
							show: false
						},
						data: vm.companyType
					}]
				};
				myChart.setOption(option, true);
			},
			//人口-技防注册人员占比折线图
			getLineChart1() {
				var vm = this;
				let dom = document.getElementById("birthLine");
				let myChart = vm.$echarts.init(dom);
				let option = {
					legend: {
						// data: ['男性', '女性', '总人数'],
						show: true,
						top: "10%",
						right: "3%",
						icon: "rect",
						itemWidth: 14,
						itemHeight: 4,
						textStyle: {
							fontSize: 16,
							color: "#fff"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow',
						},
            formatter: function (params) {
              return params[0].name + '<br/>' + params[0].seriesName + '：' + params[0].data + '%';
            }
					},
					textStyle: {
						fontFamily: "SOURCEHANSANSCN-MEDIUM",
						fontWeight: "500"
					},
					grid: {
						left: '7%',
						right: '3%',
						top: "30%",
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: vm.lineX,
						axisLabel: {
							color: "#fff",
							fontSize: 13,
              interval: 0,
              rotate: 30
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: true
						},
						nameTextStyle: {
							color: "#fff",
							fontSize: 13
						}
					}],
					yAxis: [{
						type: 'value',
						axisLine: {
							show: true,
							color: "#fff",
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							show: true,
							fontSize: 16,
							color: 'rgba(255,255,255,1)'
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'line',
						name: "技防注册人员占比",
						symbol: 'none',
						data: vm.lineY1,
						smooth: true,
            itemStyle: {
              color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(185,255,220,1)'
              }, {
                offset: 1,
                color: 'rgba(16,208,19,1)'
              }])
            },
					}]
				};
				myChart.setOption(option, true);
			},
			getLineChart2() {
				var vm = this;
				let dom = document.getElementById("numChange");
				let myChart = vm.$echarts.init(dom);
				let option = {
					legend: {
						data: ['经营异常', '严重违法', '欠税公告'],
						show: true,
						top: "10%",
						right: "3%",
						icon: "rect",
						itemWidth: 14,
						itemHeight: 4,
						textStyle: {
							fontSize: 16,
							color: "#fff"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					textStyle: {
						fontFamily: "SOURCEHANSANSCN-MEDIUM",
						fontWeight: "500"
					},
					grid: {
						left: '3%',
						right: '3%',
						top: "23%",
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						// name:'(年)',
						type: 'category',
						data: vm.lineX2,
						axisLabel: {
							color: "#fff",
							fontSize: 13
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: true
						},
						nameTextStyle: {
							color: "red",
							fontSize: 13
						}
					}],
					yAxis: [{
						type: 'value',
						// min: function (value) {
						//   return Math.round(value.min * 0.8);
						// },
						// max: function (value) {
						//   return Math.round(value.max * 1.2);
						// },
						axisLine: {
							show: true,
							color: "#fff",
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							show: true,
							fontSize: 16,
							color: 'rgba(255,255,255,1)'
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'line',
						name: "经营异常",
						symbol: 'none',
						data: vm.lineY3,
						smooth: true,
						itemStyle: {
							color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(59,255,255,1)'
							}, {
								offset: 1,
								color: 'rgba(20,100,247,1)'
							}])
						}
					}, {
						type: 'line',
						name: "严重违法",
						symbol: 'none',
						data: vm.lineY4,
						smooth: true,
						itemStyle: {
							color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(185,255,220,1)'
							}, {
								offset: 1,
								color: 'rgba(16,208,19,1)'
							}])
						},

					}, {
						type: 'line',
						name: "欠税公告",
						symbol: 'none',
						data: vm.lineY5,
						smooth: true,
						itemStyle: {
							color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(152,101,196,1)'
							}, {
								offset: 1,
								color: 'rgba(82,0,166,1)'
							}])
						},

					}]
				};
				myChart.setOption(option, true);
			},
			//各街道预约占比柱状图
			getBarChart1() {
				var vm = this;
				let dom = document.getElementById("genderBar");
				let myChart = vm.$echarts.init(dom);
				let option = {
					color: ['rgba(0,161,228,1)', 'rgba(229,206,16,1)'],
					legend: {
						// data: ['男性', '女性'],
						show: true,
						top: "10%",
						right: "3%",
						icon: "rect",
						itemWidth: 14,
						itemHeight: 4,
						textStyle: {
							fontSize: 16,
							color: "#fff"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					textStyle: {
						fontFamily: "SOURCEHANSANSCN-MEDIUM",
						fontWeight: "500"
					},
					grid: {
						left: '7%',
						right: '3%',
						top: "25%",
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: vm.barX,
						axisLabel: {
							color: "#fff",
							fontSize: 13,
							rotate: 30
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: true
						},
						nameTextStyle: {
							color: "#fff",
							fontSize: 13
						}
					}],
					yAxis: [{
						type: 'value',
						axisLine: {
							show: true,
							color: "#fff",
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							show: true,
							fontSize: 16,
							color: 'rgba(255,255,255,1)'
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'bar',
						name: "有意向接种",
						stack: 'one',
						barWidth: '25%',
						data: vm.barY1,
						itemStyle: {
							normal: {
                color: 'rgba(0,161,228,1)'
							}
						}
					},
            {
              type: 'bar',
              name: "无意向接种",
              stack: 'one',
              barWidth: '25%',
              data: vm.barY2,
              itemStyle: {
                normal: {
                  color: 'rgba(229,206,16,1)'
                }
              }
            }
					]
				};
				myChart.setOption(option, true);
			},
			getBarChart2() {
				var vm = this;
				let dom = document.getElementById("numStatus");
				let myChart = vm.$echarts.init(dom);
				let option = {
					legend: {
						data: ['正常', '吊销', '注销', '其他'],
						show: true,
						top: "10%",
						right: "3%",
						icon: "rect",
						itemWidth: 14,
						itemHeight: 4,
						textStyle: {
							fontSize: 16,
							color: "#fff"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					textStyle: {
						fontFamily: "SOURCEHANSANSCN-MEDIUM",
						fontWeight: "500"
					},
					grid: {
						left: '3%',
						right: '3%',
						top: "23%",
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: vm.barX2,
						axisLabel: {
							color: "#fff",
							fontSize: 13,
							rotate: 30
						},
						axisLine: {
							show: true
						},
						axisTick: {
							show: true
						},
						nameTextStyle: {
							color: "#fff",
							fontSize: 13
						}
					}],
					yAxis: [{
						type: 'value',
						axisLine: {
							show: true,
							color: "#fff",
						},
						axisTick: {
							show: true
						},
						axisLabel: {
							show: true,
							fontSize: 16,
							color: 'rgba(255,255,255,1)'
						},
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'bar',
						name: "正常",
						stack: 'one',
						barWidth: '25%',
						data: vm.barY3,
						itemStyle: {
							color: 'rgba(20,100,247,1)'
							// color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							// 	offset: 0,
							// 	color: 'rgba(59,255,255,1)'
							// }, {
							// 	offset: 1,
							// 	color: 'rgba(20,100,247,1)'
							// }])
						}
					}, {
						type: 'bar',
						name: "吊销",
						stack: 'one',
						barWidth: '25%',
						data: vm.barY4,
						itemStyle: {
							color: 'rgba(16,208,19,1)'
							// color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							// 	offset: 0,
							// 	color: 'rgba(185,255,220,1)'
							// }, {
							// 	offset: 1,
							// 	color: 'rgba(16,208,19,1)'
							// }])
						},
					}, {
						type: 'bar',
						name: "注销",
						stack: 'one',
						barWidth: '25%',
						data: vm.barY5,
						itemStyle: {
							color: 'rgba(255,177,14,1)'
							// color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							// 	offset: 0,
							// 	color: 'rgba(255,254,133,1)'
							// }, {
							// 	offset: 1,
							// 	color: 'rgba(255,177,14,1)'
							// }])
						}
					},{
            type: 'bar',
            name: "其他",
            stack: 'one',
            barWidth: '25%',
            data: vm.barY6,
            itemStyle: {
              color: 'rgba(152,101,196,1)'
              // color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              // 	offset: 0,
              // 	color: 'rgba(255,254,133,1)'
              // }, {
              // 	offset: 1,
              // 	color: 'rgba(255,177,14,1)'
              // }])
            }
          }]
				};
				myChart.setOption(option, true);
			},
			// 切换街道
			changeRoad(index) {
				this.activeRoad = index
			},
			// 显示人口/企业总量表格
			showTable() {
				if (this.cardIndex == 0) {
					this.table1 = true
				} else {
					this.table2 = true
				}
			},
			showMask() {
				if (this.cardIndex == 0) {
					this.showMask1()
				} else {
					this.showMask2()
				}
			},
			//点击明细时弹出表单
			showMask1() {
				this.maskFlag1 = true;
			},
			showMask2() {
				this.maskFlag2 = true;
			},
			//点击 X 关闭弹框
			closeMask1() {
				this.maskFlag1 = false;
			},
			closeMask2() {
				this.maskFlag2 = false;
			},
			closeTable1() {
				this.table1 = false;
			},
			closeTable2() {
				this.table2 = false;
			}
		},
		filters: {
			//采集情况统计数据表数量
			dataNum(params) {
				return params + "个数据表";
			}
		},
	}
</script>

<style lang="less" scoped="scoped">
	.newMain {
		width: 100%;
		height: 93.7%;
		padding: 1.25rem 3.125rem;
		position: relative;
		display: flex;
		justify-content: space-between;
		// align-items: center;
		// background: url(../../assets/main/bg.png) no-repeat center;
		// background-size: 100% 100%;

		.left {
			width: 1.125rem;
			height: 40.6875rem;
			height: 38rem;
			position: absolute;
			top: 4%;
			height: 80%;
			// align-self: flex-start;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.circle {
			position: absolute;
			left: 2.6875rem;
			top: 3rem;
			width: 8rem;
			height: 38rem;
			top: 3%;
			height: 82%;
			overflow-y: scroll;
			display: flex;
			flex-direction: column;

			&::-webkit-scrollbar {
				display: none
			}

			.item {
				margin-top: 3.28rem;
				display: flex;
				flex-flow: row nowrap;
				align-items: center;

				img {
					width: 1.5rem;
					height: 1.5rem;
					opacity: 0;
					display: inline-block;
				}

				span {
					font-size: 1rem;
					color: #FFFFFF;
					font-family: Arial;
					cursor: pointer;
					margin-left: 0.5rem;
				}

				.clickSpan {
					font-size: 1.5rem;
					color: #38FEFF;
				}
			}

			.item:nth-child(1) {
				margin-top: 0;
			}
		}

		.tabCard {
			position: absolute;
			width: 14.25rem;
			height: 4.375rem;
			bottom: 1rem;
      left: 0.9%;
			display: flex;
			justify-content: space-between;

			.card,
			.clickCard {
				width: 5.08125rem;
				height: 100%;
				background: url(../../assets/main/企业.png);
				background-size: 100% 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 1.3125rem;
				font-family: SOURCEHANSANSCN-REGULAR;
				font-weight: 500;
				color: rgba(255, 255, 255, 1);
				line-height: 2.5625rem;
				cursor: pointer;

				&:hover {
					background: url(../../assets/main/人口.png);
					background-size: 100% 100%;
				}
			}

			.clickCard {
				background: url(../../assets/main/人口.png);
				background-size: 100% 100%;
			}
		}

		.center {
			.items {
				width: 59.25rem;
				height: 5.125rem;
				margin-left: 9.5rem;
				display: flex;
				justify-content: space-between;
				// align-self: flex-start;

				.item {
					/*cursor: pointer;*/

					img {
						position: absolute;
						width: 12.475rem;
						height: 4.5625rem;
						margin-top: 0.5625rem;
					}

					.info {
						width: 12.475rem;
						height: 4.5625rem;
						display: flex;
						flex-direction: column;
						align-items: center;

						.title {
							font-size: 1.166875rem;
							font-family: SOURCEHANSANSCN-REGULAR;
							font-weight: 500;
							color: rgba(56, 254, 255, 1);
						}

						.num {
							font-size: 2.75rem;
							color: #1DE7FF;
							font-family: Digital-7Mono;

							span {
								font-size: 1.125rem;
								font-family: SOURCEHANSANSCN-REGULAR;
								color: #FFFFFF;
							}
						}

					}
				}
			}

			.map {
				width: 58.25625rem;
				height: 40.25rem;
				margin-left: 11.9875rem;
				margin-top: 2.1875rem;
				position: relative;
				background: url(../../assets/main/街道边界1.png) no-repeat center;
				background-size: 100% 100%;

				.xichangan_info,
				.shichahai_info,
				.xinjiekou_info,
				.chunshu_info,
				.taoranting_info {

					position: absolute;
					width: 18.875rem;
					height: 8.125rem;
					display: flex;
					flex-flow: column nowrap;
					cursor: pointer;
					pointer-events: none;

					.num {
						font-size: 1.3125rem;
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FCFCFC;
						align-self: flex-end;
						background-color: rgba(3, 10, 10, 0.6);
						width: 12.3845rem;
						height: 3rem;
						display: flex;
						justify-content: center;
						align-items: center;

						span {
							color: #FFEC16;
							color: rgba(255, 255, 255, 1);

						}
					}

					.icon {
						align-self: flex-end;
						width: 16.625rem;
						height: 4.8125rem;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.road {
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);

					}
				}

				.zhanlanlu_info,
				.yuetanjie_info,
				.guangwaijie_info,
				.niujie_info,
				.guangneijie_info,
				.baizhifang_info,
				.jinrongjie_info,
				.tianqiao_info {
					position: absolute;
					width: 18.875rem;
					height: 8.125rem;
					display: flex;
					flex-flow: column nowrap;
					cursor: pointer;
					pointer-events: none;

					.num {
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FCFCFC;
						background-color: rgba(3, 10, 10, 0.8);
						width: 12.3845rem;
						height: 3rem;
						display: flex;
						justify-content: center;
						align-items: center;

						span {
							color: #FFEC16;
							color: rgba(255, 255, 255, 1);
							background-color: #03040E;
						}
					}

					.icon {
						width: 16.625rem;
						height: 4.8125rem;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.road {
						align-self: flex-end;
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}

				.desheng_info,
				.dashilan_info {
					position: absolute;
					width: 18.875rem;
					height: 8.125rem;
					display: flex;
					flex-flow: column-reverse nowrap;
					cursor: pointer;
					pointer-events: none;

					.num {
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						align-self: flex-start;
						background-color: rgba(3, 10, 10, 0.6);
						width: 12.3845rem;
						height: 3rem;
						display: flex;
						justify-content: center;
						align-items: center;

						span {
							color: #FFEC16;
							color: rgba(255, 255, 255, 1);
						}
					}

					.icon {
						width: 16.625rem;
						height: 4.8125rem;
						align-self: flex-start;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.road {
						align-self: flex-end;
						font-size: 1rem;
						font-family: PingFang SC;
						font-weight: 400;
						color: rgba(255, 255, 255, 1);
					}
				}

				//德胜
				.desheng_info {
					top: 4.4rem;
					left: 19.0625rem;
				}

				.desheng_img {
					position: absolute;
					top: -5.7px;
					left: 522px;
					width: 12.875rem;
					height: 6.75rem;
					top: -0.35625rem;
					left: 32.625rem;
					cursor: pointer;
				}

				.desheng_img_active {
					background: url("../../assets/main/desheng.png") no-repeat;
					background-size: 100% 100%;
				}

				.desheng_img:hover {
					background: url("../../assets/main/desheng.png") no-repeat;
					background-size: 100% 100%;
				}

				//西长安街街道
				.xichangan_info {
					top: 10.5rem;
					left: 39.5625rem;
				}

				.xichangan_img {
					position: absolute;
					width: 248px;
					height: 166px;
					top: 214px;
					left: 582px;

					width: 15.5rem;
					height: 10.375rem;
					top: 13.375rem;
					left: 36.375rem;
					cursor: pointer;
				}

				.xichangan_img_active {
					background: url("../../assets/main/xichangan.png") no-repeat;
					background-size: 100% 100%;
				}

				.xichangan_img:hover {
					background: url("../../assets/main/xichangan.png") no-repeat;
					background-size: 100% 100%;
				}

				//什刹海
				.shichahai_info {
					left: 37.25rem;
					top: 2.5rem;
				}

				.shichahai_img {
					position: absolute;
					width: 252px;
					height: 145px;
					left: 564px;
					top: 88px;
					width: 15.75rem;
					height: 9.0625rem;
					left: 35.25rem;
					top: 5.5rem;
					cursor: pointer;
				}

				.shichahai_img_active {
					background: url("../../assets/main/shichahai.png") no-repeat;
					background-size: 100% 100%;
				}

				.shichahai_img:hover {
					background: url("../../assets/main/shichahai.png") no-repeat;
					background-size: 100% 100%;
				}

				//新街口
				.xinjiekou_info {
					left: 28.125rem;
					top: 1.58125rem;
				}

				.xinjiekou_img {
					position: absolute;
					width: 162px;
					height: 139px;
					left: 434px;
					top: 84.5px;

					width: 10.125rem;
					height: 8.6875rem;
					left: 27.125rem;
					top: 5.28125rem;

					cursor: pointer;
				}

				.xinjiekou_img_active {
					background: url("../../assets/main/xinjiekou.png") no-repeat;
					background-size: 100% 100%;
				}

				.xinjiekou_img:hover {
					background: url("../../assets/main/xinjiekou.png") no-repeat;
					background-size: 100% 100%;
				}

				//展览路街道
				.zhanlanlu_info {
					left: 5.125rem;
					top: 2.15rem;
				}

				.zhanlanlu_img {
					position: absolute;
					left: 12.125rem;
					top: 4.85rem;
					width: 16.3125rem;
					height: 11.0625rem;
					cursor: pointer;
				}

				.zhanlanlu_img_active {
					background: url("../../assets/main/zhanlanlu.png") no-repeat;
					background-size: 100% 100%;
				}

				.zhanlanlu_img:hover {
					background: url("../../assets/main/zhanlanlu.png") no-repeat;
					background-size: 100% 100%;
				}

				//金融街街道
				.jinrongjie_info {
					top: 11.125rem;
					left: 18.6875rem;
				}

				.jinrongjie_img {
					position: absolute;
					width: 11.75rem;
					height: 10.8125rem;
					top: 13.125rem;
					left: 26.6875rem;
					cursor: pointer;
				}

				.jinrongjie_img_active {
					background: url("../../assets/main/jinrongjie.png") no-repeat;
					background-size: 100% 100%;
				}

				.jinrongjie_img:hover {
					background: url("../../assets/main/jinrongjie.png") no-repeat;
					background-size: 100% 100%;
				}

				//月坛街街道
				.yuetanjie_info {
					top: 12.1rem;
					left: 4.625rem;
				}

				.yuetanjie_img {
					position: absolute;
					width: 17.6875rem;
					height: 9.6875rem;
					top: 15rem;
					left: 12.625rem;
					cursor: pointer;
				}

				.yuetanjie_img_active {
					background: url("../../assets/main/yuetanjie.png") no-repeat;
					background-size: 100% 100%;
				}

				.yuetanjie_img:hover {
					background: url("../../assets/main/yuetanjie.png") no-repeat;
					background-size: 100% 100%;
				}

				//广外街街道
				.guangwaijie_info {
					top: 21.925rem;
					left: 0rem;
				}

				.guangwaijie_img {
					position: absolute;
					width: 23.3125rem;
					height: 13.8125rem;
					top: 23.625rem;
					left: -0.1875rem;
					cursor: pointer;
				}

				.guangwaijie_img_active {
					background: url("../../assets/main/guangwaijie.png") no-repeat;
					background-size: 100% 100%;
				}

				.guangwaijie_img:hover {
					background: url("../../assets/main/guangwaijie.png") no-repeat;
					background-size: 100% 100%;
				}

				//白纸坊街道
				.baizhifang_info {
					top: 26.1875rem;
					left: 13.8125rem;
				}

				.baizhifang_img {
					position: absolute;
					width: 19.0625rem;
					height: 9.4375rem;
					top: 31.1875rem;
					left: 20.8125rem;
					cursor: pointer;
				}

				.baizhifang_img_active {
					background: url("../../assets/main/baizhifang.png") no-repeat;
					background-size: 100% 100%;
				}

				.baizhifang_img:hover {
					background: url("../../assets/main/baizhifang.png") no-repeat;
					background-size: 100% 100%;
				}

				//椿树街道
				.chunshu_info {
					top: 16.5125rem;
					left: 39.1875rem;
				}

				.chunshu_img {
					position: absolute;
					width: 7.6875rem;
					height: 6rem;
					top: 22.8125rem;
					left: 37.6875rem;
					cursor: pointer;
				}

				.chunshu_img_active {
					background: url("../../assets/main/chunshu.png") no-repeat;
					background-size: 100% 100%;
				}

				.chunshu_img:hover {
					background: url("../../assets/main/chunshu.png") no-repeat;
					background-size: 100% 100%;
				}

				//大栅栏街道
				.dashilan_info {
					top: 26.45rem;
					left: 33.55rem;
				}

				.dashilan_img {
					position: absolute;
					width: 11.3125rem;
					height: 6.125rem;
					top: 22.5rem;
					left: 43.45rem;
					cursor: pointer;
				}

				.dashilan_img_active {
					background: url("../../assets/main/dashilan.png") no-repeat;
					background-size: 100% 100%;
				}

				.dashilan_img:hover {
					background: url("../../assets/main/dashilan.png") no-repeat;
					background-size: 100% 100%;
				}

				//牛街街道
				.niujie_info {
					top: 19.88125rem;
					left: 13.3125rem;
				}

				.niujie_img {
					position: absolute;
					width: 17.9375rem;
					height: 4.25rem;
					top: 27.78125rem;
					left: 21.3125rem;
					cursor: pointer;
				}

				.niujie_img_active {
					background: url("../../assets/main/niujie.png") no-repeat;
					background-size: 100% 100%;
				}

				.niujie_img:hover {
					background: url("../../assets/main/niujie.png") no-repeat;
					background-size: 100% 100%;
				}

				//广内街街道
				.guangneijie_info {
					top: 16.54375rem;
					left: 15.75rem;
				}

				.guangneijie_img {
					position: absolute;
					width: 17.3125rem;
					height: 5.875rem;
					top: 22.84375rem;
					left: 21.75rem;
					cursor: pointer;
				}

				.guangneijie_img_active {
					background: url("../../assets/main/guangneijie.png") no-repeat;
					background-size: 100% 100%;
				}

				.guangneijie_img:hover {
					background: url("../../assets/main/guangneijie.png") no-repeat;
					background-size: 100% 100%;
				}

				//陶然亭街道
				.taoranting_info {
					top: 24.45rem;
					left: 40.125rem;
				}

				.taoranting_img {
					position: absolute;
					width: 11.3125rem;
					height: 11.0625rem;
					top: 27.75rem;
					left: 38.125rem;
					cursor: pointer;
				}

				.taoranting_img_active {
					background: url("../../assets/main/taoranting.png") no-repeat;
					background-size: 100% 100%;
				}

				.taoranting_img:hover {
					background: url("../../assets/main/taoranting.png") no-repeat;
					background-size: 100% 100%;
				}

				//天桥
				.tianqiao_info {
					top: 24.3rem;
					left: 35.5625rem;
				}

				.tianqiao_img {
					position: absolute;
					width: 13.9375rem;
					height: 11.375rem;
					top: 26.5rem;
					left: 44.5625rem;
					cursor: pointer;
				}

				.tianqiao_img_active {
					background: url("../../assets/main/tianqiao.png") no-repeat;
					background-size: 100% 100%;
				}

				.tianqiao_img:hover {
					background: url("../../assets/main/tianqiao.png") no-repeat;
					background-size: 100% 100%;
				}

        .baseLabel {
          width: 60%;
          float: left;
          text-align: right;
        }

        .baseValue {
          width: 40%;
        }
			}
		}

		// 标题
		.tit {
			color: rgba(0, 228, 255, 1);
			font-family: SOURCEHANSANSCN-MEDIUM;
			font-size: 1.375rem;
			font-weight: 500;
			padding-left: 1rem;
			position: relative;

			&:before {
				content: '';
				position: absolute;
				top: 50%;
				left: 0rem;
				transform: translateY(-50%);
				width: 0.375rem;
				height: 1.25rem;
				border-radius: 0.25rem;
				background: rgba(253, 183, 47, 1);
			}
		}

		.lt,
		.lb,
		.rt,
		.rb {
			width: 1.875rem;
			height: 1.875rem;
		}

		// 角框
		.lt {
			background: url(../../assets/zuoshang.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			top: 0;
			left: 0;
		}

		.lb {
			background: url(../../assets/zuoxia.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			bottom: 0;
			left: 0;
		}

		.rt {
			background: url(../../assets/youshang.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			top: 0;
			right: 0;
		}

		.rb {
			background: url(../../assets/youxia.png) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			bottom: 0;
			right: 0;
		}

		.noData {
			margin-top: 10%;
			width: 100%;
			text-align: center;
			font-size: 1.2rem;
			font-family: abc;
			font-weight: 400;
			color: #08EDFF;
			letter-spacing: 0.1rem;
		}

		.noData1 {
			padding-left: 30%;
			margin-top: 5%;
			display: inline-block;
			font-size: 1.2rem;
			font-family: abc;
			font-weight: 400;
			color: #08EDFF;
			letter-spacing: 0.1rem;
		}

		.right1 {
			width: 39.5rem;
			height: 100%;

			.boxes {
				width: 100%;
				height: 23.9375rem;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				align-content: space-between;

        .p_box1 {
          width: 46%;
          height: 100%;
          position: relative;
          padding: 1rem;
          padding-top: 0.875rem;
          background: url(../../assets/bg_shujuzhilixiabian.png);
          background-size: 100% 100%;

          .floatTable {
            margin-top: 6%;
            /deep/  .el-table, .el-table__expanded-cell {
              background-color: transparent;
            }
            /deep/ .el-table th {
              background: rgba(22,150,255,0.06)!important;
              font-size: 1.1875rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: #58B2FF;
              border-bottom: 1px solid rgba(22,150,255,0.3);
              border-top: 1px solid rgba(22,150,255,0.3);
            }
            /deep/ .el-table tr {
              background-color: transparent;
              height: 48px!important;
            }
            /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{
              background-color: transparent;
              font-size: 1rem;
              font-family: Source Han Sans CN;
              font-weight: 400;
              color: #FFFFFF;
              border-bottom: 1px dashed rgba(255,255,255,0.5) ;
            }
            /deep/ .el-table--small td, .el-table--small th {
              padding: 6px 0;
            }
          }

          .el-table::before {//去除底部白线
            left: 0;
            bottom: 0;
            width: 100%;
            height: 0;
          }
        }

        .p_box2 {
          width: 53%;
          height: 100%;
          position: relative;
          padding: 1rem;
          padding-top: 0.875rem;
          background: url(../../assets/bg_shujuzhilixiabian.png);
          background-size: 100% 100%;

          .pieChart1 {
            height: 21.4125rem;
            width: 120%;
            left: -10%;
            /*z-index: 3;*/
          }
        }

				.box1,
				.box2,
				.box3,
				.box4 {
					width: 49%;
					position: relative;
					padding: 1rem;
					padding-top: 0.875rem;
					background: url(../../assets/bg_shujuzhilixiabian.png);
					background-size: 100% 100%;
				}

				.box1,
				.box2 {
					height: 10.625rem;
					height: 44.39%;

					.pic {
						width: 14.2375rem;
						height: 5.00625rem;
						margin: 0 auto;
						margin-top: 1rem;
						display: flex;
						flex-flow: row nowrap;
						justify-content: space-between;


						.pic1,
						.pic2 {
							width: 5.575rem;
							height: 100%;
							position: relative;

							.label {
								position: absolute;
								bottom: -12%;
								left: 18.3%;
								width: 3.5rem;
								height: 1.125rem;
								background: rgba(255, 185, 27, 0.09);
								border: 1px solid rgba(255, 199, 0, 1);
								border-radius: 0.5625rem;
								display: flex;
								justify-content: center;
								align-items: center;
								font-size: 0.8125rem;
								font-family: SOURCEHANSANSCN-REGULAR;
								color: rgba(255, 255, 255, 1);
								line-height: 1.4375rem;
							}

							/deep/ .el-progress-circle {
								width: 5.575rem !important;
								height: 5.00625rem !important;
							}

							/deep/ .el-progress-circle__track {
								stroke: #3E4978 !important;
							}

							/deep/ .el-progress__text {
								color: rgba(255, 189, 33, 1);
								line-height: 1.4375rem;
								font-size: 1.5rem !important;
								font-family: Digital-7Mono;
							}

							/deep/ .el-progress-circle__track {
								stroke: #262795;
							}

							/deep/ .el-progress-circle__path {
								// 组件底层是svg path 不支持渐变色
								stroke: rgba(255, 168, 0, 1);
								// stroke: linear-gradient(90deg, rgba(255, 254, 133, 1), rgba(255, 168, 0, 1));
							}
						}

						.pic2 {
							/deep/ .el-progress-circle__path {
								// stroke: rgba(1, 180, 255, 1);
								stroke: rgba(2, 138, 255, 1);
							}

							.label {
								border: 1px solid rgba(1, 170, 255, 1);
							}


							/deep/ .el-progress__text {
								color: rgba(2, 138, 255, 1);
							}
						}
					}
				}

				.box3,
				.box4 {
					height: 12.5rem;
					height: 52.22%;
				}

				.box3 {
					display: flex;
					flex-flow: column;
					justify-content: space-between;

					.canji,
					.dangyuan {
						height: 50%;
						width: 100%;

						div {
							width: 4.6875rem;
							width: 100%;
							height: 4.6875rem;
							display: flex;
							// justify-content: space-between;
							align-items: center;

							img {
								height: 4.6875rem;
								width: 4.6875rem;
								margin-top: -1.5rem;
								margin-left: -1rem;
							}

							/deep/ .el-progress {
								width: 13.6875rem;
								height: 1.25rem;
								margin-top: -1.5rem;
								margin-left: -0.8rem;
							}

							/deep/ .el-progress-bar {
								width: 13.6875rem;
								height: 1.25rem;
							}

							/deep/ .el-progress-bar__outer {
								width: 9.6875rem;
								background-color: rgba(65, 74, 103, 1);
								border-radius: 0;

								.el-progress-bar__inner {
									border-radius: 0;
									background: linear-gradient(86deg, rgba(0, 161, 228, 1), rgba(94, 208, 255, 1));
								}
							}

							/deep/ .el-progress__text {
								color: rgba(2, 138, 255, 1);
								font-size: 1.5rem !important;
								font-family: Digital-7Mono;
								line-height: 1.4375rem;
								// margin-left: 3.75rem;
								margin-right: -0.5rem;
							}
						}
					}

					.dangyuan {
						div {
							/deep/ .el-progress__text {
								color: rgba(255, 168, 0, 1);
							}

							/deep/ .el-progress-bar__outer {

								.el-progress-bar__inner {
									background: linear-gradient(90deg, rgba(255, 254, 133, 1), rgba(255, 168, 0, 1));
								}
							}
						}
					}
				}

				.box4 {

					.pieChart1 {
						height: 9.4125rem;
						width: 100%;
						z-index: 3;
					}

					img {
						width: 3.8125rem;
						height: 3.75rem;
						position: absolute;
						top: 46.2%;
						left: 16.8%;
						z-index: 4;
					}

					.out {
						width: 8.125rem;
						height: 8.125rem;
						position: absolute;
						top: 28.4%;
						left: 5.1%;
						z-index: 2;
					}
				}
			}

			.line {
				width: 100%;
				height: 12.9375rem;
				margin-top: 0.5rem;
				position: relative;
				padding: 1.25rem;
				padding-top: 0.875rem;
				background: url(../../assets/bg_shujuzhilixiabian.png);
				background-size: 100% 100%;

				.birthLine {
					width: 100%;
					height: 9.3125rem;
					height: 100%;
					position: absolute;
					margin-left: -1.25rem;
					bottom: 0.5rem;
				}
			}

			.bar {
				width: 100%;
				height: 14.8125rem;
				margin-top: 0.5rem;
				position: relative;
				padding: 1.25rem;
				padding-top: 0.875rem;
				background: url(../../assets/bg_shujuzhilixiabian.png);
				background-size: 100% 100%;

				.genderBar {
					width: 100%;
					height: 11.3125rem;
					height: 100%;
					position: absolute;
					margin-left: -1.25rem;
					bottom: 0.1rem;
				}
			}
		}

		.right2 {
			width: 39.5rem;
			height: 100%;

			.boxes {
				width: 100%;
				height: 16.875rem;
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;

				.box1,
				.box2 {
					width: 49%;
					position: relative;
					height: 100%;
					padding: 1.25rem;
					padding-top: 0.875rem;
					padding-right: 0;
					background: url(../../assets/bg_shujuzhilixiabian.png);
					background-size: 100% 100%;

					.pieChart2,
					.pieChart3 {
						height: 13.625rem;
						width: 100%;
						z-index: 3;
					}

					img {
						width: 5.8125rem;
						height: 5.75rem;
						position: absolute;
						top: 41.1%;
						left: 18%;
						z-index: 4;
					}

					.out {
						width: 11.15rem;
						height: 11.15rem;
						position: absolute;
						top: 24.9%;
						left: 3.7%;
						z-index: 2;
					}
				}
			}

			.line {
				width: 100%;
				height: 17.4375rem;
				margin-top: 0.875rem;
				position: relative;
				padding: 1rem;
				padding-top: 0.875rem;
				background: url(../../assets/bg_shujuzhilixiabian.png);
				background-size: 100% 100%;

				.numChange {
					width: 100%;
					height: 13.5625rem;
					height: 100%;
					position: absolute;
					margin-left: -1.25rem;
					bottom: 0.5rem;
				}
			}

			.bar {
				width: 100%;
				height: 17.0625rem;
				margin-top: 0.875rem;
				position: relative;
				padding: 1rem;
				padding-top: 0.875rem;
				background: url(../../assets/bg_shujuzhilixiabian.png);
				background-size: 100% 100%;

				.numStatus {
					width: 100%;
					height: 14.0625rem;
					height: 100%;
					position: absolute;
					margin-left: -1.25rem;
					bottom: 0.1rem;
				}
			}
		}

		//弹框蒙版
		.mask1 {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			background: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;

			//弹框
			.pop {
				width: 76.125rem;
				height: 26.25rem;
				position: absolute;
				background: rgba(0, 23, 76, .6);
				border: 2px solid rgba(127, 164, 255, 1);
				margin-top: -2%;
				padding-top: 4.75rem;
				padding-left: 2.25rem;

				//右上角关闭按钮
				.closeBtn {
					width: 1.125rem;
					height: 1.125rem;
					background: url(../../assets/closeBtn.png) no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 3.5%;
					right: 1.12%;
					cursor: pointer;
				}

				.title {
					font-size: 1.3125rem;
					color: #11E6E6;
					width: 100%;
					margin-top: -1.5rem;
				}

				.content {
					width: 100%;
					height: 12.125rem;
					margin-top: 1.625rem;
					display: flex;
					flex-flow: column nowrap;
					justify-content: space-between;

					span {
						line-height: 3rem;
						font-size: 1.1875rem;
						color: #FFFFFF;
					}

					.keySpan {
						color: #11E6E6;
					}
				}
			}
		}

		.mask2 {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			background: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;

			//弹框
			.pop {
				width: 56.8125rem;
				height: 20.125rem;
				position: absolute;
				background: rgba(0, 23, 76, .6);
				border: 2px solid rgba(127, 164, 255, 1);
				margin-top: -2%;
				padding-top: 4.75rem;
				padding-left: 2.25rem;

				//右上角关闭按钮
				.closeBtn {
					width: 1.125rem;
					height: 1.125rem;
					background: url(../../assets/closeBtn.png) no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 3.5%;
					right: 1.12%;
					cursor: pointer;
				}

				.title {
					font-size: 1.3125rem;
					color: #11E6E6;
				}

				.content {
					width: 100%;
					height: 9.125rem;
					margin-top: 1.625rem;
					display: flex;
					flex-flow: column nowrap;
					justify-content: space-between;

					span {
						font-size: 1.1875rem;
						color: #FFFFFF;

					}

					.keySpan {
						color: #11E6E6;
					}
				}
			}
		}

		.mask3,
		.mask4 {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 999;
			background: rgba(0, 0, 0, .5);
			display: flex;
			justify-content: center;
			align-items: center;

			//弹框
			.pop {
				width: 83.6875rem;
				height: 49.875rem;
				position: relative;
				background: rgba(0, 23, 76, .6);
				border: 2px solid rgba(127, 164, 255, 1);
				padding-top: 2.645rem;
				// padding-left: 2.25rem;

				//右上角关闭按钮
				.closeBtn {
					width: 1.125rem;
					height: 1.125rem;
					background: url(../../assets/closeBtn.png) no-repeat;
					background-size: 100% 100%;
					position: absolute;
					top: 0.75rem;
					right: 1.1875rem;
					cursor: pointer;
				}

				table {
					width: 100%;
					border-collapse: collapse;
					table-layout: fixed;

					tr {
						width: 100%;
						background: rgba(0, 23, 76, 1);

						td {
							font-size: 1.1875rem;
							color: rgba(17, 230, 230, 1);
							font-family: SOURCEHANSANSCN-MEDIUM;
							border: 2px solid rgba(16, 77, 164, 1);
						}
					}

					.tr1 {
						height: 2rem;
						font-weight: bold;
					}

					.tr2 {
						height: 2.25rem;
					}

					.tr3 {
						height: 2.5625rem;
						word-wrap: break-word;

						td {
							font-size: 1.125rem;
							color: white;
						}
					}

					.double {
						background-color: #031235;
					}

					.single {
						background-color: #021B54;
					}
				}
			}
		}
    // 登录弹框
    .loginForm {
      .demo-ruleForm {
        margin-top: 5%;
      }

      /deep/ .el-dialog__title {
        font-weight: bolder;
        color: #ffffff;
      }

      /deep/ .el-dialog {
        width: 679px;
        height: 579px;
        background: url(../../assets/login.png) no-repeat;
        background-size: 100% 100%;
      }

      /deep/ .el-form-item__content {
        margin-left: 0px;
      }

      /deep/ .el-input__inner {
        background: url(../../assets/login_name.png) no-repeat;
        background-size: 100% 100%;
        border: none;
        width: 29.6875rem;
        height: 4.75rem;
        margin-left: -5%;
        font-size: 1.15rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
      }

      /deep/ .el-input--prefix .el-input__inner {
        padding-left: 4.375rem;
      }

      /deep/ .el-input__inner::placeholder {
        color: #ffffff;
      }
      /* 谷歌 */
      .detail .el-input__inner::-webkit-input-placeholder {
        color: #ffffff;
      }
      /* 火狐 */
      /deep/ .el-input__inner:-moz-placeholder {
        color: #ffffff;
      }
      /*ie*/
      /deep/ .el-input__inner:-ms-input-placeholder {
        color: #ffffff;
      }

      /deep/ .el-button {
        width: 12.625rem;
        height: 4.0625rem;
        border: none;
        font-size: 1.475rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        text-shadow: 0px 1px 2px rgba(9, 16, 15, 0.35);
        margin-top: 6%;
      }


      img {
        width: 1.6875rem;
        height: 1.875rem;
        margin-top: 82%;
        position: relative;
      }

      .login_title {
        height: 3.0625rem;
        font-size: 2.325rem;
        font-family: AlibabaPuHuiTi;
        font-weight: bold;
        color: #FFFFFF;
        margin-left: 25%;
      }
    }

    .v-modal {
      background-color: yellow;
    }
	}
</style>

<style>
  .el-table .warning-row {
    background: rgba(2, 34, 107, 0.8)!important;
  }

  .el-table .checking-row {
    background: rgba(255, 155, 0, 0.6)!important;
  }
  .v-modal {
    opacity: 0.6;
  }
</style>
