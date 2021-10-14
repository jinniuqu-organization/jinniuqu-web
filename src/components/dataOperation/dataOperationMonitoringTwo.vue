<template>
  <div class="monTwo">
    <div class="oneGif">
      <!-- 标准参考数据准备 中间 -->
      <div class="management">来源管理</div>
      <div class="storage">采集入库</div>
      <div class="version">版本管理</div>
      <div class="content">内容验证</div>
      <div class="empty">为空验证</div>
      <div class="repeat">重复验证</div>
      <div class="format">格式验证</div>
      <div class="code">编码与数据实情比对</div>
      <div class="reference">参考数据<div style="text-align: center;">拉通</div></div>
      <!-- 编码映射 -->
      <div class="standardCoding">
        <div class="title"><div class="leftBorder"></div>编码映射</div>
        <div class="topBox" style="font-size: 1.0625rem;">
          <div v-for="(item, index) in originalData" :key="index" :class="{'animate-up': animateUp2,'numBox':true}">
            <div class="codeIcon"></div>
            <span>{{ item.departName }}<br/><span style="font-size: 1rem">{{ item.tableNote }}</span></span>
            <span class="blue animated fadeIn" style="text-align:right;">{{ item.totalcodeCnt }}</span>
            <span>条</span>
            <span>
              成功映射：<span class="codeSpanText">{{ item.rightcodeCnt }}</span>条
              <br/>
              归为其他：<span class="codeSpanText">{{ item.othercodeCnt }}</span>条
            </span>
          </div>
        </div>
      </div>

      <div class="rightInfo">
        <!-- 标准编码服务对象 -->
        <div class="standardData">
          <div class="title"><div class="leftBorder"></div>编码映射累计转换量</div>
          <div class="standardLine" style="width: 100%; height: 90%;">
          </div>
        </div>
        <!-- 标准编码映射情况 -->
        <div class="keyCoding">
          <div class="title"><div class="leftBorder"></div>标准编码映射情况</div>
          <div class="box">
            <el-table
              :data="codingData"
              style="width: 96%; margin-left: 2%;"
              max-height="100%"
              :row-class-name="codeRowClassName"
              ref="codingTable"
            >
              <el-table-column
                prop="originalName"
                label="拉通前名称"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="originalCode"
                label="拉通前代码"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="standardName"
                label="拉通后名称"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="standardCode"
                label="拉通后代码"
                align="left"
                show-overflow-tooltip
              >
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动的原点 -->
    <div class="canvasBox">
      <!-- 从左向右 从上到下 -->
      <canvas id="canvas3" :width="0.013 * width" :height="0.015 * height"></canvas>
      <canvas id="canvas4" :width="0.0245 * width" :height="0.29 * height"></canvas>
      <canvas id="canvas5" :width="0.022 * width" :height="0.292 * height"></canvas>
    </div>
    <!-- 更新时间 -->
    <footerTime :isExplain="true" :screenId="4" />
  </div>
</template>

