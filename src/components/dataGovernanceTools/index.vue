<template>
<div class="tools">
  <el-row type="flex" justify="space-around" class="tool_row">
    <el-col :span="10" class="tool" v-for="(item, i) in tool1" :key="i">
      <div :class="`icon ` + item.icon" @click="goTo(item.url)">
        <img src="../../assets/tools/icon.png" />
      </div>
      <div class="tool_info">
        <p class="title">{{item.title}}</p>
        <p>{{item.info1}}</p>
        <p>{{item.info2}}</p>
      </div>
    </el-col>
  </el-row>
  <el-row type="flex" justify="space-around" class="tool_row">
    <el-col :span="10" class="tool" v-for="(item, i) in tool2" :key="i">
      <div :class="`icon ` + item.icon" @click="goTo(item.url)">
        <img src="../../assets/tools/icon.png" />
      </div>
      <div class="tool_info">
        <p class="title">{{item.title}}</p>
        <p>{{item.info1}}</p>
        <p>{{item.info2}}</p>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default{
  name: 'Index',
  data(){
    return{
      tool1: [
        {
          icon: "shujuyunying",
          title: "数据运营工具",
          info1: "管理数据接口服务，",
          info2: "对外提供数据共享交换能力。",
          url: "http://103.252.251.78:24004"
        },
        {
          icon: "yuanshuju",
          title: "元数据工具",
          info1: "对数据资产进行透明化管控，",
          info2: "便于数据对象的维护与管理。",
          url: "http://222.128.14.106:10194/"
        }
      ],
      tool2: [
        {
          icon: "shujuzhiliang",
          title: "数据质量工具",
          info1: "配置多种数据稽核规则和模型，",
          info2: "对异常问题进行查询和管理。",
          url: "http://222.128.14.106:10193/"
        },
        {
          icon: "shujubiaozhun",
          title: "数据标准工具",
          info1: "建立规范的数据应用标准，",
          info2: "消除数据不一致性。",
          url: "http://103.252.251.78:7001/"
        },
      ]

    }
  },

  methods:{
    goTo(url) {
      if (url) {
        // window.open(url);
      }
    }
  }
}
</script>
<style lang="less" scoped="scoped">
.tools{
  width: 100%;
  height: 100%;
  padding: 1% 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: center;
  color: #fff;
  font-size: 1.25rem;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  .tool_row{
    height: 23.5%;
    .tool{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      .icon{
        width: 28%;
        height: 100%;
        cursor: pointer;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .icon:after{
        content:"";
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 55%;
        padding-top: 55%;
        background-repeat:  no-repeat;
        background-position: center center;
        background-size: 100% 100%;
      }
      // 图标
      .shujujichen:after{
        background-image: url("../../assets/tools/shujujichen.png");
      }
      .shujuyunying:after{
        background-image: url("../../assets/tools/shujuyunying.png");
      }
      .yuanshuju:after{
        background-image: url("../../assets/tools/yuanshuju.png");
      }
      .zhushuju:after{
        background-image: url("../../assets/tools/zhushuju.png");
      }
      .shujuzhiliang:after{
        background-image: url("../../assets/tools/shujuzhiliang.png");
      }
      .shujubiaozhun:after{
        background-image: url("../../assets/tools/shujubiaozhun.png");
      }
      // 动效
      .icon:hover{
        top: -1rem;
      }
      // 文字说明
      .tool_info{
        width: 64.5%;
        height: 68%;
        padding: 3rem 0rem;
        background:rgba(18,194,255,0.17);
        border: 2px dashed #12C2FF;
        display: table;
        p{
          display: table-row;
        }
        .title{
          font-size: 1.375rem;
          color: #0EF2F6;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
