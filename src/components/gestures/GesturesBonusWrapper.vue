<template>
	<div class="game--wrapper">
		<div v-if="getCurrentOption === null" class="gestures gestures--bonus-game">
			<GestureItem
				class="initial"
				v-for="option in bonusGameOptions"
				:key="option.id"
				:data="option"
				initial
			/>
		</div>

		<div v-else-if="getCurrentOption" class="result">
			<div class="result__items">
				<div class="result__player">
					<GestureItem
						:key="getCurrentOption?.id"
						:data="getCurrentOption"
						class="result__item"
					/>
					<!-- :class="{ winner: isPlayerWonComp }" -->
					<h3 class="result__subtitle">you picked</h3>
				</div>
				<div class="result__house">
					<transition name="house" mode="out-in">
						<div
							class="result__item--placeholder"
							v-if="getShowPlaceholder"
						></div>
						<GestureItem
							v-else
							:key="getHouseOption?.id"
							:data="getHouseOption"
							class="result__item"
							:class="{ winner: isHouseWonComp }"
						/>
					</transition>
					<h3 class="result__subtitle">the house picked</h3>
				</div>
			</div>
			<transition name="info">
				<div class="result__info info" v-show="!getShowPlaceholder">
					<h2 class="info__title">
						{{ resultGame }}
					</h2>
					<button class="btn info__play-again" @click.stop="resetState">
						Play again
					</button>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup>
	import GestureItem from './GestureItem.vue';

	import useBonusStore from '@/composables/useBonusStore.js';
	import { computed, watch, watchEffect } from 'vue';

	const {
		bonusStore,
		getCurrentOption,
		getHouseOption,
		getShowPlaceholder,
		// getGameState,
		resultGame,
		bonusGameOptions,
		resetState,
	} = useBonusStore();

	watch(getCurrentOption, (newVal, oldVal) => {
		if (newVal !== null && newVal !== undefined && newVal !== oldVal) {
			setTimeout(() => {
				// showPlaceholder.value = false;
				bonusStore.setShowPlaceholder(false);
			}, bonusStore.getTimeoutMs * 1.2);
			// bonusStore.setShowPlaceholder(false);
		}
	});

	const isPlayerWonComp = computed(() => bonusStore.getGameState.isPlayerWon);
	const isHouseWonComp = computed(() => bonusStore.getGameState.isHouseWon);

	watchEffect(
		() => {
			if (isPlayerWonComp.value && getCurrentOption) {
				const el = document.querySelector('.result__player .result__item');

				setTimeout(() => {
					el.classList.add('winner');
				}, bonusStore.getTimeoutMs * 0.75);
			} else if (!getCurrentOption) {
				const el = document.querySelector('.result__player .result__item');

				el.classList.remove('winner');
			}
		},
		{
			flush: 'post',
		}
	);
</script>

<style lang="scss" scoped>
	.house-enter-active,
	.house-leave-active {
		transition: all 250ms ease-in-out;
	}

	.house-enter-from,
	.house-leave-to {
		opacity: 0.2;
	}
	.house-enter-to,
	.house-leave-from {
		opacity: 1;
	}

	.info-enter-active,
	.info-leave-active {
		transition: all 250ms ease-in-out;
	}

	.info-enter-from,
	.info-leave-to {
		transform: translateY(30%);
		opacity: 0.2;
	}
	.house-enter-to,
	.house-leave-from {
		transform: translateY(0%);
		opacity: 1;
	}

	.game--wrapper {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		// margin-top: 8rem;
		margin-top: min(17vh, 10rem);
	}

	.gestures {
		--max-width: 40rem;

		max-width: var(--max-width);
		margin: 0 auto;

		background: url(/img/bg-pentagon.svg);
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center center;

		@include mq(med) {
			// --max-width: 50rem;
			// max-width: var(--max-width);
			// background-size: 50%;
			// background-position: 50% 70%;
		}

		&--bonus-game {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(3, 1fr);

			justify-items: space-between;

			gap: 2.25rem;

			@include mq(med) {
				gap: 4rem;
			}

			.gesture {
				&:nth-of-type(1) {
					grid-column: span 2;
				}
				&:nth-of-type(2) {
					position: relative;

					top: -30%;
					right: -35%;

					grid-column: 2 / 3;
					grid-row: 2 / 3;
				}
				&:nth-of-type(3) {
					grid-column: 2 / 3;
					grid-row: 3 / 4;
				}
				&:nth-of-type(4) {
					grid-column: 1 / 2;
					grid-row: 3 / 4;
				}
				&:nth-of-type(5) {
					position: relative;

					top: -30%;
					left: -35%;

					grid-column: 1 / 2;
					grid-row: 2 / 3;
				}
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

			@include mq(med) {
				gap: 5rem;
			}
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

			@include mq(med) {
				// flex: 0 0 25rem;
			}

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

			// .result__item {
			// 	opacity: 0;

			// 	animation: fade-in 350ms ease-out forwards;
			// }
		}
	}

	.info {
		width: max-content;
		margin: 0 auto;

		grid-column: span 2;

		display: flex;
		flex-direction: column;

		align-items: center;

		@include mq(med) {
			position: absolute;
		}

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
</style>
