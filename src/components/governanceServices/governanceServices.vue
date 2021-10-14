<template>
  <div class="gs">
    <!-- 左侧数据 -->
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
        <div class="rightWord">整体服务情况</div>
      </div>
      <!-- 整体服务情况 -->
      <div class="unitCollect">
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">服务应用</div>
          <div class="unitCollect_box_bot">{{collectionAll.sourceAmount}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">接口数量</div>
          <div class="unitCollect_box_bot">{{collectionAll.tableAmount}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">总服务项</div>
          <div class="unitCollect_box_bot">{{collectionAll.itemAmount}}<span>个</span></div>
        </div>
        <div class="unitCollect_box">
          <div class="unitCollect_box_top">总服务量</div>
          <div class="unitCollect_box_bot">{{collectionAll.dataAmount}}<span>万条</span></div>
        </div>
      </div>
      <!-- 分割线 -->
      <div class="line"></div>
      <div class="left_bottom">
        <div class="tit titmid">
          <div class="leftBorder"></div>
          <div class="rightWord">
            治理提升
            <div class="unit">
              <el-radio v-model="comparesType" label="1">人口</el-radio>
              <el-radio v-model="comparesType" label="2">法人</el-radio>
            </div>
          </div>
        </div>
        <!-- 数据治理更新情况 -->
        <div class="dataManage">
          <el-carousel :interval="5000" arrow="never">
            <template v-if="comparesType === '1'">
              <el-carousel-item v-for="(item,index) in personCompares" :key="index">
                <img :src="item.fic" class="carousel_img"/>
              </el-carousel-item>
            </template>

            <template v-else>
              <el-carousel-item v-for="item in legalCompares" :key="item">
                <img :src="item.fic" class="carousel_img"/>
              </el-carousel-item>
            </template>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- 中间部分--数据总体汇总 -->
    <div class="box mid">
      <div class="dataInfo">
        <div class="dataInfo_box">
          <p>最近调用时间:</p>
          <p>
            <span v-for="(item, index ) in monitorData.joinDate" :key="index" :class="item == '-' ? 'no_bg' : null" >{{item}}</span>
          </p>
        </div>
        <div class="dataInfo_box">
          <p>累计服务量(条)</p>
          <p>
            <span v-for="(item, index ) in monitorData.amount" :key="index">{{item}}</span>
          </p>
        </div>
        <div class="dataInfo_box">
          <p>服务项(个)</p>
          <p>
            <span v-for="(item, index ) in monitorData.dataItem" :key="index">{{item}}</span>
          </p>
        </div>
      </div>
      <div v-for="(item, index) in collectionInfo" :key="index" :class="boxIndex == index ? 'navBox box'+index+' active_box' : 'navBox box'+index">
        <div class="depart"
             :class="{gs_boxDisable: index > validLen - 1}"
             @click="index < validLen ? setBoxIndex(index) : ''"
        >
          <span v-html="cutName(item.department)"></span>
        </div>
        <!--<div class="depart" @click="setBoxIndex(index)">{{item.department.split("-")[0]+ '\n' + item.department.split("-")[1] ||""}}</div>-->
        <!--<div class="dataList">{{item.tableAmount|dataNum}}</div>-->
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
      <div class="gs_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="first">
          <el-carousel-item v-for="(item,index) in departArr" :key="index">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item}}</div>
              </div>
              <div class="tips"><span>累计服务量</span><span class="unit">单位:条</span></div>
              <div class="gs_lineChart gs_first">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="gs_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="second">
          <el-carousel-item v-for="(item,index) in departArr" :key="index+100">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item}}</div>
              </div>
              <div class="tips"><span>累计服务量</span><span class="unit">单位:条</span></div>
              <div class="gs_lineChart gs_second">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="gs_line">
        <el-carousel indicator-position="none" height="100%" :autoplay="false" direction="vertical" :interval="7000" ref="third">
          <el-carousel-item v-for="(item,index) in departArr" :key="index+1000">
            <!-- 折线图样板 -->
            <div class="col">
              <div class="tit">
                <div class="leftBorder"></div>
                <div class="rightWord">{{item}}</div>
              </div>
              <div class="tips"><span>累计服务量</span><span class="unit">单位:条</span></div>
              <div class="gs_lineChart gs_third">

              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 更新时间 -->
    <footerTime :isExplain="false" :screenId="1" />
  </div>
</template>

