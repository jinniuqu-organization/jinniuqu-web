<template>
  <div class="collection">
    <!-- 左侧显示区域 -->
    <div class="box right">

      <!-- 四角边框 -->
      <!-- 左上角 -->
      <div class="lt"></div>
      <!-- 右上角 -->
      <div class="rt"></div>
      <!-- 左下角 -->
      <div class="lb"></div>
      <!-- 右下角 -->
      <div class="rb"></div>
      <div class="tit">
        <div class="leftBorder"></div>
        <div class="rightWord">整体采集情况</div>
      </div>
      <!-- 整体采集情况 -->
      <div class="unitCollect">
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">来源部门</div>
          <div class="unitCollect_box_bot">{{collectionAll.departName}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">数据表</div>
          <div class="unitCollect_box_bot">{{collectionAll.tableAmount}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">数据项</div>
          <div class="unitCollect_box_bot">{{collectionAll.itemAmount}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">数据总条数</div>
          <div class="unitCollect_box_bot">{{collectionAll.dataCount}}<span>万条</span></div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="line"></div>
      <div class="tit titmid">
        <div class="leftBorder"></div>
        <div class="rightWord">{{updatePart+"数据更新情况"}}<span class="unit">单位:条</span></div>
      </div>
      <!-- 什刹海数据更新情况柱状图 -->
      <div class="dataUpdate">

      </div>
      <!-- 分割线 -->
      <div class="line"></div>
      <div class="tit titmid">
        <div class="leftBorder"></div>
        <div class="rightWord">文档列表</div>
      </div>
      <!-- 文档列表图例 -->
      <div class="docLegend">
        <div class="docLegend_box"><span></span><span>较完整</span></div>
        <div class="docLegend_box"><span></span><span>待完善</span></div>
        <div class="docLegend_box"><span></span><span>缺失</span></div>
      </div>
      <div class="docList">
        <div @mouseenter="setDocItemIndex(index)" v-for="(item,index) in docList" :key="index"
             :class="{'animate-up': animateUp,'docItem':true,'docItem0':item.status == 0?true:false,'docItem1':item.status == 1?true:false,'docItem2':item.status == 2?true:false}">
          <div class="docItem_word" @click="getDocInfo(item.tableId)">
            <span>{{item.wordType}}</span>
          </div>
          <div :class="docItemIndex==index?'docItemBg':''" :style="{background:docColor[item.status]}"></div>
        </div>
      </div>
    </div>

     <!-- 中间部分--数据总体汇总 -->
     <div class="box middle">
       <!-- 四角边框 -->
       <!-- 左上角 -->
       <div class="lt"></div>
       <!-- 右上角 -->
       <div class="rt"></div>
       <!-- 左下角 -->
       <div class="lb"></div>
       <!-- 右下角 -->
       <div class="rb"></div>
       <div>
         <div class="tit">
           <div class="leftBorder"></div>
           <div class="rightWord">数据归集情况</div>
         </div>
         <div class="dataChain">
           <div class="chainIcon"></div>
           <div class="chainInfo">
             <span class="info">打通数据通路(条)</span>
             <span class="infoNum">{{collectionAll.linkAmount}}</span></div>
         </div>
       </div>
       <div class="collectData">
         <el-table
           :data="collectData"
           style="width: 96%; margin-left: 2%"
           max-height="100%"
           :row-class-name="collectRowClassName"
           @row-click="changeIndex"
         >
           <el-table-column
             prop="tableType"
             label="信息资源分类"
             align="center"
             width="160"
            >
           </el-table-column>
           <el-table-column
             prop="departName"
             label="所属部门"
             align="left"
             show-overflow-tooltip
             width="160"
           >
           </el-table-column>
           <el-table-column
             prop="tableNote"
             label="信息资源"
             align="left"
             show-overflow-tooltip
             width="180"
           >
           </el-table-column>
           <el-table-column
             prop="updateCycle"
             label="更新周期"
             align="center"
           >
           </el-table-column>
           <el-table-column
             prop="dataRange"
             label="数据范围"
             align="center"
           >
           </el-table-column>
           <el-table-column
             prop="dataCount"
             label="数据量"
             align="left"
           >
           </el-table-column>
         </el-table>
       </div>
     </div>

    <!-- 右侧折线图显示区域 -->
    <div class="box left">
      <!-- 四角边框 -->
      <!-- 左上角 -->
      <div class="lt"></div>
      <!-- 右上角 -->
      <div class="rt"></div>
      <!-- 左下角 -->
      <div class="lb"></div>
      <!-- 右下角 -->
      <div class="rb"></div>
      <div class="dc_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="first">
          <el-carousel-item v-for="(item,index) in departArr" :key="index">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item+"数据流"}}</div>
              </div>
              <div class="tips"><span>累计获取量</span><span class="unit">单位:条</span></div>
              <div class="lineChart first">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="dc_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="second">
          <el-carousel-item v-for="(item,index) in departArr" :key="index+100">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item+"数据流"}}</div>
              </div>
              <div class="tips"><span>累计获取量</span><span class="unit">单位:条</span></div>
              <div class="lineChart second">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="dc_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="third">
          <el-carousel-item v-for="(item,index) in departArr" :key="index+1000">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item+"数据流"}}</div>
              </div>
              <div class="tips"><span>累计获取量</span><span class="unit">单位:条</span></div>
              <div class="lineChart third">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <el-dialog
      :visible.sync="docInfoFlag"
      top="12.3%"
      show-close
      class="docInfo"
      :title="tableName"
      :close-on-click-modal="false"
    >
      <el-table
        :data="docInfos"
        max-height="480"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="60">
        </el-table-column>
        <el-table-column
          prop="column"
          label="列"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="columnNote"
          label="列注释"
          align="center"
         >
        </el-table-column>
        <el-table-column
          prop="codeState"
          align="center"
          width="180"
          label="字典状态">
        </el-table-column>
      </el-table>
    </el-dialog>
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
        <span class="login_title">金牛区大数据治理</span>
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
            @keyup.enter.native="submitForm(ruleForm)"
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
            @click="submitForm(ruleForm)"
          >提&nbsp;&nbsp;&nbsp;&nbsp;交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     <!-- 更新时间 -->
     <footerTime :isExplain="true" :screenId="2" />
  </div>
