import { computed } from 'vue';
import { useStore } from '@/store/index.js';

export default function useMainStore() {
	const mainStore = useStore();

	const getCurrentOption = computed(() => {
		return mainStore.getCurrentOption;
	});

	const getHouseOption = computed(() => {
		return mainStore.getHouseOption;
	});

	const getShowPlaceholder = computed(() => mainStore.getShowPlaceholder);

	const simpleGameOptions = computed(() => mainStore.getSimpleGameOptions);

	const resultGame = computed(() => {
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
