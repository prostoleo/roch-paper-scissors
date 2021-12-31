<template>
	<!-- <router-link to="/">Home </router-link> -->
	<!-- <router-link to="/big-bang-theory">BigBangTheory </router-link> -->

	<BaseHeader />
	<BaseContainer>
		<main>
			<router-view></router-view>
		</main>
	</BaseContainer>
</template>

<script setup>
	import BaseHeader from './components/base/BaseHeader.vue';
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<style lang="scss">
	body {
		background: $bg;
		color: white;
	}

	#app {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;

		position: relative;
	}

	main {
		width: 100%;
		height: 100%;
		margin: auto;

		.__router-view__ {
		}
	}
	/* #app {
		position: static;
	} */
</style>
