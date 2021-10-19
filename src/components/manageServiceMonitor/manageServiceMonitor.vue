<template>
  <div class="interfaceService">
    <div class="brief_info">
      <el-row :gutter="8">
        <el-col :span="8" v-for="(item, index) in apis" :style="{ marginTop: (index > 2 ? '2.2rem': '1rem') }" v-bind:key="index">
          <el-card class="box-card" shadow="always"  v-if="item.apiName">
            <div slot="header" class="clearfix">
              <span>{{item.apiName}}</span>
              <span class="btn" type="text">{{item.apiCount}}</span>
            </div>
            <div class="text item" >
              <span class="labelName">服务对象：</span>
              <span class="labelValue">{{ item.apiObject }}</span>
            </div>
            <div class="text item">
              <span class="labelName">接口状态：</span>
              <span class="labelValue">{{ item.apiState }}</span>
              <div class="labelState" :style="{backgroundColor: item.apiState === '正常' ? '#00FF00':'#EE0000'}"></div>
            </div>
            <div  class="text item">
              <span class="labelName">请求方式：</span>
              <span class="labelValue">{{ item.apiMethod }}</span>
            </div>
            <div class="text item">
              <span class="labelName">接口说明：</span>
              <span class="labelValue">{{ item.apiExplain }}</span>
            </div>
          </el-card>
          <el-card class="box-card" shadow="always" v-else>
            <div slot="header" class="clearfix">
              <span>建设中……</span>
              <span class="btn" type="text"></span>
            </div>
            <div class="item_blank" >
              <div class="blank_img"></div>
            </div>
          </el-card>


        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="apiFlag"
      top="12.3%"
      show-close
      class="apiInfo_dialog"
      title="接口详细信息"
      :close-on-click-modal="false"
    >

    </el-dialog>
  </div>
</template>

<script>
  import {getAllApis} from '../../api/governanceIndex'
  export default {
    name: "interfaceService.vue",
    data(){
      return {
        apiFlag: false,
        apis: [],
        countTimer0: null,
        countTimer1: null,
        countTimer2: null,
        countTimer3: null,
        countTimer4: null,
        countTimer5: null,
      }
    },
    mounted() {
      this.getAllApis();
    },
    methods: {
      getAllApis() {
        getAllApis().then(res => {
          let vm =this;
          if (res.code === 200) {
            vm.apis = res.data;
            // this.countTimer0 = setInterval(function () {
              if (vm.apis.length<7&&vm.apis.length>0) {
                let num=6-res.data.length
                for (let i = 0; i < num; i++) {
                   vm.apis.push({
                      apiId:parseInt(Math.random()+i),
                      apiName:"",
                      apiState:"",
                      apiMethod:"",
                      apiExplain:"",
                      apiCount:null,
                      apiObject:""
                  })
                }
              }
              vm.updateApiCount();
            // }, 5000)
          }
        })
      },
      // 更新接口调用次数-假数据
      updateApiCount() {
        for (let i = 0; i < this.apis.length; i++) {
          let item = this.apis[i];
          switch (i) {
            case 0:
              this.countTimer0 = setInterval(function () {
                item.apiCount = item.apiCount + 1;
              }, 1000 * 10);
              break;
            case 1:
              this.countTimer1 = setInterval(function () {
                item.apiCount = item.apiCount + 4;
              }, 1000 * 60 * 2);
              break;
            case 2:
              this.countTimer2 = setInterval(function () {
                item.apiCount = item.apiCount + 10;
              }, 1000 * 60 * 20);
              break;
            case 3:
              this.countTimer3 = setInterval(function () {
                item.apiCount = item.apiCount + 6;
              }, 1000 * 60 * 10);
              break;
            case 4:
              this.countTimer4 = setInterval(function () {
                item.apiCount = item.apiCount + 3;
              }, 1000 * 60);
              break;
            case 5:
              this.countTimer5 = setInterval(function () {
                item.apiCount = item.apiCount + 5;
              }, 1000 * 60 * 20);
              break;
          }
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.countTimer0);
      this.countTimer0 = null;

      clearInterval(this.countTimer1);
      this.countTimer1 = null;

      clearInterval(this.countTimer2);
      this.countTimer2 = null;

      clearInterval(this.countTimer3);
      this.countTimer3 = null;

      clearInterval(this.countTimer4);
      this.countTimer4 = null;

      clearInterval(this.countTimer5);
      this.countTimer5 = null;
    }
  }
</script>

<style lang="less" scoped>
  .interfaceService {
    width: 100%;
    height: 100%;
    padding: 0 2% 2% 2.8%;
    margin-top: 2%;
    background-size: 100% 100%;
    font-family: SOURCEHANSANSCN-REGULAR;

    // 卡片样式设置
    .brief_info {
      /deep/ .el-card {
        background-color: rgba(10, 27, 66, 0.6);
        color: #ffffff;
        border: 2px solid #104DA4;
      }
      /deep/ .el-card__header {
        font-size: 1.25rem;
        font-weight: bolder;
      }

      /deep/ .el-card__body {
        min-height: 14.5rem;
      }

      .labelName {
        font-weight: bolder;
        color: #04FCFF;
        font-size: 1rem;
      }

      .labelValue {
        font-size: 1rem;
      }

      .labelState {
        float: right;
        position: relative;
        left: -72%;
        margin-top: 1.2%;
        background-color: green;
        border-radius: 50%;
        width: 0.8rem;
        height: 0.8rem;
        opacity: 0.9;
      }
    }

    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }

    .btn {
      float: right;
      /*padding: 3px 0;*/
      font-weight: bolder;
      font-family: "Digital-7Mono";
      color: #04FCFF;
      font-size: 2rem;
    }

    .box-card {
      width: 560px;
      .item_blank{
        min-height: 14rem;
        display: flex;
        justify-content: center;
        .blank_img{
          background: url('../../assets/dataOperation/inConstruction.png') no-repeat;
          background-size: 100% 100%;
          width: 320px;
        }
      }
    }

    .apiInfo_dialog {
      /deep/ .el-dialog {
        opacity: 1;
        width: 48%;
        height: 65%;
        background: url('../../assets/info4Back.png');
        background-size: 100% 100%;
      }

      /deep/ .el-dialog__title {
        color: #ffffff;
        font-size: 2rem;
        font-weight: bolder;
      }
      /deep/ .el-dialog__headerbtn {
        font-size: 2rem;
      }
    }
  }
</style>
