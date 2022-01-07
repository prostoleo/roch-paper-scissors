import { computed } from 'vue';
import { useStore } from '@/store/index.js';

export default function useMainStore() {
	const mainStore = useStore();
	// console.log('mainStore: ', mainStore);

	const getCurrentOption = computed(() => {
		// console.log('mainStore.getCurrentOption: ', mainStore.getCurrentOption);

		return mainStore.getCurrentOption;
	});

	const getHouseOption = computed(() => {
		// console.log('mainStore.getHouseOption: ', mainStore.getHouseOption);
		return mainStore.getHouseOption;
	});

	const getShowPlaceholder = computed(() => mainStore.getShowPlaceholder);

	const simpleGameOptions = computed(() => mainStore.getSimpleGameOptions);

	const resultGame = computed(() => {
		console.log(
			'mainStore.getGameState.isPlayerWon: ',
			mainStore.getGameState.isPlayerWon
		);
		if (
			mainStore.getGameState.isGameFinished === true &&
			mainStore.getGameState.isPlayerWon === true
		) {
			return 'you won';
		}
		if (
			mainStore.getGameState.isGameFinished === true &&
			mainStore.getGameState.isHouseWon === true
		) {
			return 'you lost';
		}

		return 'draw';
	});

	const gameStats = computed(() => mainStore.getGameStats);

	const resetState = () => mainStore.$reset();

	return {
		mainStore,
		// getCurrentOption: mainStore.getCurrentOption,
		getCurrentOption,
		getHouseOption,
		getShowPlaceholder,
		simpleGameOptions,
		resultGame,
		resetState,
		gameStats,
	};
}
