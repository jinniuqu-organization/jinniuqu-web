<template>
<div class="standard">
  <MonitoringOne  v-if="index == 1" key="1" />
  <!-- <MonitoringTwo  v-if="index == 2" key="2"/> -->
  <!-- <p class="tab">
    <span :class="index == 1 ? 'active':'noActive'" @click="navTo(1)">01</span>
    <span>/</span>
    <span :class="index == 2 ? 'active':'noActive'" @click="navTo(2)">02</span>
  </p> -->
</div>
</template>

<script>
import MonitoringOne from "./dataOperationMonitoringOne";
import MonitoringTwo from "./dataOperationMonitoringTwo";
export default{
  name: 'Index',
  data(){
    return{
      index: 1
    }
  },
  components:{
    MonitoringOne,
    MonitoringTwo
  },
  methods:{
    //点击导航按钮，记录导航按钮参数，进行页面展示
    navTo(params){
		this.index = params;
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.standard{
  width: 100%;
  height: 100%;
  position: relative;
  .tab{
    position: absolute;
    right: 1%;
    bottom: 0.5%;
    font-size: 2.25rem;
    font-family: Impact;
    font-weight: 400;
    font-style: italic;
    color: #FEFEFF;
    z-index: 1;
    .active, .noActive{
      cursor: pointer;
    }
    .noActive{
      color: #565759;
    }
  }
}

</style>
