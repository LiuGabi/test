<style lang="less">
	@import "../../static/css/pages/manger.less";
</style>

<script>
	import html from '../html/manger/index.html'
	import {mapState, mapActions} from 'vuex'

	let base64 = require('base-64')

	export default {
		template: html,
		computed: {
            ...mapState({
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

			let phoneNumValidate = (rule, value, callback) => {
				let mobileReg = /^(13|14|15|18|17)[0-9]{9}$/;
				let phoneReg = /^[0][1-9][0-9]{9}$/;

			 	if (new RegExp(mobileReg).test(value) ||　new RegExp(phoneReg).test(value)) {
			 		console.log(value)
			 		callback();
			 	} else {
			 		return callback(new Error('电话号码格式错误'));
			 	}
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

				customerPhoneData: {
					phone: ''
				},
				customerPhoneDataRules: {
					phone: [{
						required: true, length: 11, message: '电话不能为空且为数字', trigger: 'blur'
					}, {
						validator: phoneNumValidate
					}]
				},

				listLoading: true,
				exportLoading: false,
				base64linkPhone: '',
				isShowRecordLink: false
			}
		},
		watch: {
			'customerPhoneData.phone': {
				handler: function(val, oldVal) {
					this.base64linkPhone = base64.encode(val);
					this.isShowRecordLink = false;
				},
				deep: true
			}
		},
		methods: {
			...mapActions(['GET_CUSTOMER_EVENT', 'GET_CUSTOMER_EVENT_EXCEL', 'GET_CUSTOMER_ID_INFO']),
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
			getCustomerIdInfo() {
				this.isShowRecordLink = false;

				this.GET_CUSTOMER_ID_INFO(this.customerPhoneData).then( res => {
					this.isShowRecordLink = true;
					
					if (res === 'Success') {
						console.log('customerIdInfo manger page:', res);
					} else {
						console.log('customerIdInfo manger page:', res);
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
            searchCustomerId(formName) {
            	this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getCustomerIdInfo();
                    } else {
                        return false;
                    }
                });
            },
            resetCustomerId(formName) {
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