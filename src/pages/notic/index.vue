<style lang="less" scoped>
	.demo-ruleForm{
		padding-left:0px;
	}
	.dialog-footer{
		margin-top:-30px;
		padding-right:15px;
	}
</style>
<template>
<div class="banner">
	<el-button  type="primary" class="btn" @click="add">添 加</el-button>

  	<el-dialog title="添加数据" v-model="dialog_addData" size="tiny" class='dialog'>
	  	<el-form :model="notice" :rules="rules2" ref="notice" label-width="70px" class="demo-ruleForm" id='demo-ruleForm'>
		   <el-form-item label="标题" prop='title'>
		    <el-input type="text" v-model="notice.title"></el-input>
		   </el-form-item>
		   <el-form-item label="链接" prop='link'>
		    <el-input type="text" v-model="notice.link"></el-input>
		   </el-form-item>
		</el-form>
	   <span slot="footer" class="dialog-footer">
	    <el-button @click="close">取 消</el-button>
	    <el-button class="btn1" @click="reset">重置</el-button>
	    <el-button type="primary" @click="addData(notice)">确 定</el-button>
	  </span>
	</el-dialog>

	<el-dialog title="修改数据" v-model="dialog_modify" size="tiny" class='dialog'>
	  	<el-form :model="notice_modify" :rules="rules2" ref="notice_modify" label-width="70px" class="demo-ruleForm" >
	  		<el-form-item label="公告ID" prop='id'>
			   <el-input type="text" v-model="notice_modify.id" disabled></el-input>
			</el-form-item>
		   <el-form-item label="标题" prop='title'>
		    <el-input type="text" v-model="notice_modify.title"></el-input>
		   </el-form-item>
		   <el-form-item label="链接" prop='link'>
		    <el-input type="text" v-model="notice_modify.link"></el-input>
		   </el-form-item>
		</el-form>
	   <span slot="footer" class="dialog-footer">
	    <el-button @click="close">取 消</el-button>
	    <el-button type="primary" :loading="updateLoading" @click="modifyData(notice_modify)">确 定</el-button>
	  </span>
	</el-dialog>

	<el-table :data="notic.list" style='width:100%' @selection-change='handleSelectionChange' v-loading='loading' element-loading-text='拼命加载中...'>
		<el-table-column prop='id' type='selection' width='50' class='check'></el-table-column>
		<el-table-column prop='title' label="标题"></el-table-column>
		<el-table-column prop='link' label="链接"></el-table-column>
		<el-table-column  label='操作' width='150'>
			<template scope="scope">
				<el-button size='small' type='text' @click="modify(scope.row)">修改</el-button>
				<el-button size='small' type='danger' @click='Delete(scope.row)'>删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        computed: {
	  		...mapState({
	  			notic:state => state.notic
	  		})
	  	},
        data() {
        	return{
        		loading:true,
        		dialog_addData:false,
        		dialog_modify:false,
        		tableData: {
        			id:'',
        			link:'',
        			title:''
        		},
        		notice:{
        			link: '',
  					title: ''
        		},
        		notice_modify:{
        			id:'',
        			link:'',
        			title:''
        		}

        	}
        },
        methods:{
        	...mapActions(['NOTIC','CREAT_NOTIC','MODIFY_NOTIC','DELETE_NOTIC']),

        	handleSelectionChange(val) {
		       this.selected = val;
		       console.log(val);
		    },
		    close(){
		    	this.dialog_addData=false;
		    	this.dialog_modify=false;
		    },
		    reset(){
		    	this.notice.title='',
		    	this.notice.link=''
		    },
		    getNotice(){
		    	this.NOTIC(this.tableData).then( res => {
		    		if(res == 'Success'){
		    			this.loading=false;
		    		}
		    	})
		    },
		    add(){
		    	this.dialog_addData=true		    	
		    },
		    addData(notice){
		    	console.log(notice)
		    	this.dialog_addData=false;	
		    	this.CREAT_NOTIC(this.notice).then( res => {
		    		if (res == 'Success') {
		    			this.getNotice()
						this.$notify({
							message: '添加成功',
							type: 'success'
						});
					} else {
						this.$notify({
							message: '添加失败',
							type: 'error'
						});
					}
		    	})
		    },
		    modify(param){
		    	this.dialog_modify=true;
		    	this.notice_modify.id=param.id;
		    	this.notice_modify.title=param.title;
		    	this.notice_modify.link=param.link;
		    	console.log(param.title)
		    },
		    modifyData(param){
		    	this.dialog_modify=false;
		    	this.notice_modify.id=param.id;
		    	this.notice_modify.title=param.title;
		    	this.notice_modify.link=param.link;
		    	console.log(param.title)
		    	this.MODIFY_NOTIC(this.notice_modify).then(res => {
		    		if(res == 'Success'){
		    			this.getNotice()
						this.$notify({
							message: '修改成功',
							type: 'success'
						});
		    		} else {
						this.$notify({
							message: '修改失败',
							type: 'error'
						});
					}
		    	})
		    },
		    Delete(id) { 
	        	console.log(id.id);    	
	        	// this.DELETE_BANNER(id);
	        	// this.tableData.id = id;
		        this.$confirm('此操作将永久删除 ' + id.id + ', 是否继续?', '提示',  {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.DELETE_NOTIC(id.id).then(res => {
		          	if(res =='Success'){
		          		this.getNotice(); 
			            this.$message({
			                type: 'success',
			                message: '删除成功!'
			            });
		          	}
		          })     
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
		    },	   
        },
        mounted(){
        	this.getNotice();
        }
    }
</script>