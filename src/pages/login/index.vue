/*<style type="text/css">
	.permission{
		width: 200px;
		height: 60px;
		color: #fff;
		background: rgba(0.0.0.0.5);
	}
</style>*/
<template>
	<div class="login">
		<div class="inner">
			<div class="logo"></div>
			<div class="account-wrap">
				<form v-on:submit.prevent="submit">
					<div class='account' v-bind:class='{"empty": btn && !formData.username}'>
						<label>用户名</label>
						<span>
							<input type="text" placeholder="请输入用户名" v-model="formData.username">
						</span>
					</div>
					<div class="password" v-bind:class='{"empty": btn && !formData.username}'>
						<label>密&nbsp;&nbsp;&nbsp;码</label>
						<span>
							<input type="password" placeholder="请输入密码" v-model="formData.password">
						</span>
					</div>
					<button class="el-button el-button--primary">登 录</button>
					<p class='error' v-show='error'>(づ￣3￣)づ╭❤～ 亲，密码或用户名错了~</p>
					<!-- <p v-show='permission' class='permission'>该用户没有权限登录！</p> -->
				</form>
			</div>
		</div>
	</div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        data() {
			return {
				btn: false, //true 已经提交过， false没有提交过
				error: false,
				// permission:true,
				formData: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
            ...mapActions(['SIGNIN']),
            isCPSystem() {
            	// 检测是不是产品系统
            	let dataArr = JSON.parse(localStorage.getItem('permissions'));
            	console.log(dataArr)
            	for(let i in dataArr) {
            		if (dataArr[i].permissionId === 'CP_SYSTEM') {
            			return true;
            		}else{
            			this.permission=true;
            		}
            	}
            	return false;
            },
            matchPath() {
            	// 按顺序跳转权限范围内的页面
            	let dataArr = JSON.parse(localStorage.getItem('permissions'));
                console.log(dataArr)
            	if (this.isCPSystem()) {
            		for(let i in dataArr) {
	        			if (dataArr[i].permissionId === 'CP_BANNER') {return 'banner';}
	        			if (dataArr[i].permissionId === 'CP_NOTICE') {return 'notic';}
	        			// if (dataArr[i].permissionId === 'CP_SYS_ADM') {return 'final';}
	        			// if (dataArr[i].permissionId === 'CP_REPORT') {return 'end';}
	            	}
	           		return 'banner';
            	} else {
            		this.error = true;
            		return 'login';
            	}

            },
			submit() {
				this.btn = true;
				if(!this.formData.username || !this.formData.password) {
					return;
				}
				this.SIGNIN(this.formData).then( res => {

					if (res == 'Success') {
						this.$router.replace({name: this.matchPath()});
					} else{
					     console.log(res)
					     this.error = true;
					}
				});
				
			},
			
		}
		
    }
</script>