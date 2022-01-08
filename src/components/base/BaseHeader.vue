<template>
	<BaseContainer>
		<header>
			<h1>rock paper scissors</h1>
			<button>
				<span class="subtitle">score</span>
				<span class="score">
					{{ totalCount }}
				</span>
			</button>
		</header>
	</BaseContainer>
</template>

<script setup>
	import useMainStore from '@/composables/useMainStore';
	// import useBonusStore from '@/composables/useBonusStore';
	import { computed, ref, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from '@/store/index.js';
	import { useBonusStore } from '@/store/bonus.js';

	const mainStore = useStore();
	const bonusStore = useBonusStore();
	const route = useRoute();
	const isHome = ref(true);

	watchEffect(() => {
		if (route.name === 'Home') {
			isHome.value = true;
		}

		if (route.name === 'BigBangTheory') {
			isHome.value = false;
		}
	});

	const totalCount = computed(() => {
		if (isHome.value) {
			return mainStore.getGameStats.won - mainStore.getGameStats.lost;
		} else {
			return bonusStore.getGameStats.won - bonusStore.getGameStats.lost;
		}
	});
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	header {
		// position: absolute;
		// top: 2rem;
		// width: 100%;
		// left: 0;
		// right: 0;
		max-width: 60rem;
		width: 90%;
		margin: 0 auto;

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: min(2em, 5%);
		outline: 2px solid $header-outline;
		border-radius: 1em;

		h1 {
			width: min-content;
			text-transform: uppercase;
			@include adaptive-value-min-max(font-size, 20, 36);

			line-height: 80%;
		}

		button {
			display: inline-flex;
			flex-direction: column;
			align-items: center;

			gap: 0.5rem;

			padding: 1em 2em;

			border-radius: 0.5em;
			background: white;

			span.subtitle {
				color: $score-text;

				font-size: 1.2rem;
				font-weight: 600;
				text-transform: uppercase;
			}

			span.score {
				@include adaptive-value-min-max(font-size, 22, 32);
				font-weight: 700;
				text-transform: uppercase;

				color: $dark-text;
			}
		}
	}
</style>
