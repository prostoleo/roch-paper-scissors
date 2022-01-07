<template>
	<div class="game--wrapper">
		<ul v-if="getCurrentOption === null" class="gestures gestures--simple-game">
			<GestureItem
				class="initial"
				v-for="option in simpleGameOptions"
				:key="option.id"
				:data="option"
				initial
			/>
		</ul>

		<div v-else-if="getCurrentOption" class="result">
			<div class="result__items">
				<div class="result__player">
					<GestureItem
						:key="getCurrentOption?.id"
						:data="getCurrentOption"
						class="result__item"
						ref="resultItemPlayerEl"
						:class="{ winner: isPlayerWonComp }"
					/>
					<h3 class="result__subtitle">you picked</h3>
				</div>
				<div class="result__house">
					<div
						class="result__item--placeholder"
						v-if="getShowPlaceholder"
					></div>
					<GestureItem
						v-else
						:key="getHouseOption?.id"
						:data="getHouseOption"
						class="result__item"
						ref="resultItemHouseEl"
						:class="{ winner: isHouseWonComp }"
					/>
					<!-- :class="{ winner: addHouseWinner }" -->
					<h3 class="result__subtitle">the house picked</h3>
				</div>
			</div>
			<div class="result__info info" v-if="!getShowPlaceholder">
				<h2 class="info__title">
					{{ resultGame }}
				</h2>
				<button class="btn info__play-again" @click.stop="resetState">
					Play again
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import GestureItem from './GestureItem.vue';

	import useMainStore from '@/composables/useMainStore.js';
	import { computed, ref, toRefs, watch } from 'vue';

	const {
		mainStore,
		getCurrentOption,
		getHouseOption,
		getShowPlaceholder,
		// getGameState,
		resultGame,
		simpleGameOptions,
		resetState,
	} = useMainStore();

	watch(getCurrentOption, (newVal, oldVal) => {
		// console.log('oldVal: ', oldVal);
		// console.log('newVal: ', newVal);
		// console.log('mainStore: ', mainStore);
		if (newVal !== null && newVal !== undefined && newVal !== oldVal) {
			setTimeout(() => {
				// showPlaceholder.value = false;
				mainStore.setShowPlaceholder(false);
			}, mainStore.getTimeoutMs);
			// mainStore.setShowPlaceholder(false);
		}
	});

	const isPlayerWonComp = computed(() => mainStore.getGameState.isPlayerWon);
	const isHouseWonComp = computed(() => mainStore.getGameState.isHouseWon);

	// console.log('getCurrentOption: ', getCurrentOption);
</script>

<style lang="scss" scoped>
	.game--wrapper {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		// margin-top: 8rem;
		margin-top: 3rem;
	}

	.gestures {
		--max-width: 29rem;

		max-width: var(--max-width);
		margin: 0 auto;

		background: url(/img/bg-triangle.svg);
		background-repeat: no-repeat;
		background-size: 70%;
		background-position: center center;

		@include mq(med) {
			--max-width: 50rem;
			max-width: var(--max-width);
			background-size: 50%;
			background-position: 50% 70%;
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

	.result {
		display: flex;
		flex-direction: column;

		align-items: center;

		/* display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr auto; */

		// .result__items

		&__items {
			width: 100%;
			display: flex;
			align-items: center;

			justify-content: space-between;
		}

		// .result__item
		&__item {
			&--placeholder {
				max-width: 13.5rem;
				max-height: 13.5rem;
				width: 100%;
				height: 13.5rem;

				border-radius: 50%;
				background: #000;
			}
		}

		// .result__player

		&__player {
			flex: 1 1 100%;

			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;

			.result__item {
			}
		}

		// .result__subtitle

		&__subtitle {
			width: max-content;
			color: white;

			font-size: 1.4rem;
			font-weight: 600;
			text-transform: uppercase;
		}

		// .result__house

		&__house {
			flex: 1 1 100%;

			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2rem;
		}
	}

	.info {
		width: max-content;
		margin: 0 auto;

		grid-column: span 2;

		display: flex;
		flex-direction: column;

		align-items: center;

		// .result__title

		&__title {
			font-size: 3.6rem;
			font-weight: 700;

			width: max-content;
			margin: 0 auto;
			margin-top: 1em;

			text-transform: uppercase;
			color: white;
		}

		// .result__play-again

		&__play-again {
			display: inline-block;
			// width: 100%;
			margin: 1em auto 0;

			padding: 0.5em 2.8em;

			border-radius: 0.5em;

			font-size: 1.6rem;
			font-weight: 700;
			text-transform: uppercase;

			background-color: white;
			color: $dark-text;
		}
	}
	.btn {
	}
</style>
