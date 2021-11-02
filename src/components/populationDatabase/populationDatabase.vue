<template>
  <div class="masterDataQuery">
    <div class="masterDataSearch">
      <el-input placeholder="请输入内容" v-model="masterData" class="searchInput" size="medium">
        <el-select v-model="selectType" slot="prepend" placeholder="请选择" :popper-append-to-body="false">
          <el-option label="身份证号" value="1"></el-option>
          <el-option label="姓名" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="getMasterInfos"></el-button>
      </el-input>
    </div>
    <div class="masterDataTable">
      <el-table :data="masterTableData" :highlight-current-row="true" @row-click="getMasterDataInfo" ref="masterTable"
        style="width: 100%">
        <el-table-column type="index" label="序号" :index="table_index" align="center" width="100">
        </el-table-column>
        <!-- 根据环境不一样切换为idcard 或 idcard -->
        <el-table-column prop="idcard" label="公民身份证号码" align="left" width="220">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="domicile" label="户籍类型" width="120" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200" show-overflow-tooltip align="left">
        </el-table-column>
        <el-table-column prop="presentAddress" label="家庭住址" align="left" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="rprAddress" label="户籍登记地址" align="left" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageUtil">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- <el-dialog :visible.sync="infoFlag" top="4.3%" show-close class="masterData_info" title="用户详细信息"
      :close-on-click-modal="true">
      <table border rules="none">
        <tr :class="index % 2 == 0 ? 'single': ''" align="center" v-for="(row,index) in showData" v-bind:key="index">
          <template v-for="item in row">
            <th data-toggle="tooltip" data-placement="top" :title="item.columnNote">{{item.columnNote}}&nbsp;&nbsp;</th>
            <td data-toggle="tooltip" data-placement="top" :title="item.value">{{item.value | nullFilter}}</td>
          </template>
        </tr>
      </table>
    </el-dialog> -->
    <el-dialog :visible.sync="infoFlag" top="4.3%" show-close class="masterData_info" title="用户详细信息"
      :close-on-click-modal="true">
      <div class="rows_header" align="center">基础信息 </div>
      <table rules="none">
        <tr class="single_tr">
          <th data-toggle="tooltip" data-placement="top" title="姓名">姓名</th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['name_real']" colspan="5" scope="col">
            {{this.showData["name_real"]}}</td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="性别">性别</th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['sex']">{{this.showData["sex"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="联系电话">联系电话</th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['tel_real']">{{this.showData["tel_real"]}}
          </td>
          <th data-toggle="tooltip" data-placement="top" title="出生日期">出生日期 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['birthdate']">{{this.showData["birthdate"]}}
          </td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="民族">民族 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['ethnic_group']">
            {{this.showData["ethnic_group"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="婚姻状况">婚姻状况 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['marriage_type']">
            {{this.showData["marriage_type"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="户籍类型">户籍类型 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['domicile']">{{this.showData["domicile"]}}
          </td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="公民身份证号码">公民身份证号码 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['idcard_real']" colspan="5" scope="col">
            {{this.showData["idcard_real"]}}</td>
        </tr>
      </table>
      <div class="rows_header">居住地址信息</div>
      <table rules="none">
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="居住地-省(自治区、直辖市)">居住地-省(自治区、直辖市) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_province']">
            {{this.showData["present_province"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-市(地区)">居住地-市(地区) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_city']">
            {{this.showData["present_city"]}}
          </td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-县(区)">居住地-县(区) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_district']">
            {{this.showData["present_district"]}}
          </td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="居住地-乡(镇、街道)">居住地-乡(镇、街道) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_street']">
            {{this.showData["present_street"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-居委">居住地-居委 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_comm']">
            {{this.showData["present_comm"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-村(路、街)">居住地-村(路、街) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_village']">
            {{this.showData["present_village"]}}</td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="居住地-弄(路号、弄号)">居住地-弄(路号、弄号) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_buildno']">
            {{this.showData["present_buildno"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-楼号(楼号、座、别墅号)">居住地-楼号(楼号、座、别墅号) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_unit']">
            {{this.showData["present_unit"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="居住地-门牌号(包括'室')">居住地-门牌号(包括'室') </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_roomno']">
            {{this.showData["present_roomno"]}}</td>
        </tr>
        <tr class="single_tr">
          <th data-toggle="tooltip" data-placement="top" title="居住地址">居住地址 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['present_address']" colspan="5" scope="col">
            {{this.showData["present_address"]}}</td>
        </tr>
      </table>
      <div class="rows_header">户籍地址信息</div>
      <table rules="none">
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="户籍地-省(自治区、直辖市)">户籍地-省(自治区、直辖市) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_province']">
            {{this.showData["rpr_province"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-市(地区)">户籍地-市(地区) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_city']">{{this.showData["rpr_city"]}}
          </td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-县(区)">户籍地-县(区) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_district']">
            {{this.showData["rpr_district"]}}
          </td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="户籍地-乡(镇、街道)">户籍地-乡(镇、街道) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_street']">
            {{this.showData["rpr_street"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-居委">户籍地-居委 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_comm']">{{this.showData["rpr_comm"]}}
          </td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-村(路、街)">户籍地-村(路、街) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_village']">
            {{this.showData["rpr_village"]}}</td>
        </tr>
        <tr class="thisection_tr">
          <th data-toggle="tooltip" data-placement="top" title="户籍地-弄(路号、弄号)">户籍地-弄(路号、弄号) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_buildno']">
            {{this.showData["rpr_buildno"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-楼号(楼号、座、别墅号)">户籍地-楼号(楼号、座、别墅号) </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_unit']">
            {{this.showData["rpr_unit"]}}</td>
          <th data-toggle="tooltip" data-placement="top" title="户籍地-门牌号(包括'室')">户籍地-门牌号(包括'室') </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_roomno']">
            {{this.showData["rpr_roomno"]}}</td>
        </tr>
        <tr class="single_tr">
          <th data-toggle="tooltip" data-placement="top" title="户籍地址">户籍地址 </th>
          <td data-toggle="tooltip" data-placement="top" :title="showData['rpr_address']" colspan="5" scope="col">
            {{this.showData["rpr_address"]}}</td>
        </tr>
      </table>

    </el-dialog>
  </div>
</template>

<script>
  import {
    getMasterPersons,
    getMasterPersonInfos
  } from '../../api/governanceIndex.js'
  import {
    testIdCard,
    testUnifyCode
  } from '../../utils/tool.js';
  export default {
    data() {
      return {
        // 类型选择
        selectType: '1',
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

        // showData: [],
        showData: {}
      }
    },
    created() {
      this.getMasterInfos();
    },

    mounted() {
      this.getMasterInfos();
    },

    methods: {
      // 获取主数据查询-列表
      getMasterInfos() {
        let query = {
          pageNum: this.currentPage,
          type: this.selectType,
          parameter: this.masterData,
        };
        getMasterPersons(query).then(res => {
          if (res.code === 200) {
            this.total = res.data.total;
            this.masterTableData = res.data.list;
          } else {
            this.total = 0;
            this.masterTableData = [];
          }
        })
      },

      // 获取主数据详情数据
      getMasterDataInfo(val) {
        getMasterPersonInfos({
          //  idcard: val.idcard,
          idcard: val.id
        }).then(res => {
          if (res.code === 200) {
            this.list = res.data;
            this.openInfos();
          }
        });
      },
      // 处理数据，打开弹窗
      openInfos() {
        let vm = this;
        // vm.showData = [...vm.list];
        // vm.showData = _.chunk(vm.showData, 5);
        vm.list.map(item => {
          if (item.value) {
            vm.showData[item.columnName] = item.value
          } else {
            vm.showData[item.columnName] = "-"
          }
        })
        vm.infoFlag = true;
      },
      // 分页切换
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getMasterInfos();
      },

      // 分页序号连续
      table_index(index) {
        return (this.currentPage - 1) * this.pageSize + index + 1;
      },
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

        /deep/ .el-input__inner {
          height: 3.5rem;
          background-color: transparent;
          color: white;
          font-size: 1rem;
        }

        // 类型选择样式
        /deep/ .el-select .el-input__inner {
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

        /deep/ .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
          background-color: rgba(4, 252, 255, 0.2);
          color: #04FCFF;
        }

        /deep/ .detail .el-input-group__append,
        .el-input-group__prepend {
          width: 10.25rem;
          border: 1px solid #04FCFF;
          border-right: none;
        }

        /deep/ .el-input-group__prepend {
          background-color: transparent !important;
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
      margin-top: 1.2%;

      /deep/ .el-table,
      .el-table__expanded-cell {
        background-color: transparent;
      }

      /deep/ .el-table th {
        background: rgba(22, 150, 255, 0.06) !important;
        font-size: 1.1875rem;
        font-family: Source Han Sans CN;
        font-weight: bolder;
        color: #04FCFF;
        border-bottom: 1px solid rgba(22, 150, 255, 0.3);
        border-top: 1px solid rgba(22, 150, 255, 0.3);
      }

      /deep/ .el-table tr {
        background-color: transparent;
        height: 48px !important;
      }

      /deep/ .el-table tr:hover {
        background-color: rgba(3, 10, 10, 0.6);
      }

      /deep/ .el-table--enable-row-transition .el-table__body td,
      .el-table .cell {
        background-color: transparent;
        font-size: 1rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
      }

      /deep/ .el-table--small td,
      .el-table--small th {
        padding: 6px 0;
      }
    }

    .el-table::before {
      //去除底部白线
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
        background: transparent !important;
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
        height: 88%;
        background: url('../../assets/info3Back.png');
        background-size: 100% 100%;
      }

      /deep/ .el-dialog__title {
        color: #ffffff;
        font-size: 2rem;
        font-weight: bolder;
      }

      /deep/.el-dialog__header {
        padding: 30px 20px 10px;
      }

      /deep/ .el-dialog__headerbtn {
        font-size: 2rem;
      }

    }

    /deep/ .el-dialog__wrapper {
      background-color: rgba(0, 0, 0, 0.6);
    }



    .masterData_info /deep/ .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 0.5rem 1.25rem;

      /*padding: 5.6% 0.2% 5.6% 0.2%;*/
      .rows_header {
        background: url('../../assets/tiao.png');
        background-size: 100% 100%;
        color: #04FCFF;
        width: 100%;
        height: 3rem;
        display: flex;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        flex-grow: 1;
        border-left: 1px solid #0C3596;
        border-right: 1px solid #0C3596;
      }

      table {
        width: 100%;
        overflow: hidden;
        table-layout: fixed;
        border-collapse: collapse;
        border: 1px solid #0C3596;


        th {
          // font-weight: bold;
          color: #04FCFF;
          // padding-left: 0.6%;
          padding-right: 1rem;
          width: 18%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: right;
          background: url('../../assets/table_header.png');
          background-size: 100% 100%;
          border-right: 1px solid #0C3596;
        }

        .single_tr {
          font-size: 1.125rem;
          width: 100%;
          border-bottom: 1px solid #0C3596;

          td {
            height: 2.75rem;
            // font-weight: 500;
            color: #FFFFFF;
            white-space: nowrap;
            overflow: hidden;
            width: 82%;
            text-overflow: ellipsis;
            padding-left: 10px;
          }
        }

        .thisection_tr {
          font-size: 1.125rem;
          width: 100%;
          border-bottom: 1px solid #0C3596;

          td {
            height: 2.75rem;
            // font-weight: 500;
            color: #FFFFFF;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 10px;
          }

        }

        .table_head_style {
          background: url('../../assets/tiao.png');
          background-size: 100% 100%;
          display: flex;
          align-items: center;
        }
      }
    }
  }

</style>
