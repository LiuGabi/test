<style lang="less">
    @import "../../static/elemetheme/index.css";
    @import "../../static/css/index.less";
</style>

<script>
	import html from '../html/layout/index.html'

	import {mapActions} from 'vuex'

	export default {
		template: html,
		data() {
			var validatePassOld = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入旧密码'));
				} else {
					if(this.changePasswordData.newPassword !== '') {
						this.$refs.changePasswordData.validateField('newPassword');
					}
					callback();
				}
			};
    		var validatePassNew = (rule, value, callback) => {
    			if (value === '') {
					callback(new Error('请输入新密码'));
				} else if (value == this.changePasswordData.originPassword) {
					callback(new Error('请不要两次输入密码一样'));
				} else {
					callback();
				}
			};

			return {
				username: JSON.parse(localStorage.username),
				changePasswordData: {
					originPassword: '',
					newPassword: ''
        		},
        		changePasswordDataRules: {
                    originPassword: [
                        { validator: validatePassOld, trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: validatePassNew, trigger: 'blur' }
                    ]
                },
				passwordVisible: false
			}
		},
		methods: {
			...mapActions(['CLEAR_PASSWORD', 'CHANGE_PASSWORD']),
        	setPassword() {

        		this.CHANGE_PASSWORD(this.changePasswordData).then(res => { 
        			this.passwordVisible = false;

	                this.changePasswordData.originPassword = '';
					this.changePasswordData.newPassword = '';

        			if (res === 'Success') {
        				let myThis = this;
        				this.$message({
                            message: '密码修改成功',
                            type: 'success',
                            duration: 2000,
                            onClose() {
                            	// 密码修改成功后重新登录
		                        myThis.CLEAR_PASSWORD().then( () => {
				        			myThis.$router.replace({name: 'signin'});
				        		});
                            }
                        });
        			} else {
                        this.$message({
                            message: res,
                            type: 'warning',
                            duration: 2000
                        });
        			}
        		});
        	},
        	changePassword(formName) {
        		this.$refs[formName].validate((valid) => {
					if (valid) {
						this.setPassword();
					} else {
						return false;
					}
				});
        	},
        	cancelPasswordOpen() {
        		this.passwordVisible = false;

        		this.changePasswordData.originPassword = '';
        		this.changePasswordData.newPassword = '';
        	},
        	signOut() {
        		this.CLEAR_PASSWORD().then( () => {
        			this.$router.replace({name: 'signin'});
        		});
        	}
		},
		mounted() {
			document.title = this.$route.meta.title;
		}
	};
</script>