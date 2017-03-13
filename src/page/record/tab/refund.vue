<script>
	import html from '../../html/record/tab/refund-tab.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	RepayList: state => state.Customer.repay,
            	loanInfo: state => state.Customer.loanInfo,
            	loanDetailList: state => state.Customer.loanDetail
            })
        },
		data() {
			return {
				refundData: {
					customerId: this.$route.params.customerId,
					params: {
						status: 30,

						page_no: 1,
						page_size: 10
					}
				},
				repayListLoading: true,
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

			getRepayList() {
				this.repayListLoading = true;

				this.GET_REPAY_LIST(this.refundData).then( res => {
					if (res === 'Success') {
						this.repayListLoading = false;
						console.log('RepayList record page:', res);
					} else {
						console.log('RepayList record page:', res);
					}
				});
			},
			getCustomerLoanInfo() {
				this.GET_CUSTOMER_LOAN_INFO(this.customerLoanInfoData).then( res => {
					if (res === 'Success') {
						console.log('CustomerLoanInfo tab3 record page:', res);
					} else {
						console.log('CustomerLoanInfo tab3 record page:', res);
					}
				});
			},
			getCustomerLoanDetail() {
				this.GET_CUSTOMER_LOAN_DETAIL(this.customerLoanDetailData).then( res => {
					if (res === 'Success') {
						console.log('CustomerLoanDetail tab3 record page:', res);
					} else {
						console.log('CustomerLoanDetail tab3 record page:', res);
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

			handleSizeChange(val) {
                this.refundData.params.page_size = val;
                this.getRepayList();
            },
            handleCurrentChange(val) {
                this.refundData.params.page_no = val;
                this.getRepayList();
            },
		},
		mounted() {
			this.getRepayList();
		}
	};

</script>