</template>

<script>
import footerTime from "../footerTime";
 import md5 from 'js-md5';
import {getCollectionInfo,getCollectionAll,getMonitorData,getUpdate,getDocList,getChart,getDocInfo} from "../../api/dataCollection.js";
export default{
    components:{
      footerTime
    },
    data(){
      return{
         //折线颜色数组
         lineColor:["#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05"],
         //折线下面积渐变颜色
         linearColor:[{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"}],
         //手写轮播初始下标
         boxIndex:0,
         //定时器
         timer:null,
         collectTimer: null,
         //延时器
         laytimer:null,
         //右下角文档列表数组
         //docList:["市民政局数据字典","市质监数据字典","市资源中心数据字典","卫健委数据字典","西长安街数据字典","区科信局数据字典","区城管执法监察局数据字典","市流管办数据字典","什刹海数据字典","市残联数据字典","市工商局数据字典"],
         //备用数组
         // docArr:["市民政局数据字典","市质监数据字典","市资源中心数据字典","卫健委数据字典","西长安街数据字典","区科信局数据字典","区城管执法监察局数据字典","市流管办数据字典","什刹海数据字典","市残联数据字典","市工商局数据字典"],
         animateUp: false,
         //文档列表活跃下标
         docItemIndex:0,
         //左侧数据数组
         lineChart:["市民政局数据流","市质监数据流","市资源中心数据流","卫健委数据流","西长安街数据流","区科信局数据流","区城管执法监察局数据流","市流管办数据流","什刹海数据流","市残联数据流","市工商局数据流"],
         //获取采集统计数据(各部门)
         collectionInfo:[],
         //获取总体情况
         collectionAll:{},
         //监管数据流信息（地球中间信息）
         monitorData:{},
         //数据更新情况部门名称
         updatePart:"",
         //获取数据更新月份数组
         updateMonth:[],
         //获取数据更新数据数组
         updateArr:[],
         //获取文档列表数组
         docList:[],
         docArr:[],
         docInfoFlag: false,
         tableName: '',
         docInfos: [],
         //文档列表状态颜色  待完善0 较完整1 缺失2
         docColor:["rgba(152,114,0,1)", "rgba(24,106,49,1)", "rgba(138,33,0,1)"],
         flag:true,
         //折线图总体数据数组（二维）
         lineValArr:[],
         //折线图总体月份数组（二维）
         lineMonArr:[],
         //折线图单位数组
         departArr:[],
        // 折线图基本option
        option: {
          grid: {
            top:"5%",
            bottom:"15%",
            right:'10%',
            left:"15%"
          },
          textStyle: {
            fontFamily:"SOURCEHANSANSCN-REGULAR",
            fontWeight:"200"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }

          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data:vm.lineMonArr[i],
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"rgba(255,255,255,1)",
              fontSize:12
            },
            name:"月份",
            nameTextStyle:{
              color:"#fff",
              fontSize:10
            }
          },
          yAxis: {
            type: 'value',
            min: function (value) {
              return Math.round(value.min * 0.8);
            },
            max: function (value) {
              return Math.round(value.max * 1.2);
            },
            splitNumber: 6,
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"rgba(255,255,255,1)",
              fontSize:12
            },
            splitLine:{
              lineStyle:{
                color:"#3A3D55FF"
              }
            }
          },
          series: [{
            // data: vm.lineValArr[i],
            type: 'line',
            lineStyle:{
              // color:vm.lineColor[0]
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  // color: this.linearColor[0].top // 0% 处的颜色
                }, {
                  offset: 1,
                  // color: this.linearColor[0].bot // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth:true,
            symbol:"none"
          }]
        },
        // 数据归集情况
        collectData: [],

         // 登录标识
			  loginFlag: false,
        ruleForm: {
          username: '',
          password: ''
        },
        // username: '7f8a7e16717038045bde322a743fb2dd',
        // password: 'b2655a87fbc1cb6bbe171bb4985f6ff9',
        username: '21232f297a57a5a743894a0e4a801fc3',
        password: '21232f297a57a5a743894a0e4a801fc3',
      }
    },
    created(){
      // this.begin();
      //获取采集情况统计
      this.getCollectionInfo();
      //获取数据归集信息
      this.getMonitorData();
      //获取整体采集信息
      this.getCollectionAll();
      //获取文档列表
      this.getDocList();
      //获取矩形树图数据
      this.getChart();
    },
    mounted() {
		  this.checkLogin();
		},
    updated(){
      if(this.flag){
        let vm = this;
        //折线图
        vm.getLineChart();
        //柱状图
        // vm.getBarChart();
      }

    },
    methods:{
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
      //获取采集情况统计
      getCollectionInfo(){
         getCollectionInfo()
         .then(res=>{
            this.collectionInfo = res.data;
            //循环动力下标
            // this.loopIndex(0);//自动切换轮播时传0
         })
      },
      //整体采集情况
      getCollectionAll(){
        getCollectionAll()
        .then(res=>{
          this.collectionAll = res.data;
        })
      },
      getMonitorData() {
        getMonitorData().then(res => {
          this.collectData = res.data;
          this.begin();
          //循环动力下标
          this.loopIndex(0);//自动切换轮播时传0
        })
      },

      //获取数据归集-old
      getMonitorData_old(){
         let index = this.boxIndex;
         let id = this.collectionInfo[index].tableId||1;

         getMonitorData({
           tableId:id.toString()
         })
         .then(res=>{
           let data = res.data[0];
           data.joinDate = data.joinDate.toLocaleString();
           data.amount = parseFloat(data.amount).toLocaleString();
           data.dataItem = parseFloat(data.dataItem).toLocaleString();
           data.departmentId = parseFloat(data.departmentId).toLocaleString();
           this.monitorData = data;
         })
      },
      //数据更新情况
      getUpdate(){
        let index = this.boxIndex;
        // let id = this.collectionInfo[index].tableId||1;
        // 三元表达式
        // let id = this.collectionInfo[index]?.tableId || 1;
        // 解构赋值 -- 解决tableId未定义，数据异常问题
        const { tableId: id = 1 } = this.collectionInfo[index] || {};
        getUpdate({
           tableId:id.toString()
        })
        .then(res=>{
          this.updatePart = res.data[0].tableNote;
          let arr = res.data[0].dataUpdateCondition;
          let len = arr.length;
          let updateMonth = [];
          let updateArr = [];
          for(let i=0;i<len;i++){
            let item = arr[i];
             updateArr.push(item.dataUpdate);
             updateMonth.push(item.dateId);
          }
          this.updateArr = updateArr;
          this.updateMonth = updateMonth;
          this.getBarChart();
        })
      },

      // 数据归集情况-中间表格滚动
      begin() {
        // this.tableMove();
        this.collectTimer = setInterval(() => {
          this.tableMove();
        }, 7000);
      },
      tableMove() {
        // 48px 为表格行高
        this.$nextTick(function(){
          // let t = document.getElementsByClassName("el-table__body-wrapper");
          this.collectData.push(this.collectData[0]);
          this.collectData.shift();
          // setTimeout(() => {
          //   this.collectData.push(this.collectData[0]);//把第一条数据插入数组最后一条
          //   t[0].style.transition = "all .5s";
          //   t[0].style.marginTop = "-47px";
          // }, 7000);
          // setTimeout(() => {
          //   this.collectData.shift();//删除数组中第一条数据
          //   t[0].style.transition = "all 0s ease 0s";
          //   t[0].style.marginTop = "0";
          // }, 7000);
        });
      },
      //table斑马线
      collectRowClassName({row,rowIndex}) {
        if (rowIndex == 0) {
          return 'checking-row'
        }
        if(rowIndex %2 == 0){
          return 'warning-row'
        }
        return '';
      },
      //获取文档列表
      getDocList(){
          getDocList()
          .then(res=>{
            let data = res.data;
            let len = data.length;
            for(let i=0;i<len;i++){
              let item = data[i];
              this.docList.push(item);
              this.docArr.push(item);
            }
            // this.docList = res.data;
            // this.docArr = res.data;
          })
      },

      //获取相应文档的详情
      getDocInfo(tableId) {
        getDocInfo({
          tableId: tableId.toString()
        }).then(res => {
          if (res.code === 200) {
            this.docInfos = res.data;
            this.tableName = this.docInfos[0].tableNote + '详细信息';
            this.docInfoFlag = true;
          }
        });
      },
      //获取折线图数据
      getChart(){
        getChart()
        .then(res=>{
          let data = res.data;
          let len = data.length;
          let valArr = [];//包含各单位数值数组
          let monthArr = [];//对应月份
          let departArr = [];//所属单位数组
          for(let i=0;i<len;i++){
            let item = data[i];
            departArr.push(item.tableNote);
            let itemData = item.chart;
            let itemlen = itemData.length;
            let varr = [];
            let marr = [];
            for(let k=0;k<itemlen;k++){
              let itemitem = itemData[k];
              varr.push(itemitem.dataTotal);
              marr.push(itemitem.dateId);
            }
            valArr.push(varr);
            monthArr.push(marr);
          }
          this.departArr = departArr;
          this.lineValArr = valArr;
          this.lineMonArr = monthArr;
        })
      },

      changeIndex(row) {
        let index = this.collectData.findIndex(item => item.tableNote === row.tableNote);

        clearInterval(this.collectTimer);
        clearInterval(this.timer);
        clearTimeout(this.laytimer);
        this.timer = null;
        this.laytimer = null;
        this.collectTimer = null;

        this.collectData.push(...this.collectData.slice(0,index));
        this.collectData.splice(0, index);
        this.begin();
        // this.setBoxIndex(index);
        this.boxIndex = this.collectionInfo.findIndex(item =>
          item.tableId === row.tableId
        );
        this.loopIndex(1);
        // 左下角
        let arr = [];
        for(let k = 0; k < this.docArr.length; k++){
          arr.push(this.docArr[k]);
        }
        arr.splice(0, this.boxIndex - 1);
        for(let i = 0;i < this.boxIndex - 1; i++){
          arr.push(this.docArr[i]);
        }
        this.docList = arr;
      },
      //轮播下标变化
       loopIndex(params){
         let vm = this;
         if(params==0){
           // vm.getMonitorData();
           vm.getUpdate();
         } else {
           vm.getUpdate();
           vm.getDocAnimate();
           // vm.leftScroll();
           vm.getLineChart();
         }
         const len = vm.collectionInfo.length;
         this.timer = setInterval(function(){
           if(vm.boxIndex < len - 1){
             vm.boxIndex++;
           }else{
             vm.boxIndex = 0;
           }
           // vm.getMonitorData();
           vm.getUpdate();
           //右下角文档列表动画启动
           vm.getDocAnimate();
           // -----------------
           // vm.leftScroll();
           vm.getLineChart();
         },7000)
       },
       //计算左侧轮播下标
       getBannerIndex(params){
        let vm = this;
         const len = vm.collectionInfo.length;
         if(params > len){
           return params-len + 1;
         }
         return params;
       },
       //左侧联动
       leftScroll(){
         let vm = this;
         let index = this.boxIndex;
         let firstIndex = this.getBannerIndex(index);
         let secondIndex = this.getBannerIndex(index+1);
         let thirdIndex = this.getBannerIndex(index+2);
         // this.$nextTick(function(){
          vm.$refs.first.setActiveItem(firstIndex);
          vm.$refs.second.setActiveItem(secondIndex);
          vm.$refs.third.setActiveItem(thirdIndex);
          vm.flag = false;
         // })
       },
       //右下角文档列表动画
       getDocAnimate(){
          this.animateUp = true;
          setTimeout(() => {
            this.docList.push(this.docList[0]);
            this.docList.shift();
            this.animateUp = false;
          }, 500)
       },
       //点击部门名称时高亮显示
       setBoxIndex(params){
         let vm = this;
         this.boxIndex = params;
         // clearInterval(this.collectTimer);
         clearInterval(this.timer);
         clearTimeout(this.laytimer);
         this.timer = null;
         this.laytimer = null;
         this.collectTimer = null;
         // this.getMonitorData();
         this.getUpdate();
         this.leftScroll();
         let arr = [];
         for(let k=0;k<this.docArr.length;k++){
            arr.push(this.docArr[k]);
         }
         arr.splice(0,params);
         for(let i=0;i<params;i++){
           arr.push(this.docArr[i]);
         }
         this.docList = arr;
         // this.laytimer = setTimeout(function(){
           vm.loopIndex(1);//手动切换轮播时传1
         // },5000);

         this.collectData.push(...this.collectData.slice(0,this.boxIndex));
         this.collectData.splice(0, this.boxIndex);
         // this.tableMove();
         setTimeout(function () {
           this.collectTimer = setInterval(() => {
             vm.tableMove();
           }, 7000);
         }, 2000)
         // this.collectTimer = setInterval(() => {
         //   this.tableMove();
         // }, 7000);
       },
       //鼠标移入右下角文档列表中
       setDocItemIndex(index){
         this.docItemIndex = index;
       },
       //折线图
       getLineChart(){
        let vm = this;
        let index = this.boxIndex;

        let firstArr = document.getElementsByClassName("first");
        let secondArr = document.getElementsByClassName("second");
        let thirdArr = document.getElementsByClassName("third");

        let firstdom = firstArr[index];
        let seconddom = secondArr[index + 1];
        let thirddom = thirdArr[index + 2];
        let firstChart={}
        let secondChart={}
        let thirdChart={}

        let option1 = vm.option;
        option1.xAxis.data = vm.lineMonArr[index];
        option1.series[0].data = vm.lineValArr[index];
        option1.series[0].lineStyle.color = vm.lineColor[0];
        option1.series[0].areaStyle.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{        // 1代表上面
          offset: 0,
          color: vm.linearColor[0].top
        }, {
          offset: 1,
          color: vm.linearColor[0].bot
        }]);
        if (firstdom) {
          firstChart = this.$echarts.init(firstdom);
          firstChart.setOption(option1, true);
        }
         let option2 = vm.option;
         option2.xAxis.data = vm.lineMonArr[index+1];
         option2.series[0].data = vm.lineValArr[index+1];
         option2.series[0].lineStyle.color = vm.lineColor[1];
         option2.series[0].areaStyle.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{        // 1代表上面
           offset: 0,
           color: vm.linearColor[1].top
         }, {
           offset: 1,
           color: vm.linearColor[1].bot
         }]);
        if (seconddom) {
          secondChart = this.$echarts.init(seconddom);
          secondChart.setOption(option2, true);
        }

         let option3 = vm.option;
         option3.xAxis.data = vm.lineMonArr[index+2];
         option3.series[0].data = vm.lineValArr[index+2];
         option3.series[0].lineStyle.color = vm.lineColor[2];
         option3.series[0].areaStyle.color = new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{        // 1代表上面
           offset: 0,
           color: vm.linearColor[2].top
         }, {
           offset: 1,
           color: vm.linearColor[2].bot
         }]);
          if (thirddom) {
            thirdChart = this.$echarts.init(thirddom);
            thirdChart.setOption(option3, true);
        }


        // setTimeout(function(){
         vm.$refs.first.setActiveItem(index);
         vm.$refs.second.setActiveItem(index+1);
         vm.$refs.third.setActiveItem(index+2);
        // }, 500)
       },
       //柱状图
       getBarChart(){
          var vm = this;
          let dom = document.getElementsByClassName("dataUpdate")[0];
          let myChart = vm.$echarts.init(dom);
          let option = {
              color: ['#3398DB'],
              legend:{
                 show:true,
                 top:"0%",
                 right:"0%",
                 icon:"rect",
                 itemWidth:5,
                 itemHeight:5,
                 textStyle:{
                   fontSize:10,
                   color:"#fff"
                 }
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                      type:'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
              },
              textStyle:{
                  fontFamily:"SOURCEHANSANSCN-MEDIUM",
                  fontWeight:"500"
              },
              grid: {
                  left: '3%',
                  right: '12%',
                  top:"5%",
                  bottom: '3%',
                  containLabel: true
              },
              xAxis: [
                  {
                      type: 'category',
                      data: vm.updateMonth,
                      axisLabel:{
                        color:"#fff",
                        fontSize:10
                      },
                      axisLine:{
                        show:false
                      },
                      axisTick:{
                        show:false
                      },
                      name:"(月)",
                      nameTextStyle:{
                        color:"#fff",
                        fontSize:10
                      }
                  }
              ],
              yAxis: [
                  {
                      type: 'value',
                      axisLine:{
                        show:false
                      },
                      axisTick:{
                        show:false
                      },
                      axisLabel:{
                        show:false
                      },
                      splitLine:{
                        show:false
                      }
                  }
              ],
              series: [
                  {
                      type: 'bar',
                      name:"更新量",
                      barWidth: '25%',
                      data: vm.updateArr,
                      itemStyle: {
                            normal: {
                                color: new vm.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#1bf5ffFF'
                                }, {
                                    offset: 1,
                                    color: '#0074c6FF'
                                }]),
                                barBorderRadius: [5, 5, 0, 0]
                            },

                        }
                  }
              ]
          };
          myChart.setOption(option,true);
       }
    },
    filters:{
      //采集情况统计数据表数量
      dataNum(params){
        return params + "个数据表";
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
      this.timer = null;
    }
}
</script>

