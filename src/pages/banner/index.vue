<template>
<div class="banner">
    <el-button  type="primary" class="btn" @click="add">添 加</el-button>

    <div class='app1' v-show='show'>
    	<div class='title'>添加数据<img src="../../../src/css/images/close.png" @click='close'></div>
	    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="70px" class="demo-ruleForm" >
			  <el-form-item label="名称" prop='name'>
			    <el-input type="text" v-model="ruleForm2.name"></el-input>
			  </el-form-item>
			  <el-form-item label="类型" prop='type'>
			    <el-input type="text" v-model="ruleForm2.type"></el-input>
			  </el-form-item>
			  <el-form-item label="图片编码" prop='imageCode'>
			    <el-input type="text" v-model="ruleForm2.imageCode"></el-input>
			  </el-form-item>
			  <el-form-item label="图片地址" prop='imageUrl'>
			    <el-input type="text" v-model="ruleForm2.imageUrl"></el-input>
			  </el-form-item>
			  <el-form-item label="图片链接" prop='imageLink'>
			    <el-input type="text" v-model="ruleForm2.imageLink"></el-input>
			  </el-form-item>
			  <el-form-item label="顺序" prop='imageOrder'>
			    <el-input type="text" v-model="ruleForm2.imageOrder"></el-input>
			  </el-form-item>
			  <el-form-item class='btn'>
			    <el-button class="btn1" type="primary" @click="addData(ruleForm2)">添加</el-button>
			    <el-button class="btn1" @click="reset">重置</el-button>
			    <el-button class="btn1" @click="close">取消</el-button>
			  </el-form-item>
			</el-form>
	</div>

	<div class='app' v-show='show1'>
    	<div class='title'>修改数据<img src="../../../src/css/images/close.png" @click='close'></div>
	    <el-form :model="update" :rules="rules2" ref="update" label-width="70px" class="demo-ruleForm" >
	    	  <el-form-item label="ID" prop='id'>
			    <el-input type="text" v-model="update.id" disabled></el-input>
			  </el-form-item>
			  <el-form-item label="名称" prop='name'>
			    <el-input type="text" v-model="update.name"></el-input>
			  </el-form-item>
			  <el-form-item label="类型" prop='type'>
			    <el-input type="text" v-model="update.type"></el-input>
			  </el-form-item>
			  <el-form-item label="图片编码" prop='imageCode'>
			    <el-input type="text" v-model="update.imageCode"></el-input>
			  </el-form-item>
			  <el-form-item label="图片地址" prop='imageUrl'>
			    <el-input type="text" v-model="update.imageUrl"></el-input>
			  </el-form-item>
			  <el-form-item label="图片链接" prop='imageLink'>
			    <el-input type="text" v-model="update.imageLink"></el-input>
			  </el-form-item>
			  <el-form-item label="顺序" prop='imageOrder'>
			    <el-input type="text" v-model="update.imageOrder"></el-input>
			  </el-form-item>
			  <el-form-item class='btn'>
			    <el-button class="btn1" type="primary" :loading="updateLoading" @click="modifyData(update)">修改</el-button>
			    <el-button class="btn1" @click="close">取消</el-button>
			  </el-form-item>
			</el-form>
	</div>

	<el-table :data="banner.list" style="width: 100%"  @selection-change="handleSelectionChange" v-loading="loading"
    element-loading-text="拼命加载中...">
	  	<el-table-column  prop="id" type="selection" width='50' class="check"></el-table-column>
	  	<el-table-column  prop="name"  label="名称"  width="110"></el-table-column>
	    <el-table-column  prop="type"  label="类型"  width="80"></el-table-column>
	    <el-table-column  prop="imageCode" label="图片编码"  width="200"></el-table-column>
	    <el-table-column  prop="imageUrl"  label="图片地址"  width="600"></el-table-column>
	    <el-table-column  prop="imageLink"  label="图片链接"  width="450"></el-table-column>
	    <el-table-column  prop="imageOrder"  label="顺序"  width="80"></el-table-column>
	    <el-table-column  fixed="right"  label="操作"  width="150">
	    	<template scope="scope">
		        <el-button size="small"
		          type="text"
		          @click="modify(scope.row)">修改</el-button>
		        <el-button size="small"
		          type="danger"
		          @click="Delete(scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	</el-table>

	<div class="pages">
		 <el-pagination 
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
	      :current-page="currentPage"
	      :page-sizes="[10, 20, 30, 40]"
	      :page-size="10"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total='banner.list.length'>
	    </el-pagination>
	</div>
