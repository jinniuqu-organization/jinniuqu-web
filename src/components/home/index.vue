<template>
  <div class="home">
     <div class="headMask" v-show="headMask"></div>
    <div class="head">
      <!-- 头部 -->
      <div class="tit">
        <!-- <div class="tit_box" @click="navTo(0)"> -->
        <div class="tit_box">
          <div class="tit_word">金牛区大数据治理</div>
        </div>
      </div>

      <!-- 导航 -->
      <div class="nav">
        <div class="nav_left">
          <div :class="navIndex==2?'nav_active':'nav_box'" @click="navTo(2)">
            <div class="nav_word">数据汇集监控</div>
          </div>
          <div :class="navIndex==3?'nav_active':'nav_box'" @click="navTo(3)">
            <div class="nav_word">数据运行监控</div>
          </div>
          <div :class="navIndex==1?'nav_active':'nav_box'" @click="navTo(1)">
          <div class="nav_word">治理服务监控</div>
          </div>
        </div>
        <div class="nav_right">
          <!-- <div :class="navIndex==4?'nav_active':'nav_box'" @click="navTo(4)">
            <div class="nav_word">数据标准管理</div>
          </div>
          <div :class="navIndex==5?'nav_active':'nav_box'" @click="navTo(5)">
            <div class="nav_word">治理组织架构</div>
          </div>
          <div :class="navIndex==6?'nav_active':'nav_box'" @click="navTo(6)">
            <div class="nav_word">数据治理服务</div> -->
          <div :class="navIndex==4?'nav_active':'nav_box'" @click="navTo(4)">
            <div class="nav_word">人口库查询</div>
          </div>
          <div :class="navIndex==5?'nav_active':'nav_box'" @click="navTo(5)">
            <div class="nav_word">法人库查询</div>
          </div>
          <div :class="navIndex==6?'nav_active':'nav_box'" @click="navTo(6)">
            <div class="nav_word">地理信息库查询</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容展示 （选项卡模式）-->
    <div class="content">
      <!-- <GovernanceServices v-if="navIndex==1"></GovernanceServices> --><!-- 旧/治理服务监控 -->
       <ManageServiceMonitor v-if="navIndex==1"></ManageServiceMonitor>  <!-- 治理服务监控 -->
      <!-- <HomeMain v-if="navIndex==5"></HomeMain> --> <!-- 治理组织架构 -->
      <DataCollection v-if="navIndex==2"></DataCollection><!-- 数据汇集监控 -->
      <!--<DataQuality v-if="navIndex==1"></DataQuality>&lt;!&ndash; 数据质量监控 &ndash;&gt;-->
      <!-- <DataStandardManagement v-if="navIndex==4"></DataStandardManagement> --> <!-- 数据标准管理 -->
      <!-- <DataGovernance v-if="navIndex==6"></DataGovernance> --> <!-- 数据治理服务 -->
      <DataOperation v-if="navIndex==3"></DataOperation> <!-- 数据运行监控 -->
      <NewMain v-if="navIndex==0"></NewMain> <!-- 页面默认显示 -->
      <DrawPortray v-if="navIndex==7"></DrawPortray>
	  <!-- <DataGovernanceTools v-if="navIndex==0"></DataGovernanceTools> <!-- 页面默认显示 -->
      <PopulationDatabase v-if="navIndex==4"></PopulationDatabase>
      <CorporateDatabase v-if="navIndex==5"></CorporateDatabase>
      <GeographicInfo v-if="navIndex==6"></GeographicInfo>
    </div>
  </div>
</template>

