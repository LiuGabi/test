<style type="text/css" lang='less'>
	.app2{
	    background:#fff;
	    width:500px;
	    height:240px;
	    position:fixed;
	    top:20%;
	    left:50%;
	    bottom:10%;
	    z-index: 1300;
	    margin-left:-230px;
	    border-radius:5px;
	    text-align:center;
	    box-shadow:-2px 2px 15px 1px;
	    -moz-box-shadow:-2px 2px 15px 1px;
	    -webkit-box-shadow:-2px 2px 15px 1px;
	    padding-right:60px;
	    .btn{
	    	width: 50%;
		    margin: 0 43px 0 200px;
	    }
	}
	.el-input__inner{
		width:50px;
	}
	.title{
		width: 100%;
		font-size:18px;
		padding:16px 0;
		margin-left:20px;
		margin-bottom: 10px;
		text-align: left;
		.images{
			float:right;
			margin-right:-25px;
		}
	}
</style>
<template>
	<header class='header clearfix'>
		<div class='logo'>
			<router-link :to='{name: "banner"}'>Logo</router-link>
			<span>管理系统</span>
		</div>

		<ul class='menu'>
			<li>
				<span>欢迎你，{{username}}</span>
			</li>
			<li class="modify-password" v-on:click='modify_password'>
				<span>修改密码</span>
			</li>
			<li class='sign-out' v-on:click='signOut'>
				<span><i class='icon icon-exit'></i> 退出系统</span>
			</li>
		</ul>

		<!-- <el-dialog title="修改密码" v-model="dialog_password" size="tiny" class='dialog'> -->
		<div class="app2" v-show='dialog_password'>
	    	<div class='title'>修改密码<img src="../css/images/close.png" @click='close' class="images"></div>
		    <el-form :model="password" :rules="rules2" ref="password" label-width="70px" class="demo-ruleForm" >
		    	  <el-form-item label="旧密码" prop='originPassword'>
				    <el-input type="text" v-model="password.originPassword" placeholder='请输入旧密码'></el-input>
				  </el-form-item>
				  <el-form-item label="新密码" prop='newPassword'>
				    <el-input type="text" v-model="password.newPassword" placeholder='请重新设置密码'></el-input>
				  </el-form-item>
				  <el-form-item class='btn'>
				    <el-button class="btn1" type="primary" :loading="updateLoading" @click="modifyPassword(password)">确定</el-button>
				    <el-button class="btn1" @click="close">取消</el-button>
				  </el-form-item>
			</el-form>
		</div>
		<!-- </el-dialog> -->	
	</header>
</template>

<script>
	import {mapActions} from 'vuex'

	export default{
		data () {
			return {
				username: JSON.parse(localStorage.username),
				dialog_password:false,
				password:{
					originPassword:'',
					newPassword:''
				}
			}
		},
		methods: {
			...mapActions(['SIGNOUT','MODIFY_PASSWORD']),
			signOut(){
				this.SIGNOUT().then(() => {
					this.$router.replace('/login');
				})
			},
			modify_password() {
				this.dialog_password=true;
			},
			modifyPassword(password) {
				console.log(password);
				this.MODIFY_PASSWORD(this.password);
				this.dialog_password=false;
			},
			close() {
				this.dialog_password=false;
			}
		}
	}
</script>