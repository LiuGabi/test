<script>
	import html from '../html/record/new-event.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	CustomerInfo: state => state.Customer.info,
            })
        },
        data() {
        	return {
        		createCustomerEventData: {
					content: '',
					eventType: '',
					incomingPhone: localStorage.getItem('customerPhone') ? localStorage.getItem('customerPhone'): '',
					problemType: '',
					receptionTime: new Date().getTime(),
					status: '',
					userId: this.$route.params.customerId
				},
				createCustomerEventDataRules: {
					content: [
						{required: true, message: '请输入内容', trigger: 'blur'}
					],
					eventType: [
						{required: true, message: '请选择来电是由', trigger: 'blur'}
					],
					problemType: [
						{required: true, message: '请选择主要问题', trigger: 'blur'}
					]
				},
				customerEventData: {
					incoming_phone: localStorage.getItem('customerPhone') ? localStorage.getItem('customerPhone'): '',

					page_no: 1,
					page_size: 10
				},
				disableProblemType: true,
				listLoading: false,
        	}
        },
        watch: {
			'createCustomerEventData.eventType': {
				handler(val, oldVal) {
					// 当 来电是由 值变化时，主要问题 的值被置空
					this.createCustomerEventData.problemType = '';
					// 当 来电是由 值变化时，备注 的值被 来电是由 的值替换
					this.createCustomerEventData.content = this.createCustomerEventData.eventType;

					if (val) {
						// 来电是由 的值不为空时，主要问题 的值方可选
						this.disableProblemType = false;
					} else {
						this.disableProblemType = true;
					}
				},
				deep: true
			},
			'createCustomerEventData.problemType': {
				handler(val, oldVal) {
					if (val) {
						this.createCustomerEventData.content = this.createCustomerEventData.eventType + ' - ' + val;
					}
				},
				deep: true
			},
		},
        methods: {
        	...mapActions(['CREATE_CUSTOMER_EVENT', 'GET_CUSTOMER_EVENT']),
        	getCustomerEvent() {
				this.listLoading = true;

				this.GET_CUSTOMER_EVENT(this.customerEventData).then( res => {
					if (res === 'Success') {
						this.listLoading = false;
						console.log('CustomerEvent record page:', res);
					} else {
						console.log('CustomerEvent record page:', res);
					}
				});
			},

        	setCreateCase() {
				this.CREATE_CUSTOMER_EVENT(this.createCustomerEventData).then( res => {
					if (res === 'Success') {
						// 事件创建成功后 提示信息
        				this.$message({
                            message: '该客户事件创建成功',
                            type: 'success',
                            duration: 2000
                        });

						// 事件创建成功，重新加载客户历史记录事件
						this.getCustomerEvent();
						console.log('Create customerEvent record page:', res);
					} else {
						// 事件创建成功后 提示信息
        				this.$message({
                            message: '抱歉，该客户事件创建失败',
                            type: 'warning',
                            duration: 2000
                        });
						console.log('Create customerEvent record page:', res);
					}

					// 事件创建成功或失败，重置表单
                	this.$refs['createCustomerEventData'].resetFields();
				});
			},

			submitEvent(status) {
				this.createCustomerEventData.status = status;
				this.$refs['createCustomerEventData'].validate((valid) => {
                    if (valid) {
                        this.setCreateCase();
                    } else {
                        return false;
                    }
                });
			},
        }
	};

</script>