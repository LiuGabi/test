<style  type="text/css">
    .modal{
        background: #fff;
        width: 400px;
        border: 1px solid #ccc;
        text-align: right;
        position: absolute;
        z-index: 10;
        top: 15%;
        left: 42%;
        box-shadow:-2px 2px 15px 1px;
        -moz-box-shadow:-2px 2px 15px 1px;
        -webkit-box-shadow:-2px 2px 15px 1px;
    }
    .userTitle{
        line-height: 45px;
        height: 45px;
        display: inline-block;
        border-bottom:1px solid #ccc;
        margin-bottom:20px;
    }
    .userTitle span{
        float:left;
        margin-left:10px;
        font-size: 16px;
        font-weight: bold;
    }
    .userTitle img{
        margin-left: 281px;
         padding-right: 10px;
         padding-top: 7px;
    }
    .userBtn{
        text-align: right;
        border-top:1px solid #ccc;
    }
    .userBtn button{
          border: 1px solid #ccc;
          background: #e48f43;
          color: #fff;
          padding: 8px 30px;
          margin: 15px 88px;
          font-family: '微软雅黑';
          box-shadow: 5px 5px 9px 0px #ccc;
    }
    .role_content{
        text-align:left;
        margin:0 0 20px 131px;
    }
    .role_content ul>li{
        font-size:14px;
        padding:5px;
        cursor: pointer;
    }
    .role_content ul li input{
       width: 17px;
       height: 17px;
       vertical-align: middle;
    }
    .role_content ul li ul{
        margin-left: 28px;
        margin-top:5px;
    }
    .modal .demo-form-inline{
        margin-right: 79px;
    }
    .paging-wrap {
    	padding: 15px 0;
    	text-align: right;
    }
