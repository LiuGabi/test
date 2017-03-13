<style lang="less">
	@import "../../static/css/pages/home.less";
</style>

<script>
	import html from '../html/home/index.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
                receptionist: state => state.Receptionist,
                customerEvent: state => state.CustomerEvent,
                customerIdInfo: state => state.Customer.customerIdInfo
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
				outlineData: {
					date: new Date().getTime()
				},
				customerEventData: {
					incoming_time_from: '',
					incoming_time_to: '',
					user_id: '',
					event_no: '',
					customer_type: '',
					event_type: '',
					receptionist_id: '',
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

				customerPhone: localStorage.getItem('customerPhone') ? localStorage.getItem('customerPhone'): '',
				answerDialog:  true

			}
		},
		methods: {
			...mapActions(['RECEPTIONIST', 'GET_CUSTOMER_EVENT', 'GET_CUSTOMER_ID_INFO']),
			getReceptionist() {
				this.RECEPTIONIST().then( res => {
					if (res === 'Success') {
						console.log('Receptionist home page:', res);
					} else {
						console.log('Receptionist home page:', res);
					}
				});
			},
			getCustomerEvent() {
				
				this.listLoading = true;

				this.GET_CUSTOMER_EVENT(this.customerEventData).then( res => {
					if (res === 'Success') {
						this.listLoading = false;
						console.log('CustomerEvent home page:', res);
					} else {
						console.log('CustomerEvent home page:', res);
					}

				});
			},
			getCustomerIdInfo() {
				this.GET_CUSTOMER_ID_INFO({phone: this.customerPhone}).then( res => {
					if (res === 'Success') {
						console.log('customerIdInfo home page:', res);
					} else {
						console.log('customerIdInfo home page:', res);
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

			handleSizeChange(val) {
                this.customerEventData.page_size = val;
                this.getCustomerEvent();
            },
            handleCurrentChange(val) {
                this.customerEventData.page_no = val;
                this.getCustomerEvent();
            },

            answerPhone() {
            	// 接听电话后跳转到 录入来电 页面
            	window.open('record/' + this.customerIdInfo.customerId + '/' + (new Date().getTime()));
            	// 关闭当前 弹出框
            	this.answerDialog = false;
            },
            refuseAnswerPhone() {
            	// 调用云牛 拒绝接听电话事件

            	

            	// 关闭当前 弹出框
            	this.answerDialog = false;
            }

		},
		mounted() {
			// 获取客户 ID
			this.getCustomerIdInfo();

			// 调用接待员接口
			this.getReceptionist();

			// 调用客户事件接口
			this.getCustomerEvent();


		}
	};

</script>