<template>
  <div class="monOne">
    <div>
      <!-- 数据总量 -->
      <div class="totalData">
        <div style="font-size: 1.5rem;">数据总量</div>
        <div style="font-size: 1.2rem;"><span class="blue animated fadeIn" style="font-size: 1.6875rem;">{{ dataZong}}</span>条</div>
      </div>
      <!-- 数据标准化 -->
      <div class="dataClean">数据<br />清洗</div>
      <div class="dataOptimization">数据<br />优化</div>
      <div class="dataSpecification">数据<br />规范</div>
      <!-- 数据清洗 -->
      <div v-for="(item,index) in clean" :key="index+'_clean'">
        <div :class="'dataClean'+index +' dirtyData'">
          <div>{{ item.type || "" }}</div>
          <div class="tiao"><span class="blue animated fadeIn">{{item.amount}}</span>条</div>
        </div>
      </div>
      <!-- 数据优化 -->
      <div v-for="(item,index) in optimization" :key="index +'_optimization'">
        <div :class="'dataOptimization'+index +' dirtyData'">
          <div>{{ item.type || "" }}</div>
          <div class="tiao"><span class="blue animated fadeIn">{{item.amount}}</span><span >条</span></div>
        </div>
      </div>
      <!-- 数据规范 -->
      <div v-for="(item,index) in Standard" :key="index +'_standard'">
        <div :class="'dataSpecification'+index +' dirtyData'">
          <div>{{ item.type || "" }}</div>
          <div class="tiao"><span class="blue animated fadeIn">{{item.amount}}</span><span>条</span></div>
        </div>
      </div>
      <!-- 数据关联融合 -->
      <div class="entityFusion">
        <!-- 多表合一后 -->
        <div>{{ entityFusion.type || "" }}</div>
        <!-- style="font-size:26px;" -->
        <div class="tiao"><span class="blue animated fadeIn" >{{ entityFusion.amount }}</span><span>条</span></div>
      </div>
      <div class="dataAssociation" style="text-align: center;">
        <div>关联<div>融合</div>
        </div>
      </div>
      <div class="dtaCollision">
        <!-- 多表合一前 -->
        <div>{{ dtaCollision.type || ""  }}</div>
        <!-- style="font-size:26px;" -->
        <div class="tiao"><span class="blue animated fadeIn" >{{ dtaCollision.amount }}</span><span>条</span></div>
      </div>
      <div class="service">
        <el-carousel direction="vertical" :autoplay="true" :interval="5000" @change="getUnitLine">
          <el-carousel-item v-for="(item,index) in unitInfo" :key="index">
            <div class="serviceItem">
              <div class="serviceTable">
                <table>
                  <tr>
                    <th>牵头单位：</th>
                    <td>{{ item.leadingUnit }}</td>
                  </tr>
                  <tr>
                    <th>应&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用：</th>
                    <td>{{ item.application }}</td>
                  </tr>
                  <tr>
                    <th>服务方式：</th>
                    <td>{{ item.serviceMode }}</td>
                  </tr>
                  <tr>
                    <th>基&nbsp;&nbsp;础&nbsp;库：</th>
                    <td>{{ item.basicLibrary }}</td>
                  </tr>
                  <tr>
                    <th>服务内容：</th>
                    <td>{{ item.serviceContent }}</td>
                  </tr>
                </table>
              </div>
              <div class="serviceSpan">
                 <span class="spanLabel">
                  累计调用次数：<span class="spanNum">{{ item.ljdycs }}</span>
                </span>
              </div>
              <div id="serviceEcharts">
                <div class="line">
                  <div id="lineChart" class="unitLine" ref="lineChart"></div>
                </div>
              </div>
              <div class="serviceInfo" v-bind:class="showAll ? 'showAll' : 'text-ellipse'"
                   @mouseover="showAll = !showAll"
                   @mouseout="showAll = !showAll"
              >
                <span>
                  应用成效：
                  <span class="info" style="font-size: 1rem; color: #ffffff;">
                    {{ item.applicatEffect }}
                  </span>
                </span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>
    <!-- 移动的原点 -->
    <div class="canvasBox">
      <!-- 从左向右 从上到下 -->
      <canvas id="canvas1" :width="0.0235 * width" :height="0.245 * height"></canvas>
      <canvas id="canvas2" :width="0.02 * width" :height="0.118 * height"></canvas>
      <canvas id="canvas3" :width="0.02 * width" :height="0.125 * height"></canvas>
      <canvas id="canvas4" :width="0.033 * width" :height="0.075 * height"></canvas>
      <canvas id="canvas5" :width="0.033 * width" :height="0.075 * height"></canvas>
      <canvas id="canvas6" :width="0.0335 * width" :height="0.076 * height"></canvas>
      <canvas id="canvas7" :width="0.215 * width" :height="0.345 * height"></canvas>
      <canvas id="canvas8" :width="0.0125 * width" :height="0.0275 * height"></canvas>
      <canvas id="canvas9" :width="0.0125 * width" :height="0.0275 * height"></canvas>
      <canvas id="canvas10" :width="0.095 * width" :height="0.2515 * height"></canvas>
    </div>
    <!-- pdf 弹出框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" :append-to-body="true" class="pdf">
      <div>
        <pdf v-for="i in numPages" :key="i" ref="myPdfComponent" :src="pdfUrl" :page="i" style="display: block; width: 100%; height: 100%; margin: 0 auto;" />
      </div>
    </el-dialog>
    <!-- 更新时间 -->
    <footerTime :isExplain="true" :screenId="3" />
  </div>
