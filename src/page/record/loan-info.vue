<script>
	import html from '../html/record/loan-info.html'

	// 引入 Tab 组建
	import authTab from './tab/auth.vue'
	import applyTab from './tab/apply.vue'
	import refundTab from './tab/refund.vue'
	import settleTab from './tab/settle.vue'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
        components: {
        	authTab: authTab,
			applyTab: applyTab,
			refundTab: refundTab,
			settleTab: settleTab
		},
		data() {
			return {
				tabContent: 'authTab',
			}
		},
        methods: {
        	// Tab 切换
			tabToggle(tab) {

				this.tabContent = tab;

			},
        }
	};

</script>