import { defineStore } from 'pinia';

import getRandomIntegerBetween from '@/helpers/randomIntegerBetween.js';

export const useStore = defineStore('simpleGame', {
	state: () => {
		return {
			simpleGameOptions: [
				{
					id: 1,
					name: 'paper',
				},
				{
					id: 2,
					name: 'scissors',
				},
				{
					id: 3,
					name: 'rock',
				},
			],
			currentOption: null,
			houseOption: null,

			gameState: {
				isGameFinished: false,
				isPlayerWon: false,
				isHouseWon: false,
			},

			timeoutMs: 1000,

			showPlaceholder: true,

			gameStats: JSON.parse(
				localStorage.getItem('rock-paper-scissors-simple-GameStats')
			) ?? {
				won: 0,
				draw: 0,
				lost: 0,
			},
		};
	},

	getters: {
		getSimpleGameOptions(state) {
			return state.simpleGameOptions;
		},

		getCurrentOption(state) {
			return state.currentOption;
		},

		getHouseOption(state) {
			return state.houseOption;
		},

		getGameState(state) {
			return state.gameState;
		},

		getShowPlaceholder(state) {
			return state.showPlaceholder;
		},

		getTimeoutMs(state) {
			return state.timeoutMs;
		},

		getGameStats(state) {
			localStorage.setItem(
				'rock-paper-scissors-simple-GameStats',
				JSON.stringify(state.gameStats)
			);

			return state.gameStats;
		},

		getSimpleGameOptionOnId: (state) => {
			return (id) => state.simpleGameOptions.find((option) => option.id === id);
		},
	},

	actions: {
		setCurrentOption(id) {
			const newCurOption = this.getSimpleGameOptionOnId(id);

			this.currentOption = newCurOption;
			this.setHouseOption();
		},

		setShowPlaceholder(val) {
			this.showPlaceholder = val;
		},

		setHouseOption() {
			const houseOptionId = getRandomIntegerBetween(1, 3);

			const newHouseOption = this.getSimpleGameOptionOnId(houseOptionId);
			this.houseOption = newHouseOption;

			this.checkResult();
		},

		checkResult() {
			const { name: playerOption, id: playerId } = this.getCurrentOption;
			const { name: houseOption, id: houseId } = this.getHouseOption;

			if (playerOption === houseOption) {
				this.addDraw();
				return;
			}

			if (playerOption === 'rock' && houseOption === 'scissors') {
				this.addWin();
				return;
			}

			if (playerOption === 'rock' && houseOption === 'paper') {
				this.addLost();
				return;
			}

			if (playerOption === 'paper' && houseOption === 'rock') {
				this.addWin();
				return;
			}
			if (playerOption === 'paper' && houseOption === 'scissors') {
				this.addLost();
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'paper') {
				this.addWin();
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'rock') {
				this.addLost();
				return;
			}
		},

		addWin() {
			setTimeout(() => {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = true;
				this.gameState.isHouseWon = false;
				this.addWinCount();
			}, this.getTimeoutMs);
		},

		addDraw() {
			setTimeout(() => {
				this.gameState.isGameFinished = true;
				this.addDrawCount();
			}, this.getTimeoutMs);
		},

		addLost() {
			setTimeout(() => {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = false;
				this.gameState.isHouseWon = true;
				this.addLostCount();
			}, this.getTimeoutMs);
		},

		addWinCount() {
			this.gameStats.won += 1;
		},
		addDrawCount() {
			this.gameStats.draw += 1;
		},
		addLostCount() {
			this.gameStats.lost += 1;
		},
	},
});