<script>
    import HomeMain from "./main.vue"; //治理组织架构
	  import NewMain from "./newMain.vue"; //默认显示
    import DataQuality from "../dataQuality/dataQuality.vue"; //数据质量监控
    import DataCollection from "../dataCollection/dataCollection.vue"; //数据汇集监控
    import DrawPortray from "../home/drawPortray.vue"; // 人员画像
    // 数据标准管理
    import DataStandardManagement from "../dataStandardManagement/index.vue";
    //数据运行监控01
    import MonitoringOne from '../dataOperation/dataOperationMonitoringOne.vue'
    //数据运行监控02
    import MonitoringTwo from '../dataOperation/dataOperationMonitoringTwo.vue'
    //数据治理服务
    // import DataGovernance from '../dataGovernance/dataGovernance.vue'
     import ManageServiceMonitor from '../manageServiceMonitor/manageServiceMonitor.vue'

    //数据运行监控
    import DataOperation from '../dataOperation/index.vue'
    //数据治理工具
    import DataGovernanceTools from '../dataGovernanceTools/index.vue'
    //治理服务监控
    import GovernanceServices from '../governanceServices/governanceServices.vue'
    //人口库查询
    import PopulationDatabase from '../populationDatabase/populationDatabase.vue'
    //法人库查询
    import CorporateDatabase from '../corporateDatabase/corporateDatabase.vue'
    //地理信息库查询
    import GeographicInfo from '../geographicInfo/geographicInfo.vue'

    export default {
        data() {
            return {
                navIndex: 2,
                headMask:false
            }
        },
        components: {

          //首页主题展示（默认）
          NewMain,
          HomeMain,
          //数据质量监控
          DataQuality,
          //数据汇集监控
          DataCollection,
          //数据标准管理
          DataStandardManagement,
          // 数据治理服务
          // DataGovernance,
          ManageServiceMonitor,
          // 数据运行监控
          DataOperation,
          // 数据治理工具
          DataGovernanceTools,
          DrawPortray,
          //治理服务监控
          GovernanceServices,
          //人口库查询
          PopulationDatabase,
          //法人库查询
          CorporateDatabase,
          //地理信息库查询
          GeographicInfo,
        },
        mounted(){
          let vm = this;
          this.Observer.$on("headMask",function(params){
             vm.headMask = params;
          })
        },
        methods: {
            //点击导航按钮，记录导航按钮参数，进行页面展示
            navTo(params) {
                this.navIndex = params;
            }

        }
    }
</script>

<style lang="less" scoped="scoped">
  .home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .headMask{
      width:100%;
      height:14%;
      background:rgba(0,0,0,.5);
      position:absolute;
      z-index: 999;
    }
    // 公共头部
    .head {
      width: 100%;
      height: 13.9%;
      padding-top: 1.98%;
      position: relative;
      // 标题
      .tit {
        width: 60.11%;
        height: 60.17%;
        background: url("../../assets/top.png") no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        // 标题文案盒子
        .tit_box {
          width: 36%;
          height: 88%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor:pointer;
		      z-index:2;
          // 标题文字--金牛区大数据治理
          .tit_word {
            font-size:2.2rem;
            font-family:SOURCEHANSANSCN-MEDIUM;
            // background: linear-gradient(0deg, rgba(254, 255, 244, 1) 0%, rgba(217, 183, 140, 1) 98.92578125%);
            // -webkit-background-clip: text;
            // -webkit-text-fill-color: transparent;
            // font-weight:bold;
            color: rgba(255, 255, 255, 1);
          }
        }
      }

      //导航栏
      .nav {
        width: 100%;
        padding: 0 2.6%;
        height: 39.74%;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 99;
        display: flex;
        justify-content: space-between;
        // 导航栏分为左右两部分布局
        .nav_left, .nav_right {
          width: 39.06%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          // 导航栏按钮默认状态和选中状态
          .nav_box, .nav_active {
            width: 32.77%;
            height: 100%;
            background: url("../../assets/btn_zuokuang.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 1%;
            .nav_word {
              font-size:1.375rem;
              color: rgba(255, 255, 255, 1);
              font-family:SOURCEHANSANSCN-REGULAR;
              font-weight:400;
            }
          }

          // 选中后背景图变化
          .nav_active {
            cursor: pointer;
            background: url("../../assets/btn_zuokuangdianji.png") no-repeat;
            background-size: 100% 100%;
            // 选中后字体颜色变化
            & .nav_word {
              font-size:1.375rem;
              color: rgba(253, 183, 47, 1);
            }
          }

          // 当鼠标滑过时,光标形态变化
          .nav_box:hover {
            cursor: pointer;
            background: url("../../assets/btn_zuokuangdianji.png") no-repeat;
            background-size: 100% 100%;
            //颜色变化
            & .nav_word {
              color: rgba(253, 183, 47, 1);
            }
          }
        }

        .nav_right {
          .nav_box, .nav_active {
            background: url("../../assets/btn_youkuang.png") no-repeat;
            background-size: 100% 100%;
          }

          .nav_active {
            background: url("../../assets/btn_youkuangdianji.png") no-repeat;
            background-size: 100% 100%;
          }

          .nav_box:hover {
            background: url("../../assets/btn_youkuangdianji.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    //展示内容
    .content {
      width: 100%;
      height: 88.15%;
      // flex:1;
      // background:#fff;
      overflow: hidden;
    }
  }

  .home:before {
    content: "";
    position: absolute;
    z-index: -2;
    top: 0rem;
    left: 0rem;
    width: 100%;
    height: 100%;
    background: url("../../assets/BG.jpg") no-repeat center center;
	// background: url(../../assets/main/bg.png) no-repeat center;
    background-size: 100% 100%;
  }
</style>