<style lang="less" scoped="scoped">
.collection{
  width:100%;
  height:93.7%;
  padding: 1.25rem 3.125rem;
  display:flex;
  justify-content:space-between;
  align-items:center;
   .box{
     width:25.66%;
     height:100%;
     // border:1px solid rgba(4, 252, 255, 0.46);
     background:url("../../assets/zuoshang.png") no-repeat left top,
                url("../../assets/zuoxia.png") no-repeat left bottom,
                url("../../assets/youshang.png") no-repeat right top,
                url("../../assets/youxia.png") no-repeat right bottom;
     background-size:5% 5%;
   }

   //左侧折线图显示区域
   .left{
     padding: 1rem;
     background:url(../../assets/bg_zhizexiabian.png);
     background-size:100% 100%;
     position:relative;
       // 角框
       .lt{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/zuoshang.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         top:0;
         left:0;
       }
       .lb{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/zuoxia.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         bottom:0;
         left:0;
       }
       .rt{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/youshang.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         top:0;
         right:0;
       }
       .rb{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/youxia.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         bottom:0;
         right:0;
       }

     .dc_line{
       width:100%;
       height: 33.3%;
        /deep/ .el-carousel{
         width:100%;
         height:100%;
        }
       // 折线图样板
       /deep/ .el-carousel__item{
         width:100%;
         height:100%;
         // border-bottom:1px solid rgba(255,255,255,1);
       }
       .col{
         width:100%;
         height:100%;
         display: flex;
         flex-flow: column;
         justify-content: space-between;
         //标题
         .tit{
           width: 100%;
           height: 2rem;
           display:flex;
           align-items:center;
           .leftBorder{
             width: 0.375rem;
             height: 1.375rem;
             background: rgba(253,183,47,1);
             border-radius: 0.25rem;
             margin: 0.3125rem 0.5rem 0.3125rem 0rem;
           }
           .rightWord{
             color:rgba(14,252,255,1);
             font-size:1.375rem;
             font-family:SOURCEHANSANSCN-MEDIUM;
             font-weight:500;
           }
         }
         //提示语--获取量
         .tips{
           span{
             padding: 0.25rem;
             border: 1px solid rgba(0,216,255,1);
             font-size:1rem;
             font-family:SOURCEHANSANSCN-MEDIUM;
             font-weight:500;
             color:rgba(255,255,255,1);
           }
           .unit{
             color: #FBB730;
             border: none;
             font-size: 1.125rem;
             display: inline-block;
             float: right;
           }
         }
         //折线图区域
         .lineChart{
           width:100%;
           height:65%;
         }
       }
     }
     .line:nth-child(3){
        /deep/ .el-carousel__item{
          border-bottom:none;
       }
     }

   }

   //中间表信息背景展示部分
   .middle{
     width: 46.758%;
     height: 101%;
     background:url("../../assets/dataCollection/middle.png") no-repeat;
     background-size:100% 100%;
     position:relative;
     border:none;
     /*top: -0.5%;*/
     // 角框
     .lt{
       width:3.59%;
       height:3.60%;
       background:url(../../assets/zuoshang.png) no-repeat;
       background-size:100% 100%;
       position:absolute;
       top: 0.5%;
       left: 0.8%;
     }
     .lb{
       width:3.59%;
       height:3.60%;
       background:url(../../assets/zuoxia.png) no-repeat;
       background-size:100% 100%;
       position:absolute;
       bottom: 0.5%;
       left: 0.8%;
     }
     .rt{
       width:3.59%;
       height:3.60%;
       background:url(../../assets/youshang.png) no-repeat;
       background-size:100% 100%;
       position:absolute;
       top: 0.5%;
       right: 0.8%;
     }
     .rb{
       width:3.59%;
       height:3.60%;
       background:url(../../assets/youxia.png) no-repeat;
       background-size:100% 100%;
       position:absolute;
       bottom: 0.5%;
       right: 0.8%;
     }
     .tit{
       width: 50%;
       height: 2rem;
       display: flex;
       align-items: center;
       margin: 2% 3%;
       float: left;
       .leftBorder{
         width: 0.375rem;
         height: 1.375rem;
         background: rgba(253,183,47,1);
         border-radius: 0.25rem;
         margin: 0.3125rem 0.5rem 0.3125rem 0rem;
       }
       .rightWord{
         color:rgba(14,252,255,1);
         font-size:1.375rem;
         font-family:SOURCEHANSANSCN-MEDIUM;
         font-weight:500;
         width: 100%;
         .unit{
           display: inline-block;
           color: #FDB72F;
           font-size: 1.125rem;
           float: right;
         }
       }
     }
     // 标题右侧
     .dataChain {
       width: 30%;
       height: 2rem;
       display: flex;
       align-items: center;
       margin: 2% 3%;
       float: right;
       .chainIcon {
         width: 29px;
         height: 25px;
         /*border: 1px dashed white;*/
         background: url("../../assets/dataCollection/icon.png") no-repeat center center;
         background-size: 100% 100%;
       }
       .chainInfo {
         margin-left: 3%;
         .info {
           height: 24px;
           font-size: 1.375rem;
           font-family: Source Han Sans CN;
           font-weight: bold;
           color: #FFFFFF;
         }
         .infoNum {
           height: 20px;
           font-size: 1.775rem;
           font-family: "Digital-7Mono";
           font-weight: normal;
           color: #00FFFF;
           line-height: 2.5625rem;
         }
       }
     }

     .collectData {
       height: 90%;
       /deep/  .el-table, .el-table__expanded-cell {
         background-color: transparent;
       }
       /deep/ .el-table th {
         background-color: transparent!important;
         font-size: 1.125rem;
         font-family: Source Han Sans CN;
         font-weight: bold;
         color: #04FCFF;
         border: none;
       }
       /deep/ .el-table tr {
         background-color: transparent;
         color: white;
       }
       /deep/ .el-table td, .el-table th.is-leaf {
         border: none;
         font-size: 1rem;
       }
       /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{
         background-color: transparent;
         font-size: 1rem;
         font-family: Source Han Sans CN;
         font-weight: 400;
         color: #FFFFFF;
         border: none;
       }

       /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
         background-color: #7a5d26;
       }
     }
     .el-table::before {//去除底部白线
       left: 0;
       bottom: 0;
       width: 100%;
       height: 0;
     }

      //数据详情--中间显示
      .dataInfo{
        width: 45%;
        height: 40%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display:flex;
        flex-direction:column;
        justify-content:space-evenly;
         .dataInfo_box{
          color: #fff;
          text-align: center;
          p{
            padding: 0.25rem 0rem;
            font-size: 1.25rem;
            font-family: SOURCEHANSANSCN-REGULAR;
          }
          p:last-child{
            font-family: "Digital-7Mono";
            color: #04FCFF;
            font-size: 2.125rem;
            span{
              display: inline-block;
              padding: 0rem 0.35rem;
              margin-left: 0.25rem;
              background: url("../../assets/num_border.png") no-repeat center center;
              background-size: 100% 100%;
            }
            .no_bg{
              background: none;
              padding: 0rem;
            }
          }
         }
     }
     //导航项
     .navBox{
       width: 28%;
       height: 28%;
       font-family:SOURCEHANSANSCN-REGULAR;
       font-weight:400;
       color:rgba(255,255,255,1);
       transform-origin:center;
       position:absolute;
       .depart{
         text-align:center;
         cursor:pointer;
         font-size:1.5rem;
       }
       .dataList{
          position: absolute;
          bottom: 28%;
          transform:rotate(79deg);
          font-size:1.375rem;
       }
     }
     .active_box{
       font-family:SOURCEHANSANSCN-MEDIUM;
       font-weight:800;
       color:rgba(253,183,47,1);
     }
     //区城管执法监察局
     .box0{
        top: -0.75%;
        left: 18%;
        transform: rotate(-23deg);
        .dataList{
          left: 12%;
        }
     }
     // 市流管办
     .box1{
        top: -3.5%;
        left: 46.5%;
        transform: rotate(13deg);
        .dataList{
          left: 13%;
        }
     }
     //什刹海
     .box2{
        top: 6.5%;
        left: 64.5%;
        transform: rotate(45deg);
        .dataList{
          left: 13.5%;
          transform: rotate(-97deg);
        }
     }
     //市残联
     .box3{
        top: 23.5%;
        left: 75%;
        transform: rotate(77deg);
        .dataList{
          left: 16%;
          transform: rotate(-102deg);
        }
     }
      //市工商局
      .box4{
        top: 46%;
        left: 75.5%;
        transform: rotate(105deg);
        .dataList{
          left: 14%;
          transform: rotate(-102deg);
        }
      }
      //市民政局
      .box5{
        top: 66%;
        left: 63.5%;
        transform: rotate(138deg);
        .dataList{
          left: 10%;
          transform: rotate(-102deg);
        }
      }
      //市质监
      .box6{
        top: 76%;
        left: 45%;
        transform: rotate(170deg);
        .dataList{
          left: 16%;
          transform: rotate(-102deg);
        }
      }
      //市资源中心
      .box7{
        top: 74%;
        left: 21%;
        transform: rotate(200deg);
        .dataList{
          left: 8%;
        }
      }
      //卫健委
      .box8{
        top: 61.5%;
        left: 4%;
        transform: rotate(233deg);
        .dataList{
          left: 16%;
        }
      }
      //区科信局
      .box9{
        top: 41.5%;
        left: -4.25%;
        transform: rotate(263deg);
        .dataList{
          left: 10%;
        }
      }
     //区科信局
     .box10{
        top: 18.5%;
        left: -1%;
        transform: rotate(296deg);
        .dataList{
          left: 14%;
        }
     }
   }
   //右侧展示部分
   .right{
      background:url(../../assets/bg_zhizexiabian.png);
      background-size:100% 100%;
      padding: 1rem;
      position:relative;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
       // 角框
       .lt{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/zuoshang.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         top:0;
         left:0;
       }
       .lb{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/zuoxia.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         bottom:0;
         left:0;
       }
       .rt{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/youshang.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         top:0;
         right:0;
       }
       .rb{
         width:6.4%;
         height:3.56%;
         background:url(../../assets/youxia.png) no-repeat;
         background-size:100% 100%;
         position:absolute;
         bottom:0;
         right:0;
       }
       .tit{
          width: 100%;
          height: 2rem;
          display:flex;
          align-items:center;
            .leftBorder{
              width: 0.375rem;
              height: 1.375rem;
              background: rgba(253,183,47,1);
              border-radius: 0.25rem;
              margin: 0.3125rem 0.5rem 0.3125rem 0rem;
            }
            .rightWord{
              color:rgba(14,252,255,1);
              font-size:1.375rem;
              font-family:SOURCEHANSANSCN-MEDIUM;
              font-weight:500;
              width: 100%;
              .unit{
                display: inline-block;
                color: #FDB72F;
                font-size: 1.125rem;
                float: right;
              }
            }
        }
       //整体采集情况
       .unitCollect{
         width:100%;
         height:19.67%;
         margin-top:4%;
         display:flex;
         justify-content:space-between;
         align-content:space-between;
         flex-wrap:wrap;
           .unitCollect_box{
              width:46.37%;
              height:44.94%;
              background:skyblue;
              display:flex;
              flex-direction:column;
              justify-content:space-evenly;
              align-items:center;
              background:url("../../assets/img_shujuhuiji.png") no-repeat;
              background-size:100% 100%;
                .unitCollect_box_top{
                  color:rgba(255,255,255,1);
                  font-size:1.125rem;
                  font-family:SOURCEHANSANSCN-MEDIUM;
                  font-weight:500;
                }
                .unitCollect_box_bot{
                  color: #00FFFF;
                  font-size: 2rem;
                  font-family:"Digital-7Mono";
                  font-weight:500;
                  span {
                    font-family:SOURCEHANSANSCN-MEDIUM;
                    color:#fff;
                    font-size:1rem;
                    padding-left: 0.5rem;
                  }
                }
           }
       }
       //分割线
       .line{
         width: 94.85%;
         height: 1px;
         margin: 0 auto;
         margin-top: 3.5%;
         background: rgba(255,255,255,1);
         opacity: 0.3;
       }
       .titmid{
         margin-top:4%;
       }
       //数据更新情况
       .dataUpdate{
          width:100%;
          height:27.5%;
       }
       //文档列表图例(vh=18px)
       .docLegend{
         width:100%;
         height:2.24%;
         display:flex;
         justify-content:flex-end;
            .docLegend_box{
              height:100%;
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-right:10px;
                span:nth-child(1){
                  display:inline-block;
                  width:0.5rem;
                  height:0.5rem;
                  border-radius: 0.25rem;
                  background:rgba(24,106,49,1);
                  margin-right: 0.25rem;
                }
                span:nth-child(2){
                  font-size:0.75rem;
                  color:rgba(255,255,255,1);
                  font-family:SOURCEHANSANSCN-MEDIUM;
                  font-weight:500;
                }
            }
            .docLegend_box:nth-child(2){
                span:nth-child(1){
                  background:rgba(152,114,0,1);
                }
            }
            .docLegend_box:nth-child(3){
                span:nth-child(1){
                  background:rgba(138,33,0,1);
                }
            }
       }
       .docList{
         height:28.8%;
         width:89.23%;
         margin:0 auto;
         margin-top:2%;
         overflow:hidden;
         transition: all 0.5s;
          .docItem{
              width:100%;
              height:16.85%;
              margin-bottom:2%;
              border:1px solid rgba(138,33,0,1);
              border-left: 0.5rem solid rgba(138,33,0,1);
              border-radius: 0.25rem;
              position:relative;
               .docItem_word{
                   width:100%;
                   height:100%;
                   display:flex;
                   align-items:center;
                   color:rgba(255,255,255,1);
                   font-size:1.125rem;
                   font-family:SOURCEHANSANSCN-MEDIUM;
                   font-weight:500;
                   cursor:pointer;
                   position:absolute;
                   top: 0;
                   left: 1rem;
                   z-index:9;
                }
               .docItemBg{
                 width:0%;
                 height:100%;
                 position:absolute;
                 top:0;
                 left:0;
                 animation:myfirst 2s;
               }
               @keyframes myfirst
               {
                   0% {width:0%}
                   50% {width:100%}
                   99% {width:0%}
               }
          }

         // 0 待完善
          .docItem0{
            border:1px solid rgba(152,114,0,1);
            border-left:8px solid rgba(152,114,0,1);
          }

         // 1 较完整
          .docItem1{
            border:1px solid rgba(24,106,49,1);
            border-left:8px solid rgba(24,106,49,1);
          }

         // 2 缺失
          .docItem2{
            border:1px solid rgba(138,33,0,1);
            border-left:8px solid rgba(138,33,0,1);
          }
          .animate-up {
              transition: all 0.5s ease-in-out;
              transform: translateY(-110%);
            }
       }
   }

  .docInfo {
    /*/deep/ .el-dialog {*/
      /*opacity: 1;*/
      /*width: 48%;*/
      /*!*height: 65%;*!*/
      /*background: url('../../assets/info4Back.png');*/
      /*background-size: 100% 100%;*/
    /*}*/

    /deep/ .el-dialog__title {
      font-size: 1.25rem;
      font-weight: bolder;
    }

    /deep/ .el-dialog__headerbtn {
      font-size: 2rem;
    }

    /*/deep/  .el-table, .el-table__expanded-cell {*/
      /*background-color: transparent;*/
    /*}*/

    /*/deep/ .el-table th {*/
      /*background: rgba(22,150,255,0.06)!important;*/
      /*font-size: 1.1875rem;*/
      /*font-family: Source Han Sans CN;*/
      /*font-weight: bolder;*/
      /*color: #00FFFF;*/
      /*border-bottom: 1px solid rgba(22,150,255,0.3);*/
      /*border-top: 1px solid rgba(22,150,255,0.3);*/
    /*}*/
    /*/deep/ .el-table tr {*/
      /*background-color: transparent;*/
      /*height: 48px!important;*/
    /*}*/
    /*/deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{*/
      /*background-color: transparent;*/
      /*font-size: 1rem;*/
      /*font-family: Source Han Sans CN;*/
      /*font-weight: 400;*/
      /*color: #FFFFFF;*/
      /*border-bottom: 1px solid rgba(255,255,255,0.5) ;*/
    /*}*/
    /*/deep/ .el-table td, .el-table th {*/
      /*padding: 6px 0;*/
    /*}*/
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

}
</style>
<style>
  .el-table .warning-row {
    background: rgba(2, 34, 107, 0.8)!important;
  }

  .el-table .checking-row {
    background: rgba(255, 155, 0, 0.6)!important;
  }
</style>