</template>

<script>
  import footerTime from "../footerTime";
  import {getCircle, verticalMoveCircle, levelMoveCircle, curveMoveCircle1, curveMoveCircle2, changeNumCircle1, changeNumCircle2} from "../../common/js/circleCanvas.js";
  import pdf from 'vue-pdf';
  import Vue from 'vue'
  import {
    standard,
    basis,
    getPdf,
    server,
    getUnitInfos
  } from '../../api/dataOperation.js'
  export default {
    components: {
      pdf,
      footerTime
    },
    data() {
      return {
        //折线颜色数组
        lineColor:["#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05","#09ce0b","#015bff","#ffab05"],
        //折线下面积渐变颜色
        linearColor:[{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"},{"top":"#046c19","bot":"#081924"},{"top":"#03367b","bot":"#071130"},{"top":"#75692b","bot":"#161827"}],
        // 弹出框
        pop: false,
        // 数据标准化
        dataStandardization: [],
        // 数据总量
        dataZong: '',
        // 数据治理基础库
        baseLibrary: [],
        // 数据治理服务库
        serviceLibrary: [],
        // 数据治理服务库动画
        animate: false,
        animateUp: false,
        timer: null,
        //pdf 放大系数
        scale: 100,
        // PDF预览
        pdfUrl: "",
        numPages: 0,
        dialogVisible: false,
        title: '',
        // 数据清洗
        clean: [],
        // 数据优化
        optimization: [],
        // 数据规范
        Standard: [],
        // 数据关联融合
        fuse: [],
        entityFusion: {
          type: "多表合一后",
          amount: 0
        },
        dtaCollision: {
          type: "多表合一前",
          amount: 0
        },
        unitInfo: [],
        itemLine: {},
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        // 是否符框
        showAll: false
      };
    },
    created() {
      this.getStandard();
      this.getBasis();
      this.getServer();
      this.getUnitInfos();
    },
    methods: {
      init() {
        // 轮播和动画
        this.timer = setInterval(this.scrollAnimate, 3000);

        let r = 4;
        let canvas1 = getCircle("canvas1", r, document.getElementById("canvas1").getAttribute("height") - (r+2));
        curveMoveCircle1(canvas1);

        let canvas2 = getCircle("canvas2", document.getElementById("canvas2").getAttribute("width")/2, r);
        verticalMoveCircle(canvas2);
        let canvas3 = getCircle("canvas3", document.getElementById("canvas3").getAttribute("width")/2, r);
        verticalMoveCircle(canvas3);

        let canvas4 = getCircle("canvas4", r, document.getElementById("canvas4").getAttribute("height")/2);
        // changeNumCircle1(canvas4);
        changeNumCircle2(canvas4);

        let canvas5 = getCircle("canvas5", r, document.getElementById("canvas5").getAttribute("height")/2);
        changeNumCircle2(canvas5);
        let canvas6 = getCircle("canvas6", r, document.getElementById("canvas6").getAttribute("height")/2);
        changeNumCircle2(canvas6);

        let canvas7 = getCircle("canvas7", r+4, document.getElementById("canvas7").getAttribute("height") * 0.895);
        curveMoveCircle2(canvas7);

        let canvas8 = getCircle("canvas8", document.getElementById("canvas8").getAttribute("width")/2, document.getElementById("canvas7").getAttribute("height") - r);
        verticalMoveCircle(canvas8, "toUp");
        let canvas9 = getCircle("canvas9", document.getElementById("canvas9").getAttribute("width")/2, document.getElementById("canvas7").getAttribute("height") - r);
        verticalMoveCircle(canvas9, "toUp");
        let canvas10 = getCircle("canvas10", r, document.getElementById("canvas10").getAttribute("height")/2.1);
        changeNumCircle2(canvas10);
        // levelMoveCircle(canvas10);

        window.addEventListener("resize",() => {
          this.width = document.documentElement.clientWidth;
          this.height = document.documentElement.clientHeight;
        });
      },
      //数据标准化
      getStandard() {
        standard().then((res) => {
          if (res.code === 200) {
            // 总数据
            this.dataZong = res.data.dataAmount;
            // 数据清洗
            this.clean = res.data.clean;
            // 数据优化
            this.optimization = res.data.optimization;
            // 数据规范
            this.Standard = res.data.standard;
            // 数据关联融合
            this.fuse = res.data.fuse;
            if (this.fuse != null && this.fuse !== undefined && this.fuse.length > 1) {
              this.entityFusion = this.fuse[1];
              this.dtaCollision = this.fuse[0];
            }
          }
        })
      },
      //基础数据
      getBasis() {
        basis().then((data) => {
          if (data.code == "200") {
        var arr = data.data
        for(var i = 0;i<arr.length;i++) {
          if(arr[i].type=="人口数据"){
           var c = {};
           c = arr[0];
           arr[0] = arr [i];
           arr[i] = c
          }else if(arr[i].type=="法人数据"){
            var c = {};
            c = arr[1];
            arr[1] = arr [i];
            arr[i] = c
          }
        }
            this.baseLibrary = arr
      
          }
        })
      },
      // 服务库数据
      getServer() {
        server().then((data) => {
          if (data.code == "200") {
            this.serviceLibrary = data.data
          }
        })
      },
      // 数据治理服务库的无缝轮播
      scrollAnimate() {
        this.animateUp = true;
        setTimeout(() => {
          this.serviceLibrary.shift();
          this.serviceLibrary.push(this.serviceLibrary[0]);
          this.animateUp = false
        }, 500)
      },
      // 点击打开pdf
      openPdf(type) {
        if (type == "人口数据" || type == "法人数据") {
          if (type == "人口数据") {
            getPdf({
              type: '人口数据'
            }).then((data) => {
              let self = this;
              var loadingTask = pdf.createLoadingTask(data.data[0].url);
        // 弹框显示
        this.dialogVisible = true;
        this.title = "人口数据加工流程";
              loadingTask.then(pdf => {
                self.pdfUrl = loadingTask;
                self.numPages = pdf.numPages
              }).catch((err) => {
                console.error('pdf加载失败')
              })
            })
          } else {
            getPdf({
              type: '法人数据'
            }).then((data) => {
              var loadingTask = pdf.createLoadingTask(data.data[0].url);
        this.title = "法人数据加工流程";
        // 弹框显示
        this.dialogVisible = true;
              loadingTask.then(pdf => {
                self.pdfUrl = loadingTask
                self.numPages = pdf.numPages
              }).catch((err) => {
                console.error('pdf加载失败')
              })
            })
          }
        }
      },
      // 右侧部分-折线图
      getLineChart(index){
        let vm = this;
        setTimeout(() => {
          let lineChartDom = document.getElementsByClassName("unitLine")[index];
          //重要：给元素设置宽度
          // let lineChartDom = document.getElementsByClassName("line")[0];
          let lineChart = this.$echarts.init(lineChartDom);

          // lineChart.dispose();
          let option = {
            grid:{
              top:"5%",
              bottom:"15%",
              right:'10%',
              left:"10%",
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
              data: this.itemLine.month,
              axisTick:{
                show:false
              },
              axisLabel:{
                color:"rgba(255,255,255,1)",
                fontSize:12,
                interval: 0
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
              data: this.itemLine.data,
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
          lineChart.setOption(option, true);
          lineChart.resize();
        }, 0)

      },

      // 右侧单位信息
      getUnitInfos() {
        getUnitInfos().then(res => {
          if(res.code == 200) {
            this.unitInfo = res.data;
            this.getUnitLine(0)
          }
        })
      },

      getUnitLine(index) {
        let dataUpdateCondition = this.unitInfo[index].dataUpdateCondition;
        let dataVal = [];
        let monthVal = [];
        for (let i = 0; i < dataUpdateCondition.length; i++) {
          let item = dataUpdateCondition[i];
          dataVal.push(item.dataUpdate);
          monthVal.push(item.dateId)
        }
        this.itemLine.data = dataVal;
        this.itemLine.month = monthVal;
        // vm.$echarts.init(document.getElementById("lineChart")).dispose();
        this.getLineChart(index);
      }
    },
    mounted() {
      // this.init();
      // 轮播和动画
      this.timer = setInterval(this.scrollAnimate, 3000);

      let r = 4;
      let canvas1 = getCircle("canvas1", r, document.getElementById("canvas1").getAttribute("height") - (r+2));
      curveMoveCircle1(canvas1);

      let canvas2 = getCircle("canvas2", document.getElementById("canvas2").getAttribute("width")/2, r);
      verticalMoveCircle(canvas2);
      let canvas3 = getCircle("canvas3", document.getElementById("canvas3").getAttribute("width")/2, r);
      verticalMoveCircle(canvas3);

      let canvas4 = getCircle("canvas4", r, document.getElementById("canvas4").getAttribute("height")/2);
      // changeNumCircle1(canvas4);
      changeNumCircle2(canvas4);

      let canvas5 = getCircle("canvas5", r, document.getElementById("canvas5").getAttribute("height")/2);
      changeNumCircle2(canvas5);
      let canvas6 = getCircle("canvas6", r, document.getElementById("canvas6").getAttribute("height")/2);
      changeNumCircle2(canvas6);

      let canvas7 = getCircle("canvas7", r+4, document.getElementById("canvas7").getAttribute("height") * 0.895);
      curveMoveCircle2(canvas7);

      let canvas8 = getCircle("canvas8", document.getElementById("canvas8").getAttribute("width")/2, document.getElementById("canvas7").getAttribute("height") - r);
      verticalMoveCircle(canvas8, "toUp");
      let canvas9 = getCircle("canvas9", document.getElementById("canvas9").getAttribute("width")/2, document.getElementById("canvas7").getAttribute("height") - r);
      verticalMoveCircle(canvas9, "toUp");
      let canvas10 = getCircle("canvas10", r, document.getElementById("canvas10").getAttribute("height")/2.1);
      changeNumCircle2(canvas10);
      // levelMoveCircle(canvas10);

      window.addEventListener("resize",() => {
          this.width = document.documentElement.clientWidth;
          this.height = document.documentElement.clientHeight;
      });
      // this.getLineChart();
    },
    destroyed() {
      clearInterval(this.timer)
    },
  }
</script>

<style scoped lang="less">
  .monOne {
    position: fixed;
    top: 0%;
    width: 100%;
    height: 100%;
    color: #fff;
    background: url(../../assets/dataOperation/jiankong01.png) no-repeat center;
    background-size: 100% 100%;

      // 运行轨迹图 共四张 5秒一张
      img {
        width: 100%;
        height: 100%;
      }

      // 数据总量
      .totalData {
        position: absolute;
        top: 43.24%;
        left: 6.8%;
        font-size: 1.5rem; // 设计图尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: bold;
        color: rgba(254, 254, 255, 1);
        width: 8.734%;
        height: 13.3333%;
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .dataClean,
      .dataOptimization,
      .dataSpecification {
        position: absolute;
        left: 18.8%;
        cursor: default;
        width: 7.7828%;
        height: 12.055%;
        font-size:1.875rem;  // 设计图尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
        text-shadow: 0px 0px 10px rgba(254, 254, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      // 数据清洗
      .dataClean {
        top: 21.5%;
      }

      // 数据优化
      .dataOptimization {
        top: 45%;
      }

      // 数据规范
      .dataSpecification {
        top: 69.5%;
      }

      // 数据项
      .dirtyData,
      .defectData,
      .repeatData,
      .dataDackfill,
      .problemCorrection,
      .company,
      .code {
        width: 10.0520%;
        height: 4.9074%;
        position: absolute;
        left: 29.8358%;
        // font-size: 80%;
        font-size: 1rem; // 设计图尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 0.2%;
      }

      // 脏数据
      .dataClean0 {
        top: 21.45%;
      }

      // 缺失数据
      .dataClean1 {
        top: 28.15%;
      }

      // 重复数据
      .dataClean2 {
        top: 33.9911%;
      }

      // 数据回填
      .dataOptimization0 {
        top: 45.25%;
      }

      // 问题修正
      .dataOptimization1 {
        top: 51.8%;
      }


      // 单位统一
      .dataSpecification0 {
        top: 69.9%;
      }

      // 编码统一
      .dataSpecification1 {
        top: 76.25%;
      }

      // 数据关联融合
      .entityFusion,
      .dataAssociation,
      .dtaCollision {
        position: absolute;
        left: 42.941%;
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-family: SOURCEHANSANSCN-MEDIUM;
      }

      // 多表合一后关联
      .entityFusion {
        width: 10.052%;
        height: 7.5%;
        top: 35.53%;
        left: 41%;
        font-size:1.125rem; //  设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
      }

      // 数据关联融合
      .dataAssociation {
        width: 7.7604%;
        height: 12.0185%;
        left: 44.041%;
        top: 45.625%;
        font-size:1.625rem;  // 设计图尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
        text-shadow: 0px 0px 10px rgba(254, 254, 255, 1);
      }

      // 多表合一前
      .dtaCollision {
        width: 10.052%;
        height: 7.5%;
        top: 60.318%;
        left: 41%;
        font-size:1.125rem; //  设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
      }

      // 数据治理基础库
      .basics {
        width: 12.968%;
        height: 63.796%;
        padding-top: 1.08330%;
        padding-bottom: 0.18330%;
        position: absolute;
        left: 57.083%;
        top: 21.851%;
        display: flex;
        flex-direction: column;
        .explain{
          color: #12C2FF;
        }

        .dataBox {
          flex: 1;
          width: 87.14859%;
          height: 18.62616%;
          // height: 18%;
          padding-bottom: 9.738%;
          margin-left: 6.8273%;
          cursor: pointer;

          .dataBoxNum {
            width: 100%;
            height: 74.766%;
            font-size:1.5rem; // 设计原尺寸
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;
            color: rgba(254, 254, 255, 1);
            background: url(../../assets/bgBox.png) no-repeat center;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .cursor {
        cursor: default;
      }

      // 右箭头
      .arrow {
        position: absolute;
        top: 50.5555%;
        left: 71.6145%;
        width: 3.38541%;
        height: 3.9814%;
        background: url(../../assets/arrowheads.gif) no-repeat center;
        background-size: 100% 100%;
      }

      // 数据治理服务库
      .service {
        position: absolute;
        top: 19.2222%;
        /*left: 76.354%;*/
        right: 4.635%;
        width: 22.657%;
        height: 69.1%;
        padding-top: 0.38330%;
        padding-left: 0.88330%;
        padding-right: 0.88330%;

        /deep/ .el-carousel {
          height: 100%;
          width: 100%;
        }
        /deep/ .el-carousel__item {
          height: 100%;
          width: 100%;
          .serviceItem {
            width: 100%;
            height: 100%;
            position: relative;
            background: url(../../assets/dataOperation/leftbg.png) no-repeat center;
            background-size: 100% 100%;
            .serviceTable {
              position: relative;
              width: 90%;
              margin-left: 5%;
              top: 2%;
              table {
                font-size: 1.25rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                line-height: 2.125rem;
                /*background-color: yellow;*/
                width: 100%;
              }
              th {
                color: #0EF2F6;
                width: 30%;
              }
              td {
                color: #FFFFFF;
                font-size: 1rem;
              }
            }

            .serviceSpan {
              position: relative;
              width: 90%;
              margin-left: 5%;
              margin-top: 2%;
              /*background-color: yellow;*/
              .spanLabel {
                /*font-size: 1.875rem;*/ //设计稿
                font-size: 1.675rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: #FFFFFF;
              }
              .spanNum {
                // 设计图尺寸
                /*font-size: 3.125rem;*/
                font-size: 3rem;
                font-family: Digital-7Mono;
                font-weight: 400;
                color: #1AF6FA;
              }
            }

            #serviceEcharts {
              position: relative;
              /*width: 90%;*/
              /*height: 25.67%;*/
              width: 22.5625rem;
              height: 10.3125rem;
              margin-left: 5%;

              top: 1.75%;
              .line {
                width: 100%;
                height: 100%;
                #lineChart {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .serviceInfo {
              position: relative;
              width: 90%;
              margin-left: 5%;
              top: 3%;
              height: 9.5375rem;

              line-height: 1.8875rem;
              /*overflow: hidden;  !** 隐藏超出的内容 **!*/
              /*word-break: break-all;*/
              /*text-overflow: ellipsis; !** 多行 **!*/
              /*display: -webkit-box; !** 对象作为伸缩盒子模型显示 **!*/
              /*-webkit-box-orient: vertical; !** 设置或检索伸缩盒对象的子元素的排列方式 **!*/
              /*-webkit-line-clamp: 5; !** 显示的行数 **!*/
              /*margin-bottom: -1%;*/
              span:nth-child(1) {
                color: #04FCFF;
                font-size: 1.25rem;
              }
              .info {
                line-height: 1.8875rem;
                color: #FFFFFF;
                font-size: 1rem;
              }
            }

            .text-ellipse {
              overflow: hidden;  /** 隐藏超出的内容 **/
              word-break: break-all;
              text-overflow: ellipsis; /** 多行 **/
              display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
              -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
              -webkit-line-clamp: 5; /** 显示的行数 **/
            }

            .showAll {
              overflow-y: scroll;
            }

            /*css主要部分的样式*/
            /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

            ::-webkit-scrollbar {
              width: 3px; /*对垂直流动条有效*/
              height: 10px; /*对水平流动条有效*/
            }

            /*定义滚动条的轨道颜色、内阴影及圆角*/
            ::-webkit-scrollbar-track{
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
              background-color: rgba(4,252,255, 0.6);
              border-radius: 3px;
            }


            /*定义滑块颜色、内阴影及圆角*/
            ::-webkit-scrollbar-thumb{
              border-radius: 7px;
              -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
              background-color: rgba(4, 252, 255, 1);
            }


            /*定义右下角汇合处的样式*/
            ::-webkit-scrollbar-corner {
              background:khaki;
            }
          }
        }
        /deep/ .el-carousel__container {
          height: 100%;
        }

        /deep/ .el-carousel__button {
          background-color: #04FCFF;
        }

        /*/deep/ .el-carousel__indicators--vertical {*/
          /*left: -3%;*/
          /*!*z-index: -1;*!*/
        /*}*/



        .dataBox {
          width: 100%;
          height: 16.02616%;
          // height: 18%;
          margin-bottom: 8.838%;
          padding-top: 2.58330%;
          cursor: default;

          // position: absolute;
          .dataBoxNum {
            width: 100%;
            height: 80%;
            // font-size:26px;
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;
            color: rgba(254, 254, 255, 1);
            background: url(../../assets/bgBox.png) no-repeat center;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            span:nth-child(1) {}
          }
        }
      }

      // 数据治理基础服务库的动画
      .animate-up {
        transition: all 0.5s ease-in-out;
        transform: translateY(-120%);
      }

      // 四个标题
      .dataPool,
      .dataTitle,
      .dataBaseTitle,
      .dataServiceTitle {
        position: absolute;
        bottom: 7.9629%;
        font-size:1.875rem; // 设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(254, 254, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      // 源数据池
      .dataPool {
        width: 8.734%;
        bottom: 33.44444%;
        left: 6.6375%;
        // background-color: #ccc;
      font-size:1.625rem; // 设计图原尺寸
      }

      // 数据标准化
      .dataTitle {
        width: 18.4375%;
        left: 22.83%;
      }

      // 数据治理基础库
      .dataBaseTitle {
        width: 12.968%;
        left: 56.99625%;
      }

      // 数据治理服务库
      .dataServiceTitle {
        width: 16.458%;
        left: 76.5541%;
      }

      // 字体样式
    .tiao {
      font-size: 1.1rem;
      
    }
      // 蓝色
      .blue {
        color: rgba(0, 255, 234, 1);
        font-size: 1.5rem;
        font-family: Digital-7Mono;
        font-weight: 500;
      
      }

      // 黄色
      .yellow {
        font-size:1.1875rem; // 设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: rgba(253, 183, 47, 1);
        margin-bottom: 1%;
      }

      // 发光
      .faguang {
        color: rgba(254, 254, 255, 1);
      }

      // 灰色
      .huise {
        font-size:1.1875rem; // 设计图原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: #9F9F9F;
        margin-bottom: 1%;
      }
      .huise.cursor {
        font-family: Digital-7Mono;
      }
  }
  .canvasBox{
    >canvas{
      position: absolute;
    }
    #canvas1{
      top: 26.8%;
      left: 16.5%;
    }
    #canvas2{
      top: 32.95%;
      left: 21.65%;
    }
    #canvas3{
      top: 57.35%;
      left: 21.75%;
    }
    #canvas4{
      top: 23.65%;
      left: 26.5%;
    }
    #canvas5{
      top: 47.38%;
      left: 26.5%;
    }
    #canvas6{
      top: 71.8%;
      left: 26.5%;
    }
    #canvas7{
      top: 50.85%;
      left: 22.5%;
    }
    #canvas8{
      top: 42.85%;
      left: 47.3%;
    }
    #canvas9{
      top: 57.7%;
      left: 47.3%;
    }
    #canvas10{
      /*top: 50.65%;*/
      top: 39.55%;
      left: 51.75%;
    }
  }
</style>
<style lang="less">
  .pdf>.el-dialog {
    width: 65%;
    height: 78%;
    overflow: auto;

    .el-dialog__header {
    position: fixed;
    z-index: 99;
      width: 65%;
      height: 5.1632%;
      background: rgba(0, 45, 158, 1);
      padding: 0;
      cursor: default;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
     

      .el-dialog__title {
        font-size:1.875rem; // 设计稿原尺寸
        font-family: SOURCEHANSANSCN-MEDIUM;
        font-weight: 500;
        color: #ffff;
        line-height: 0px;
      }

      .el-dialog__headerbtn {
        position: absolute;
        top: 25%;
        right: 2%;
        padding: 0;

        cursor: pointer;

        .el-dialog__close {
          font-size: 1.375rem;
          color: #fff;
        }
      }
    }

    .el-dialog__body {
      padding: 0;
      margin-top: 1.2632%;
      ;
    }
  }
</style>
