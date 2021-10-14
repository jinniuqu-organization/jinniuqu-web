<template>
  <!-- 按照height:926px width:1920px进行开发 -->
  <div class="main">

      <!-- 首页导航栏下部提示 -->
      <div class="tit">
         <!-- 提示语前面原型标识 -->
         <div class="circle"></div>
         <!-- 提示语内容 -->
         <div class="titWord">
            数据治理工作需要站在全局角度，全区联动，制定组织架构蓝图。数据治理组织架构以及数据治理委员会为权威机构，逐级驱动和保障数据治理工作的顺利进行，使得管理闭环。
         </div>
      </div>

     <!-- 内容区域 -->
      <div class="content">
          <!-- 左侧展示区（数据治理组织架构） -->
          <div class="content_left">

               <!-- 标题文字 -->
              <div class="head">
                 <span>数据治理组织架构</span>
              </div>
              <div class="boxes">
                <!-- 内容展开 --决策层-->
                <div class="box top">
                    <!-- 决策层 -->
                    <div class="box_left"><span>决</span><span>策</span><span>层</span></div>

                    <!-- 决策层右侧对应内容 -->
                    <div class="box_right">

                      <!-- 四角边框 -->
                      <!-- 左上角 -->
                      <div class="lt"></div>
                      <!-- 右上角 -->
                      <div class="rt"></div>
                      <!-- 左下角 -->
                      <div class="lb"></div>
                      <!-- 右下角 -->
                      <div class="rb"></div>

                        <!-- 数据治理委员会 -->
                        <div class="box_right_left">
                           <div class="box_rl_tit">数据治理委员会</div>
                           <!-- 数据治理委员会组成 -->
                           <div class="box_rl_content">
                              <div class="bcard">
                                 <div class="bcard_pic"></div>
                                 <div class="bcard_word">
                                   <div class="bcard_word_top">组长</div>
                                   <div class="bcard_word_bot">(区领导)</div>
                                 </div>
                              </div>
                              <div class="bcard">
                                 <div class="bcard_pic midPic"></div>
                                 <div class="bcard_word">
                                   <div class="bcard_word_top">副组长</div>
                                   <div class="bcard_word_bot">(科信局领导)</div>
                                 </div>
                              </div>
                              <div class="bcard">
                                 <div class="bcard_pic midPic"></div>
                                 <div class="bcard_word">
                                   <div class="bcard_word_top">大数据专家</div>
                                   <div class="bcard_word_bot">咨询委</div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <!-- 数据管理制度委员会/数据管理制度团队 -->
                        <div class="box_right_right">
                          <div class="box_rr_tit">数据管理制度委员会/数据管理制度团队</div>
                          <!-- 成员展示--轮播图部分 -->
                          <div class="box_rr_content">
                              <el-carousel height="100%" arrow="never">
                                    <el-carousel-item v-for="item in 4" :key="item">
                                        <!-- 单个轮播图内容--成员头像+职称 -->
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">区民政局</div>
                                             <div class="bcard_word_bot">领导</div>
                                           </div>
                                        </div>
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">北京市公安局</div>
                                             <div class="bcard_word_bot">西城分局领导</div>
                                           </div>
                                        </div>
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">区卫生健康委</div>
                                             <div class="bcard_word_bot">领导</div>
                                           </div>
                                        </div>
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">区市场监管局</div>
                                             <div class="bcard_word_bot">领导</div>
                                           </div>
                                        </div>
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">区城市管理委</div>
                                             <div class="bcard_word_bot">领导</div>
                                           </div>
                                        </div>
                                        <div class="bcard">
                                           <div class="bcard_pic"></div>
                                           <div class="bcard_word">
                                             <div class="bcard_word_top">区统计局</div>
                                             <div class="bcard_word_bot">领导</div>
                                           </div>
                                        </div>
                                    </el-carousel-item>
                               </el-carousel>
                          </div>
                        </div>
                    </div>
                </div>

                <!-- 管理层内容 -->
                <div class="box mid">

                    <div class="box_left"><span>管</span><span>理</span><span>层</span></div>

                    <!-- 管理层右侧内容展示 -->
                    <div class="box_right">

                        <!-- 四角边框 -->
                        <!-- 左上角 -->
                        <div class="lt"></div>
                        <!-- 右上角 -->
                        <div class="rt"></div>
                        <!-- 左下角 -->
                        <div class="lb"></div>
                        <!-- 右下角 -->
                        <div class="rb"></div>

                        <!-- 数据治理办公室 -->
                        <div class="box_right_left">
                           <div class="box_rl_tit">数据治理办公室</div>
                           <!-- 数据办公室成员组成 -->
                           <div class="box_rl_content">
                              <div class="bcard">
                                 <div class="bcard_pic"></div>
                                 <div class="bcard_word">
                                   <div class="bcard_word_top">区科技和信息化局</div>
                                   <div class="bcard_word_bot">(区大数据管理局)</div>
                                 </div>
                              </div>
                              <div class="bcard">
                                 <div class="bcard_pic"></div>
                                 <div class="bcard_word">
                                   <div class="bcard_word_top">管理层助理</div>
                                   <div class="bcard_word_top"></div>
                                 </div>
                              </div>
                           </div>
                        </div>

                        <!-- 管理部门 -->
                        <div class="box_right_right">
                          <div class="box_rr_content">
                             <div class="tit">
                                <div class="circle"></div>
                                <div class="titWord">
                                   管理部门
                                </div>
                             </div>
                             <!-- 部门成员 -->
                             <div class="adpart">
                                <div class="adpart_box"><span>数据质量主管</span></div>
                                <div class="adpart_box"><span>数据需求与服务主管</span></div>
                                <div class="adpart_box"><span>元数据主管</span></div>
                             </div>
                             <div class="adpart">
                               <div class="adpart_box"><span>生命周期主管</span></div>
                               <div class="adpart_box"><span>数据架构主管</span></div>
                               <div class="adpart_box"><span>数据安全主管</span></div>
                             </div>
                          </div>
                        </div>
                    </div>
                </div>

                <!-- 执行层 -->
                <div class="box bot">

                    <div class="box_left"><span>执</span><span>行</span><span>层</span></div>

                    <!-- 执行层右侧内容展示 -->
                    <div class="box_right">

                        <!-- 四角边框 -->
                        <!-- 左上角 -->
                        <div class="lt"></div>
                        <!-- 右上角 -->
                        <div class="rt"></div>
                        <!-- 左下角 -->
                        <div class="lb"></div>
                        <!-- 右下角 -->
                        <div class="rb"></div>

                        <div class="box_right_left">
                           <div class="box_rl_tit">数据管理服务组织</div>
                           <!-- 数据管理组织组成--技术方-->
                           <div class="box_rl_content">
                              <div class="tit">
                                 <div class="circle"></div>
                                 <div class="titWord">
                                    技术方
                                 </div>
                              </div>
                             <div class="bcard_box">
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">元数据</div>
                                    <div class="bcard_word_bot">专家</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">数据质量</div>
                                    <div class="bcard_word_bot">分析师</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">数据整合</div>
                                    <div class="bcard_word_bot">架构师</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">编码管理</div>
                                    <div class="bcard_word_bot">专家</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">主数据管理</div>
                                    <div class="bcard_word_bot">专家</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">基础开发</div>
                                    <div class="bcard_word_bot">人员</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">数据库</div>
                                    <div class="bcard_word_bot">管理员</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">数据</div>
                                    <div class="bcard_word_bot">架构师</div>
                                  </div>
                               </div>
                               <div class="bcard">
                                  <div class="bcard_pic"></div>
                                  <div class="bcard_word">
                                    <div class="bcard_word_top">业务流程</div>
                                    <div class="bcard_word_bot">分析师</div>
                                  </div>
                               </div>

                             </div>
                           </div>
                        </div>

                       <!-- 各相关委、办、局 -->
                        <div class="box_right_right">
                          <div class="box_rr_content">
                                 <div class="tit">
                                    <div class="circle"></div>
                                    <div class="titWord">
                                       各相关委、办、局
                                    </div>
                                 </div>
                                <div class="bcard_box">
                                  <div class="bcard">
                                     <div class="bcard_pic"></div>
                                     <div class="bcard_word">
                                       <div class="bcard_word_top">业务线数据</div>
                                       <div class="bcard_word_bot">管理专家</div>
                                     </div>
                                  </div>
                                  <div class="bcard">
                                     <div class="bcard_pic"></div>
                                     <div class="bcard_word">
                                       <div class="bcard_word_top">系统线数据</div>
                                       <div class="bcard_word_bot">管理专家</div>
                                     </div>
                                  </div>
                                </div>
                          </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>


          <!-- 右侧展示区（职责）-->
          <div class="content_right">

               <!-- 标题文字 -->
               <div class="head">
                  <span>职责</span>
               </div>

               <!-- 具体内容区域 -->
               <div class="boxes rightBox">
                   <!-- 四角边框 -->
                   <!-- 左上角 -->
                   <div class="lt"></div>
                   <!-- 右上角 -->
                   <div class="rt"></div>
                   <!-- 左下角 -->
                   <div class="lb"></div>
                   <!-- 右下角 -->
                   <div class="rb"></div>
                  <!-- 各组织组成及功能介绍 -->
                  <div class="info">
                     <div class="info_head">
                       <div class="circle"></div>
                       <div class="word">数据治理委员会</div>
                     </div>
                     <div class="info_content">
                       组织内部负责数据治理的最高级别权威机构
                     </div>
                  </div>
                  <div class="info">
                     <div class="info_head">
                       <div class="circle"></div>
                       <div class="word">数据管理制度委员会</div>
                     </div>
                     <div class="info_content">
                       由协调数据管理专员组成的一个或多个跨职能的团队，负责支持和监督由数据治理委员会发起的数据治理举措，数据治理委员会可以向一个或多个数据管理制度委员会委托授权。
                     </div>
                  </div>
                  <div class="info">
                     <div class="info_head">
                       <div class="circle"></div>
                       <div class="word">数据管理制度团队</div>
                     </div>
                     <div class="info_content">
                       由业务数据管理专员组成的一个或多个临时或永久的团队，负责在特定领域内对数据治理工作进行协同，由协调员出人领导，数据架构师、数据管理制度推行人辅助领导。
                     </div>
                  </div>
                  <div class="info">
                     <div class="info_head">
                       <div class="circle"></div>
                       <div class="word">数据治理办公室</div>
                     </div>
                     <div class="info_content">
                       对数据治理委员会、数据管理制度委员会、数据管理制度团队提供工作支持，推动数据管理专员的各项活动。
                     </div>
                  </div>
                  <div class="info">
                     <div class="info_head">
                       <div class="circle"></div>
                       <div class="word">数据管理服务组织</div>
                     </div>
                     <div class="info_content">
                       由数据管理专业人员组成的一个或多个工作单元，包括数据管理经理、数据架构师、数据质量分析师、元数据专家、数据整合架构师等，是数据治理的执行单位。
                     </div>
                  </div>
               </div>
          </div>
      </div>
  </div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
