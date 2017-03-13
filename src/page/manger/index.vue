<style lang="less">
	@import "../../static/css/pages/manger.less";
</style>

<script>
	import html from '../html/manger/index.html'
	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
                customerEvent: state => state.CustomerEvent
            })
        },
		data() {
			 let timeStampFrom = (rule, value, callback) => {
			 	if (value) {
			 		this.customerEventData.incoming_time_from = new Date(value).getTime();
			 	}
				callback();
			}

			let timeStampTo = (rule, value, callback) => {
			 	if (value) {
			 		this.customerEventData.incoming_time_to = new Date(value).getTime();
			 	}
				callback();
			}

			return {
				customerEventData: {
					incoming_time_from: '',
					incoming_time_to: '',
					user_id: '',
					event_no: '',
					customer_type: '',
					event_type: '',
					receptionist_id: '',
					receptionist: '',
					status: '',

					page_no: 1,
					page_size: 10
				},
				customerEventDataRules: {
					incoming_time_from: [
						{validator: timeStampFrom}
					],
					incoming_time_to: [
						{validator: timeStampTo}
					]
				},

				listLoading: true,
				exportLoading: false,
			}
		},
		methods: {
			...mapActions(['GET_CUSTOMER_EVENT', 'GET_CUSTOMER_EVENT_EXCEL']),
			getCustomerEvent() {
				
				this.listLoading = true;

				this.GET_CUSTOMER_EVENT(this.customerEventData).then( res => {
					if (res === 'Success') {
						this.listLoading = false;
						console.log('CustomerEvent manger page:', res);
					} else {
						console.log('CustomerEvent manger page:', res);
					}

				});
			},
			getCustomerEventExcel() {
				this.exportLoading = true;

				this.GET_CUSTOMER_EVENT_EXCEL(this.customerEventData).then( res => {
					if (res === 'Success') {
						this.exportLoading = false;
						console.log('Export CustomerEvent manger page:', res);
					} else {
						console.log('Export CustomerEvent manger page:', res);
					}

				});
			},

			search(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getCustomerEvent();
                    } else {
                        return false;
                    }
                });
            },
            resetSearch(formName) {
            	this.$refs[formName].resetFields();
            },

            handleExportAll(formName) {
            	this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getCustomerEventExcel();
                    } else {
                        return false;
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
            }
		},
		mounted() {
			// 调用客户事件接口
			this.getCustomerEvent();
		}
	};

</script>