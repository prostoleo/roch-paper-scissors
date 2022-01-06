<template>
	<BaseContainer>
		<div class="wrapper">
			<button class="btn" @click="openModal">rules</button>
			<nav>
				<ul>
					<li>
						<router-link to="/">Home</router-link>
					</li>
					<li>
						<router-link to="/big-bang-theory">BigBangTheory</router-link>
					</li>
				</ul>
			</nav>
		</div>
		<teleport to="body">
			<BaseModal :is-open="isModalOpen" @close-modal="closeModal" />
		</teleport>
	</BaseContainer>
</template>

<script setup>
	import BaseModal from '@/components/base/BaseModal.vue';
	import { ref } from 'vue';

	const isModalOpen = ref(false);

	const openModal = () => (isModalOpen.value = true);
	const closeModal = () => (isModalOpen.value = false);
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		margin: 4.5rem auto 0;
	}

	button.btn {
		display: inline-block;
		padding: 0.75em 2.5em;

		border-radius: 0.5em;
		border: 1px solid white;

		font-size: 1.4rem;
		font-weight: 600;
		text-transform: uppercase;

		color: white;

		@include mq(med-lg) {
			align-self: flex-end;
		}
	}

	nav {
		margin-top: 2rem;
		padding: 2em 0;

		ul {
			display: flex;
			align-items: center;
			gap: 1.5em;

			li {
				a {
					font-size: 1.2rem;
					padding: 1.25em;

					&:hover {
						border-bottom: 1px solid rgba(255, 255, 255, 0.459);
					}

					&.router-link-active {
						border-bottom: 1px solid white;
					}
				}
			}
		}
	}
</style>
