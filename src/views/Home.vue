<template>
	<div class="home-layout">
		<GesturesWrapper></GesturesWrapper>
	</div>
</template>

<script setup>
	import GesturesWrapper from '@/components/gestures/GesturesWrapper.vue';
</script>

<script>
	export default {
		name: 'Home',
	};
</script>

<style lang="scss" scoped>
	.home-layout {
		height: 100%;

		display: grid;
		// place-content: center;
		align-content: center;
	}
</style>
