<template>
<div>
     <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="系统名称">
            <el-input v-model="formInline.systemName" placeholder="系统名称"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="formInline.role" placeholder="角色">
              <el-option label="审批组长" value="shanghai"></el-option>
              <el-option label="审批经理" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
     </el-form>

     <el-table :data="tableData" style="width: 949px;" v-loading="loading" element-loading-text="拼命加载中...">
            <el-table-column  prop="name"  label="角色名称"  width="200"></el-table-column>
            <el-table-column  prop="system"  label="所属系统"  width="200"></el-table-column>
            <el-table-column  prop="list"  label="全限列表"  width="550"></el-table-column>
     </el-table>
</div>
</template>

<script>
    export default {
        data(){
            return{
                formInline: {
                      systemName: '',
                      role: '',
                },
                tableData:[{
                     name:'信审组长',
                     system:'信审系统',
                     list:'信审系统 | 申请列表 | 终身列表 |结案列表',
                },{
                     name:'财务经理',
                     system:'财务系统',
                     list:'财务系统 | 待分配列表 | 已分配列表',
                }]
            }
        },
        methods:{
            onSubmit(){
                console.log(110)
            }
        }
    }
</script>