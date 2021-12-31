<template>
	<BaseContainer>
		<header>
			<h1>rock paper scissors</h1>
			<button>
				<span class="subtitle">score</span>
				<span class="score">11</span>
			</button>
		</header>
	</BaseContainer>
</template>

<script setup></script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	header {
		position: absolute;
		top: 2rem;
		width: 100%;
		left: 0;
		right: 0;

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 1.25em;
		outline: 2px solid $header-outline;
		border-radius: 1em;

		h1 {
			width: min-content;
			text-transform: uppercase;

			line-height: 80%;
		}

		button {
			display: inline-flex;
			flex-direction: column;

			gap: 0.5rem;

			padding: 1em;

			border-radius: 0.5em;
			background: white;

			span.subtitle {
				color: $score-text;

				font-size: 1.2rem;
				font-weight: 600;
				text-transform: uppercase;
			}

			span.score {
				color: $dark-text;

				font-size: 1.8rem;
				font-weight: 700;
				text-transform: uppercase;
			}
		}
	}
</style>
