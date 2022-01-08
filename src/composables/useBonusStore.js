import { computed } from 'vue';
import { useStore } from '@/store/bonus.js';

export default function useBonusStore() {
	const bonusStore = useStore();
	// console.log('bonusStore: ', bonusStore);

	const getCurrentOption = computed(() => {
		// console.log('bonusStore.getCurrentOption: ', bonusStore.getCurrentOption);

		return bonusStore.getCurrentOption;
	});

	const getHouseOption = computed(() => {
		// console.log('bonusStore.getHouseOption: ', bonusStore.getHouseOption);
		return bonusStore.getHouseOption;
	});

	const getShowPlaceholder = computed(() => bonusStore.getShowPlaceholder);

	const bonusGameOptions = computed(() => bonusStore.getBonusGameOptions);

	const resultGame = computed(() => {
		console.log(
			'bonusStore.getGameState.isPlayerWon: ',
			bonusStore.getGameState.isPlayerWon
		);
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
