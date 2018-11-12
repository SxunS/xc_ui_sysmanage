<template>
  <div>
    <el-form :model="params">
      <el-select v-model="params.siteId" clearable placeholder="请选择站点" >
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：<el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" size="small">查询</el-button>
      <router-link class="mui-tab-item" :to="{path:'/cms/page/add/',query:{page:this.params.currentPage,siteId:this.params.siteId}}">
      <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="150">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180" >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="page">
          <el-button type="text" size="small" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button @click="del(page.row.pageId)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="params.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="params.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'
  export default {
    data() {
      return {
        siteList: [],
        tableData: [],
        total:30,
        params:{
          siteId:'',
          pageAliase:'',
          pageSize:10,
          currentPage:1
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.pageSize = val;
        this.query();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.currentPage = val;
        this.query();
      },
      query(){
        cmsApi.page_list(this.params.currentPage,this.params.pageSize,this.params).then((res) => {
          this.total = res.queryResult.total;
          this.tableData = res.queryResult.list;
        })
      },
      edit(pageId){
        this.$router.push({
          path:'/cms/page/edit/'+ pageId,query:{
            page:this.params.currentPage,
            siteId:this.params.siteId
          }
        })
      },
      del(pageId){
        this.$confirm("确定删除？","提示",{}).then(() => {
          cmsApi.page_del(pageId).then((resp) => {
            if (resp.success) {
              this.$message({
                type:"success",
                message:"删除成功！"
              })
              this.query();
            }else {
              this.$message({
                type:"error",
                message:"删除失败！"
              })
            }
          })
        })
      }
    },
    mounted(){
      //默认查询
      this.query();
      //初始化站点列表
      this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'5a7be667d019f14d90a1fb1c',
          siteName:'导航站'
        }
      ]
    }
  }
</script>