// 首次进入项目,默认显示页面主题部分
.main{
  width:100%;
  height:100%;
  padding:0 2.6%;
     // 标题栏下文字叙述
    .tit{
       width:100%;
       height:11%;
       display:flex;
       align-items:center;
         //文字前修饰圆圈
         .circle{
            // width:0.54%;
            // height:9.52%;
            width:10px;
            height:10px;
            background:rgba(4,252,255,1);
            border-radius:50%;
            margin-right:0.5%;
         }
         // 文字叙述文案
         .titWord{
           color:rgba(255,255,255,1);
           font-family:SOURCEHANSANSCN-REGULAR;
           font-weight:400;
           font-size:1.375rem;
         }
    }
    .bot .tit{
      margin-bottom: 0.75rem;
    }


     // 具体内容分别展开
    .content{
       width:100%;
       height:84%;
       display:flex;
       justify-content:space-between;
        // 主要内容分左右两部分展示
        .content_left,.content_right{
          width:71.81%;
          height:100%;
            // 两侧头部标题
           .head{
              width:100%;
              padding-left:1.6%;
              color:rgba(255,255,255,1);
              font-family:SOURCEHANSANSCN-REGULAR;
              font-weight:400;
              font-size:1.625rem;
              height:6.78%;
              display:flex;
              align-items:center;
              background:url("../../assets/bg_shuju.png") no-repeat;
              background-size:100% 100%;
           }
           .boxes{
            width: 100%;
            height: 91.755%;
            display:flex;
            flex-direction:column;
            justify-content: space-between;
           }
        }
        // 左边:数据治理组织架构
        .content_left{
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            //决策层、管理层、执行层分别展示
           .box{
             width:100%;
             display:flex;
             justify-content:space-between;
               //层名称
              .box_left{
                width:4.6%;
                height:100%;
                background:url(../../assets/bg_juece.png) no-repeat;
                background-size:100% 100%;
                border:1px solid rgba(4, 252, 255, 0.46);
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                 span{
                   color:rgba(4,252,255,1);
                   font-family:SOURCEHANSANSCN-MEDIUM;
                   font-weight:500;
                   font-size:1.75rem;
                 }
              }
              // 层级具体内容
              .box_right{
                width:94.1%;
                height:100%;
                padding:2%;
                background:url(../../assets/bg_shujuzhilixiabian.png) no-repeat;
                background-size:100% 100%;
                display:flex;
                justify-content:space-between;
                position:relative;
                  .lt{
                    width:2.4%;
                    height:12.2%;
                    background:url(../../assets/zuoshang.png) no-repeat;
                    background-size:100% 100%;
                    position:absolute;
                    top:0;
                    left:0;
                  }
                  .lb{
                    width:2.4%;
                    height:12.2%;
                    background:url(../../assets/zuoxia.png) no-repeat;
                    background-size:100% 100%;
                    position:absolute;
                    bottom:0;
                    left:0;
                  }
                  .rt{
                    width:2.4%;
                    height:12.2%;
                    background:url(../../assets/youshang.png) no-repeat;
                    background-size:100% 100%;
                    position:absolute;
                    top:0;
                    right:0;
                  }
                  .rb{
                    width:2.4%;
                    height:12.2%;
                    background:url(../../assets/youxia.png) no-repeat;
                    background-size:100% 100%;
                    position:absolute;
                    bottom:0;
                    right:0;
                  }
              }
            }
            //文字标题
            .box_rl_tit, .box_rr_tit{
              width: 100%;
              padding-left: 1rem;
              color:rgba(14,252,255,1);
              font-family:SOURCEHANSANSCN-MEDIUM;
              font-weight:500;
              font-size:1.375rem;
              position: relative;
              &:before{
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 0.25rem;
                height: 1.375rem;
                background: rgba(253,183,47,1);
                border-radius: 0.25rem;
              }
            }
           //不同层级的特殊样式  上部--决策层
           .top{
              height: 35.7%;
               //决策层右侧内容区域
               .box_right{
                 border:1px solid rgba(4, 252, 255, 0.46);

                   .box_right_left,.box_right_right{
                     width:34.32%;
                     height:100%;
                     display:flex;
                     flex-direction:column;
                     justify-content:space-between;
                   }
                   //决策层--右侧具体内容--数据治理委员会
                   .box_right_left{
                     //数据治理委员会
                     //数据治理委员会具体组成
                     .box_rl_content{
                        width:100%;
                        padding:2% 5%;
                        height:80.45%;
                        background:rgba(6,45,67,1);
                        display:flex;
                        justify-content:space-between;
                        border-radius:5px;
                           //组成人员盒子
                          .bcard{
                            width:30%;
                            height:81.25%;
                            display:flex;
                            flex-direction:column;
                            justify-content:space-evenly;
                            align-items:center;
                              //组成人员头像（领导大头像）
                              .bcard_pic{
                                width: 4.0625rem;
                                height: 3.75rem;
                                background:url("../../assets/icon_people.png") no-repeat center;
                                background-size:100% 100%;
                              }
                             //组成人员中型头像
                             .midPic{
                                background-size:3.0625rem 2.75rem;
                             }
                             //组成人员的文字介绍
                             .bcard_word{
                               width:100%;
                               display:flex;
                               flex-direction:column;
                               align-items:center;
                                //上-职称   下-部门
                                .bcard_word_top,.bcard_word_bot{
                                  text-align:center;
                                  font-size:1.125rem;
                                  line-height: 1.375rem;
                                  color:rgba(255,255,255,1);
                                  font-family:SOURCEHANSANSCN-MEDIUM;
                                  font-weight:500;
                                }
                             }
                          }
                     }
                   }
                   //数据管理制度委员会/数据管理制度团队
                   .box_right_right{
                     width:64.41%;
                       //主要内容
                       .box_rr_content{
                          width:100%;
                          height:80.45%;
                          background:rgba(6,45,67,1);
                          border-radius:5px;
                          //轮播图长宽设置
                          /deep/ .el-carousel{
                            height:100%;
                            /deep/ .el-carousel__button{
                                 width:6px;
                                 height:6px;
                                 border-radius:50%;
                                 background:rgba(4,252,255,1);
                               }
                            .el-carousel__item{
                               display:flex;
                               justify-content:space-between;
                               // padding:1% 5.2%;
                               padding:1% 2.5%;
                                  & .bcard{
                                 width:16%;
                                 height:81.25%;
                                 display:flex;
                                 flex-direction:column;
                                 justify-content:space-evenly;
                                 align-items:center;
                                  .bcard_pic{
                                    width: 3.0625rem;
                                    height: 2.75rem;
                                    background:url("../../assets/icon_people.png") no-repeat center;
                                    background-size:100% 100%;
                                  }
                                  .bcard_word{
                                    width:100%;
                                    display:flex;
                                    flex-direction:column;
                                    align-items:center;
                                     .bcard_word_top,.bcard_word_bot{
                                       text-align:center;
                                       font-size:1.125rem;
                                       line-height: 1.375rem;
                                       color:rgba(255,255,255,1);
                                       font-family:SOURCEHANSANSCN-MEDIUM;
                                       font-weight:500;
                                     }
                                  }
                               }
                            }
                          }
                       }
                   }
               }
           }
           //中部--管理层
           .mid{
              height:28.45%;
               //管理层右侧主要内容
               .box_right{
                 padding:1.62%;
                 border:1px solid rgba(4, 252, 255, 0.46);
                   .box_right_left,.box_right_right{
                     width:27.46%;
                     height:100%;
                     display:flex;
                     flex-direction:column;
                     justify-content:space-between;
                   }
                   // 数据治理办公室
                   .box_right_left{
                     //数据治理办公室成员
                     .box_rl_content{
                        width:100%;
                        padding:2% 5%;
                        height:80.45%;
                        background:rgba(6,45,67,1);
                        display:flex;
                        justify-content:space-between;
                        border-radius:5px;
                          .bcard{
                            width:50%;
                            height:100%;
                            display:flex;
                            flex-direction:column;
                            justify-content:space-evenly;
                            align-items:center;
                             .bcard_pic{
                                width: 3.0625rem;
                                height: 2.75rem;
                                background:url("../../assets/icon_people.png") no-repeat center;
                                background-size:100% 100%;
                             }
                             .bcard_word{
                               width:100%;
                               height:50%;
                               display:flex;
                               flex-direction:column;
                               align-items:center;
                                .bcard_word_top,.bcard_word_bot{
                                  text-align:center;
                                  font-size:1.125rem;
                                  line-height: 1.375rem;
                                  color:rgba(255,255,255,1);
                                  font-family:SOURCEHANSANSCN-MEDIUM;
                                  font-weight:500;
                                }
                             }
                          }
                     }
                   }
                   //管理部门
                   .box_right_right{
                      width:66.55%;
                      height:100%;
                      position:relative;
                       //管理部门分别展示区
                      .box_rr_content{
                        width:100%;
                        height:80.77%;
                        position:absolute;
                        bottom:0;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                          //管理部门标题文字
                          .tit{
                             width:100%;
                             height:11.34%;
                             display:flex;
                             align-items:center;
                                //文字前圆圈修饰
                               .circle{
                                  width:8px;
                                  height:8px;
                                  background:rgba(14,252,255,1);
                                  border-radius:50%;
                                  margin-right:1%;
                               }
                               .titWord{
                                 color:rgba(14,252,255,1);
                                 font-size:1.25rem;
                                 font-family:SOURCEHANSANSCN-MEDIUM;
                                 font-weight:500;
                               }
                          }
                          //管理部门组成
                          .adpart{
                              width:100%;
                              height:35.71%;
                              display:flex;
                              justify-content:space-between;
                               .adpart_box{
                                   width:32%;
                                   height:100%;
                                   display:flex;
                                   justify-content:center;
                                   align-items:center;
                                   background:rgba(6,45,67,1);
                                    span{
                                      color:rgba(255,255,255,1);
                                      font-size:1.125rem;
                                      font-family:SOURCEHANSANSCN-MEDIUM;
                                      font-weight:500;
                                    }
                               }
                          }
                      }

                   }
               }
           }

           //下部--执行层内容
           .bot{
              height:31.79%;
              //执行层右侧内容
               .box_right{
                  border:1px solid rgba(4, 252, 255, 0.46);
                  padding:1.6%;
                  display:flex;
                  justify-content:space-between;
                   //数据管理服务组织
                   .box_right_left{
                     width:77.64%;
                     height:100%;
                     display:flex;
                     flex-direction:column;
                     justify-content:space-between;
                      //成员组成展示
                      .box_rl_content{
                         width:100%;
                         padding:1%;
                         height:82.22%;
                         display:flex;
                         background:rgba(6,45,67,1);
                         flex-direction:column;
                         justify-content:space-between;
                          border-radius:5px;
                          //成员展示盒子
                         .bcard_box{
                           width:100%;
                           height:85%;
                           display:flex;
                           justify-content:space-between;
                            //按个展示
                           .bcard{
                             width:10%;
                             height:85%;
                             display:flex;
                             flex-direction:column;
                             justify-content:space-evenly;
                             align-items:center;
                              .bcard_pic{
                                width: 3.0625rem;
                                height: 2.75rem;
                                background:url("../../assets/icon_people.png") no-repeat center;
                                background-size:100% 100%;
                              }
                              .bcard_word{
                                width:100%;
                                height:45%;
                                display:flex;
                                flex-direction:column;
                                align-items:center;
                                 .bcard_word_top,.bcard_word_bot{
                                   text-align:center;
                                   font-size:1.125rem;
                                   line-height: 1.375rem;
                                   color:rgba(255,255,255,1);
                                   font-family:SOURCEHANSANSCN-MEDIUM;
                                 }
                              }
                           }
                         }
                      }
                   }
                   //各相关委、办、局
                   .box_right_right{
                     width:20.5%;
                     height:100%;
                     position:relative;
                       //具体展示区域
                      .box_rr_content{
                          width:100%;
                          padding:4%;
                          height:82.22%;
                          background:rgba(6,45,67,1);
                          position:absolute;
                          bottom:0;
                          display:flex;
                          flex-direction:column;
                          justify-content:space-between;
                           border-radius:5px;
                              //展示成员区域
                            .bcard_box{
                              width:100%;
                              height:85%;
                              display:flex;
                              justify-content:space-between;
                              .bcard{
                                width:42%;
                                height:85%;
                                display:flex;
                                flex-direction:column;
                                justify-content:space-evenly;
                                align-items:center;
                                 .bcard_pic{
                                   width: 3.0625rem;
                                   height: 2.75rem;
                                   background:url("../../assets/icon_people.png") no-repeat center;
                                   background-size:100% 100%;
                                 }
                                 .bcard_word{
                                   width:100%;
                                   height:45%;
                                   display:flex;
                                   flex-direction:column;
                                   align-items:center;
                                    .bcard_word_top,.bcard_word_bot{
                                      text-align:center;
                                      font-size:1.125rem;
                                      line-height: 1.375rem;
                                      color:rgba(255,255,255,1);
                                      font-family:SOURCEHANSANSCN-MEDIUM;
                                      font-weight:500;
                                    }
                                 }
                              }
                            }
                      }
                   }
                   .box_right_left,.box_right_right{
                     .tit{
                        width:100%;
                        height:11.34%;
                        display:flex;
                        align-items:center;
                          .circle{
                             width:8px;
                             height:8px;
                             background:rgba(14,252,255,1);
                             border-radius:50%;
                             margin-right:1%;
                          }
                          .titWord{
                            color:rgba(14,252,255,1);
                            font-size:1.25rem;
                            font-family:SOURCEHANSANSCN-MEDIUM;
                            font-weight:500;
                          }
                     }
                   }
                   .box_right_right{
                     .tit{
                       .circle{
                          margin-right:5%;
                       }
                     }
                   }
               }
           }
        }

        //整体左侧内容展示区域---职责
        .content_right{
           width:27.14%;
           display:flex;
           flex-direction:column;
           justify-content:space-between;
              // 头部标题文字--职责
             .head{
               padding-left:4.25%;
             }
             //具体展示区域
             .rightBox{
               padding:0% 4%;
               background:url(../../assets/bg_zhizexiabian.png) no-repeat;
               background-size:100% 100%;
               border:1px solid rgba(4, 252, 255, 0.46);
               overflow:hidden;
               position:relative;
               justify-content: space-evenly;
               .lt{
                 width:6%;
                 height:4.34%;
                 background:url(../../assets/zuoshang.png) no-repeat;
                 background-size:100% 100%;
                 position:absolute;
                 top:0;
                 left:0;
               }
               .lb{
                 width:6%;
                 height:4.34%;
                 background:url(../../assets/zuoxia.png) no-repeat;
                 background-size:100% 100%;
                 position:absolute;
                 bottom:0;
                 left:0;
               }
               .rt{
                 width:6%;
                 height:4.34%;
                 background:url(../../assets/youshang.png) no-repeat;
                 background-size:100% 100%;
                 position:absolute;
                 top:0;
                 right:0;
               }
               .rb{
                 width:6%;
                 height:4.34%;
                 background:url(../../assets/youxia.png) no-repeat;
                 background-size:100% 100%;
                 position:absolute;
                 bottom:0;
                 right:0;
               }
                 //信息分条展示
                .info{
                  width:100%;
                  height:auto;
                  // margin-bottom:6.51%;
                     //信息标题
                    .info_head{
                      width:100%;
                      display:flex;
                      align-items:center;
                        .circle{
                          width:8px;
                          height:8px;
                          border-radius:50%;
                          background:rgba(4,252,255,1);
                          margin-right:2.17%;
                        }
                        .word{
                          font-size:1.25rem;
                          color:rgba(4,252,255,1);
                          font-family:SOURCEHANSANSCN-MEDIUM;
                          font-weight:500;
                        }
                    }
                    //信息具体内容
                    .info_content{
                      padding-left:4.3%;
                      margin-top:2.17%;
                      font-size:1.125rem;
                      color:rgba(255,255,255,1);
                      font-family:SOURCEHANSANSCN-MEDIUM;
                      font-weight:500;
                    }
                }
             }
        }
    }
}
</style>
