<template>
	<div class='wrapper'>
		<m-header></m-header>
		<m-sidebar v-on:sliderSidebar='sliderSidebar' v-bind:class='{ "in": isSliderIn}'></m-sidebar>
		<div class='content' v-bind:class='{ "shift-left": isSliderIn}'>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isSliderIn: false
			}
		},
		methods: {
			sliderSidebar() {
				if (this.isSliderIn) {
					this.isSliderIn = false;
				} else {
					this.isSliderIn = true;
				}
			}
		}
	}
</script>