</style>
<template>
   <div>
        <el-form :inline="true" :model="tableData" class="demo-form-inline">
          <el-form-item label="帐号">
            <el-input v-model="tableData.account" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="tableData.role" placeholder="角色">
              <el-option label="审批组长" value="shanghai"></el-option>
              <el-option label="审批经理" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='onSubmit(tableData)'>查询</el-button>
            <el-button type="primary" @click="onAdd">新建</el-button>
          </el-form-item>
        </el-form>

        <div class='modal' v-show='newUser'>
             <div class='userTitle'><span>新建用户</span><img src="../../../src/css/images/close.png" @click='close'></div>
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="用户名" class='one'>
                      <el-input v-model="formInline.account" placeholder="用户名"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名">
                      <el-input v-model="formInline.name" placeholder="姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="手机">
                      <el-input v-model="formInline.phone" placeholder="手机"></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                      <el-input v-model="formInline.password" placeholder="密码"></el-input>
                  </el-form-item>
             </el-form>
             <div class='userBtn' @click="newBuild"><button>新建</button></div>
        </div>

        <div class='modal' v-show='restpw'>
             <div class='userTitle'><span>重置密码</span><img src="../../../src/css/images/close.png" @click='close'></div>
             <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-form-item label="账户" class='one'>
                      <el-input v-model="formInline.account" placeholder="账户" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="姓名">
                      <el-input v-model="formInline.name" placeholder="姓名" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="手机">
                      <el-input v-model="formInline.phone" placeholder="手机" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                      <el-input v-model="formInline.password" placeholder="密码"></el-input>
                  </el-form-item>
             </el-form>
             <div class='userBtn' @click="resetOk"><button>确定</button></div>
        </div>

        <div class='modal' v-show='modifyRole'>
             <div class='userTitle'><span>修改角色</span><img src="../../../src/css/images/close.png" @click='close'></div>
             <div class='role_content'>
                <ul>
                    <li  @click='list11'>
                        <input type='checkbox'> 信审员（信审系统）
                        <ul v-show='list1'>
                            <li>初审列表</li>
                        </ul>
                    </li>
                    <li  @click='list22'>
                        <input type='checkbox'> 信审组长（信审系统）
                        <ul v-show='list2'>
                            <li>申请列表</li>
                            <li>终审列表</li>
                            <li>结案列表</li>
                        </ul>
                    </li>
                    <li  @click='list33'>
                        <input type='checkbox'> 财务经理（财务系统）
                        <ul v-show='list3'>
                            <li>待放款列表</li>
                            <li>已放款列表</li>
                        </ul>
                    </li>
                </ul>
             </div>
             <div class='userBtn'><button>确定</button></div>
        </div>

         <div class='modal' v-show='checkRole'>
             <div class='userTitle'><span>查看角色</span><img src="../../../src/css/images/close.png" @click='close'></div>
              <div class='role_content'>
                 <ul>
                     <li>
                         <input type='checkbox'> 信审员（信审系统）
                         <ul>
                             <li>初审列表</li>
                         </ul>
                     </li>
                     <li>
                         <input type='checkbox'> 信审组长（信审系统）
                         <ul>
                             <li>申请列表</li>
                             <li>终审列表</li>
                             <li>结案列表</li>
                         </ul>
                     </li>
                     <li>
                         <input type='checkbox'> 财务经理（财务系统）
                         <ul>
                             <li>待放款列表</li>
                             <li>已放款列表</li>
                         </ul>
                     </li>
                 </ul>
              </div>
             <div class='userBtn'><button>确定</button></div>
        </div>

        <el-dialog title="禁用" v-model="forbidden" size="tiny">
          <span style='text-align:center;'>禁用<span style='color:red;'>王总？</span></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="forbidden = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="启用" v-model="startUsing" size="tiny">
          <span style='text-align:center;'>启用<span style='color:red;'>王总？</span></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="startUsing = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-table :data="create_user.list" style="width: 100%"  @selection-change="handleSelectionChange" v-loading="loading"
            element-loading-text="拼命加载中...">
        	  	<el-table-column  prop="account"  label="帐号"  width="150"></el-table-column>
        	    <el-table-column  prop="name"  label="姓名"  width="150"></el-table-column>
        	    <el-table-column  prop="phone"  label="手机号码"  width="150"></el-table-column>
        	    <el-table-column  prop="regTime"  label="注册时间"  width="200"></el-table-column>
        	    <el-table-column  prop="status"  label="审批状态"  width="100"></el-table-column>
        	    <el-table-column  prop="useStatus"  label="可用状态"  width="100"></el-table-column>
        	    <el-table-column  fixed="right"  label="操作"  width="450">
        	    	<template scope="scope">
        		        <el-button size="small"
        		              type="text"
        		              @click="look_role(scope.row)">查看角色</el-button>
        		        <el-button size="small"
                          type="text"
                          @click="modify(scope.row)">修改角色</el-button>
                    <el-button size="small"
                          type="text"
                          @click="restPassword(scope.row)">重置密码</el-button>
        		        <el-button size="small"
        		              type="text"
        		              @click="table_startUsing1" v-if='scope.row.useStatus == 0'>启用</el-button>
        		        <el-button size="small"
                          type="text"
                         @click="table_forbidden1" v-else-if='scope.row.useStatus == 1'>禁用</el-button>
        	    </template>
        	 </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class='paging-wrap'>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page='create_user.currentIndex'
            :page-sizes="[10, 20, 30, 40]"
            :page-size='create_user.pageSize'
            layout="total, sizes, prev, pager, next, jumper"
            :total='create_user.totalCount'></el-pagination>
        </div>
        {{create_user}}
   </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

  export default {
    computed: {
        ...mapState({
            create_user: state => state.userManagement.list
        }),
    },
    data() {
      return {
        table_startUsing:false,
        table_forbidden:false,
        list1:false,
        list2:false,
        list3:false,
        newUser:false,
        modifyRole:false,
        checkRole:false,
        activeName: '1',
        restpw:false,
        forbidden:false,
        startUsing:false,
        dialogVisible:false,
        dialogVisible1:false,
        dialogFormVisible:false,
        formLabelWidth:'120px',
        formInline: {
          account:'',
          name:'',
          phone:'',
          password:''
        },
        password:[{
            originPassword:'',
            newPassword:''
        }],
        tableData:{
              role: '',
              account:'',
              page_no:1,
              page_size:10,
         },
         loading: true,
      }
    },
    methods: {
        ...mapActions(['QUERY_USER','CREATE_USER','RESET_PASSWORD','LOOK_ROLE','MODIFY_ROLE','ALL_ROLE']),
        getUsing() {
            this.QUERY_USER(this.tableData).then(res => {
            console.log(res[0].useStatus);
                this.loading = false;
              
            });
        },
        newBuild(){
            this.CREATE_USER(this.formInline).then( res => {
                if( res == 'Success'){
                    this.getUsing()
                }
            })
        },
        handleSizeChange(val) {
            this.tableData.page_size = val;
            this.getUsing();
        },
        handleCurrentChange(val) {
            this.tableData.page_no = val;
            this.getUsing();
        },
       onSubmit(form) {
          this.tableData.account = form.account;
          this.tableData.role = form.role;
          console.log(this.tableData.account);
          this.getUsing(form);
       },
       onAdd() {
            this.newUser = true;
       },
       handleSelectionChange(val) {
           this.selected = val;
           console.log(val);
       },
       close(){
            this.newUser = false;
            this.modifyRole = false;
            this.restpw = false;
            this.checkRole = false;
       },
       modify(){
            this.modifyRole = true;
       },
       restPassword(row){
           this.restpw = true;
           console.log(row.account);
           this.formInline.account = row.account;
           this.formInline.name = row.name;
           this.formInline.phone = row.phone;
           this.formInline.password = row.password;
       },
       resetOk(){
            this.restpw = false;
            this.RESET_PASSWORD(this.formInline).then(res => {
                console.log(res)
                if(res == 'Success'){
                    this.loading = false;
                    alert("重置密码成功！")
                }else{
                    alert("前后密码一致！请重新设置密码哦！")
                }
            });
       },
       look_role(){
           this.LOOK_ROLE(this.tableData).then(res =>{
              console.log(res)
           })
           this.checkRole = true;
       },
       list11(){
            this.list1 = true;
            this.list2 = false;
            this.list3 = false;
       },
       list22(){
            this.list2 = true;
            this.list1 = false;
            this.list3 = false;
       },
       list33(){
            this.list3 = true;
            this.list2 = false;
            this.list1 = false;
       },
       table_startUsing1(){
            this.startUsing = true;
       },
       table_forbidden1(){
            this.forbidden = true;
       }
    },
    mounted() {
        this.getUsing();
    }
  }
</script>