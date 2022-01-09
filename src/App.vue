<template>
	<!-- <router-link to="/">Home </router-link> -->
	<!-- <router-link to="/big-bang-theory">BigBangTheory </router-link> -->

	<BaseHeader />
	<BaseContainer>
		<main>
			<router-view v-slot="slotProps">
				<transition name="route" mode="out-in">
					<component :is="slotProps.Component"></component>
				</transition>
			</router-view>
		</main>
	</BaseContainer>
	<BaseFooter class="footer" />
</template>

<script setup>
	import BaseHeader from './components/base/BaseHeader.vue';
	import BaseFooter from './components/base/BaseFooter.vue';
	// This starter template is using Vue 3 <script setup> SFCs
	// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<style lang="scss">
	body {
		background: $bg no-repeat;
		color: white;
	}

	#app {
		min-height: 100vh;
		// min-height: 50rem;
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;

		// position: relative;

		padding: 2rem 0;
		overflow-x: hidden;
	}

	main {
		width: 100%;
		height: 100%;
		margin: auto;
	}

	.footer {
		padding-bottom: 2em;
		// position: absolute;
		// bottom: 0;
	}

	.route-enter-active {
		transition: all 0.5s ease-out;
	}

	.route-leave-active {
		transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.route-enter-from,
	.route-leave-to {
		transform: scale(0.5);
		opacity: 0.2;
	}
	/* #app {
		position: static;
	} */
</style>
