<script>
	import html from '../../html/record/tab/settle-tab.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	settleList: state => state.Customer.repay,
            	loanInfo: state => state.Customer.loanInfo,
            	loanDetailList: state => state.Customer.loanDetail
            })
        },
		data() {
			return {
				settleData: {
					customerId: this.$route.params.customerId,
					params: {
						status: 89,

						page_no: 1,
						page_size: 10
					}
				},
				settleListLoading: true,
				customerLoanInfoData: {
					id: '',
					plan_id: ''
				},
				customerLoanDetailData: {
					id: '',
					plan_id: '',
					params: {
						apply_id: ''
					}
				}
			}
		},
		methods: {
			...mapActions(['GET_REPAY_LIST', 'GET_CUSTOMER_LOAN_INFO', 'GET_CUSTOMER_LOAN_DETAIL']),

			getSettleList() {
				this.settleListLoading = true;

				this.GET_REPAY_LIST(this.settleData).then( res => {
					if (res === 'Success') {
						this.settleListLoading = false;
						console.log('SettleList record page:', res);
					} else {
						console.log('SettleList record page:', res);
					}
				});
			},
			getCustomerLoanInfo() {
				this.GET_CUSTOMER_LOAN_INFO(this.customerLoanInfoData).then( res => {
					if (res === 'Success') {
						console.log('CustomerLoanInfo tab4 record page:', res);
					} else {
						console.log('CustomerLoanInfo tab4 record page:', res);
					}
				});
			},
			getCustomerLoanDetail() {
				this.GET_CUSTOMER_LOAN_DETAIL(this.customerLoanDetailData).then( res => {
					if (res === 'Success') {
						console.log('CustomerLoanDetail tab4 record page:', res);
					} else {
						console.log('CustomerLoanDetail tab4 record page:', res);
					}
				});
			},

			// 弹出 客户还款息费详情
			handleLoanInfo(row) {
				this.customerLoanInfoData.id = row.userId;
				this.customerLoanInfoData.plan_id = row.id;

				this.getCustomerLoanInfo();
			},

			// 弹出 客户还款明细
			handleLoanDetail(row) {
				this.customerLoanDetailData.id = row.userId;
				this.customerLoanDetailData.plan_id = row.id;
				this.customerLoanDetailData.params.apply_id = row.applyId;

				this.getCustomerLoanDetail();
			},

			// 分页
			handleSizeChange(val) {
                this.settleData.params.page_size = val;
                this.getSettleList();
            },
            handleCurrentChange(val) {
                this.settleData.params.page_no = val;
                this.getSettleList();
            },
		},
		mounted() {
			this.getSettleList();
		}
	};

</script>