</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

  export default {
  	computed: {
  		...mapState({
  			banner:state => state.banner
  		})
  	},
    data() {
      return {
      	show:false,
      	show1:false,
      	currentPage: 1,
      	password:{
			originPassword:'',
			newPassword:''
		},
        tableData: {
        	id:'',
  			imageUrl:'',
  			imageLink:'',
        	imageCode:'',
        	imageOrder:0,
        	name:'',
        	type:'WEB',
        },
        ruleForm2: {
        	imageCode:'',
        	imageLink:'',
        	imageOrder:0,
        	imageUrl:'',
        	name:'',
        	type:'WEB',
        	requestId:''
	    },
	    update: {
        	id:'',
        	imageCode:'',
        	imageLink:'',
        	imageOrder:0,
        	imageUrl:'',
        	name:'',
        	type:'WEB',
        	requestId:''
	    },	   	    
        loading: true,
        selected: [],
      }
    },

    methods: {
    ...mapActions(['BANNER','CREAT_BANNER','DELETE_BANNER','MODIFY_BANNER']),
    	handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	       
	    },
	    handleCurrentChange(val) {
	        this.currentPage = val;
	        console.log(`当前页: ${val}`);
	    },
        getBannering() {
            console.log(this.tableData)
			this.BANNER(this.tableData).then(res => {
        		if(res == 'Success') {
        			this.loading = false;
        		}
        	});
		},
		reset(){
			this.ruleForm2.name='';
			this.ruleForm2.imageCode='';
			this.ruleForm2.imageLink='';
			this.ruleForm2.imageUrl='';
		},
		add() {
    	 	this.show=true;
	    },
		addData(ruleForm2){
		    this.show=false;
			this.$confirm('确定要添加此数据吗?','提示',{
				confirmButtonText:'确定',
				cancelButtonText:'取消',
				type:'warning'
			}).then(() => {				
				this.CREAT_BANNER(this.ruleForm2).then(res => {
					if(res == 'Success'){
						this.getBannering();
						this.$message({
						type:'success',
						message:'添加成功！'
						});
					}else{
						this.$message({
						type:'info',
						message:'请把数据添加完整！'
						});
					}
				});											
				this.tableData.push(ruleForm2);	
			})
			// .catch(() => {
			// 	this.$message({
	  //           type: 'info',
	  //           message: '已取消添加'
	  //         }); 
			// })
		},
		modify(param){
			this.show1=true;
			console.info(param.id);
			this.update.id=param.id;
			this.update.imageCode=param.imageCode;
			this.update.imageLink=param.imageLink;
			this.update.imageUrl=param.imageUrl;
			this.update.name=param.name;			
		},
        modifyData(id) {        	
        	this.show1=false;
        	this.update.id=id.id;
        	this.update.imageCode=id.imageCode;
			this.update.imageLink=id.imageLink;
			this.update.imageUrl=id.imageUrl;
			this.update.name=id.name;	
        	console.log("modifyData:"+id.name);
        	this.MODIFY_BANNER(this.update).then(res => {
        		console.log(res)
        		if(res === 'Success'){
        			this.getBannering();
        		}
        	});
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
	          this.DELETE_BANNER(id.id).then(res => {
	          	if(res =='Success'){
	          		this.getBannering(); 
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
	    handleSelectionChange(val) {
	       this.selected = val;
	       console.log(val);
	    },
	    close(){
	    	this.show=false;
	    	this.show1=false;
	    },    	
	},
    mounted() {
    	this.getBannering();
    	this.DELETE_BANNER(this.id)  	
    }
  }

</script>