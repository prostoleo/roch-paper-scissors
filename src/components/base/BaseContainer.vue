<template>
	<div class="container">
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="scss">
	.container {
		width: 92%;
		margin: 0 auto;
		max-width: $maw-container;
	}
</style>
