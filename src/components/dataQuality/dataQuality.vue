<template>
  <div class="quality">
    <div class="top">
      <div class="top_col" style="margin-left: -0.26rem;">
        <div class="tit other_tit">
          地理信息
        </div>
        <div class="bMap" id="allMap"></div>
        <el-row :gutter="48" style="margin-top: 7%; left: 4%;">
            <el-col :span="4">
              <div :class="positionType === '工作地'? 'dl_btn': 'dl_btn_no'"
                   @click="changePositionType('工作地')"
              >
                工作地
              </div>
            </el-col>
            <el-col :span="4">
              <div :class="positionType === '居住地'? 'dl_btn': 'dl_btn_no'"
                   @click="changePositionType('居住地')"
              >
                居住地
              </div>
            </el-col>
            <el-col :span="4">
              <div :class="positionType === '户籍地'? 'dl_btn': 'dl_btn_no'"
                   @click="changePositionType('户籍地')"
              >
                户籍地
              </div>
            </el-col>
            <el-col :span="10">
              <div class="detail" style="top: 0.2rem; right: -0.4rem">
                <el-button class="detail_bt">详细</el-button>
              </div>
            </el-col>
          </el-row>
        <!-- 内容展示区 -->
        <div class="dl_content">
          <table v-if="positionType === '工作地'" class="geren_table"
                 border="0" cellpadding="0"
                 cellspacing="0"
                 style="table-layout: fixed;"
          >
            <tr>
              <td colspan="2"><span>工作地址：</span>{{ positionData.regAddress | lableNullFilter }}</td>
            </tr>
            <tr>
              <td colspan="2"><span>工作单位：</span>{{ positionData.entName | lableNullFilter }}</td>
            </tr>
            <tr>
              <td style="width: 60%"><span>组织机构代码：</span>{{ positionData.regId | lableNullFilter }}</td>
              <td class="long_content">
                <el-tooltip class="item" effect="dark" :content="positionData.entState" placement="top">
                  <span>经营状态：{{ positionData.easyStatus | lableNullFilter }}</span>
                </el-tooltip>
              </td>
            </tr>
            <tr>
              <td><span>行业：</span>{{ positionData.industryCode | lableNullFilter }}</td>
              <td><span>公司规模：</span>{{ positionData.staffNumber | lableNullFilter }}</td>
            </tr>
          </table>
          <table v-if="positionType === '居住地'" class="geren_table" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td colspan="2"><span>现住址-省份：</span>{{ positionData.presentProvince | lableNullFilter }}</td>
            </tr>
            <tr>
              <td colspan="2"><span>现住址-市：</span>{{ positionData.presentCity | lableNullFilter }}</td>
            </tr>

            <tr>
              <td style="width: 50%"><span>现住址-区：</span>{{ positionData.presentDistrict | lableNullFilter }}</td>
              <td><span>现住址-街道：</span>{{ positionData.presentStreet | lableNullFilter }}</td>
            </tr>
            <tr>
              <td colspan="2"><span>现住址：</span>{{ positionData.presentAddress | lableNullFilter }}</td>
            </tr>
          </table>
          <table v-if="positionType === '户籍地'"class="geren_table" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td colspan="2"><span>户籍地址-省份：</span>{{ positionData.rprProvince | lableNullFilter }}</td>
            </tr>
            <tr>
              <td colspan="2"><span>户籍地址-市：</span>{{ positionData.rprCity | lableNullFilter }}</td>
            </tr>

            <tr>
              <td style="width: 50%"><span>户籍地址-区：</span>{{ positionData.rprDistrict | lableNullFilter }}</td>
              <td><span>户籍地址-街道：</span>{{ positionData.rprStreet | lableNullFilter }}</td>
            </tr>
            <tr>
              <td colspan="2"><span>详细户籍地址：</span>{{ positionData.rprAddress | lableNullFilter }}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 个人标签 -->
      <div class="top_col">
        <!-- title -->
        <div class="tit other_tit">
          个人标签
        </div>
        <!-- 搜索框 -->
        <div class="detail">
          <el-input
            size="small"
            v-model="inputIdCard"
            placeholder="请输入身份证号"
          >
            <el-button class="search_bt" slot="append" icon="el-icon-search" @click="getAllInfo"></el-button>
          </el-input>
        </div>
        <!-- 头像及个人信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <img
              class="person_img"
              :src="personInfo.hasOwnProperty('facePic') ? personInfo.facePic: defaultImg"
              alt="暂无数据"
             />
          </el-col>
          <el-col :span="12">
            <table class="geren_table">
              <tr>
                <td>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</td>
                <td>{{ personInfo.name | lableNullFilter }}</td>
              </tr>
              <tr>
                <td>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</td>
                <td>{{ personInfo.sex | lableNullFilter }}</td>
              </tr>
              <tr>
                <td>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</td>
                <td>{{ personInfo.age | lableNullFilter }}岁</td>
              </tr>
              <tr>
                <td>出生日期：</td>
                <td>{{ personInfo.birthdate | lableNullFilter }}</td>
              </tr>
              <tr>
                <td>身份证件：</td>
                <td>{{ personInfo.idcard | lableNullFilter }}</td>
              </tr>
              <tr>
                <td>手机号码：</td>
                <td>{{ personInfo.telephone | lableNullFilter }}</td>
              </tr>
            </table>
          </el-col>
          <el-col :span="2">
            <div class="detail" style="left: 1.625rem; top: 11rem">
              <el-button class="detail_bt" @click="showPersonDetail">详细</el-button>
            </div>
          </el-col>
        </el-row>
        <!-- 标志展示 -->
        <div style="height: 47%;">
          <div class="geren_logo" style="height: 49%">
            <div class="logo_base">
              <div :class="personInfo.ifOld === '否' || !personInfo.hasOwnProperty('ifOld') ? 'logo_lnrk_wu' : 'logo_lnrk_you'"></div>
              <p class="p_len_6">是否老年人口</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifRegiter === '否' || !personInfo.hasOwnProperty('ifRegiter') ? 'logo_hjrk_wu' : 'logo_hjrk_you'"></div>
              <p class="p_len_6">是否户籍人口</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifFloat === '否' || !personInfo.hasOwnProperty('ifFloat') ? 'logo_ldrk_wu' : 'logo_ldrk_you'"></div>
              <p class="p_len">是否流动人口</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifMarriage === '否' || !personInfo.hasOwnProperty('ifMarriage') ? 'logo_yh_wu':'logo_yh_you'"></div>
              <p class="p_len_4">是否已婚</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.dieFlag === '否' || !personInfo.hasOwnProperty('dieFlag') ? 'logo_die_wu':'logo_die_you'"></div>
              <p class="p_len_4">是否死亡</p>
            </div>
          </div>
          <!--<br/>-->
          <div class="geren_logo">
            <div class="logo_base">
              <div :class="personInfo.ifRecipient === '否' || !personInfo.hasOwnProperty('ifRecipient') ? 'logo_gajz_wu':'logo_gajz_you'"></div>
              <p class="p_len_6">是否关爱救助</p>
            </div>

            <div class="logo_base">
              <div :class="personInfo.ifDisability === '否' || !personInfo.hasOwnProperty('ifDisability') ? 'logo_cj_wu':'logo_cj_you'"></div>
              <p class="p_len_4">是否残疾</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifActual === '否' || !personInfo.hasOwnProperty('ifActual') ? 'logo_syrk_wu':'logo_syrk_you'"></div>
              <p class="p_len_6">是否实有人口</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifJf === '否' || !personInfo.hasOwnProperty('ifJf') ? 'logo_jfgl_wu':'logo_jfgl_you'"></div>
              <p class="p_len_6">纳入技防管理</p>
            </div>
            <div class="logo_base">
              <div :class="personInfo.ifXcjy === '否' || !personInfo.hasOwnProperty('ifXcjy') ? 'logo_xcjy_wu':'logo_xcjy_you'"></div>
              <p class="p_len_6">西城家园用户</p>
            </div>
          </div>
        </div>

      </div>
      <!-- 关系信息 -->
      <div class="top_col" style="margin-right: -0.26rem;">
        <p class="tit other_tit">关系信息</p>
        <div class="detail" style="top: 15rem; z-index: 999">
          <el-button class="detail_bt" @click="showRelationDetail">更多</el-button>
        </div>
        <div id="main" class="relation" ref="tuoPu"></div>
        <div class="relation_table">
          <el-table
          :data="relationExcel"
          stripe
          style="width: 100%"
          :row-class-name="tableRowClassName"
          >
            <el-table-column
              prop="relationLabel"
              label="关系属性"
              align="center"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="80"
            >
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="60"
            >
            </el-table-column>
            <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="60"
            >
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="联系电话"
                align="center"
                width="125"
            >
            </el-table-column>
            <el-table-column
                prop="presentAddress"
                label="家庭住址"
                align="center"
                show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 下部 -->
    <div class="bot">

      <!-- 下部左侧区域 -->
      <div class="left left_box">
        <!-- 事件信息 -->
        <div class="tit">
          事件信息
        </div>
        <div class="timeline_my">
          <div class="timeline"></div>
          <div class="time_content">
            <div class="time_item">
              <div class="item_date">
                <template v-if="Object.keys(chainInfo).length != 0">
                  <span>{{ chainInfo[2].monthId.split('-')[0] }}年{{ chainInfo[2].monthId.split('-')[1] }}月</span>
                </template>
                <template v-else>
                  <span>-&nbsp;年&nbsp;-&nbsp;月</span>
                </template>
              </div>
              <div class="item_line" >
                <div class="item_dot"></div>
              </div>
              <div class="item_content" style="bottom: 8%">
                <ul>
                  <template v-if="Object.keys(chainInfo).length != 0">
                    <li>技防开门总次数：{{ chainInfo[2].cntTotal}}&nbsp;次</li>
                    <li>技防开门成功总次数：{{ chainInfo[2].cntSuccess }}&nbsp;次</li>
                  </template>
                  <template v-else>
                    <li>技防开门总次数：-&nbsp;次</li>
                    <li>技防开门成功总次数：-&nbsp;次</li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="time_item">
              <div class="item_content" style="margin-top: -1%">
                <ul>
                  <template v-if="Object.keys(chainInfo).length != 0">
                    <li>技防开门总次数：{{ chainInfo[1].cntTotal }}&nbsp;次</li>
                    <li>技防开门成功总次数：{{ chainInfo[1].cntSuccess }} &nbsp;次</li>
                  </template>
                  <template v-else>
                    <li>技防开门总次数：-&nbsp;次</li>
                    <li>技防开门成功总次数：-&nbsp;次</li>
                  </template>
                </ul>
              </div>
              <div class="item_line">
                <div class="item_dot"></div>
              </div>
              <div class="item_date" style="bottom: 10%;">
                <template v-if="Object.keys(chainInfo).length != 0">
                  <span>{{ chainInfo[1].monthId.split('-')[0] }}年{{ chainInfo[1].monthId.split('-')[1] }}月</span>
                </template>
                <template v-else>
                  <span>-&nbsp;年&nbsp;-&nbsp;月</span>
                </template>
              </div>
            </div>
            <div class="time_item">
              <div class="item_date" >
                <template v-if="Object.keys(chainInfo).length != 0">
                  <span>{{ chainInfo[0].monthId.split('-')[0] }}年{{ chainInfo[0].monthId.split('-')[1] }}月</span>
                </template>
                <template v-else>
                  <span>-&nbsp;年&nbsp;-&nbsp;月</span>
                </template>
              </div>
              <div class="item_line">
                <div class="item_dot"></div>
              </div>
              <div class="item_content" style="bottom: 8%">
                <ul>
                  <template v-if="Object.keys(chainInfo).length != 0">
                    <li>技防开门总次数：{{ chainInfo[0].cntTotal }}&nbsp;次</li>
                    <li>技防开门成功总次数：{{ chainInfo[0].cntSuccess }}&nbsp;次</li>
                  </template>
                  <template v-else>
                    <li>技防开门总次数：-&nbsp;次</li>
                    <li>技防开门成功总次数：-&nbsp;次</li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 下部右侧展示 -->
      <div class="right">
        <div class="tit">
          个性化新闻推荐
        </div>
        <div class="bot_detail">
          <el-button class="bot_detail_bt">更多</el-button>
        </div>
        <div class="news">
          <template v-if="news.length > 0">
            <div v-for="(item,index) in news" ref="server" :class="{'animate-up': animateUp,'dataBox':true}" :key="index">
            <div class="new_img">
              <img :src="item.pic" style="width: 100%; height: 100%"/>
            </div>
            <div class="dataBoxNum">
              <div>
                <span class="news_title" style="margin-right: 1%;">{{ item.title }}</span>
              </div>
              <div style="margin-top: 2px; overflow: hidden; height: 65%">
                <el-tooltip class="item" effect="dark" :content="item.contents" placement="top">
                  <span class="news_content">
                    {{ item.contents }}
                  </span>
                </el-tooltip>
              </div>
            </div>
          </div>
          </template>
          <template v-else>
            <div class="no_news">暂 &nbsp; 无 &nbsp; 数 &nbsp; 据</div>
          </template>
        </div>
      </div>
    </div>

    <!-- 个人标签明细 -->
    <el-dialog :visible.sync="personFlag"
               class="person_info"
               top="12.3%"
               :show-close="false"
               :close-on-click-modal="false"
    >
      <div class="closeBtn" @click="closePersonDetail"></div>
      <table border rules="none">
        <tr class="single" align="center">
          <th width="12%">身份证号</th>
          <td width="38%">{{personInfo.idcard | nullFilter}}</td>
          <th width="12%">姓名</th>
          <td width="38%">{{personInfo.name | nullFilter}}</td>
        </tr>
        <tr align="center">
          <th width="12%">性别</th>
          <td width="38%">{{personInfo.sex | nullFilter}}</td>
          <th width="12%">年龄</th>
          <td width="38%">{{personInfo.age | nullFilter}}</td>
        </tr>
        <tr class="single" align="center">
          <th width="12%">出生日期</th>
          <td width="38%">{{personInfo.birthdate | nullFilter}}</td>
          <th width="12%">联系电话</th>
          <td width="38%">{{personInfo.telephone | nullFilter}}</td>
        </tr>
        <tr align="center">
          <th width="12%">出生地</th>
          <td width="38%">{{personInfo.birthAddr | nullFilter}}</td>
          <th width="12%">民族</th>
          <td width="38%">{{personInfo.ethnicGroup | nullFilter}}</td>
        </tr>
        <tr class="single" align="center">
          <th width="12%">最高学历</th>
          <td width="38%">{{personInfo.edulevel | nullFilter}}</td>
          <th width="12%">政治面貌</th>
          <td width="38%">{{personInfo.polity | nullFilter}}</td>
        </tr>
        <tr align="center">
          <th width="12%">婚姻状况</th>
          <td width="38%">{{personInfo.marriageType | nullFilter}}</td>
          <th width="12%">单位名称</th>
          <td width="38%">{{personInfo.companyname | nullFilter}}</td>
        </tr>
        <tr class="single" align="center">
          <th width="12%">家庭住址</th>
          <td width="38%">{{personInfo.presentAddress | nullFilter}}</td>
          <th width="12%">户籍登记地址</th>
          <td width="38%">{{personInfo.rprAddress | nullFilter}}</td>
        </tr>
        <tr align="center">
          <th width="12%">户口类别</th>
          <td width="38%">{{personInfo.rprtype | nullFilter}}</td>
          <th width="12%">户籍状态</th>
          <td width="38%">{{personInfo.rprstatus | nullFilter}}</td>
        </tr>
        <tr class="single" align="center">
          <th width="12%">与户主关系</th>
          <td width="38%">{{personInfo.hostrelation | nullFilter}}</td>
          <th width="12%">残疾等级</th>
          <td width="38%">{{personInfo.dlevel | nullFilter}}</td>
        </tr>
        <tr align="center">
          <th width="12%">残疾分类</th>
          <td width="38%">{{personInfo.dkind | nullFilter}}</td>
          <th width="12%">死亡日期</th>
          <td width="38%">{{personInfo.dieDate | nullFilter}}</td>
        </tr>
      </table>
    </el-dialog>

    <!-- 关系信息更多 -->
    <el-dialog :visible.sync="relationFlag"
               top="10.3%"
               title="相关用户标签"
               :close-on-click-modal="false"
    >
        <el-table
          :data="relationDetail"
          stripe
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            type="index"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="relationLabel"
            label="关系属性"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            align="center"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="telephone"
            label="联系电话"
            align="center"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="presentAddress"
            label="家庭住址"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
        <div class="page_util">
          <el-pagination
            :current-page.sync="pageNum"
            :page-size="pageSize"
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :total="total"
          >
          </el-pagination>
        </div>
    </el-dialog>
    <!-- 更新时间 -->
    <footerTime :isExplain="true" :screenId="7"/>
  </div>
