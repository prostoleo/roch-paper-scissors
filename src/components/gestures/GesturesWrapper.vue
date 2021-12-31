<template>
	<div class="gestures--wrapper">
		<ul v-if="getCurrentOption === null" class="gestures gestures--simple-game">
			<GestureItem
				v-for="option in simpleGameOptions"
				:key="option.id"
				:data="option"
			/>
		</ul>

		<div v-else-if="getCurrentOption" class="result">
			<div class="result__items">
				<div class="result__player">
					<GestureItem :key="getCurrentOption?.id" :data="getCurrentOption" />
					<h3 class="result__subtitle">you picked</h3>
				</div>
				<div class="result__house">
					<GestureItem :key="getCurrentOption?.id" :data="getCurrentOption" />
					<h3 class="result__subtitle">the house picked</h3>
				</div>
			</div>
			<h2 class="result__title">you won</h2>
			<button class="btn result__play-again">Play again</button>
		</div>
	</div>
</template>

<script setup>
	import GestureItem from './GestureItem.vue';

	import useMainStore from '@/composables/useMainStore.js';

	const { mainStore, getCurrentOption, simpleGameOptions } = useMainStore();
	console.log('getCurrentOption: ', getCurrentOption);
</script>

<style lang="scss" scoped>
	.gestures {
		--max-width: 29rem;

		&--wrapper {
			width: 100%;
			height: 100%;
			margin: 0 auto;
			padding-top: 5rem;
		}

		max-width: var(--max-width);
		margin: 0 auto;
		// width: 100%;
		// height: 100%;
		// background: red;

		background: url(/img/bg-triangle.svg);
		background-repeat: no-repeat;
		background-size: 70%;
		background-position: center center;

		@include mq(med) {
			--max-width: 40rem;
			background-size: 55%;
		}

		&--simple-game {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: repeat(2, 1fr);

			justify-items: space-between;

			gap: 2.25rem;

			@include mq(med) {
				gap: 4rem;
			}

			// background: red;
		}
	}
</style>
