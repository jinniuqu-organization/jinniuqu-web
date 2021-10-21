<template>
  <div class="masterDataQuery">
    <div class="masterDataSearch">
      <el-input placeholder="请输入内容"
                v-model="masterData"
                class="searchInput"
                size="medium">
        <el-select v-model="selectType"
                   slot="prepend"
                   placeholder="请选择"
                   :popper-append-to-body="false"
                   @change="getMasterInfos"
        >
          <el-option  v-for="(item,index) in selectList" :key="index" :label="item.tableName" :value="item.id"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getMasterInfos"></el-button>
      </el-input>
    </div>
    <div class="masterDataTable">
      <div class="table_content">
       <table border rules="none">
          <tr :class="index % 2 == 0 ? 'single': ''" align="center" v-for="(item,index) in masterTableData" v-bind:key="index">
            <!-- <template v-for="item in row"> -->
              <th data-toggle="tooltip" data-placement="top" :title="item.columnNote">{{item.table}}&nbsp;&nbsp;</th>
              <td data-toggle="tooltip" data-placement="top" :title="item.value">{{item.table_name || ""}}</td>
            <!-- </template> -->
          </tr>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {getMasterGeographicList,getMasterGeographicInfos} from '../../api/governanceIndex.js'
  import {
    testIdCard,
    testUnifyCode
  } from '../../utils/tool.js';
  export default {
    data() {
      return {
        // 类型选择
        selectType: 1,
        // 主数据查询-搜索框
        masterData: '',
        masterTableData: [],
        // 详情页标识
        infoFlag: false,
        // 分页
        currentPage: 1,
        total: 0,
        pageSize: 10,
        list: [],
        showData: [],
        selectList:[]
      }
    },
    created () {
      this.getMasterInfos();
      this.getGeographicList()
    },

    mounted(){
      // this.selectList=[
      //   {tableName:"行政区划",id:"1"},
      //   {tableName:"城乡社区基本信息",id:"2"},
      //   {tableName:"环卫公厕信息",id:"3"},
      //   {tableName:"公园信息",id:"4"},
      //   {tableName:"持续建设中…",id:"5"},
      // ]
    },

    methods: {
      //获取搜索下拉列表
      getGeographicList(){
         getMasterGeographicList().then(res => {
                if (res.code === 200) {
                  this.selectList = res.data.list;
                } else {
                  this.selectList = [];
                }
              });
      },
      // 获取主数据查询-列表
      getMasterInfos() {
        let query = {
          id : this.selectType
        };
        getMasterGeographicInfos(query).then(res => {
          if (res.code === 200) {
            this.masterTableData = res.data.list;
          } else {
            this.total = 0;
            this.masterTableData = [];
          }
        });
      },
      // 分页切换
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getMasterInfos();
      },

      // 分页序号连续
      table_index(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .masterDataQuery {
    width: 100%;
    height: 100%;
    padding: 0 2% 2% 2%;
    margin-top: 2%;
    background-size: 100% 100%;
    font-family: SOURCEHANSANSCN-REGULAR;

    // 搜索框
    .masterDataSearch {
      width: 100%;
      height: 9%;
      text-align: center;
      .searchInput {
        width: 60%;
        position: relative;
        /deep/  .el-input__inner{
          height: 3.5rem;
          background-color: transparent;
          color: white;
          font-size: 1rem;
        }
        // 类型选择样式
        /deep/ .el-select .el-input__inner{
          width: 10rem;
          font-size: 0.85rem;
        }

        /deep/ .el-select-dropdown {
          background-color: rgba(3, 10, 10, 0.6);
        }
        /deep/ .el-select-dropdown__item {
          color: #ffffff;
          text-align: left;
        }

        /deep/ .el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
          background-color: rgba(4,252,255, 0.2);
          color: #04FCFF;
        }

        /deep/ .detail .el-input-group__append, .el-input-group__prepend {
          width: 10.25rem;
          border: 1px solid #04FCFF;
          border-right: none;
        }

        /deep/ .el-input-group__prepend {
          background-color: transparent!important;
          border: 1px solid #fff;
          border-right: none;
          border-radius: 0;
          width: 11.25rem;
        }

        /deep/ .el-input-group__append {
          background-color: transparent;
        }
    }
  }
    //主数据展示区
    .masterDataTable {
      display: flex;
      justify-content: center;
      .table_content{
        width: 60%;
          table {
            width: 100%;
            border: 1px solid #0E2C64;
            overflow: hidden;
            table-layout: fixed;
            margin-top: 2%;

            tr {
              font-size: 1.125rem;
              th {
                font-weight: bold;
                color: #04FCFF;
                padding-left: 0.6%;
                width: 12%;
                white-space:nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
                text-align: center;
              }

              td {
                height: 3.125rem;
                font-weight: 500;
                color: #FFFFFF;
                width: 8%;
                white-space:nowrap;
                overflow:hidden;
                text-overflow: ellipsis;
              }
            }

            .single {
              background: url('../../assets/tiao.png');
              background-size: 100% 100%;
            }

          }
    }

      // margin-top: 1.2%;
      // /deep/  .el-table, .el-table__expanded-cell {
      //   background-color: transparent;
      // }
      // /deep/ .el-table th {
      //   background: rgba(22,150,255,0.06)!important;
      //   font-size: 1.1875rem;
      //   font-family: Source Han Sans CN;
      //   font-weight: bolder;
      //   color: #04FCFF;
      //   border-bottom: 1px solid rgba(22,150,255,0.3);
      //   border-top: 1px solid rgba(22,150,255,0.3);
      // }
      // /deep/ .el-table tr {
      //   background-color: transparent;
      //   height: 48px!important;
      // }

      // /deep/ .el-table tr:hover {
      //   background-color: rgba(3, 10, 10, 0.6);
      // }
      // /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{
      //   background-color: transparent;
      //   font-size: 1rem;
      //   font-family: Source Han Sans CN;
      //   font-weight: 400;
      //   color: #FFFFFF;
      //   border-bottom: 1px dashed rgba(255,255,255,0.5) ;
      // }
      // /deep/ .el-table--small td, .el-table--small th {
      //   padding: 6px 0;
      // }
    }
    .el-table::before {//去除底部白线
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
    }
    .pageUtil {
      margin-top: 0.8%;
      text-align: right;

      /deep/ .el-pagination__total {
        color: white;
        font-size: 1rem;
      }

      /deep/ .el-pagination .el-select .el-input .el-input__inner {
        background-color: transparent;
        border: white 1px solid;
        color: white;
      }

      /deep/ .el-pagination__jump {
        color: white;
        font-size: 1rem;
      }

      /deep/ .el-pagination__editor.el-input .el-input__inner {
        color: white;
        background-color: transparent;
      }

      /deep/ .el-pager li {
        background: transparent!important;
        color: white;
        font-size: 1rem;
      }

      /deep/ .el-pager li.active {
        color: #409EFF;
      }

      /deep/ .el-pagination .btn-prev {
        background: transparent;
      }

      /deep/ .el-pagination .btn-next {
        background: transparent;
      }
    }

    .masterData_info {
      /deep/ .el-dialog {
        opacity: 1;
        width: 88%;
        height: 85%;
        background: url('../../assets/info3Back.png');
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

    .masterData_info /deep/ .el-dialog__body {
      width: 100%;
      height: 100%;
      /*padding: 5.6% 0.2% 5.6% 0.2%;*/

      table {
        width: 100%;
        /*height: 100%;*/
        border: none;
        overflow: hidden;
        table-layout: fixed;

        tr {
          font-size: 1.125rem;
          th {
            font-weight: bold;
            color: #04FCFF;
            padding-left: 0.6%;
            width: 12%;
            white-space:nowrap;
            overflow:hidden;
            text-overflow: ellipsis;
            text-align: right;
          }

          td {
            height: 3.125rem;
            font-weight: 500;
            color: #FFFFFF;
            width: 8%;
            white-space:nowrap;
            overflow:hidden;
            text-overflow: ellipsis;
          }
        }

        .single {
          background: url('../../assets/tiao.png');
          background-size: 100% 100%;
        }

        .double {}
      }
    }

    // 法人
    .masterDataFa_info {
      /deep/ .el-dialog {
        opacity: 1;
        width: 80%;
        height: 73.44%;
        background: url('../../assets/info3Back.png');
        background-size: 100% 100%;
      }

      /deep/ .el-dialog__title {
        color: #ffffff;
        font-size: 2rem;
        font-weight: bolder;
      }

      /deep/ .el-dialog__body {
        width: 100%;
        height: 100%;
        /*padding: 5.6% 0.2% 5.6% 0.2%;*/

        table {
          width: 100%;
          /*height: 100%;*/
          border: none;
          overflow: hidden;
          table-layout: fixed;

          tr {
            font-size: 1.125rem;
            th {
              font-weight: bold;
              color: #04FCFF;
              padding-left: 0.6%;
              width: 19%;
              white-space:nowrap;
              overflow:hidden;
              text-overflow: ellipsis;
              text-align: right;
            }

            td {
              height: 3.125rem;
              font-weight: 500;
              color: #FFFFFF;
              width: 13.5%;
              white-space:nowrap;
              overflow:hidden;
              text-overflow: ellipsis;
            }
          }

          .single {
            background: url('../../assets/tiao.png');
            background-size: 100% 100%;
          }

          .double {
          }
        }
      }

      /deep/ .el-dialog__headerbtn {
        font-size: 2rem;
      }
    }
}
</style>