<script>
  import footerTime from "../footerTime";
  import {getCollectionInfo,getCollectionAll,getMonitorData,getChart} from "../../api/governanceServices.js";
  export default{
    components:{
      footerTime
    },
    data(){
      return{
        //折线颜色数组
        lineColor:["#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05"],
        //折线下面积渐变颜色
        linearColor:[{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"}],
        //手写轮播初始下标
        boxIndex:0,
        //定时器
        timer:null,
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
        validLen: 0,
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
        //文档列表状态颜色
        docColor:["rgba(24,106,49,1)","rgba(152,114,0,1)","rgba(138,33,0,1)"],
        flag:true,
        //折线图总体数据数组（二维）
        lineValArr:[],
        //折线图总体月份数组（二维）
        lineMonArr:[],
        //折线图单位数组
        departArr:[],

        // 人口-治理情况
        personCompares: [
          {
            title: '治理提升',
            fic: require('../../assets/governanceSeivices/2-person.png'),
          },
          {
            title: '治理提升',
            fic: require('../../assets/governanceSeivices/1-person.png'),
          },
          {
            title: '治理服务效果',
            fic: require('../../assets/governanceSeivices/3-person.png'),
          }
        ],
        // 法人-治理情况
        legalCompares: [
          {
            title: '治理提升',
            fic: require('../../assets/governanceSeivices/1-faren.png'),
          }
        ],
        comparesType: '1'
      }
    },
    created(){
      //获取采集情况统计
      this.getCollectionInfo();
      //获取整体采集信息
      this.getCollectionAll();
      //获取文档列表
      // this.getDocList();
      //获取矩形树图数据
      this.getChart();
    },
    updated(){
      if(this.flag){
        var vm = this;
        //折线图
        vm.getLineChart();
        //柱状图
        // vm.getBarChart();
      }

    },
    methods:{
      //获取采集情况统计
      getCollectionInfo(){
        getCollectionInfo()
          .then(res=>{
            this.collectionInfo = res.data;
            //有效部门数
            this.validLen = this.collectionInfo.findIndex((value)=>value.department === '〓〓〓');
            //循环动力下标
            this.loopIndex(0);//自动切换轮播时传0
          })
      },
      //整体信息
      getCollectionAll(){
        getCollectionAll()
          .then(res=>{
            this.collectionAll = res.data;
          })
      },
      //获取监管数据流（最中间信息--各部门）
      getMonitorData(){
        let index = this.boxIndex;
        let id = this.collectionInfo[index].departmentId||1;

        getMonitorData({
          departmentId:id.toString()
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
        let id = this.collectionInfo[index].departmentId||1;
        getUpdate({
          departmentId:id.toString()
        })
          .then(res=>{
            this.updatePart = res.data[0].department;
            let arr = res.data[0].dataUpdateCondition;
            let len = arr.length;
            let updateMonth = [];
            let updateArr = [];
            for(let i=0;i<len;i++){
              let item = arr[i];
              updateArr.push(item.amount);
              updateMonth.push(item.updateTime);
            }
            this.updateArr = updateArr;
            this.updateMonth = updateMonth;
            // this.getBarChart();
          })
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
              departArr.push(item.department);
              let itemData = item.chart;
              let itemlen = itemData.length;
              let varr = [];
              let marr = [];
              for(let k=0;k<itemlen;k++){
                let itemitem = itemData[k];
                varr.push(itemitem.amount);
                marr.push(itemitem.updateTime);
              }
              valArr.push(varr);
              monthArr.push(marr);
            }
            this.departArr = departArr;
            this.lineValArr = valArr;
            this.lineMonArr = monthArr;
          })
      },
      //轮播下标变化
      loopIndex(params){
        let vm = this;
        if(params==0){
          vm.getMonitorData();
          // vm.getUpdate();
        }
        this.timer = setInterval(function(){
          let valid = vm.validLen - 1;
          if(vm.boxIndex < valid){
            vm.boxIndex++;
          }else{
            vm.boxIndex = 0;
          }
          vm.getMonitorData();
          // vm.getUpdate();
          //右下角文档列表动画启动
          // vm.getDocAnimate();
          vm.leftScroll();
        },7000)
      },
      //计算左侧轮播下标
      getBannerIndex(params){
        let valid = this.validLen - 1;
        if(params > valid){
          return params - this.validLen;
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
        clearInterval(this.timer);
        clearTimeout(this.laytimer);
        this.timer = null;
        this.laytimer = null;
        this.getMonitorData();
        // this.getUpdate();
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
        this.laytimer = setTimeout(function(){
          vm.loopIndex(1);//手动切换轮播时传1
        },5000);
      },
      //鼠标移入右下角文档列表中
      setDocItemIndex(index){
        this.docItemIndex = index;
      },
      //折线图
      getLineChart(){
        var vm = this;
        var firstArr = document.getElementsByClassName("gs_first");
        var secondArr = document.getElementsByClassName("gs_second");
        var thirdArr = document.getElementsByClassName("gs_third");
        var len = firstArr.length;
        for(let i=0;i<len;i++){
          let firstdom = firstArr[i];
          let seconddom = secondArr[i];
          let thirddom = thirdArr[i];
          let firstChart = this.$echarts.init(firstdom);
          let secondChart = this.$echarts.init(seconddom);
          let thirdChart = this.$echarts.init(thirddom);
          let option = {
            grid:{
              top:"5%",
              bottom:"15%",
              right:'10%',
              left:"15%"
            },
            textStyle:{
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
              data:vm.lineMonArr[i],
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
              data: vm.lineValArr[i],
              type: 'line',
              lineStyle:{
                color:vm.lineColor[i]
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: vm.linearColor[i].top // 0% 处的颜色
                  }, {
                    offset: 1, color: vm.linearColor[i].bot // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
              smooth:true,
              symbol:"none"
            }]
          };
          firstChart.setOption(option, true);
          secondChart.setOption(option, true);
          thirdChart.setOption(option, true);
        }
        // this.$nextTick(function(){
        vm.$refs.first.setActiveItem(0);
        vm.$refs.second.setActiveItem(1);
        vm.$refs.third.setActiveItem(2);
        // })
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
      },

      //修改中间部门名称展现样式
      cutName(departName) {
        return departName.replace(/\-/g, '</br>')
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
  .gs{
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

      .gs_line{
        width:100%;
        height: 33.3%;
        /deep/ .el-carousel{
          width:100%;
          height:100%;
          // 折线图样板
        }
        /deep/ .el-carousel__item {
          width:100%;
          height:100%;
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
          .gs_lineChart{
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

    //中间地球背景展示部分
    .mid{
      width: 40.835%;
      height: 89.25%;
      background:url("../../assets/earth.png") no-repeat;
      background-size:100% 100%;
      position:relative;
      border:none;
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
          font-size:1.375rem;
          margin-top: -2.3rem;
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
      .box2{
        top: -0.75%;
        left: 18%;
        transform: rotate(-23deg);
        .dataList{
          left: 12%;
        }
      }
      // 市流管办
      .box3{
        top: -3.5%;
        left: 46.5%;
        transform: rotate(13deg);
        .dataList{
          left: 13%;
        }
      }
      //什刹海
      .box4{
        top: 6.5%;
        left: 64.5%;
        transform: rotate(45deg);
        .dataList{
          left: 13.5%;
          transform: rotate(-97deg);
        }
      }
      //市残联
      .box5{
        top: 23.5%;
        left: 75%;
        transform: rotate(77deg);
        .dataList{
          left: 16%;
          transform: rotate(-102deg);
        }
      }
      //市工商局
      .box6{
        top: 46%;
        left: 75.5%;
        transform: rotate(105deg);
        .dataList{
          left: 14%;
          transform: rotate(-102deg);
        }
      }
      //市民政局
      .box7{
        top: 66%;
        left: 63.5%;
        transform: rotate(138deg);
        .dataList{
          left: 10%;
          transform: rotate(-102deg);
        }
      }
      //市质监
      .box8{
        top: 76%;
        left: 45%;
        transform: rotate(170deg);
        .dataList{
          left: 16%;
          transform: rotate(-102deg);
        }
      }
      //市资源中心
      .box9{
        top: 74%;
        left: 21%;
        transform: rotate(200deg);
        .dataList{
          left: 8%;
        }
      }
      //卫健委
      .box10{
        top: 61.5%;
        left: 4%;
        transform: rotate(233deg);
        .dataList{
          left: 16%;
        }
      }
      //区科信局
      .box0{
        top: 41.5%;
        left: -4.25%;
        transform: rotate(263deg);
        .dataList{
          left: 10%;
        }
      }
      //区科信局
      .box1{
        top: 18.5%;
        left: -1%;
        transform: rotate(296deg);
        .dataList{
          left: 14%;
        }
      }

      .gs_boxDisable {
        color: #666666;
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
            margin-right: 1rem;
            /deep/ .el-radio__input.is-checked+.el-radio__label {
              color: #04FCFF;
            }

            /deep/ .el-radio__label {
              color: #FFFFFF;
              font-size: 1.125rem;
            }

            /deep/ .el-radio__inner::after {
              background-color: transparent;
            }

            /deep/ .el-radio__input.is-checked .el-radio__inner {
              background-color: #04FCFF;
              border-color: #04FCFF;
            }
          }
        }
      }
      //整体服务情况
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
        width: 95.85%;
        height: 1px;
        margin: 0 auto;
        margin-top: 3.5%;
        background: rgba(255,255,255,1);
        opacity: 0.3;
      }
      .titmid{
        margin-top: 1.5%;
      }
      //数据更新情况
      .left_bottom {
        width: 100%;
        height: 70%;
        margin-top: 3.5%;
        background:url("../../assets/governanceSeivices/zuoxia.png") no-repeat;
        background-size:100% 100%;
      }
      .dataManage{
        width: 92.94%;
        height: 90.5%;
        margin-left: 3.4%;
        margin-top: 1%;
        /deep/ .el-carousel{
          width: 100%;
          height: 100%;
        }
        /deep/ .el-carousel__container {
          height: 100%;
        }

        .carousel_img {
          width: 100%;
          height: 95%;
          position: relative;
        }
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
        .docItem0{
          border:1px solid rgba(24,106,49,1);
          border-left:8px solid rgba(24,106,49,1);
        }
        .docItem1{
          border:1px solid rgba(152,114,0,1);
          border-left:8px solid rgba(152,114,0,1);
        }
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

  }
</style>