<script>
import footerTime from "../footerTime";
import { transform, getTransformInfo, standardServer ,standardTop,standardCode,standardWord, getAllStandardService} from '../../api/dataOperation.js'
import {getCircle, levelMoveCircle, curveMoveCircle3, changeNumCircle3, changeNumCircle4} from "../../common/js/circleCanvas.js";
export default {
  components: {
    footerTime
  },
  data() {
    return {
      //折线颜色数组
      lineColor:["#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05"],
      //折线下面积渐变颜色
      linearColor:[{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"}],
      // 重点编码排行榜
      KeyCodingList: [],
      // 标准编码排行
      standardCodingList: [],
      // 编码标准化列表
      standardList: [],
      //标准编码服务
      codingService:[],
      // 标准编码
      original:[],
      // 编码映射
      originalData: [],
      // 原始编码
      standard:[],

      // 标准编码服务对象
      codeService: {},
      // 标准编码映射情况
      codingData: [],
      // 编码映射
      codingMapping:{},
      // 标准数据项的动画
      animate:false,
      animateUp: false,
      timer: null,
      // 原始数据项的动画
      animate1:false,
      animateUp1: false,
      timer1: null,
      // 重点编码列表
      animate2:false,
      animateUp2: false,
      timer2: null,
      // 重点编码动画
      timer3: null,
      // 编码映射情况动画
      timer4: null,
      showRecH:false,
      random:new Date().getTime(),
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  },
  created() {
    // 映射编码
    this.transform();
    this.getAllStandardService();
    // this.getStandardLine();
    // 重点编码排行榜
    // this.keyCoding();
    // 标准编码服务
    // this.getCodingService();
    // 标准编码排行
    // this.standardCoding();
    // 编码标准化列表
    // this.getStandard()
  },
  mounted() {
    let r = 4;

    let canvas3 = getCircle("canvas3", r, r);
    levelMoveCircle(canvas3);

    let canvas4 = getCircle("canvas4", r, document.getElementById("canvas4").getAttribute("height")/2 + 2);
    changeNumCircle3(canvas4);

    let canvas5 = getCircle("canvas5", r, r);
    changeNumCircle4(canvas5);

    window.addEventListener("resize",() => {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
    });
  },
  methods: {
    //编码映射
    transform() {
      transform().then(res => {
        if(res.code == 200) {
          this.originalData = res.data;
          this.getTransformInfo(res.data[0].tableName);
          this.timer2 = setInterval(this.originalAnimate, 10000);  // 标准
        }
      })
    },

    // 标准编码服务对象
    getAllStandardService() {
      getAllStandardService().then(res => {
        // let month = [];
        // let value = [];
        if (res.code === 200) {
          let month = _.map(res.data, 'dateId');
          let value = _.map(res.data, 'dataCount');

          this.codeService.month = month;
          this.codeService.value = value;

          this.getStandardLine();
        }
      })
    },
    // 重点编码排行榜
    keyCoding() {
      standardCode().then((data)=>{
        if(data.code=="200"){
          this.KeyCodingList = data.data.sort(this.compare("amount")).splice(0,6)
          // 进度条的动画效果
          setTimeout(() => {
            this.showRecH = true;
          }, 20)
        }
      })
    },
    // 标准编码服务
    getCodingService(){
      standardServer().then((data)=>{
        if(data.code=="200"){
          this.original = data.data[0].original;
          this.standard = data.data[0].standard;
          this.codingMapping = data.data[0].codeMap[0];
          this.timer1 = setInterval(this.standardAnimate, 3000);  // 原始
          this.timer2 = setInterval(this.originalAnimate, 3000);  // 标准
        }
      })
    },
    //table斑马线
    codeRowClassName({row,rowIndex}) {
      let index = rowIndex + 1;
      if (rowIndex == 0) {
        return 'checking-row'
      }
      if(index %2 == 0){
        return 'warning-row'
      }
      return '';
    },
    // 标准编码排行
    standardCoding(){
      standardTop().then((data)=>{
        if(data.code=="200"){
          this.standardCodingList =  data.data.sort(this.compare("amount")).splice(0,7)
          // 进度条的动画效果
          setTimeout(() => {
            this.showRecH = true;
          }, 20)
        }
      })
    },

    // 标准编码服务对象-折线图
    getStandardLine() {
      let vm = this;
      setTimeout(() => {
        let standardChartDom = document.getElementsByClassName("standardLine")[0];
        //重要：给元素设置宽度
        let standardEChart = this.$echarts.init(standardChartDom);

        let option = {
          grid:{
            top:"5%",
            bottom:"15%",
            // right:'8%',
            left:"18%",
            width:'auto',
            height:'auto'
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
            data: this.codeService.month,
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"rgba(255,255,255,1)",
              fontSize:12
            },
            name:"(年)",
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
            data: this.codeService.value,
            type: 'line',
            lineStyle:{
              color:vm.lineColor[0]
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: vm.linearColor[0].top // 0% 处的颜色
                }, {
                  offset: 1, color: vm.linearColor[0].bot // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            smooth:true,
            symbol:"none"
          }]
        };
        standardEChart.setOption(option, true);
        standardEChart.resize();
      }, 0)
    },
    // 编码标准化列表
    getStandard(){
      standardWord().then((data)=>{
        if(data.code=="200"){
          this.standardList = data.data;
          this.timer3 = setInterval(this.standardListAnimate, 3000);
        }
      })
    },
    // 原始编码的无缝轮播
    standardAnimate() {
      this.animateUp1 = !this.animateUp1;
      setTimeout(() => {
        this.standard.push(this.standard[0]);
        this.standard.shift();
        this.animateUp1 = !this.animateUp1
      }, 500)
    },
    // 编码映射的无缝轮播
    originalAnimate() {
      this.animateUp2 = true;
      clearInterval(this.timer4);
      // this.getTransformInfo(this.originalData[1].tableName);
      // setTimeout(() => {
        this.originalData.shift();
        this.originalData.push(this.originalData[0]);
        this.getTransformInfo(this.originalData[0].tableName);
        this.animateUp2 = false;
      // }, 7000);
    },

    // 标准编码映射情况
    getTransformInfo(tableName) {
      this.codingData = [];
      getTransformInfo({tableName: tableName}).then(res => {
        if (res.code === 200) {
          this.codingData = res.data;
          if(this.codingData.length > 7) {
            clearInterval(this.timer4);
            this.timer4 = null;
            this.beginCoding();
          }
        }
      })
    },

    // 标准编码映射情况-中间表格滚动
    beginCoding() {
      // this.tableCodingMove();
      this.timer4 = setInterval(() => {
        this.tableCodingMove();
      }, 2000);
    },
    tableCodingMove() {
      // 47px 为表格行高
      this.$nextTick(function(){
        // let t = document.getElementsByClassName("el-table__body-wrapper");
        // let t0 = t[0];
        // setTimeout(() => {
          this.codingData.push(this.codingData[0]);//把第一条数据插入数组最后一条
          // t0.style.transition = 'all .5s';
          // t0.style.marginBottom = '-48px';
        // }, 1000);
        // setTimeout(() => {
          this.codingData.shift();//删除数组中第一条数据
          // t0.style.transition = 'all 0s ease 0s';
          // t0.style.marginBottom = '0';
        // }, 2000);
      });
    },
    //编码标准化列表的无缝轮播
    standardListAnimate() {
      this.animateUp = true;
      setTimeout(() => {
        this.standardList.push(this.standardList[0]);
        this.standardList.shift();
        this.animateUp = false
      }, 500)
    },
    // 对象数组排序方法
    compare(prop) {
      return function (obj1, obj2) {
        var val1 = obj1[prop];
        var val2 = obj2[prop];
        if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
          val1 = Number(val1);
          val2 = Number(val2);
        }
        if (val1 > val2) {
          return -1;
        } else if (val1 < val2) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  },
  destroyed() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    clearInterval(this.timer);
    clearInterval(this.timer4);
  },
};
</script>

<style scoped lang="less">
.monTwo {
  position: fixed;
  top: 0%;
  width: 100%;
  height: 100%;
  color: #fff;
  background: url(../../assets/dataOperation/jiankong02.png) no-repeat;
  background-size: 100% 100%;
  // 运行轨迹图 共2张 5秒一张
  .img1 {
    position: absolute;
    top:0;
    left:0;
    width: 71.875%;
    height:100%;
  }
  .img2 {
    position: absolute;
    top:0;
    left:0;
    width: 71.875%;
    height:100%;
  }
  // 问题反馈
  .problem {
    position: absolute;
    width: 16.7%;
    height: 3%;
    // background-color: #ccc;
    top: 22.6%;
    left: 7.3%;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size:1.375rem;  // 设计稿原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(254,254,255,1);
  }
  // 左边的数据项
  .leftData {
    position: absolute;
    top: 29.3%;
    left: 2.6%;
    width: 9.4%;
    height: 56.8%;
    padding: 0.5rem;
    overflow: hidden;
    transition: all 0.5s;
    .box {
      width: 100%;
      height: 10.7%;
      // height: 10.7%;
      margin-bottom: 0.5rem;
      padding:0rem 0.5rem;
      background: url(../../assets/bgBox.png) no-repeat center;
      background-size: 100% 100%;
      cursor: default;
      display: flex;
      align-items: center;
      font-size:1.0625rem;  // 设计稿原尺寸
      // justify-content: center;
      span:nth-child(1) {
        display: inline-block;
        width:50%;
        font-family:SOURCEHANSANSCN-MEDIUM;
        font-weight:500;
        color:rgba(254,254,255,1);
      }
      span:nth-child(2) {
        font-family: Digital-7Mono;
        font-size: 1.25rem;
        font-weight:500;
        color:rgba(0,255,255,1);
      }
    }
  }
  // 左边的数据项的动画
  .animate-up {
      transition: all 0.5s ease-in-out;
      transform: translateY(-110%);
    }
  .management,
  .storage,
  .version {
    position: absolute;
    left: 4.85%;
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color:#ccc;
    font-size:1.625rem; // 设计原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(254,254,255,1);
  }
  // 来源管理
  .management {
    width:7.7083%;
    height: 5.9444%;
    top: 36%;
    text-shadow:0px 0px 8px rgba(254,254,255,1);
  }
  // 采集入库
  .storage {
    width: 7.8072%;
    height: 12.018%;
    top: 49%;
    text-shadow:0px 0px 10px rgba(254,254,255,1);
  }
  // 版本管理
  .version {
    width:7.7083%;
    height: 6.3%;
    top: 68%;
    text-shadow:0px 0px 8px rgba(254,254,255,1);
  }
  // 内容验证
  .content {
    width: 1.291%;
    height: 15.833%;
    position: absolute;
    top: 47%;
    left: 15%;
    font-size: 1.625rem;  // 设计图原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(255,255,255,1);
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    text-shadow:0px 0px 8px rgba(254,254,255,1);
  }
  .empty,
  .repeat,
  .format,
  .code{
    position: absolute;
    left: 20.1%;
    width: 8.4895%;
    height: 4.35185%;
    // font-size: 80%;
    font-size: 1.0625rem;  // 原设计尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(254,254,255,1);
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 为空验证
  .empty {
    top: 38.5%;
  }
  // 重复验证
  .repeat {
    top: 48%;
  }
  // 格式验证
  .format {
    top: 57.5%;
  }
  // 编码
  .code {
    top: 67%;
  }
  // 参考数据
  .reference {
    position: absolute;
    top: 49.3%;
    left: 32.35%;
    width: 7.7%;
    height: 12.018%;
    // background-color: #ccc;
    font-size:1.625rem;  // 设计稿原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(255,255,255,1);
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    text-shadow:0px 0px 15px rgba(254,254,255,1);
  }
  // 编码映射
  .standardCoding {
    position: absolute;
    top: 18.8%;
    left: 42%;
    width: 25.9%;
    height: 71.1%;
    padding: 0.41611% 0.3816%;
    .title {
      width: 100%;
      height: 4%;
      font-size:1.375rem; // 设计图原尺寸
      font-family: SOURCEHANSANSCN-MEDIUM;
      font-weight: 500;
      color: rgba(0, 228, 255, 1);
      padding-left: 1%;
      // background-color: #fff;
      // border-left: 3px solid rgba(253,183,47,1);
      margin-bottom: 3%;
      cursor: default;
      display: flex;
      align-items: center;
      .leftBorder{
        width: 1.42%;
        height: 90%;
        background: rgba(253,183,47,1);
        border-radius: 3px;
        margin-right: 2%;
      }
    }
    .topBox {
      width: 100%;
      height: 94%;
      overflow: hidden;
      transition: all 0.5s;
      .numBox {
        width: 100%;
        height: 13%;
        margin-bottom: 2%;
        padding-left: 1%;
        background: url(../../assets/bgBox.png) no-repeat center;
        background-size: 100% 100%;
        cursor: default;
        display: flex;
        align-items: center;
        // justify-content: center;
        font-family:SOURCEHANSANSCN-MEDIUM;
        font-weight:500;
        color:rgba(254,254,255,1);
        font-size:1.0625rem;
        /*span:nth-child(1) {*/
          /*display: inline-block;*/
          /*width: 35%;*/
        /*}*/
        span:nth-child(2) {
          width: 35%;
           // 设计稿原尺寸
          font-size: 1.25rem;
        }
        span:nth-child(3) {
          font-size:1.25rem; // 设计稿原尺寸
          width: 8%;
        }
        span:nth-child(4) {
          font-size: 1.25rem; // 设计稿原尺寸
          width: 5%;
        }
        span:nth-child(5) {
          font-size:1.25rem; // 设计稿原尺寸
          margin-left: 2%;
        }
      }
      .codeIcon {
        width: 71px;
        height: 71px;
        background: url(../../assets/dataOperation/zhengfujigou.png) no-repeat;
        background-size: 100% 100%;
      }
      .codeSpanText {
        color: #00FFFF;
        font-family: Digital-7Mono;
      }
    }
    .bottomBox {
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 100%;
      height: 6%;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family:SOURCEHANSANSCN-MEDIUM;
      font-size: 1.375rem;// 设计稿原尺寸
      font-family:SOURCEHANSANSCN-MEDIUM;
      font-weight:500;
      color:rgba(253,183,47,1);
    }
  }

  // 标准编码服务库标题
  .codeServeTitle {
    position: absolute;
    top: 65%;
    left: 62.5%;
    width: 10.69791%;
    height: 2.1296%;
    // background-color: #ccc;
    font-size:1.5rem;  // 设计稿原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(254,254,255,1);
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .codingMapping {
    position: absolute;
    top: 46.994%;
    left: 64.2%;
    text-align: right;
    width: 6.62626%;
    height: 13.648%;
    font-size:1.5rem;  // 设计稿原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:bold;
    color:rgba(254,254,255,1);
    display: flex;
    // align-items: center;
    justify-content: center;
    flex-direction:column;
    cursor: default;
    div:first-child{
      text-align: center;
    }
  }
  // 最右侧数据
  .rightInfo {
    position: absolute;
    top: 18.9074%;
    right: 4.5%;
    width: 25.76041%;
    height: 70.86%;
    padding: 0.55%;
    display:flex;
    flex-direction:column;

    // 标准编码服务对象
    .standardData {
      width: 100%;
      height: 35%;

      /*flex: 1;*/
      /*margin-bottom: 2%;*/
      .title {
        width: 100%;
        height: 9.28%;
        font-size: 1.375rem; // 设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(0, 228, 255, 1);
        padding-left: 1%;
        margin-bottom: 2%;
        cursor: default;
        display: flex;
        align-items: center;
        .leftBorder{
          width: 1.32%;
          height: 90.98%;
          background:rgba(253,183,47,1);
          border-radius:3px;
          margin-right: 2%;
        }
      }
      .rightIcon {
        position: relative;
        width: 100%;
        height: 100%;
        .icon_single {
          width: 4.4375rem;
          height: 4.4375rem;
          background: url(../../assets/dataOperation/renkou_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label span {
          margin-left: 11%;
        }
        .icon_single2 {
          width: 71px;
          height: 71px;
          background: url(../../assets/dataOperation/faren_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label2 span {
          margin-left: 12%;
        }
        .icon_single3 {
          width: 71px;
          height: 71px;
          background: url(../../assets/dataOperation/jifang_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label3 span {
          margin-left: 3%;
        }
        .icon_single4 {
          width: 71px;
          height: 71px;
          background: url(../../assets/dataOperation/guanai_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label4 span {
          margin-left: 18%;
        }
        .icon_single5 {
          width: 71px;
          height: 71px;
          background: url(../../assets/dataOperation/xinyong_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label5 span {
          margin-left: 33%;
        }
        .icon_single6 {
           width: 71px;
           height: 71px;
           background: url(../../assets/dataOperation/xichengjiayuan_icon.png) no-repeat center;
           background-size: 100% 100%;
           margin-left: 15%;
         }
        .label6 span {
          margin-left: 18%;
        }
        .icon_single7 {
          width: 71px;
          height: 71px;
          background: url(../../assets/dataOperation/pinganxiaoqu_icon.png) no-repeat center;
          background-size: 100% 100%;
          margin-left: 15%;
        }
        .label7 {
          width: 130%;
          span {
            margin-left: -10%;
          }
        }

        span {
          font-size: 1rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FEFEFF;
          line-height: 16px;
        }
      }
      #echarts {
        width: 100%;
        height: 85%;
        .box {
          // flex: 1;
          height: 12.2%;
          width: 100%;
          margin-bottom: 1%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:1rem; // 设计稿原尺寸
          font-family:SOURCEHANSANSCN-MEDIUM;
          font-weight:500;
          color:rgba(255,255,255,1);
          cursor: default;
          span:first-child {
            margin-right: 1%;
            display: inline-block;
            width: 48%;
            text-align: right !important;
          }
          span:nth-child(2) {
            display: inline-block;
            width: 38%;
            height: 42%;
              background:rgba(13,34,83,1);
            border-radius: 3px;
            display: flex;
            align-items: center;
            div {
              width: 0%;
              height: 80%;
              transition: width 1s ease-in-out;
              background: linear-gradient(-90deg, rgba(0, 244, 255, 1), rgba(15, 40, 91, 1));
              border-radius:3px;
            }
          }
          span:nth-child(3) {
            display: inline-block;
            width: 23%;
            margin-left:2%;
            text-align: left;
          }
        }
      }
    }
    // 标准编码映射情况
    .keyCoding {
      width: 100%;
      height: 66%;
      // flex: 1;
      margin-top: 1%;
      margin-bottom: 1%;
      .box {
        width: 100%;
        height: 85%;
        /deep/  .el-table, .el-table__expanded-cell {
          background-color: transparent;
        }
        /deep/ .el-table th {
          background: rgba(2, 34, 107, 0.8)!important;
          font-size: 0.875rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #FDB72F;
          border: none;
        }
        /deep/ .el-table tr {
          background-color: transparent;
        }
        /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{
          background-color: transparent;
          font-size: 1rem;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #FFFFFF;
          border: none;
        }
        /deep/ .el-table td, .el-table th.is-leaf {
          border: none;
          color: #FFFFFF;
          font-size: 1rem;
        }

        /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
          background-color: #7a5d26;
        }

        /deep/ .el-table__body-wrapper {
          /*margin-top: 47px;*/
          /*height: 380px;*/
          /*overflow-y: hidden;*/
        }
      }
      .el-table::before {//去除底部白线
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
      }
      .title {
        width: 100%;
        height: 7%;
        font-size: 1.375rem; // 设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(0, 228, 255, 1);
        padding-left: 1%;
        // background-color: #fff;
        // border-left: 3px solid rgba(253,183,47,1);
        margin-bottom: 2%;
        cursor: default;
        display: flex;
        align-items: center;
        .leftBorder{
          width: 1.32%;
          height: 90.98%;
          background:rgba(253,183,47,1);
          border-radius:3px;
          margin-right: 2%;
        }
      }
    }
    // 已完成编码标准化列表
    .codingStandard {
      width: 100%;
      // flex: 1;
      height: 33%;
      .box {
        width: 100%;
        height: 85%;
        overflow: hidden;
        transition: all 0.5s;
        div {
          width: 100%;
          height:22%;
          margin-bottom: 2%;
          padding-left: 5%;
          text-align: left;
          border-radius: 3px;
          font-size:1.125rem;   // 设计稿原尺寸
          font-family:SOURCEHANSANSCN-MEDIUM;
          font-weight:500;
          color:rgba(255,255,255,1);
          background: rgba(101, 223, 224, 0.2);
          cursor: default;
          // font-size: 80%;
          display: flex;
          align-items: center;
          // justify-content: center;
        }
      }
    }
  }
  .standard,
  .missingBid,
  .probe,
  .handle,
  .mark {
    position: absolute;
    top: 77.9555%;
    width: 7.7083%;
    height: 8.2407%;
    // background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;
    font-size:1.375rem; // 设计稿原尺寸
    font-family:SOURCEHANSANSCN-MEDIUM;
    font-weight:500;
    color:rgba(0,255,234,1);
    cursor: default;
    .icon {
      width: 20%;
      height: 30%;
      margin-bottom: 6%;
    }
  }
  // 标准准备
  .standard {
    left: 2.87%;
    .icon {
      background: url(../../assets/bz.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  // 缺标
  .missingBid {
    left: 15.7416%;
    .icon {
      background: url(../../assets/qb.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  // 标准探针
  .probe {
    left: 28.6925%;
    .icon {
      background: url(../../assets/tz.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  // 采集与处理
  .handle {
    left: 41.55625%;
    .icon {
      background: url(../../assets/cj.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  // 成标发布
  .mark {
    left: 54.553%;
    .icon {
      background: url(../../assets/fb.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  // 蓝色
  .blue {
    color: rgba(0, 255, 234, 1);
    font-family: Digital-7Mono;
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
  .canvasBox{
    >canvas{
      position: absolute;
    }
    /*#canvas1{*/
      /*top: 25.2%;*/
      /*left: 7.1%;*/
    /*}*/
    /*#canvas2{*/
      /*top: 55.1%;*/
      /*left: 12%;*/
    /*}*/
    #canvas3{
      top: 54.7%;
      left: 13%;
    }
    #canvas4{
      top: 40.5%;
      left: 17.25%;
    }
    #canvas5{
      top: 40.2%;
      left: 29.5%;
    }
    #canvas6{
      top: 54.9%;
      left: 46%;
    }
  }
</style>
<style>
  .el-table .warning-row {
    background: rgba(2, 34, 107, 0.8)!important;
    /*background: #F3F9FF;*/
  }

  .el-table .checking-row {
    background: rgba(255, 155, 0, 0.6)!important;
  }
</style>
