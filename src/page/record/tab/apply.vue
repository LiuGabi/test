<script>
	import html from '../../html/record/tab/apply-tab.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	ApplyList: state => state.Customer.apply
            })
        },
        data() {
        	return {
        		applyData: {
					customerId: this.$route.params.customerId,
					params: {
						page_no: 1,
						page_size: 10
					}
				},
        		applyListLoading: false
        	}
        },
        methods: {
        	...mapActions(['GET_APPLY_LIST']),

        	getApplyList() {
				this.applyListLoading = true;

				this.GET_APPLY_LIST(this.applyData).then( res => {
					if (res === 'Success') {
						this.applyListLoading = false;
						console.log('ApplyList record page:', res);
					} else {
						console.log('ApplyList record page:', res);
					}
				});
			},

        	handleSizeChange(val) {
                this.applyData.params.page_size = val;
                this.getApplyList();
            },
            handleCurrentChange(val) {
                this.applyData.params.page_no = val;
                this.getApplyList();
            },
        },
        mounted() {
        	this.getApplyList();
        }
	};

</script>