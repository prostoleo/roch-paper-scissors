import { computed } from 'vue';
import { useBonusStore } from '@/store/bonus.js';

export default function useStore() {
	const bonusStore = useBonusStore();

	const getCurrentOption = computed(() => {
		return bonusStore.getCurrentOption;
	});

	const getHouseOption = computed(() => {
		return bonusStore.getHouseOption;
	});

	const getShowPlaceholder = computed(() => bonusStore.getShowPlaceholder);

	const bonusGameOptions = computed(() => bonusStore.getBonusGameOptions);

	const resultGame = computed(() => {
		if (
			bonusStore.getGameState.isGameFinished === true &&
			bonusStore.getGameState.isPlayerWon === true
		) {
			return 'you won';
		}
		if (
			bonusStore.getGameState.isGameFinished === true &&
			bonusStore.getGameState.isHouseWon === true
		) {
			return 'you lost';
		}

		return 'draw';
	});

	const gameStats = computed(() => bonusStore.getGameStats);

	const resetState = () => bonusStore.$reset();

	return {
		bonusStore,
		// getCurrentOption: bonusStore.getCurrentOption,
		getCurrentOption,
		getHouseOption,
		getShowPlaceholder,
		bonusGameOptions,
		resultGame,
		resetState,
		gameStats,
	};
}
