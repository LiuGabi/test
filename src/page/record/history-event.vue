<script>
	import html from '../html/record/history-event.html'

	import {mapState, mapActions} from 'vuex'

	let base64 = require('base-64')

	export default {
		template: html,
		computed: {
            ...mapState({
            	customerEvent: state => state.CustomerEvent,
            })
        },
        data() {
        	return {
				customerEventData: {
					incoming_phone: '',

					page_no: 1,
					page_size: 10
				},
				listLoading: false,
        	}
        },
        methods: {
        	...mapActions(['GET_CUSTOMER_EVENT']),
        	getCustomerEvent() {
				this.listLoading = true;

				this.customerEventData.incoming_phone = base64.decode(this.$route.params.phone);
				this.GET_CUSTOMER_EVENT(this.customerEventData).then( res => {
					if (res === 'Success') {
						this.listLoading = false;
						console.log('CustomerEvent record page:', res);
					} else {
						console.log('CustomerEvent record page:', res);
					}
				});
			},

			handleSizeChange(val) {
                this.customerEventData.page_size = val;
                this.getCustomerEvent();
            },
            handleCurrentChange(val) {
                this.customerEventData.page_no = val;
                this.getCustomerEvent();
            },
        },
        mounted() {
        	this.getCustomerEvent();

        	
        }
	};

</script>