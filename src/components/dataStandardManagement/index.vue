<template>
<div class="standard">
  <systemTree  v-show="index == 1" />
  <systemCircular  v-show="index == 2" />
  <p class="tab">
    <span :class="index == 1 ? 'active':'noActive'" @click="navTo(1)">01</span>
    <span>/</span>
    <span :class="index == 2 ? 'active':'noActive'" @click="navTo(2)">02</span>
  </p>
</div>
</template>

<script>
import systemTree from "./systemTree";
import systemCircular from "./systemCircular";
export default{
  name: 'Index',
  data(){
    return{
      index: 1
    }
  },
  components:{
    systemTree,
    systemCircular
  },
  methods:{
    //点击导航按钮，记录导航按钮参数，进行页面展示
    navTo(params){
      this.index = params;
      if (params == 2) {
        document.getElementsByClassName("home")[0].className = "home home_bg";
      } else {
        document.getElementsByClassName("home")[0].className = "home";
      }
    }
  },
  beforeDestroy: function() {
    document.getElementsByClassName("home")[0].className = "home";
  }
}
</script>
<style type="text/css">
.home_bg:after{
  content: "";
  position: absolute;
  z-index: -1;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  background: url("../../assets/standard/light.gif") no-repeat left center;
  background-size: 100% 100%;
  opacity: 1;
}
</style>

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
    .active, .noActive{
      cursor: pointer;
    }
    .noActive{
      color: #565759;
    }
  }
}

</style>
