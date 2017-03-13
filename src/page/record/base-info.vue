<script>
	import html from '../html/record/base-info.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	CustomerInfo: state => state.Customer.info
            })
        },
        methods: {
        	...mapActions(['GET_CUSTOMER_INFO']),
        	getCustomerInfo(customerId) {
				this.GET_CUSTOMER_INFO(customerId).then( res => {
					if (res === 'Success') {
						console.log('CustomerInfo record page:', res);
					} else {
						console.log('CustomerInfo record page:', res);
					}
				});
			},
        },
        mounted() {
			// 获取客户信息
			this.getCustomerInfo(this.$route.params.customerId);
		}
	};

</script>