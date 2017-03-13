<style lang="less">
    @import "../../static/css/pages/sign.less";
</style>

<script>
	import html from '../html/sign/index.html'

	import {mapActions} from 'vuex'

	export default {
		template: html,
		data() {
			return {
				btn: false,
				error: false,
				signInData: {
					user: '',
					password: ''
				},
				signLoading: false
			}
		},
		methods: {
			...mapActions(['SIGNIN']),
			isKFSystem() {
	        	// 检测是不是客服系统
	        	let dataArr = JSON.parse(localStorage.getItem('permissions'));
	        	for(let i in dataArr) {
	        		if (dataArr[i].permissionId === 'KF_SYSTEM') {
	        			return true;
	        		}
	        	}

	        	return false;

	        },
	        matchPath() {
	        	// 按顺序跳转权限范围内的页面
	        	let dataArr = JSON.parse(localStorage.getItem('permissions'));

	        	if (this.isKFSystem()) {
	        		for(let i in dataArr) {
	        			if (dataArr[i].permissionId === 'KF_INCOMING_EVENT') {return 'home';}
	        			if (dataArr[i].permissionId === 'KF_ALL_EVENT') {return 'manger';}
	            	}
	        	} else {
	        		this.error = true;
	        		return 'signin';
	        	}

	        },
			submit() {
				this.btn = true;

				if(!this.signInData.user || !this.signInData.password) {
					return;
				}

				this.signLoading = true;

				this.SIGNIN(this.signInData).then( res => {
					if (res === 'Success') {
						this.signLoading = false;
						this.$router.replace({name: this.matchPath()});
					} else {
						this.signLoading = false;
						this.error = true;
					}
				});
			}
		},
		mounted() {
			document.title = this.$route.meta.title;
		}
	};

</script>