<template>
<div class="system-tree">
  <img class="system" src="../../assets/standard/system.png" />
  <div class="system-content">
    <p>
      金牛区大数据规范体系的建设以数据采集、存储、处理、服务到最终应用的全生命周期管理落实为着力点，同时根据《大数据标准化白皮书》、《北京市大数据标准体系》进行西城特色化延展，统筹编制形成了“金牛区大数据总体规范”、“金牛区大数据基础信息规范”、“金牛区大数据目录管理规范”金牛区大数据管理规范”、“金牛区大数据平台基础运营规范”、“金牛区大数据评估评价管理规范”和“金牛区大数据全管理规范”等覆盖基础、技术、数据、业务、平台和工具、管理、安全和隐私及应用等不同领域及颗粒度的标准规范。
    </p>
    <p>
      金牛区大数据规范体系的持续更新与完善，金牛区各单位的领域大数据建设提供一套标准化参考依据。一方面，各单位依托这套标准规范可持续降低大数据基础工程建设成本提升效率，另一方面，金牛区大数据中心平台基于这套标准规范将持续对数据进行归集、治理、整合与完善，形成面向全区的基础、多维活化数据服务能力，各单位在此之上充分聚焦个性化需求与应用构建，真正形成全区多级联动互补格局。
    </p>
  </div>
</div>

</template>

<script>
export default{
  name: 'systemTree'
}
</script>

<style lang="less" scoped="scoped">
.system-tree{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .system{
    width: 94.5%;
    height: 69%;
    margin: 1% auto 0.5%;
  }
  .system-content{
    width: 96%;
    max-height: calc(30% - 3rem);
    overflow: auto;
    color: #FEFEFF;
    font-size: 1.125rem;
    font-family: SourceHanSansCN;
    margin: 0 2%;
    border: 1px solid #04FCFF;
    padding: 0.5rem;
    line-height:25px;
    letter-spacing: 0.25rem;
    p{
      text-indent: 2em;
    }
  }
  .system-content::-webkit-scrollbar {
    display: none
  }
  /* 兼容火狐 */
  .system-content {
    scrollbar-width: none;
  }
  /* 兼容IE10+ */
  .system-content {
    -ms-overflow-style: none;
  }
}
</style>
