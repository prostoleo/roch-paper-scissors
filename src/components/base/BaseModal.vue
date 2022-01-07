<template>
	<transition name="modal-overlay">
		<div v-show="isOpen" class="modal__overlay" @click.stop="closeModal">
			<transition name="modal" v-show="isOpen">
				<div class="modal">
					<slot name="header">
						<div class="modal__header">
							<h2 class="modal__title">rules</h2>
							<button
								class="btn modal__close"
								@click.stop="closeModal"
								aria-label="close modal"
							>
								<img src="/img/icon-close.svg" alt="close modal" />
							</button>
						</div>
					</slot>
					<slot name="body">
						<div class="modal__body body">
							<div class="body__img">
								<img
									:src="`/img/image-rules${imgPath}.svg`"
									alt="image rules"
									class="modal__img"
								/>
							</div>
						</div>
					</slot>
				</div>
			</transition>
		</div>
	</transition>
</template>

<script setup>
	import { computed } from 'vue';
	import { useRoute } from 'vue-router';

	const emit = defineEmits(['close-modal']);

	const props = defineProps({
		isOpen: {
			type: Boolean,
			default: false,
		},
	});

	const route = useRoute();
	// console.log('route: ', route);

	const imgPath = computed(() => {
		if (route.name === 'BigBangTheory') {
			return '-bonus';
		}

		return '';
	});

	function closeModal(event) {
		if (
			event.target.closest('.modal__close') ||
			event.target.classList.contains('modal__overlay')
		) {
			emit('close-modal');
		}

		// return;
	}
</script>

<style lang="scss" scoped>
	$enter-bezier: cubic-bezier(0.42, 0.48, 0.94, 0.36);
	$leave-bezier: cubic-bezier(0.15, 0.74, 0.87, 0.49);

	.modal-overlay-enter-active {
		transition: clip-path 350ms $enter-bezier, opacity 150ms ease-in-out -100ms;

		@include mq(med-lg) {
			transition: all 150ms ease-in-out;

			/* .modal {
				transition: all 350ms $enter-bezier 200ms;
			} */
		}
	}

	.modal-overlay-leave-active {
		// transition: clip-path 0.3s cubic-bezier(0.2, 1.06, 0.94, 0.36),
		// transition: clip-path 0.3s cubic-bezier(0.2, 1.06, 0.94, 0.36),
		transition: clip-path 300ms $leave-bezier, opacity 350ms ease-in-out 100ms;

		@include mq(med-lg) {
			transition: all 150ms ease-in-out 350ms;

			/* .modal {
				transition: all 350ms $enter-bezier 200ms;
			}*/
		}
	}

	.modal-overlay-enter-from,
	.modal-overlay-leave-to {
		// transform: translateX(20px);

		clip-path: circle(10% at 100% 100%);
		opacity: 0;
		pointer-events: none;

		@include mq(med-lg) {
			clip-path: none;

			/* .modal {
				opacity: 0.35;
				transform: translate(0, -50%);
			} */
		}
	}
	.modal-overlay-enter-to,
	.modal-overlay-leave-from {
		// transform: translateX(20px);

		clip-path: circle(120% at 50% 50%);
		opacity: 1;
		pointer-events: auto;

		@include mq(med-lg) {
			clip-path: none;

			/* .modal {
				opacity: 1;
				transform: translate(0, 0%);
			} */
		}
	}

	.modal-enter-active {
		@include mq(med-lg) {
			transition: all 350ms ease-in-out 150ms;
		}
	}

	.modal-leave-active {
		@include mq(med-lg) {
			transition: all 350ms ease-in-out;
		}
	}

	.modal-enter-from,
	.modal-leave-to {
		@include mq(med-lg) {
			opacity: 0.35;
			transform: translate(0, -50%);
		}
	}
	.modal-enter-to,
	.modal-leave-from {
		@include mq(med-lg) {
			opacity: 1;
			transform: translate(0, 0%);
		}
	}

	.modal {
		// .modal__title

		&__title {
			font-size: 2.2rem;
			font-weight: 700;

			text-transform: uppercase;
			text-align: center;

			color: $dark-text;

			@include mq(med-lg) {
				text-align: left;
			}
		}
	}

	.modal {
		@include mq(med-lg) {
			max-width: 50rem;
			background: white;

			padding: 2rem;
			border-radius: 0.5em;

			position: relative;
			z-index: 20;
		}

		// .modal__overlay

		&__overlay {
			position: fixed;
			inset: 0;

			padding: 2rem;
			padding-top: 5rem;

			background: white;

			// display: flex;
			// justify-content: center;
			// align-items: center;
			@include mq(med-lg) {
				display: flex;
				justify-content: center;
				align-items: center;

				background: rgba(0, 0, 0, 0.267);
			}
		}

		// .modal__header

		&__header {
			@include mq(med-lg) {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}

		// .modal__title

		&__title {
		}

		// .modal__close

		&__close {
			position: absolute;
			bottom: 7%;
			left: 50%;

			padding: 1.25em;

			transform: translate(-50%, -50%);

			@include mq(med-lg) {
				transform: translate(0%, 0%);
				position: unset;
				inset: unset;

				// transform: translate(-50%, -50%);
			}
		}

		// .modal__body

		&__body {
			@include mq(med-lg) {
				padding: 2rem 0;

				// transform: translate(-50%, -50%);
			}
		}

		// .modal__img

		&__img {
			margin: 5rem auto 0;

			@include mq(med-lg) {
				margin: 2rem auto 0;
			}
		}
	}
	.body {
		// .body__img

		&__img {
		}
	}
</style>
