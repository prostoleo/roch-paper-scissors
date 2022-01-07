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

	import { useStore } from '@/store/index';

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

	const mainStore = useStore();

	function setCurrentOption(id) {
		mainStore.setCurrentOption(id);
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

		&.initial {
			cursor: pointer;

			&:last-of-type {
				grid-column: span 2;
				// background: cyan;

				width: 50%;
				margin: 0 auto;

				align-self: center;
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
</style>
