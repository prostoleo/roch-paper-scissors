<template>
	<div
		class="gestures__item gesture"
		:class="data.name"
		@click="initial && setCurrentOption(data.id)"
	>
		<div class="gesture--measures">
			<div class="gesture__img">
				<img :src="`/img/icon-${data.name}.svg`" alt="" />
			</div>
		</div>
	</div>
</template>

<script setup>
	// import { defineProps } from 'vue';
	import { useRoute } from 'vue-router';
	import { useStore } from '@/store/index';
	import { computed } from 'vue';
	import useBonusStore from '@/composables/useBonusStore';

	const props = defineProps({
		data: {
			type: String,
			required: true,
		},
		initial: {
			type: Boolean,
			required: false,
			default: false,
		},
	});

	const route = useRoute();

	const mainStore = useStore();
	const { bonusStore } = useBonusStore();

	const curStore = computed(() =>
		route.name === 'Home' ? mainStore : bonusStore
	);

	function setCurrentOption(id) {
		curStore.value.setCurrentOption(id);
	}
</script>

<style lang="scss" scoped>
	.gesture {
		--height: 13.5rem;
		--width: 13.5rem;

		background: green;

		margin: auto;

		width: 100%;
		max-width: var(--width);
		border-radius: 50%;

		&.rock {
			background: $rock-gradient;
		}
		&.paper {
			background: $paper-gradient;
		}
		&.scissors {
			background: $scissors-gradient;
		}
		&.lizard {
			background: $lizard-gradient;
		}
		&.spock {
			background: $spock-gradient;
		}

		&.initial {
			cursor: pointer;

			&.simple {
				&:last-of-type {
					grid-column: span 2;
					// background: cyan;

					width: 50%;
					margin: 0 auto;

					align-self: center;
				}
			}
		}

		&.winner {
			position: relative;
			// z-index: 100;

			&::after,
			&::before {
				content: '';
				position: absolute;
				inset: 0;
				border-radius: 50%;

				background: white;

				animation: fade-in 500ms ease-out 0 1 normal forwards;
			}

			&::before {
				opacity: 0.075;
				z-index: -1;

				transform: scale(1.55);
			}
			&::after {
				opacity: 0.05;
				z-index: -1;
				transform: scale(2.05);
			}

			.gesture--measures {
				position: relative;

				&::after {
					content: '';
					position: absolute;
					inset: 0;

					background: white;
					opacity: 0.025;
					border-radius: 50%;
					transform: scale(2.45);
					z-index: -1;
				}
			}
		}

		&--measures {
			width: 100%;
			padding-bottom: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			position: relative;
		}

		&__img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			background: white;
			border-radius: 50%;
			width: 72%;
			height: 72%;

			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
