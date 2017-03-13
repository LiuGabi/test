<style lang="less">
	@import "../../static/css/pages/record.less";
</style>

<script>
	import html from '../html/record/index.html'

	import baseInfo from './base-info.vue'
	import loanInfo from './loan-info.vue'
	import newEvent from './new-event.vue'
	import historyEvent from './history-event.vue'

	export default {
		template: html,
		components: {
			baseInfo: baseInfo,
			loanInfo: loanInfo,
			newEvent: newEvent,
			historyEvent: historyEvent
		},
	};

</script>