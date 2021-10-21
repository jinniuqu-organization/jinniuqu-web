<template>
  <div class="systemCircular">
    <div class="dataTotals">
      <div class="systemInfo">
        <label>
          <p>金牛区</p>
          <p>大数据规范</p>
          <p class="num p_top"><span>{{item}}</span>大类</p>
          <p class="num"><span>{{amount}}</span>份</p>
        </label>
      </div>
      <div v-for="(standard, i) in standards" :key="i" :class="`standards standard` + (i+1)">
        <label v-if="i < 2">
          <p>{{standard.type}}</p>
          <p class="num">{{standard.amount}}份</p>
        </label>
        <label v-else>
          <p class="num">{{standard.amount}}份</p>
          <p>{{standard.type}}</p>
        </label>
      </div>
    </div>
    <!-- 第一层 -->
    <div class="dataFamily">
      <div v-for="(family, i) in families" :key="i"
           :class="family_actived == i ? `actived family` + (i+1) : `family` + (i+1)" @click="clickFamily(i)">
        <label>
          <i class="icon"></i>
          <span>{{family.firstTitle}}</span>
        </label>
      </div>
    </div>
    <!-- 第二层 -->
    <div class="dataTribe">
      <div v-for="(tribe, i) in tribes" :key="i"
           :class="tribe_actived == i ? 'actived' : ''"
           :style="transformTitle(i)"
           @click="clickTribe(i)">
        <label>
          <p>{{tribe.secondTitle}}</p>
          <p v-for="child in tribe.subTitle" class="child">{{child.thirdTitle}}</p>
        </label>
      </div>
    </div>
    <!-- 第三层 -->
    <div class="dataFile" id="dataFile">
      <!-- 2020-12-01 ch新增搜索框 -->
      <el-autocomplete
        class="title_search"
        placeholder="请输入标题名称"
        :trigger-on-focus="false"
        :fetch-suggestions="querySearch"
        @select="handleSelect"
        @input="queryChange"
        v-model="titleName"
        clearable
      >
        <i slot="suffix" class="el-input__icon el-icon-search title_i"></i>
        <template slot-scope="{ item }">
          <span>{{ item.standard }}</span>
        </template>
      </el-autocomplete>

      <i class="el-icon-s-tools file_manage" @click="fileManage"></i>
      <!-- 结束 -->
      <div v-for="(file, i) in files" :key="i"
           :style="transformAngle(i)"
           :class="i > 0 && i < 7 ?  'actived' : ''"
           @click="file.standardUrl ? clickFile(i, file.standardUrl) : ''"
      >
        <p>{{interceptName(file.standard)}}</p>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="80%"
      class="pdfBox"
    >
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfUrl"
        :page="i"
        style="display: block; width: 70%; margin: 0 auto;"
      >
      </pdf>
    </el-dialog>
    <el-dialog
      title="文件管理"
      :visible.sync="manageVisible"
      :width="isAvailable ? '60%' : '20%'"
      class="fileManage"
      :close-on-click-modal="false"
      :before-close="handleClose">
      <template v-if="isAvailable">
        <div style="height: 30rem; overflow:auto">
          <el-table
            :data="treeData"
            style="width: 100%"
            :row-key="getRowKey"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              prop="titleName"
              label="文档名称"
            >
            </el-table-column>
            <el-table-column
              prop="version"
              label="文档版本"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="文档状态"
              width="110"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="上传时间"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="140">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.level == 2"
                  @click="handleAdd(scope.row)"
                >新增</el-button>
                <template v-if="scope.row.level == 3">
                  <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                  <el-button type="text" size="small"  @click="handleUpdate(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDeleteById(scope.row.id)">删除</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template v-if="!isAvailable">
        <div style="margin-left: 2%">
          <label><span style="font-family: 微软雅黑">请输入管理密码：</span></label>
          <el-row :gutter="20" style="margin-top: 2%">
            <el-col :span="16">
              <el-input placeholder="请输入密码" v-model="managePwd" show-password></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="checkPwd">验证密码</el-button>
            </el-col>
          </el-row>
        </div>
      </template>
    </el-dialog>

    <!--文档新增or编辑-->
    <el-dialog
      :title="manageName"
      :visible.sync="manageFlag"
      width="30%"
      :close-on-click-modal="false"
      :before-close="closeManage">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select v-model="form.firstTitle" placeholder="请选择一级分类" @change="getSecondTitleList">
            <el-option
              v-for="item in families"
              :key="item.firstTitle"
              :label="item.firstTitle"
              :value="item.firstTitle"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select v-model="form.secondTitle" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondTitles"
              :key="item.secondTitle"
              :label="item.secondTitle"
              :value="item.secondTitle"
              :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文档名称">
          <el-input v-model="form.titleName" :disabled="manageName === '文档编辑'"></el-input>
        </el-form-item>
        <el-form-item label="文档版本" v-if="manageName === '文档编辑'">
          <el-input v-model="form.version" :disabled="manageName === '文档编辑'"></el-input>
        </el-form-item>
        <el-form-item label="文档状态">
          <el-radio-group v-model="form.status">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-radio label="下线"></el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio label="发布"></el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            action=""
            enctype="multipart/form-data"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-change="handleChange"
            accept="application/pdf"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :file-list="uploadFileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="manageName === '文档创建'">
              备注：只能上传pdf文件！
            </div>
            <div slot="tip" class="el-upload__tip" v-if="manageName === '文档编辑'">
              备注：只能上传pdf文件，且会替换掉原有文件！
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="primary" size="medium" @click="onSubmit">确认</el-button>
          <el-button @click="closeManage">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import pdf from 'vue-pdf';
  import {getStandard, getTitle, getSecondTitle, getPdfs, getAllFiles, getTreeFiles, deleteById, addFile, updateFile} from '../../api/dataStandardManagement.js'

  export default {
    name: 'systemCircular',
    components: {
      pdf
    },
    data() {
      return {
        // PDF预览
        pdfUrl: "",
        numPages: 0,
        dialogVisible: false,
        // 圆数据
        title: "",
        item: 0,
        amount: 0,
        standards: [],
        // 第一层数据
        family_actived: 3,
        families: [],
        // 第二层数据
        tribe_actived: 1,
        tribes: [],
        // 文件层数据
        files_start: 1,
        files_top: false,
        files_total: 11,
        files: [],
        // 搜索内容
        titleName: '',
        titleList: [],
        manageVisible: false,
        isAvailable: false,
        managePwd: '',
        allFiles: [],
        resultFiles: [],
        manageName: '文档创建',
        manageFlag: false,
        //二级标题（对应一级标题）
        secondTitles: [],
        // treeFiles
        treeData: [],
        uploadFileList: [],
        form: {
          titleName: '',
          version: '',
          status: '',
          firstTitle: '',
          secondTitle: '',
        },
      }
    },
    created() {
      // 获取圆数据
      this.getTotalData();
      // 获取数据
      this.getFirstTitles();

      // 获取所有文件(非树状结构)
      this.getAllFiles();
    },
    mounted() {
      // 文件列监听鼠标滚动
      // chrome and ie
      document.getElementById("dataFile").addEventListener('mousewheel', this.debounce(this.handleScroll, 100), false);
      // firefox
      document.getElementById("dataFile").addEventListener("DOMMouseScroll", this.debounce(this.handleScroll, 100), false);
    },
    methods: {
      // 获取圆数据
      getTotalData() {
        getStandard().then(res => {
          if (res.code == 200) {
            this.item = res.data.amount.item;
            this.amount = res.data.amount.amount;
            this.standards = res.data.items;
          }
        });
      },
      // 获取一级数据
      getFirstTitles() {
        getTitle().then(res => {
          if (res.code == 200) {
            this.families = res.data;
          }
        }).then(() => {
          if (this.families.length > 0) {
            this.getSecondTitles(this.family_actived, this.tribe_actived);
          }
        });
      },
      // 获取二级数据
      getSecondTitles(firstTitle, tribe_actived) {
        let first_title = this.families[firstTitle].firstTitle;
        this.tribe_actived = tribe_actived;
        getSecondTitle(first_title).then(res => {
          if (res.code == 200) {
            let length = res.data.length;
            if (length < 5) {
              let arr = new Array(5 - length).fill({"secondTitle": "", "subTitle": []});
              this.tribes = res.data.concat(arr);
            } else {
              this.tribes = res.data.slice(0, 5);
            }
          } else {
            this.tribes = [];
          }
        }).then(() => {
          if (this.tribes.length > 0) {
            this.getFiles(this.tribe_actived);
          } else {
            this.files_top = false;
            this.files = [];
            this.files_total = 0;
            this.files_start = 0;
          }
        });
      },
      // 获取文件列
      getFiles(secondTitle, start = 1) {
        let second_title = this.tribes[secondTitle].secondTitle;
        start > 0 ? start : 1;
        getPdfs(second_title, start).then(res => {
          this.files_top = false;
          this.files = [];
          if (res.code == 200) {
            this.files_total = res.data.total;
            this.files_start = start;
            let length = res.data.standard.length;
            if (length < 11) {
              let arr = new Array(11 - length).fill({"standard": "", "standard_url": ""});
              this.files = res.data.standard.concat(arr);
            } else {
              this.files = res.data.standard.slice(0, 11);
            }
          } else {
            this.files_total = 0;
            this.files_start = 0;
          }
          // ch 2020-12-03 添加
          // this.titleList = this.files;
          // this.queryChange(this.titleName)
        });
      },
      // 点击一级
      clickFamily(i) {
        this.family_actived = i;
        // 默认选中第一个二级目录
        this.getSecondTitles(i, 0);
      },
      // 点击二级
      clickTribe(i) {
        this.tribe_actived = i;
        this.getFiles(i);
      },
      // 点击文件
      clickFile(i, path) {
        if (i > 0 && i < 7) {
          // 加载PDF
          var self = this
          var loadingTask = pdf.createLoadingTask(path);
          loadingTask.then(pdf => {
            self.pdfUrl = loadingTask;
            self.numPages = pdf.numPages;
            // 弹框显示
            self.dialogVisible = true;
          }).catch((err) => {
            this.$message.error('文件加载失败');
          })
        }
      },
      // 鼠标滚动事件
      handleScroll(e) {
        let direction = '';
        // 检测滚动方向
        if (e.deltaY) {
          direction = e.deltaY > 0 ? 'down' : 'up';
        } else if (e.detail) {
          // 兼容火狐
          direction = e.detail > 0 ? 'down' : 'up';
        } else {
          // 兼容ie
          direction = e.wheelDelta > 0 ? 'down' : 'up';
        }

        if (direction == "up") {
          if (this.files_start == 1 && !this.files_top) {
            // 去除最后一个元素，添加一个元素
            this.files.pop();
            this.files.unshift({"standard": "", "standard_url": ""});
            this.files_top = true;
          } else if (this.files_start > 1) {
            this.files_start--;
            this.getFiles(this.tribe_actived, this.files_start);
          }
        } else {
          if (this.files_start < this.files_total) {
            if (this.files_start == 1 && this.files_top) {
              this.files_start = 1;
            } else {
              this.files_start++;
            }
            this.files_top = false;
            this.getFiles(this.tribe_actived, this.files_start);
          }
        }
      },
      //函数防抖
      debounce(func, wait) {
        let timeout;
        return function () {
          let context = this;
          let args = arguments;
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => {
            func.apply(context, args)
          }, wait);
        }
      },
      // 二级标题旋转角度
      transformTitle(i) {
        let deg = 0;
        let left = 0;
        switch (i) {
          case 0:
            deg = -25;
            left = -20.5;
            break;
          case 1:
            deg = -11;
            left = -6;
            break;
          case 2:
            deg = 1.5;
            left = -2;
            break;
          case 3:
            deg = 14;
            left = -8.25;
            break;
          case 4:
            deg = 27;
            left = -25;
            break;
        }
        return "transform: rotate(" + deg + "deg); left: " + left + "%";
      },
      // 文件名旋转角度
      transformAngle(i) {
        let deg = -6;
        let left = 1;
        if (i > 0 && i < 3) {
          left = 2 * i + 1;
        } else if (i > 2 && i < 6) {
          left = 6;
        } else if (i > 5 && i < 9) {
          left = 6 - (i - 5);
        } else if (i == 9) {
          left = 1.5;
        } else if (i == 10) {
          left = 0;
        }
        return "transform: rotate(" + (deg + i * 1.5) + "deg); left: " + left + "%";
      },
      // 文件名截取
      interceptName(name) {
        let clientWidth = document.body.clientWidth;
        if (clientWidth >= 1920) {
          return this.intercept(name, 32);
        } else if (clientWidth < 1920 && clientWidth >= 1680) {
          return this.intercept(name, 35);
        } else if (clientWidth < 1680 && clientWidth >= 1600) {
          return this.intercept(name, 33);
        } else if (clientWidth < 1600 && clientWidth >= 1440) {
          return this.intercept(name, 31);
        } else if (clientWidth < 1440 && clientWidth >= 1400) {
          return this.intercept(name, 30);
        } else if (clientWidth < 1400 && clientWidth >= 1360) {
          return this.intercept(name, 28);
        } else {
          return this.intercept(name, 25);
        }
      },
      intercept(name, name_length) {
        if (name.length > name_length) {
          return name.substring(0, name_length) + "...";
        } else {
          return name;
        }
      },

      // 搜索
      querySearch(queryString, cb) {
        let restaurants = this.allFiles;
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        // this.files = results;
        // this.files_total = results.length
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.standard.indexOf(queryString) >= 0);
        };
      },

      // ch 获取所有文件
      getAllFiles() {
        getAllFiles(this.titleName).then(res => {
          if (res.code === 200) {
            this.allFiles = res.data;
          }
        });
      },
      // ch 监控下拉列表选择操作
      handleSelect(item) {
        // 与第三部分关联
        // let restaurants = this.titleList;
        // this.titleName = item.standard
        // let results = this.titleName ? restaurants.filter(this.createFilter(this.titleName)) : restaurants;
        // this.files = results;

        // 全局搜索，不关联
        this.titleName = item.standard;
        this.clickFile(1, item.standardUrl)
      },
      // ch  监听输入框内容变化（关联第三部分）
      queryChange(querying) {
        // let restaurants = this.titleList;
        // let results = querying ? restaurants.filter(this.createFilter(querying)) : restaurants;
        // this.files = results;
        // this.files_total = results.length
        // console.log('33--' + this.files_total)
      },

      // ch 文件管理
      fileManage() {
        this.isAvailable = false;
        this.manageVisible = true;
      },

      //ch 验证管理密码是否正确
      checkPwd() {
        if(this.managePwd === 'qazxc12345') {
          this.isAvailable = true;
          this.getTreeFiles();
        } else {
          this.$message.error('管理密码错误！');
        }
      },

      //ch dialog关闭事件
      handleClose(done) {
        this.managePwd = '';
        done();
        this.manageVisible = false;
      },

      // ch 文档管理-获取所有文件（树状结构）
      getTreeFiles() {
        getTreeFiles().then(res => {
          if(res.code === 200) {
            this.treeData = res.data;
          }
        })
      },

      getRowKey(row) {
        return row.titleName + row.version;
      },

      // ch 文档管理-编辑
      handleUpdate(row) {
        this.manageName = '文档编辑';

        this.getSecondTitleList(row.firstTitle);
        // this.form = row;

        this.form.code = row.code;
        this.form.firstTitle = row.firstTitle;
        this.form.id = row.id;
        this.form.level = row.level;
        this.form.secondTitle = row.secondTitle;
        this.form.standardUrl = row.standardUrl;
        // this.form.status = row.code;
        this.form.titleName = row.titleName;
        this.form.updateTime = row.updateTime;
        this.form.version = row.version;

        if (row.status === '已下线') {
          this.form.status = '下线'
        }

        if (row.status === '已发布') {
          this.form.status = '发布'
        }

        this.manageFlag = true;
      },

      // ch 文档管理-删除(根据id)
      handleDeleteById(id) {
        deleteById(id).then(res => {
          if(res.code === 200) {
            this.$message.success(res.msg);
            this.getTreeFiles();
          }
        });
      },

      // ch 根据一级分类查找二级分类
      getSecondTitleList(firstTitle) {
        // this.form.secondTitle = '';
        getSecondTitle(firstTitle).then(res => {
          if (res.code === 200) {
            this.secondTitles = res.data;
          }
        })
      },

      // ch 根据"新增"按钮，查找父类，即一级标题
      getParentRow(row) {
        // 遍历整个table数据
        for (let i = 0; i < this.treeData.length; i++) {
          let item = this.treeData[i];
          // 判断该行是否有子节点
          if ("children" in item) {
            // 遍历子节点
            for (let j = 0; j < item.children.length; j++) {
              let item2 = item.children[j];
              // 判断该节点是否为我点击的节点
              if (item2 === row) {
                // 返回父节点
                return item;
              }
            }
          }
        }
      },

      // ch 文档管理-新增
      handleAdd(row) {
        let that = this;
        let parentRow = that.getParentRow(row);

        this.manageName = '文档创建';
        this.manageFlag = true;
        this.form = {};
        this.form.firstTitle = parentRow.titleName;
        this.form.secondTitle = row.titleName;
        this.getSecondTitleList(this.form.firstTitle);
      },

      // ch 更改确认
      onSubmit() {
        let params = {};
        if (this.form.status === '发布') {
          this.form.status = '已发布';
        }

        if (this.form.status === '下线') {
          this.form.status = '已下线';
        }

        params = this.form;
        params.file = this.uploadFileList;
        if(this.manageName === '文档创建') {
          addFile(params).then(res => {
            if(res.code === 200) {
              this.$message.success(res.msg);
              this.uploadFileList = [];
              this.getTreeFiles();
            }
          })
        }

        if (this.manageName === '文档编辑') {
          updateFile(params).then(res => {
            if(res.code === 200) {
              this.$message.success(res.data);
              this.getTreeFiles();
            }
          });
        }

        this.manageFlag = false;
        this.$refs[form].resetFields();
      },

      // 文件上传相关操作
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`).then(() => {
          let index = this.uploadFileList.indexOf(file.raw);
          this.uploadFileList.splice(index, 1);
        });
      },
      handleChange(file, fileList) {
        // this.uploadFileList = fileList.slice(-3);
        if (file.status === 'ready') {
          this.uploadFileList.push(file.raw);
        }
      },

      // ch 文档管理-关闭弹窗
      closeManage() {
        this.manageFlag = false;
        this.uploadFileList = [];
        this.$refs[form].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .systemCircular {
    width: 100%;
    height: 100%;
    font-family: SourceHanSansCN-Medium;
    label {
      display: table-cell;
      vertical-align: middle;
      cursor: pointer;
      text-align: center;
    }
    > div {
      height: 100%;
      box-sizing: border-box;
      float: left;
    }
    &:after {
      display: block;
      clear: both;
      content: "";
      visibility: hidden;
      height: 0
    }
    .dataTotals {
      width: 21%;
      position: relative;
      color: #fff;
      font-size: 1.25rem;
      line-height: 2rem;
      .num {
        font-size: 1.75rem;
        color: #03D8FF;
        padding-right: 0.25rem;
      }
      .systemInfo {
        width: 70%;
        height: 36%;
        position: absolute;
        top: 24%;
        left: 4%;
        display: table;
        font-family: "REEJI-PangBo-GB";
        label {
          text-align: left;
          text-indent: 0.3em;
          font-size: 2.8125rem;
          line-height: 3.125rem;
          .num {
            font-size: 2.5rem;
            line-height: 3.375rem;
            span {
              color: #FFF603;
              padding-right: 0.5rem;
            }
          }
          .p_top {
            padding-top: 1.5rem;
          }
        }
      }
      .standards {
        width: 47%;
        height: 10%;
        position: absolute;
        display: table;
      }
      .standard1 {
        top: 3.5%;
        left: 25%;
        transform: rotate(30deg);
      }
      .standard2 {
        top: 23%;
        left: 62%;
        transform: rotate(70.5deg);
      }
      .standard3 {
        top: 48.5%;
        left: 63%;
        transform: rotate(-72deg);
      }
      .standard4 {
        top: 68.5%;
        left: 27%;
        transform: rotate(-32deg);
      }
    }
    .dataFamily {
      width: 21.5%;
      padding: 7% 0 9%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      overflow: hidden;
      div {
        position: relative;
        top: 0%;
        width: 85%;
        height: 20%;
        text-align: center;
        font-size: 2rem;
        font-weight: 500;
        color: #0EFCFF;
        opacity: 0.5;
        display: table;
        transform-origin: 50% 50%;
        justify-content: space-around;
        &:hover {
          background: url("../../assets/standard/kuang.png") no-repeat right center;
          background-size: 100% 100%;
          opacity: 1;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: 2rem;
          height: 2rem;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        }
      }
      div.actived {
        background: url("../../assets/standard/kuang.png") no-repeat right center;
        background-size: 100% 100%;
        opacity: 1;
      }
      .family1 {
        left: -4.5%;
        transform: rotate(-25deg);
        .icon {
          background-image: url("../../assets/standard/btn_01.png");
        }
      }
      .family2 {
        left: 6.5%;;
        transform: rotate(-14.5deg);
        .icon {
          background-image: url("../../assets/standard/btn_02.png");
        }
      }
      .family3 {
        left: 12.2%;
        transform: rotate(-6.5deg);
        .icon {
          background-image: url("../../assets/standard/btn_03.png");
        }
      }
      .family4 {
        left: 13.5%;
        transform: rotate(2deg);
        .icon {
          background-image: url("../../assets/standard/btn_04.png");
        }
      }
      .family5 {
        left: 10.5%;
        transform: rotate(10deg);
        .icon {
          background-image: url("../../assets/standard/btn_05.png");
        }
      }
      .family6 {
        left: 3%;
        transform: rotate(18.25deg);
        .icon {
          background-image: url("../../assets/standard/btn_06.png");
        }
      }
      .family7 {
        top: -1%;
        left: -9.5%;
        transform: rotate(27deg);
        .icon {
          background-image: url("../../assets/standard/btn_07.png");
        }
      }
    }
    .dataTribe {
      width: 20.3%;
      padding: 5% 0 7%;
      position: relative;
      left: -1%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      div {
        position: relative;
        width: 100%;
        height: 26%;
        text-align: center;
        font-size: 1.75rem;
        font-weight: 500;
        color: #0EFCFF;
        opacity: 0.5;
        display: table;
        transform-origin: 50% 50%;
        justify-content: space-around;
        &:hover {
          background: url("../../assets/standard/kuang.png") no-repeat right center;
          background-size: 100% 100%;
          opacity: 1;
        }
        p.child {
          font-size: 1.25rem;
          color: #fff;
          position: relative;
        }
        p.child:before {
          content: "";
          display: inline-block;
          height: 0rem;
          width: 0rem;
          border: 0.375rem solid #fff;
          border-radius: 50%;
          position: relative;
          left: -0.5rem;
        }
      }
      div.actived {
        background: url("../../assets/standard/kuang.png") no-repeat right center;
        background-size: 100% 100%;
        opacity: 1;
      }
    }
    .dataFile {
      width: 37.2%;
      padding: 4.75% 0 3%;
      position: relative;
      left: -2%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      /*justify-content: space-between;*/
      div {
        height: 8%;
        font-size: 1.175rem;
        font-weight: 500;
        color: #fff;
        opacity: 0.5;
        display: table;
        position: relative;
        transform-origin: 50% 50%;
        p {
          display: table-cell;
          vertical-align: middle;
        }
      }
      div.actived {
        height: 10%;
        opacity: 1;
        cursor: pointer;
      }
      .title_search {
        position: absolute;
        margin-top: -4.0rem;
        margin-left: 0.8rem;
        width: 30rem;
        background-color: transparent;
        opacity: 0.5;
      }

      .title_i {
        margin-top: 0.2rem;
        margin-right: 0.25rem;
        position: relative;
        color: #04FCFF;
        font-size: 1.5rem;
      }

      .file_manage {
        position: absolute;
        margin-top: -3.7rem;
        margin-left: 73%;
      }
      /*.title_search {*/
      /*width: 48%;*/
      /*padding: 0 2.6%;*/
      /*height: 10.6%;*/
      /*position: absolute;*/
      /*top: 3%;*/
      /*left: -1%;*/

      /*form {*/
      /*position: relative;*/
      /*width: 100%;*/
      /*height: 60%;*/
      /*margin: 0 auto;*/
      /*}*/

      /*input,*/
      /*button {*/
      /*border: none;*/
      /*outline: none;*/
      /*}*/

      /*input {*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*padding-left: 4%;*/
      /*// border-radius: 42px;*/
      /*border: 2px solid #04FCFF;*/
      /*background-color: transparent;*/
      /*color: #04FCFF;*/
      /*}*/

      /*input:focus {*/
      /*width: 100%;*/
      /*}*/

      /*img {*/
      /*height: 50%;*/
      /*width: 12.8%;*/
      /*cursor: pointer;*/
      /*position: absolute;*/
      /*top: 21%;*/
      /*right: 2%;*/
      /*padding-left: 2%;*/
      /*padding-right: 2%;*/
      /*border-left: 1px solid #04FCFF;*/
      /*}*/
      /*}*/
    }
  }

  // 兼容火狐浏览器
  @media screen and (min--moz-device-pixel-ratio: 0) {

  }

  // 兼容ie
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {

  }
</style>
<style lang="less">
  .pdfBox > .el-dialog {
    height: 78%;
    overflow: auto;
  }

  .dataFile .el-input__inner {
    background-color: transparent;
    border: 2px solid #04FCFF;
    color: #04FCFF;
    height: 3rem;
  }

  .dataFile .el-icon-s-tools {
    color: #04FCFF;
    font-size: 2.6rem;
  }

  // input输入框清除按钮样式
  .dataFile .el-input__suffix {
    .el-input__suffix-inner {
      .el-icon-circle-close:before {
        content: "\e79d" !important;
        font-size: 1.5rem;
      }
    }
  }
</style>
