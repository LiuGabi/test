<style>
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
            border-top: 1px solid #ccc;
            padding: 14px;
        }
        .userBtn button{
              border: 1px solid #ccc;
              background: #e48f43;
              color: #fff;
              padding: 8px 30px;
              font-family: '微软雅黑';
              box-shadow: 5px 5px 9px 0px #ccc;
              margin-bottom: 25px;
        }
        .modal .demo-form-inline{
            margin-right: 79px;
        }
        .userBtn .text{
            float: left;
            margin-bottom: 10px;
            margin-left: 18px;
        }
        .userBtn .btn{
            padding-right: 22px;
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
</style>
<template>
  <div>
     <div class='modal' v-show='approveUser'>
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
         <div class='userBtn'>
              <div class='text'><textarea rows="5" cols="30"></textarea></div>
              <div class='btn'>
                   <button class='pass' style='color:#21bcbe;'>通过</button><br>
                   <button class='refuse'>拒绝</button>
              </div>
         </div>
     </div>
     <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中...">
            <el-table-column  prop="accounts"  label="帐号"  width="150"></el-table-column>
            <el-table-column  prop="name"  label="姓名"  width="100"></el-table-column>
            <el-table-column  prop="phone"  label="手机号码"  width="150"></el-table-column>
            <el-table-column  prop="time" label="注册时间"  width="200"></el-table-column>
            <el-table-column  prop="state"  label="审批状态"  width="100"></el-table-column>
            <el-table-column  fixed="right"  label="操作"  width="450">
                <template scope="scope">
                    <el-button size="small"
                      type="text"
                      @click="approve(scope.row)">审批</el-button>
                </template>
            </el-table-column>
     </el-table>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                list1:false,
                list2:false,
                list3:false,
                approveUser:true,
                formInline: {
                  user: '',
                  role: '',
                },
                tableData:[{
                     accounts:'wangwenjun',
                     phone:'12345678900',
                     name:'王总',
                     time:'2017-2-3',
                     state:'待审批'
                },{
                     accounts:'wangwenjun',
                     phone:'12345678900',
                     name:'王总',
                     time:'2017-2-3',
                     state:'待审批'
                },{
                     accounts:'wangwenjun',
                     phone:'12345678900',
                     name:'王总',
                     time:'2017-2-3',
                     state:'待审批'
                },{
                     accounts:'wangwenjun',
                     phone:'12345678900',
                     name:'王总',
                     time:'2017-2-3',
                     state:'待审批'
                },{
                     accounts:'wangwenjun',
                     phone:'12345678900',
                     name:'王总',
                     time:'2017-2-3',
                     state:'待审批'
                }]
            }
        },
        methods:{
            approve(){
                console.log(11);
                this.approveUser = true
            },
            close(){
                this.approveUser = false;
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
        }
    }
</script>