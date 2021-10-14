<template>
  <div class="quality">

    <!-- 数据质量监控主题部分上部 -->
    <div class="top">
      <!-- 四角边框 -->
      <!-- 左上角 -->
      <div class="lt"></div>
      <!-- 右上角 -->
      <div class="rt"></div>
      <!-- 左下角 -->
      <div class="lb"></div>
      <!-- 右下角 -->
      <div class="rb"></div>

      <div class="left">
        <p class="tit">总体情况</p>
        <div>
          <span class="lt"></span><span class="rt"></span><span class="lb"></span><span class="rb"></span>
          <p class="subtitle">稽核规则</p>
          <div class="content">
            <p><span class="num">{{qualityAll.ruleGross}}</span>项</p>
            <div>
              <p>3个月前</p>
              <p class="rate">+{{qualityAll.threeMonthHold}}<i class="fa fa-up"></i></p>
            </div>
          </div>
        </div>
        <div>
          <span class="lt"></span><span class="rt"></span><span class="lb"></span><span class="rb"></span>
          <p class="subtitle">发现问题</p>
          <div class="content">
            <p><span class="num">{{qualityAll.problem}}</span>条</p>
            <div>
              <p>占稽核总量</p>
              <p class="rate">{{qualityAll.holdGross}}</p>
            </div>
          </div>
        </div>
        <div>
          <span class="lt"></span><span class="rt"></span><span class="lb"></span><span class="rb"></span>
          <p class="subtitle">解决问题</p>
          <div class="content">
            <p><span class="num">{{qualityAll.processed}}</span>条</p>
            <div>
              <p>占问题总量</p>
              <p class="rate">{{qualityAll.holdProblem}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <p class="tit">及时性 <span :class="maskFlag?'active_tip':'tip'" @click="showMask()">明细</span></p>
        <div class="mid">
          <div class="mid_box top_box">
            <div class="midbox"><span>TOP</span></div>
            <div class="midbox"><span>数据源</span></div>
            <div class="midbox"><span>最后更新日期</span></div>
          </div>
          <div class="mid_box" v-for="(item,index) in timelyArr" :key="index" v-show="index > 6 ? false : true">
            <div class="midbox"><span>{{index+1}}</span></div>
            <div class="midbox"><span>{{item.dataSource}}</span></div>
            <div class="midbox"><span>{{item.updateTime}}</span></div>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="tit">问题看板</p>
        <div class="selectBar">
          <!-- <div v-for="(item,index) in problemNav" :key="index" :class="mapTreeIndex==index?'active_select_box':'select_box'"
            @click="switchMapTree(index)">{{item}}</div> -->
          <!-- <div class="select_bar"></div> -->
          <!-- 右侧选项栏 -->
                <!-- <div v-for="(item,index) in problemNav" :key="index" :class="mapTreeIndex==index?'active_select_box':'select_box'" @click="switchMapTree(index)">{{item}}</div> -->
                <div :class="mapTreeIndex==0?'active_select_box':'select_box'" @click="switchMapTree(0)">{{problemNav[0]}}</div>
                <div class="select_bar"></div>
                <div :class="mapTreeIndex==1?'active_select_box':'select_box'" @click="switchMapTree(1)">{{problemNav[1]}}</div>
                <div class="select_bar"></div>
                <div :class="mapTreeIndex==2?'active_select_box':'select_box'" @click="switchMapTree(2)">{{problemNav[2]}}</div>
                <div class="select_bar"></div>
                <div :class="mapTreeIndex==3?'active_select_box':'select_box'" @click="switchMapTree(3)">{{problemNav[3]}}</div>
                <div class="select_bar"></div>
                <div :class="mapTreeIndex==4?'active_select_box':'select_box'" @click="switchMapTree(4)">{{problemNav[4]}}</div>
        </div>
        <!-- 矩形树图展示 -->
        <div class="treemap">
          <el-carousel height="100%" arrow="never" :interval="7000" indicator-position="none" @change="mapChange" ref="treemap">
            <el-carousel-item v-for="item in len" :key="item">
              <div class="map"></div>
              <div class="legend">
                <div class="legendBox" v-for="(item,index) in treeLegend" :key="index">
                  <div class="legend_pic" v-bind:style="{background:legendColor[index]}"></div>
                  <div class="legend_word" :title="item">{{item}}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- 下部 -->
    <div class="bot">

      <!-- 下部左侧区域 -->
      <div class="left">

        <!-- 四角边框 -->
        <!-- 左上角 -->
        <div class="lt"></div>
        <!-- 右上角 -->
        <div class="rt"></div>
        <!-- 左下角 -->
        <div class="lb"></div>
        <!-- 右下角 -->
        <div class="rb"></div>

        <!-- 质量提升 -->
        <div class="tit">
          质量提升
        </div>
        <!-- 表格展示 -->
        <div class="tb">
          <div class="tb_head">
            <td class="col1"><span>部门</span></td>
            <td class="col2"><span>问题类型</span></td>
            <td class="col3"><span>问题数量</span></td>
            <td class="col4"><span>源头解决占比</span></td>
            <td class="col5"><span>内部优化占比</span></td>
            <td class="col6"><span>总体质量提升</span></td>
          </div>
          <div class="tb_content">
            <el-carousel height="100%" arrow="never" direction="vertical" :interval="7000" indicator-position="none">
              <el-carousel-item v-for="(item,index) in liftNum" :key="index">
                <tr v-for="(it,idx) in 6" :key="idx" v-if="qualityLift[index*6+idx]?true:false">
                  <td class="col1"><span>{{qualityLift[index*6+idx].department}}</span></td>
                  <td :title="qualityLift[index*6+idx].type" class="col2">
                    <span>{{qualityLift[index*6+idx].type.length > 8 ? qualityLift[index*6+idx].type.substring(0,7) + '...' : qualityLift[index*6+idx].type}}</span>
                  </td>
                  <td class="col3"><span>{{qualityLift[index*6+idx].amount}}</span></td>
                  <td class="col4"><span>{{qualityLift[index*6+idx].sourceHold}}</span></td>
                  <td class="col5"><span>{{qualityLift[index*6+idx].optimizeHold}}</span></td>
                  <td class="col6"><span>{{qualityLift[index*6+idx].qualityPromote}}</span></td>
                </tr>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>

      <!-- 下部右侧展示 -->
      <div class="right">

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
          质量报告
        </div>

        <!-- 轮播图区域 -->
        <div class="content">
          <el-carousel height="100%" arrow="never" :interval="7000">
            <el-carousel-item v-for="(item,index) in reportNum" :key="index">
              <div class="book" v-for="(it,idx) in 3" :key="idx" v-if="qualityReport[index*3+idx]?true:false">
                <div class="box box1">北京市西城区科学技术和信息化局</div>
                <div class="box box2">{{"("+qualityReport[index*3+idx].serverDepartment+")"}}</div>
                <div class="box box3">{{qualityReport[index*3+idx].reportName}}</div>
                <div class="box box4">{{qualityReport[index*3+idx].itemName}}</div>
                <div class="box box5">{{qualityReport[index*3+idx].contractor}}</div>
                <div class="box box6">{{qualityReport[index*3+idx].createTime}}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- 明细弹框 -->
    <div class="mask" v-show="maskFlag" @click.self="closeMask">
      <div class="pop">
        <div class="closeBtn" @click="closeMask"></div>
        <tr class="dataShow_head">
          <td><span>序号</span></td>
          <td><span>数据提供单位</span></td>
          <td><span>表code名称</span></td>
          <td><span>表中文名称</span></td>
          <td><span>数据量/条</span></td>
          <td><span>数据表物理大小/MB</span></td>
          <td><span>最近更新时间</span></td>
        </tr>
        <div class="dataShow">
          <tr v-for="(item,index) in timelyDetail" :key="index">
            <td><span>{{index+1}}</span></td>
            <td><span>{{item.dataSource}}</span></td>
            <td><span>{{item.tableName}}</span></td>
            <td :title="item.tableCname"><span>{{item.tableCname}}</span></td>
            <td><span>{{item.dataAmount}}</span></td>
            <td><span>{{item.tableSize}}</span></td>
            <td><span>{{item.updateTime}}</span></td>
          </tr>
        </div>
      </div>
    </div>
    <!-- 更新时间 -->
    <footerTime :isExplain="true" :screenId="7" />
  </div>
</template>

<script>
  import footerTime from "../footerTime";
  import {
    getQualityAll,
    getTimely,
    getQualityLift,
    getQualityReport,
    getProblem,
    getTimelyDetail
  } from "../../api/dataQuality.js";
  export default {
    components:{
      footerTime
    },
    data() {
      return {
        //点击"明细"弹出列表
        maskFlag: false,
        //图例数组
        legendColor: [
          "rgba(67,94,147,1)",
          "rgba(147,87,61,1)",
          "rgba(105,113,133,1)",
          "rgba(159,128,32,1)",
          "rgba(72,115,71,1)",
          "rgba(26,50,96,1)",
          "rgba(101,58,44,1)",
          "rgba(67,77,103,1)",
          "rgba(28,72,124,1)",
          "rgba(67,104,43,1)",
          "rgba(97,82,33,1)"
        ],
        //矩形树图轮播下标
        mapTreeIndex: 0,
        //获取总体情况对象
        qualityAll: {},
        //获取及时性信息
        timelyArr: [],
        //获取质量提升信息
        qualityLift: [],
        //质量提升页数
        liftNum: 0,
        //获取质量报告
        qualityReport: [],
        //质量报告页数
        reportNum: 0,
        //问题看板导航项数组
        problemNav: [],
        //问题看板返回数据
        problemData: [],
        //问题看板处理树图
        problemTreeMap: [],
        //矩形树图图例
        treeLegend: [],
        //及时性明细
        timelyDetail: [],
        //问题看板总数数组
        totalArr: [],
        //返回问题看板导航数组长度
        len:0
      }
    },
    created() {
      //获取总体情况
      this.getQualityAll();
      //获取及时性数据
      this.getTimely();
      //获取质量提升
      this.getQualityLift();
      //获取质量报告
      this.getQualityReport();
      //获取问题看板
      this.getProblem();
    },
    mounted() {

    },
    methods: {
      //获取总体情况
      getQualityAll() {
        getQualityAll()
          .then(res => {
            this.qualityAll = res.data;
          })
      },
      //获取及时性数据
      getTimely() {
        getTimely()
          .then(res => {
            this.timelyArr = res.data;
          })
      },
      //获取质量提升
      getQualityLift() {
        getQualityLift()
          .then(res => {
            this.qualityLift = res.data;
            this.liftNum = Math.ceil(res.data.length / 6);
          })
      },
      //获取质量报告
      getQualityReport() {
        getQualityReport()
          .then(res => {
            this.qualityReport = res.data;
            this.reportNum = Math.ceil(res.data.length / 3);
            this.$forceUpdate();
          })
      },
      //获取问题看板
      getProblem() {
        getProblem()
          .then(res => {
            this.problemData = res.data;
            let data = res.data;
            let len = data.length;
            let arr = [];
            let totalArr = [];
            for (let i = 0; i < len; i++) {
              let item = data[i];
              arr.push(item.type);
              totalArr.push(item.total);
            }
            this.totalArr = totalArr;
            this.problemNav = arr;
            this.len = this.problemNav.length;
            let vm = this;
            this.$nextTick(function() {
              vm.getTreeMap();
            })
          })
      },
      //获取及时性明细
      getTimelyDetail() {
        getTimelyDetail()
          .then(res => {
            this.timelyDetail = res.data;
          })
      },
      //点击明细时弹出表单
      showMask() {
        this.maskFlag = true;
        this.Observer.$emit("headMask",true);
        this.getTimelyDetail();
      },
      //点击 X 关闭弹框
      closeMask() {
        this.maskFlag = false;
        this.Observer.$emit("headMask",false);
      },
      //问题看板图表展现
      treeMap() {
        let vm = this;
        let mapDom = document.getElementsByClassName("map");
        let index = this.mapTreeIndex;
        let dom = mapDom[index];
        let myChart = this.$echarts.init(dom);
        let option = {
          color: ["rgba(67,94,147,1)", "rgba(147,87,61,1)", "rgba(105,113,133,1)", "rgba(159,128,32,1)",
            "rgba(72,115,71,1)", "rgba(26,50,96,1)", "rgba(101,58,44,1)", "rgba(67,77,103,1)", "rgba(28,72,124,1)",
            "rgba(67,104,43,1)"
          ],
          // legend:{
          //   top:"20%",
          //   right:"10%",
          //   icon:"circle",
          //   orient:"vertical",
          //   align:"left",
          //   padding:10,
          //   data:['市流管办','社会数据','区城管执法监察局','金融街街道','市民政局','市信息资源管理中心','市残联','区政务服务局','什刹海街道','区市场监管局']
          // },
          textStyle: {
            fontFamily: "SOURCEHANSANSCN-MEDIUM",
            fontWeight: "500"
          },
          series: [{
            name: "单位",
            type: 'treemap',
            roam: false,
            nodeClick: false,
            left: "0%",
            top: "0%",
            width: "100%",
            height: "100%",
            breadcrumb: {
              show: false
            },
            label: {
              show: true,
              position: "insideBottomLeft"
            },
            itemStyle: {
              gapWidth: 4,
              borderColor: "transparent"
            },
            data: vm.problemTreeMap
          }],
          tooltip: {
            formatter: function(params) {
              let num = params.data.value;
              let per = vm.getPer(num);
              return params.name + "百分占比:" + per
            }
          }
        }
        myChart.setOption(option);
      },
      //问题看板计算百分比
      getPer(params) {
        let index = this.mapTreeIndex;
        let total = this.totalArr[index];
        let num = params / total * 100;
        let per = num.toFixed(2) + "%";
        return per;
      },
      //幻灯片切换时事件
      mapChange(params) {
        this.mapFlag = false;
        this.mapTreeIndex = params;
        this.getTreeMap();
      },
      //手动切换矩形树图
      switchMapTree(params) {
        this.$refs.treemap.setActiveItem(params);
      },
      //获取矩形树图
      getTreeMap() {
        let vm = this;
        let index = this.mapTreeIndex;
        let item = this.problemData[index].boardAmount;
        let len = item.length;
        let treeArr = [];
        let legendArr = [];
        for (let i = 0; i < len; i++) {
          let data = item[i];
          let obj = {};
          obj.name = data.dataSource;
          obj.value = data.dataAmount;
          legendArr.push(data.dataSource);
          treeArr.push(obj);
        }
        this.treeLegend = legendArr;
        this.problemTreeMap = treeArr;
        this.$nextTick(function() {
          vm.treeMap();
        })
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  // 数据质量监控
  .quality {
    width: 100%;
    height: 100%;
    padding: 1% 2.6% 0;
    position: relative;

    // 标题
    .tit {
      color: rgba(0, 228, 255, 1);
      font-family: SOURCEHANSANSCN-MEDIUM;
      font-size: 1.375rem;
      font-weight: 500;
      padding-left: 1rem;
      position: relative;
      &:before{
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

    // 上半部展示
    .top {
      width: 100%;
      height: 49%;
      padding: 1.25rem;
      padding-right: 3.75rem;
      padding-bottom: 1.5rem;
      background: url(../../assets/bg_shujuzhilixiabian.png);
      background-size: 100% 100%;
      position: relative;
      display: flex;
      justify-content: space-between;
      // 角框
      .lt, .lb, .rt, .rb {
        width: 1.65%;
        height: 6.3%;
      }
      .left, .middle, .right{
        height: 100%;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
      }
      .left{
        width: 18%;
        >div{
          width: 100%;
          height: 26.5%;
          padding: 0 1.75rem;
          background: url("../../assets/bgBox.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
          color: #fff;
          font-family: SOURCEHANSANSCN-REGULAR;
          .lt, .lb, .rt, .rb {
            width: 0.75rem;
            height: 0.75rem;
          }
          .subtitle{
            font-size: 1.25rem;
          }
          .content{
            display: flex;;
            flex-flow: row;
            justify-content: space-between;
            font-size: 1.125rem;
            line-height: 1.5rem;
            text-align: center;
            >p:first-child{
              display: table;
              position: relative;
              top: 50%;
              transform: translateY(-50%);
            }
            .num{
              font-size: 2.75rem;
              font-family: Digital-7Mono;
              color: #1DE7FF;
              padding-right: 0.5rem;
            }
            .rate{
              color: #FDB72F;
            }
            .fa{
              display: inline-block;
              vertical-align: text-bottom;
              width: 0.5rem;
              height: 1.25rem;
              margin-left: 0.25rem;
            }
            .fa-up{
              background: url("../../assets/fa_up.png") no-repeat center center;
            }
          }
        }
      }
      .middle{
        width: 17.3%;
        .tit>span{
          position: absolute;
          top: 50%;
          right: 0rem;
          transform: translateY(-50%);
          padding: 0rem 0.25rem;
          font-size: 1rem;
          border: 1px solid #FDB72F;
          color: #FDB72F;
          font-family: SOURCEHANSANSCN-MEDIUM;
          font-weight: 500;
          cursor: pointer;
        }
        .mid {
          width: 100%;
          height: 87.95%;
          border: 1px solid rgba(0, 255, 255, 0.25);
          background: rgba(0, 252, 255, 0.13);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          .mid_box {
            width: 100%;
            height: 12%;
            display: flex;
            justify-content: space-between;
            color: rgba(255, 255, 255, 1);
            font-size: 0.875rem;
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;

            .midbox {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .midbox:nth-child(1) {
              width: 20%;
            }

            .midbox:nth-child(2) {
              width: 40%;
            }

            .midbox:nth-child(3) {
              width: 40%;
            }
          }

          .top_box {
            color: rgba(29, 231, 255, 1);
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;
            font-size: 1rem;
          }
        }
      }
      .right{
        width: 61.2%;
        .selectBar {
          width: 100%;
          height: 2.625rem;
          background: url(../../assets/bgBox.png) no-repeat;
          background-size: 100% 100%;
          padding: 0 4.62%;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .select_box {
            font-size: 1rem;
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;
            padding: 2px 4px;
            color: rgb(255, 255, 255, 1);
            cursor: pointer;
          }

          .active_select_box {
            font-size: 1rem;
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: 500;
            color: rgba(253, 183, 47, 1);
            cursor: pointer;
            padding: 2px 4px;
            border: 1px solid rgba(253, 183, 47, 1);
          }

          .select_bar {
            width: 1.5%;
            height: 1px;
            background: rgb(255, 255, 255, 1);
          }
        }
        //右侧矩形树图展示区域
        .treemap {
          width: 100%;
          height: 73.7%;
          //矩形树图轮播
          /deep/ .el-carousel {
            height: 100%;
            .el-carousel__item {
              display: flex;
              //数据成图部分
              .map {
                width: 82.24%;
                height: 100%;
              }
              //手写图例部分
              .legend {
                width: 17.76%;
                height: 100%;
                padding-left: 3%;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                //图例样式
                .legendBox {
                  width: 100%;
                  height: 9%;
                  display: flex;
                  align-items: center;
                  //图例颜色块
                  .legend_pic {
                    width: 12px;
                    height: 12px;
                    margin-right: 3%;
                  }
                  //图例文字
                  .legend_word {
                    font-size: 0.875rem;
                    color: #fff;
                    font-family: SOURCEHANSANSCN-MEDIUM;
                    font-weight: 500;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                  }
                }
              }
            }
          }
        }
      }

    }

    // 下半部分
    .bot {
      width: 100%;
      height: 40.5%;
      margin-top: 1%;
      display: flex;
      justify-content: space-between;

      // 下半部分左侧--质量提升
      .left {
        width: 55.93%;
        height: 100%;
        padding: 1.25rem;

        //表格展示
        .tb {
          width: 92.2%;
          height: 81.4%;
          // margin-top:1.47%;
          margin-top: 1%;

          //表头
          .tb_head {
            width: 100%;
            height: 13.33%;
            display: flex;
            justify-content: space-between;
            background: rgba(0, 50, 96, 0.6);

            td {
              color: rgba(255, 178, 30, 1);
              font-size: 1.25rem;
              font-family: SOURCEHANSANSCN-MEDIUM;
              font-weight: 500;
            }

            .col1 {
              width: 13%;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .col2{
              width: 26%;
              display: flex;
              justify-content: center;
              align-items: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .col3{
              width: 13%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .col4,
            .col5,
            .col6 {
              width: 16%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          //表格数据轮播部分
          .tb_content {
            width: 100%;
            height: 86.67%;

            /deep/ .el-carousel {
              height: 100%;

              .el-carousel__item {
                height: 100%;

                tr {
                  width: 100%;
                  height: 18.2%;
                  display: flex;
                  justify-content: space-between;
                  background: transparent;

                  td {
                    color: rgba(255, 255, 255, 1);
                    font-size: 1.25rem;
                    font-family: SOURCEHANSANSCN-MEDIUM;
                    font-weight: 500;
                  }

                  .col1 {
                    width: 13%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }

                  .col2{
                    width: 26%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                  }
                  .col3{
                    width: 13%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .col4,
                  .col5,
                  .col6 {
                    width: 16%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                }

                tr:nth-child(2n) {
                  height: 15.13%;
                  background: rgba(0, 50, 96, 0.6);
                }
              }
            }
          }

        }
      }

      // 下半部右侧展示--质量报告
      .right {
        width: 43.24%;
        height: 100%;
        padding: 1.25rem;
        // 轮播展示区域
        .content {
          width: 100%;
          height: 90%;
          padding: 3% 5.5% 0;

          /deep/ .el-carousel {
            height: 100%;

            /deep/ .el-carousel__button {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: rgba(4, 252, 255, 1);
            }

            .el-carousel__item {
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: space-between;

              .book {
                width: 30%;
                height: 82.23%;
                padding-top: 7.4%;
                background: url("../../assets/file.png") no-repeat;
                background-size: 100% 100%;
                border-radius: 10px;
                position: relative;

                .box {
                  width: 100%;
                  padding-right: 2.2%;
                  font-size: 0.75rem;
                  font-family: SOURCEHANSANSCN-MEDIUM;
                  font-weight: 500;
                  color: rgba(0, 255, 255, 1);
                  text-align: center;
                }

                .box3 {
                  color: rgba(255, 255, 255, 1);
                  margin-top: 2%;
                  font-size: 0.75rem;
                  -webkit-transform: scale(0.9);
                }

                .box4,
                .box5,
                .box6 {
                  width: 100%;
                  color: rgba(0, 255, 255, 1);
                  text-align: right;
                  position: absolute;
                  bottom: 5%;
                  color: rgba(255, 255, 255, 1);
                  -webkit-transform: scale(0.75);
                }

                .box4 {
                  bottom: 23%;
                }

                .box5 {
                  bottom: 14%;
                }
              }
            }
          }
        }

      }

      .left,
      .right {
        background: url(../../assets/bg_shujuzhilixiabian.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        .lt {
          width: 3%;
          height: 8%;
          background: url(../../assets/zuoshang.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .lb {
          width: 3%;
          height: 8%;
          background: url(../../assets/zuoxia.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .rt {
          width: 3%;
          height: 8%;
          background: url(../../assets/youshang.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 0;
          right: 0;
        }

        .rb {
          width: 3%;
          height: 8%;
          background: url(../../assets/youxia.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    }

    //弹框蒙版
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
      background: rgba(0, 0, 0, .5);

      //弹框
      .pop {
        width: 70%;
        height: 46%;
        position: absolute;
        background: rgba(0, 23, 76, .6);
        border: 2px solid rgba(127, 164, 255, 1);
        top: 50%;
        left: 50%;
        margin-left: -35%;
        margin-top: -15%;
        padding-top: 2%;

        //右上角关闭按钮
        .closeBtn {
          width: 1.34%;
          height: 4.22%;
          background: url(../../assets/closeBtn.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          top: 3.5%;
          right: 1.12%;
          cursor: pointer;
        }

        //表头
        .dataShow_head {
          display: flex;
          justify-content: space-between;
          width: 98%;
          height: 10.9%;
          background: rgba(2, 34, 107, .6);

          td {
            width: 15%;
            height: 100%;
            font-size: 1.25rem;
            font-weight: bold;
            color: rgba(17, 230, 230, 1);
            font-family: SOURCEHANSANSCN-MEDIUM;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          td:nth-child(1) {
            width: 5%;
          }

          td:nth-child(5) {
            width: 10%;
          }

          td:nth-child(3) {
            width: 25%;
          }
        }

        //表内容展示区
        .dataShow {
          width: 100%;
          height: 89.1%;
          overflow: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none
          }
          tr {
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 12.3%;

            td {
              width: 15%;
              height: 100%;
              font-size: 1.125rem;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              font-family: SOURCEHANSANSCN-MEDIUM;
              font-weight: 500;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            td:nth-child(1) {
              width: 5%;
            }

            td:nth-child(5) {
              width: 10%;
            }

            td:nth-child(3) {
              width: 25%;
            }
          }

          tr:nth-child(2n) {
            background: rgba(2, 34, 107, .6);
          }
        }
      }
    }
  }
</style>
