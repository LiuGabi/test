<script>
	import html from '../../html/record/tab/auth-tab.html'

	import {mapState, mapActions} from 'vuex'

	export default {
		template: html,
		computed: {
            ...mapState({
            	AuthInfo: state => state.Customer.info.completion.required
            })
        },
	};

</script>