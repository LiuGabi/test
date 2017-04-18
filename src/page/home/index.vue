<style lang="less">
	@import "../../static/css/pages/home.less";
</style>

<script>
	import html from '../html/home/index.html'

	import {mapState, mapActions} from 'vuex'

	let base64 = require('base-64')

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
				this.isShowRecordLink = false;
				this.GET_CUSTOMER_ID_INFO(this.customerPhoneData).then( res => {
					
					this.isShowRecordLink = true;
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

			// 调用接待员接口
			this.getReceptionist();

			// 调用客户事件接口
			this.getCustomerEvent();
		}
	};

</script>