</template>

<script>
  import footerTime from "../footerTime";
  import noPerson from "@/assets/renkou-3/no_person.png";
  import {
    getWorkInfo,
    getResidenceInfo,
    getRegisterInfo,
    getPersonInfo,
    getRelation,
    getRelationExcel,
    getRelationDetail,
    getChainInfo,
    getNews
  } from "../../api/newMain.js";

  export default {
    components: {
      footerTime
    },
    data() {
      return {
        // 个人标签-身份证号
        inputIdCard: "11010219640922153X",
        personInfo: {},
        // 默认图片
        defaultImg: noPerson,
        // url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        // 个人标签弹框
        personFlag: false,
        // 地理信息
        positionData: {},
        spinShow: true,

        positionType: "工作地",
        news: [],
        animateUp: false,
        timer: null,

        // 关系信息
        relationInfo: {},
        relationExcel: [],
        relationDetail: [],
        // 关系信息-更多
        relationFlag: false,
        pageNum: 1,
        pageSize: 10,
        total: 100,

        // 事件信息
        chainInfo: [],

        //点击"明细"弹出列表
        maskFlag: false,
        //矩形树图轮播下标
        mapTreeIndex: 0,
        query: {
          idcard: '11010219640922153X'
        }
      }
    },
    created() {

    },
    beforeUpdate() {
      // this.$nextTick(function() {
      //   // this.getTuoPu();
      // });
    },
    mounted() {
      // this.timer = setInterval(this.scrollAnimate, 3000);
      this.init();
    },
    methods: {
      // 页面初始化
      init() {
        this.getPersonInfo();
        this.getWorkInfo();
        this.getChainInfo();
        this.getRelation();
        this.getRelationExcel();
        this.getNews();
      },
      // 输入框 查找功能
      getAllInfo() {
        this.query.idcard = this.inputIdCard;
        setTimeout(() => {
          this.init();
        }, 2)
      },
      // 拓扑图
      getTuoPu() {
        let myChart = this.$echarts.init(this.$refs.tuoPu);
        let categories = [];
        for (let i = 0; i < 2; i++) {
          categories[i] = {
            name: '类目' + i
          };
        }

        // 圈的样式
        let itemStyle = {
            normal : { //默认样式
              label : {
                show : true
              },
              color: '#064285',
              borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
              borderColor : '#00F8FF', //设置图形边框为淡金色,透明度为0.4
              borderWidth : 4, //图形的描边线宽。为 0 时无描边。
              opacity : 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
            },
            emphasis : {//高亮状态
              color: '#714306',
              borderType : 'solid',
              borderColor : '#FDB72F',
              borderWidth : 4
            }
          };
        let data = [
            {
              name: '本人',
              des: '本人',
              fixed: true,
              x: myChart.getWidth() / 1.8,
              y: myChart.getHeight() / 2.8,
              // 圈的大小
              symbolSize: 120,
              category: 0,
              value: 30,
              label: {
                fontSize: 16
              },
              itemStyle : {
                normal : { //默认样式
                  label : {
                    show : true
                  },
                  color: '#0367A1',
                  borderType : 'solid', //图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                  borderColor : 'white', //设置图形边框为淡金色,透明度为0.4
                  borderWidth : 4, //图形的描边线宽。为 0 时无描边。
                  opacity : 1 // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
                },
                emphasis : {//高亮状态

                }
              },
            },
            {
              name: '相同单位',
              des: '相同单位',
              fixed: true,
              x: myChart.getWidth() / 2.8,
              y: myChart.getHeight() / 1.8,
              symbolSize: 95,
              value: 30,
              category: 1,
              itemStyle : itemStyle,
            },
            {
              name: '相同住所',
              des: '相同住所',
              fixed: true,
              x: myChart.getWidth()/1.6 ,
              y: myChart.getHeight()/ 1.6,
              symbolSize: 90,
              value: 10,
              category: 1,
              itemStyle : itemStyle
            },
            {
              name: '相同户号',
              des: '相同户号',
              fixed: true,
              x: myChart.getWidth() / 1.3 ,
              y: myChart.getHeight() / 3,
              symbolSize: 75,
              value: 20,
              category: 1,
              itemStyle : itemStyle,
            }
          ];
        //
        data[1].value = this.relationInfo.cntCompanyname;
        data[2].value = this.relationInfo.cntPresentAddress;
        data[3].value = this.relationInfo.cntRprno;
        let a = [this.relationInfo.cntCompanyname, this.relationInfo.cntPresentAddress, this.relationInfo.cntRprno];
        // let a = [2, 8, 5]
        // 排序后
        let b = a.sort(this.sortNum);

        // 去重后
        let c = Array.from(new Set(b));

        let sizes = [];
        let initSize = 100;
        for(let i = 0; i < c.length; i++) {
          let item = {};
          item.data = c[i];
          item.size = initSize;
          initSize -= 10;
          sizes.push(item);
        }

        data[1].symbolSize = sizes[c.indexOf(data[1].value)].size;
        data[2].symbolSize = sizes[c.indexOf(data[2].value)].size;
        data[3].symbolSize = sizes[c.indexOf(data[3].value)].size;

        let option = {
            // 提示框的配置
            tooltip: {
              formatter: function (x) {
                if (x.data.name !== '本人') {
                  return x.data.des;
                }
              }
            },
            series: [{
              type: 'graph', // 类型:关系图
              layout: 'force', //图的布局，类型为力导图
              symbolSize: 40, // 调整节点的大小
              // top: '10%',//上下位置
              // left: '10%',//左右位置
              width: 'auto',
              height: 'auto',
              // 是否开启鼠标缩放和平移漫游。默认不开启。
              // 如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
              roam: false,
              // edgeSymbol: ['circle', 'arrow'],
              // 关系图节点标记的大小,宽为2 高为10
              edgeSymbolSize: [2, 10],
              // 力引导布局相关的配置项
              force: {
                //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                gravity:0.02,
                // 节点之间的斥力因子
                repulsion: [500, 1000],
                // 边的两个节点之间的距离
                edgeLength: [20, 50]
              },
              draggable: false,
              animation: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: '#4b565b',
                }
              },
              edgeLabel: {
                normal: {
                  show: false,
                  textStyle: {
                    fontSize: 16
                  },
                  formatter: function (x) {
                    return x.data.name;
                  }
                }
              },
              label: {
                normal: {
                  show: true,
                  formatter: function (x) {
                    if (x.data.name === '本人') {
                      return '{color3|' + x.data.name + '}'
                    } else {
                      return  '{color2|' + x.data.value + '人' + '}'+ '\n\n' + '{color1|' + x.data.name + '}'
                    }
                  },
                  rich: {
                    // 白色-名称
                    color1: {
                      color: '#FFFFFF',
                      fontSize: 16
                    },
                    // 数量
                    color2: {
                      color: '#17FFFF',
                      align: 'center',
                      fontSize: 20
                    },
                    color3: {
                      color: '#FFFFFF',
                      fontSize: 28
                    }
                  },
                  textStyle: {}
                }
              },

              // 数据
              data: data,
              links: [
                {
                  source: '本人',
                  target: '相同单位',
                  name: 'link01',
                  des: 'link01des',
                  lineStyle: {
                    normal: {
                      color: '#17FFF3'
                    }
                  }
                }, {
                  source: '本人',
                  target: '相同住所',
                  name: 'link02',
                  des: 'link02des',
                  lineStyle: {
                    normal: {
                      color: '#17FFF3'
                    }
                  }
                }, {
                  source: '本人',
                  target: '相同户号',
                  name: 'link04',
                  des: 'link05des',
                  lineStyle: {
                    normal: {
                      color: '#17FFF3'
                    }
                  }
                }],
              categories: categories,
            }]
          };
        myChart.setOption(option);
      },

      // 数组大小排序-从大到小
      sortNum(a, b) {
        return b - a; // 从小到大 return a - b; 即可
      },

      //table斑马线
      tableRowClassName({row,rowIndex}) {
        let index = rowIndex + 1;
        if (index % 2 === 0) {
          return 'warning-row'
        }
      },

      //地图位置-地图
      baiDuMap () {
        debugger
        let map = new BMap.Map('allMap');

        let localSearch = new BMap.LocalSearch(map);
        localSearch.enableAutoViewport(); //允许自动调节窗体大小

        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

        let point = new BMap.Point(this.positionData.lng, this.positionData.lat); // 创建点坐标
        let marker = new BMap.Marker(point); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        map.centerAndZoom(point, 18); // 初始化地图，设置中心点坐标和地图级别 18
        // //点击图标时候调用信息窗口
        // var infoWindow = new BMap.InfoWindow(sContent);
        // marker.addEventListener('click', function() {
        //   this.openInfoWindow(infoWindow);
        // });
        // 设置背景色
        // let mapStyle={style:"midnight"};
        // map.setMapStyle(mapStyle);

        let styleJson = [
          {
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
              "color": "#032338"
            }
          },
          {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
              "color": "#032338"
            }
          },
          {
            "featureType": "highway",
            "elementType": "all",
            "stylers": {
              "lightness": -42,
              "saturation": -91
            }
          },
          {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
              "lightness": -77,
              "saturation": -94
            }
          },
          {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
              "color": "#1b1b1b"
            }
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
              "color": "#000000"
            }
          },
          {
            "featureType": "subway",
            "elementType": "geometry.stroke",
            "stylers": {
              "color": "#000000"
            }
          },
          {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
              "lightness": -52
            }
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": {
              // "visibility": "no"
              "color": "#313131"
            }
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": {
              "color": "#ffffff"
            }
          },
          {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
              "color": "#07304c"
            }
          },
          {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
              "lightness": -75,
              "saturation": -91
            }
          },
          {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
              "lightness": -65
            }
          },
          {
            "featureType": "railway",
            "elementType": "all",
            "stylers": {
              "lightness": -40
            }
          },
          {
            "featureType": "boundary",
            "elementType": "geometry",
            "stylers": {
              "color": "#000100",
              "weight": "1",
              "lightness": -29
            }
          }
        ];


        map.setMapStyle({styleJson: styleJson});


        this.spinShow = false;
      },

      // 工作地-居住地-户籍地 切换
      changePositionType(type) {
        this.positionType = type;
        this.positionData = {};
        switch(type) {
          case '工作地':
            this.getWorkInfo();
            break;
          case '居住地':
            this.getResidenceInfo();
            break;
          case '户籍地':
            this.getRegisterInfo();
            break;
        }
        // this.baiDuMap();
      },

      // 获取工作地相关信息
      getWorkInfo() {
        getWorkInfo(this.query).then(res => {
          if (res.code == 200) {
            setTimeout(() => {
              this.positionData = res.data;
              // 经营状态长度过长问题
              if (res.data.entState.length > 8) {
                this.positionData.easyStatus = res.data.entState.substr(0,8) + '...';
              } else {
                this.positionData.easyStatus = res.data.entState;
              }
              this.baiDuMap();
            }, 1);
          } else {
            this.positionData = {};
            this.positionData.lng= 116.36003;
            this.positionData.lat = 39.9305;
            this.baiDuMap();
          }
        })
      },
      // 获取户籍地相关信息
      getRegisterInfo() {
        getRegisterInfo(this.query).then(res => {
          if (res.code == 200) {
            this.positionData = res.data;
            this.baiDuMap();
          }else {
            this.positionData = {};
            this.positionData.lng= 116.36003;
            this.positionData.lat = 39.9305;
            this.baiDuMap();
          }
        })

      },
      // 获取居住地相关信息
      getResidenceInfo() {
        getResidenceInfo(this.query).then(res => {
          if (res.code == 200) {
            this.positionData = res.data;
            this.baiDuMap();
          }else {
            this.positionData = {};
            this.positionData.lng= 116.36003;
            this.positionData.lat = 39.9305;
            this.baiDuMap();
          }
        })
      },

      // 获取个人标签信息
      getPersonInfo() {
        getPersonInfo(this.query).then(res => {
          if (res.code == 200) {
            setTimeout(() => {
              this.personInfo = res.data;
            }, 3);
          } else {
            this.personInfo = {};
          }
        })
      },

      // 获取个人标签详细信息
      showPersonDetail() {
        this.personFlag = !this.personFlag;
      },

      // 关闭个人标签详细信息
      closePersonDetail() {
        this.personFlag = !this.personFlag;
      },

      // 关系信息-标签信息
      getRelation() {
        getRelation(this.query).then(res => {
          if (res.code == 200) {
            this.relationInfo = res.data;
            setTimeout(() => {
              this.getTuoPu();
            }, 5)
          } else {
            this.relationInfo.cntCompanyname = 0;
            this.relationInfo.cntPresentAddress = 0;
            this.relationInfo.cntRprno = 0;
            setTimeout(() => {
              this.getTuoPu();
            }, 5)
          }
        })
      },

      getRelationExcel() {
        getRelationExcel(this.query).then(res => {
          if (res.code == 200) {
            this.relationExcel = res.data;
          } else {
            this.relationExcel = [];
          }
        })
      },

      getRelationDetail(val) {
        this.query.pageNum = val;
        getRelationDetail(this.query).then(res => {
          if (res.code == 200) {
            this.relationDetail = res.data.list;
            this.total = res.data.total;
          } else {
            this.relationDetail = [];
          }
        })
      },

      // 关系信息-更多
      showRelationDetail() {
        this.getRelationDetail(this.pageNum);
        this.relationFlag = !this.relationFlag;
      },

      // 关系信息-分页
      handleCurrentChange(val) {
        this.getRelationDetail(val);
      },

      // 事件信息
      getChainInfo() {
        getChainInfo(this.query).then(res => {
          if (res.code == 200) {
            setTimeout(() => {
              this.chainInfo = res.data;
            }, 1);
          }
        })
      },

      // 获取个性化新闻推荐
      getNews() {
        getNews(this.query).then(res => {
          if (res.code == 200) {
            this.news = res.data;
          } else {
            this.news = [];
          }
        })
      },

      scrollAnimate() {
        this.animateUp = true;
        setTimeout(() => {
          this.news.shift();
          this.news.push(this.news[0]);
          this.animateUp = false
        }, 500)
      },
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
      &:before {
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

    .other_tit {
      top: 1.2rem;
      left: 1.5rem;
    }

    // 上半部展示
    .top {
      width: 100%;
      /*height: 67%;*/
      height: 62.75%;
      /*padding: 1.25rem;*/
      /*padding-right: 3.75rem;*/
      /*padding-bottom: 1.5rem;*/

      position: relative;
      display: flex;
      justify-content: space-between;
      .top_col {
        width: 100%;
        height: 100%;
        background: url(../../assets/renkou-3/top_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        .person_img {
          position: relative;
          width: 10.375rem;
          height: 12.125rem;
          top: 2rem;
          left: 1.3125rem;
          border: none;
        }

        .geren_table {
          color: #FFFFFF;
          font-size: 1.125rem;
          font-family: SourceHanSansCN-Regular;

          tr {
            height: 2rem;
          }
        }

        .geren_logo {
          width: 100%;
          height: 50%;
          position: relative;
          display: flex;
          justify-content: space-between;
          /*padding: 1.5rem 1.3125rem;*/
          left: 1.3125rem;
          top: 1.5rem;
          /*top: 5%;*/

          /*padding-top: 1.5rem;*/
          .logo_base {
            width: 100%;
            height: 100%;
            position: relative;
            .logo {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/lnrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_lnrk_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/lnrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_lnrk_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/lnrk_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*户籍人口*/
            .logo_hjrk_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/hjrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_hjrk_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/hjrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*流动人口*/
            .logo_ldrk_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/ldrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_ldrk_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/ldrk_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*是否已婚*/
            .logo_yh_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/yh_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_yh_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/yh_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*是否死亡*/
            .logo_die_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/die_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_die_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/die_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*是否关爱救助*/
            .logo_gajz_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/gajz_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_gajz_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/gajz_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*是否残疾*/
            .logo_cj_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/cj_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_cj_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/cj_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*是否实有人口*/
            .logo_syrk_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/syrk_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_syrk_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/syrk_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            /*纳入技防管理*/
            .logo_jfgl_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/jfgl_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_jfgl_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/jfgl_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }

            /*西城家园用户*/
            .logo_xcjy_wu {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/xcjy_wu.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            .logo_xcjy_you {
              width: 4.69rem;
              height: 4.25rem;
              background: url(../../assets/renkou-3/xcjy_you.png) no-repeat;
              background-size: 100% 100%;
              position: relative;
            }
            p {
              font-size: 1rem;
              font-family: SourceHanSansCN;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 38px;
            }
            /*长度为6的样式*/
            .p_len_6 {
              margin-left: -5px;
            }
            /*长度为4的样式*/
            .p_len_4 {
              margin-left: 6px;
            }
          }
        }

        // 地理信息-地图
        .bMap {
          width: 92%;
          height: 33.72%;
          left: 4%;
          top: 5%;
          position: relative;
        }

        .dl_btn {
          width: 6.125rem;
          height: 2.125rem;
          background: url(../../assets/renkou-3/dili/xuanzhong-btn.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
          color: #F2FFFE;
          text-align: center;
          line-height: 2.125rem;
        }

        .dl_btn_no {
          width: 6.125rem;
          height: 2.125rem;
          background: url(../../assets/renkou-3/dili/noxuanzhong-btn.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
          color: #F2FFFE;
          text-align: center;
          line-height: 2.125rem;
        }

        /* 内容展示区 */
        .dl_content {
          left: 4%;
          margin-top: 2%;
          position: relative;
          height: 40%;
          /*font-family: SourceHanSansCN-Regular;*/
          /*font-size: 1.125rem;*/
          table {
            width: 98%;
            height: 100%;
            tr{
              /*height: ;*/
              line-height: 3rem;
            }
          }
          .long_content {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-left: 10%;
            .item {
              margin: 4px;
            }
          }
        }
      }
      .relation {
        position: relative;
        height: 50%;
        width: 90%;
        top: 5%;
        left: 5%;
      }

      .relation_table {
        position: relative;
        width: 91.8%;
        left: 4%;
        top: 5%;
      }
      .relation_table /deep/  .el-table, .el-table__expanded-cell {
        background-color: transparent;
      }

      .relation_table /deep/ .el-table th {
        background-color: #003260!important;
        color: #FFB21E;
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        border-top: 1px solid #00FFFF;
        border-bottom: none;
      }

      .relation_table /deep/ .el-table tr {
        background-color: transparent;
        color: #FFFFFF;
        font-size: 1rem;
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
      }
      .relation_table /deep/  .el-table--enable-row-transition .el-table__body td, .el-table .cell{
        background-color: transparent;
        border: none;
      }
      .el-table::before {//去除底部白线
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
      }

      // 关系信息-详细按钮
      .detail {
        position: relative;
        top: -0.55rem;
        right: 1.625rem;
        float: right;
        .detail_bt {
          border-color: #FDB72F;
          background-color: #3E301D;
          width: 4.125rem;
          height: 1.625rem;
          font-size: 1.125rem;
          color: #FDB72F;
          padding: 0 ;
        }
        .search_bt {
          /*width: 1px;*/
          color: #0EFCFF;
          padding: 0 0.2rem;
        }
      }

    }

    // 下半部分
    .bot {
      width: 100%;
      /*height: 26.35%;*/
      height: 29.60%;
      /*margin-top: 0.1%;*/
      display: flex;
      justify-content: space-between;

      // 下半部分左侧--质量提升
      .left {
        width: 66.50%;
        height: 99.5%;
        padding: 1.25rem;
        margin-left: 0.06rem;
        margin-top: 0.25rem;
        background: url(../../assets/renkou-3/zuoxia_1.png) no-repeat;
        background-size: 100% 98%;

        .timeline_my {
          margin-left: 15%;
          color: white;
          padding-top: 1%;
          height: 100%;

          .timeline {
            width: 98%;
            height: 26px;
            position: relative;
            top: 30%;
            margin-left: 10px;
            background: url(../../assets/renkou-3/time.png) no-repeat;
            background-size: 100% 100%;
          }

          .time_content {
            width: 95%;
            height: 100%;
            left: 2%;
            margin-top: -4%;
            position: relative;
            display: flex;
            display: -webkit-flex;/*Safari*/
            justify-content: space-between;/*水平排布方式*/
            align-items: center;/*垂直对齐方式*/

            .time_item {
              width: 33%;
              height: 100%;
              position: relative;
              /*border: yellow 1px solid;*/

              .item_date {
                width: 7.25rem;
                height: 3.0625rem;
                border: 2px solid #00FFFF;
                border-radius: 1.5625rem;
                /*position: relative;*/
                /*left: 35%;*/
                position: fixed;
                margin-left: 5%;
                text-align: center;
                line-height: 3.0625rem;;
                font-size: 1.125rem;
                font-family: Arial;
                font-weight: 400;
                color: #00FFFF;
              }

              .item_line {
                width: 2px;
                height: 32%;
                background: #00FFFF;
                position: relative;
                left: 48%;
                top: 25%;

                .item_dot {
                  width: 15px;
                  height: 15px;
                  position: relative;
                  border-radius: 50%;
                  background-color: aqua;
                  top: 58%;
                  transform: translateY(-50%);
                  left: -0.36rem;
                }
              }

              .item_content {
                width: 21.125rem;
                height: 4.375rem;
                border: 2px solid #00FFFF;
                border-radius: 2.1875rem;
                position: fixed;

                font-size: 1rem;
                font-family: Arial;
                font-weight: 400;
                color: #00FFFF;
                ul {
                  margin: 1% 0 0 2.5rem;
                  line-height: 100%;
                }

                li {
                  line-height: 1.75rem;
                }

                ul, ol, li {
                  list-style: disc;
                }
              }
            }
          }
        }
        /* -------------------------------------
 * timeline
 * ------------------------------------- */
        #timeline {
          list-style: none;
          margin: 20px 160px 0;
          padding: 0;
          border-top: 8px solid #eee9dc;
          display: table;
          border-spacing: 30px 0;
          color: white;
        }
        #timeline li {
          display: table-cell;
        }
        #timeline li .relative {
          position: relative;
        }
        #timeline p {
          margin: 0 0 15px;
        }

        .date {
          text-align: center;
          top: -55px;
          left: 0;
          right: 0;
          font-size: 0.95em;
          line-height: 20px;
          position: absolute;
        }

        .circle {
          margin: 0 auto;
          top: -14px;
          left: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: #48b379;
          border: 5px solid #eee9dc;
          border-radius: 50%;
          display: block;
          position: absolute;
        }

        .content {
          width: 200px;
          max-height: 0;
          margin-top: 40px;
          vertical-align: top;
          padding: 50px 15px 15px;
          transition: width 0.4s linear, max-height 0.4s linear;
          border-width: 2px;
          border-style: solid;
          border-radius: 0.5em;
          position: relative;
        }
        .content:before, .content:after {
          content: "";
          width: 0;
          height: 0;
          border: solid transparent;
          position: absolute;
          pointer-events: none;
          bottom: 100%;
        }
        .content:before {
          border-bottom-color: inherit;
          border-width: 15px;
          left: 50%;
          margin-left: -15px;
        }
        .content:after {
          border-bottom-color: #48b379;
          border-width: 12px;
          left: 50%;
          margin-left: -12px;
        }
        .content p {
          max-height: 0;
          color: transparent;
          text-align: justify;
          word-break: break-word;
          hyphens: auto;
          overflow: hidden;
        }

        label {
          font-size: 1.3em;
          position: absolute;
          z-index: 100;
          cursor: pointer;
          width: 200px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          display: block;
          top: 60px;
          left: 15px;
        }

        .radio {
          display: none;
        }

        .radio:checked + .relative label {
          cursor: auto;
          width: 400px;
          transition: width 0.3s linear 0.2s;
        }
        .radio:checked + .relative .circle {
          background: #f98262;
        }
        .radio:checked ~ .content {
          max-height: 180px;
          border-color: #eee9dc;
          width: 400px;
        }
        .radio:checked ~ .content p {
          max-height: 200px;
          color: #eee9dc;
          transition: color 0.3s linear 0.3s;
        }
      }

      // 下半部右侧展示--质量报告
      .right {
        width: 33.04%;
        height: 100%;
        padding: 1.25rem;
        /*margin-right: -0.06rem;*/
        background: url(../../assets/renkou-3/youxia.png) no-repeat;
        background-size: 100% 100%;
        position: relative;

        .news {
          width: 93%;
          height: 72%;
          position: absolute;
          overflow: hidden;
          padding-top: 0.58330%;
          transition: all 0.5s;
          .dataBox {
            flex: 1;
            width: 100%;
            height: 45%;
            margin-bottom: 2.838%;
          }
          .new_img {
            position: relative;
            width: 28.252%;
            height: 93.15%;
            float: left;
            background-color: yellow;
            border-radius: 0.5rem;
            /*background: url(../../assets/renkou-3/youxia.png) no-repeat;*/
            /*background-size: 100% 100%;*/
          }
          .dataBoxNum {
            position: relative;
            width: 67.8%;
            height: 93.15%;
            float: left;
            margin-left: 1.3125rem;
          }

          .news_title {
            font-size: 1.125rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #FFFFFF;
          }

          .news_content {
            font-size: 1rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: #E8E8E8;
            line-height: 1.5rem;
          }

          .no_news {
            width: 100%;
            color: white;
            text-align: center;
            display: inline-block;
            vertical-align: middle;
            top:45%;
            font-size: 2rem;
            margin: auto;
            transform:translateY(-45%);
            position: absolute;
          }
        }



        .animate-up {
          transition: all 0.5s ease-in-out;
          transform: translateY(-120%);
        }
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

      .bot_detail {
        position: relative;
        top: -1.85rem;
        right: 0.1rem;
        float: right;
        .bot_detail_bt {
          border-color: #FDB72F;
          background-color: #3E301D;
          width: 4.125rem;
          height: 1.625rem;
          font-size: 1.125rem;
          color: #FDB72F;
          padding: 0 ;
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

    .person_info /deep/ .el-dialog {
      opacity: 1;
      width: 58%;
      height: 55.44%;
      background: url('../../assets/info4Back.png');
      background-size: 100% 100%;
    }

    .person_info {

      // 右上角关闭按钮
      .closeBtn {
        width: 2%;
        height: 5%;
        background: url(../../assets/closeBtn.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.35;
        position: absolute;
        top: 2%;
        right: 1%;
        cursor: pointer;
        z-index: 99;
      }
    }

    .person_info /deep/ .el-dialog__header {
      display: none;
    }

    .person_info /deep/ .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 5.6% 0.2% 5.6% 0.2%;

      // overflow: hidden;
      table {
        width: 100%;
        height: 100%;
        border: none;

        tr {

          font-size: 1.125rem;

          th {
            font-weight: bold;
            color: #04FCFF;
            padding-left: 0.6%;
          }

          td {
            font-weight: 500;
            color: #FFFFFF;

            // div{
            // 	max-height: 200px;
            // 	overflow: hidden;
            // }
          }
        }

        .single {
          background: url('../../assets/tiao.png');
          background-size: 100% 100%;
        }

        .double {}
      }
    }
  }
</style>
<style>
  .el-table .warning-row{
    background: #003260!important;
  }

  .detail .el-input--small .el-input__inner {
    height: 1.51rem;
    /*width: 1.81rem;*/
  }

  .detail .el-input__inner {
    border: 1px solid #04FCFF;
    background-color: transparent;
    border-radius: 10px 0 0 10px;
    font-size: 1rem;
    color: #01B7CC;
  }

  /* 设置input placeholder的样式*/
  .detail .el-input__inner::placeholder {
    color: #01B7CC;
  }
  /* 谷歌 */
  .detail .el-input__inner::-webkit-input-placeholder {
    color: #01B7CC;
  }
  /* 火狐 */
  .detail .el-input__inner:-moz-placeholder {
    color: #01B7CC;
  }
  /*ie*/
  .detail .el-input__inner:-ms-input-placeholder {
    color: #01B7CC;
  }

  .detail .el-input-group__append, .el-input-group__prepend {
    background-color: transparent;
    border: 1px solid #04FCFF;
    border-left: none;
    border-radius: 0 10px 10px 0;
    width: 0.25rem;
    padding: 0 0.1875rem 0 1.25rem;
  }

  /* 去除地图的标志 */
  .BMap_cpyCtrl {
    display: none;
  }
  .anchorBL {
    display: none;
  }

  /* 分页 */
  .page_util .el-pagination {
    margin-top: 1rem;
    text-align: right;
  }
  /* 时间轴 */
  .timeline_my .el-timeline {
    padding-top: 1%;
  }
  .timeline_my .el-timeline-item__tail {
    border: 0;
    background: rgba(0, 228, 255, 0.5);
    width: 100%;
    height: 11px;
    top: 88%;
  }

  .timeline_my .el-timeline-item__node {
    top: 85%;
    background: #00FFFF;
  }
</style>
