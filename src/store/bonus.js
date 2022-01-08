import { defineStore } from 'pinia';
import { ref, reactive, toRef, toRefs } from 'vue';

import getRandomIntegerBetween from '@/helpers/randomIntegerBetween.js';

export const useBonusStore = defineStore('bonusGame', {
	state: () => {
		// return reactive({
		return {
			bonusGameOptions: [
				{
					id: 3,
					name: 'scissors',
				},
				{
					id: 2,
					name: 'paper',
				},
				{
					id: 1,
					name: 'rock',
				},
				{
					id: 4,
					name: 'lizard',
				},
				{
					id: 5,
					name: 'spock',
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
				localStorage.getItem('rock-paper-scissors-bonus-GameStats')
			) ?? {
				won: 0,
				draw: 0,
				lost: 0,
			},
		};
	},

	getters: {
		getBonusGameOptions(state) {
			return state.bonusGameOptions;
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
				'rock-paper-scissors-bonus-GameStats',
				JSON.stringify(state.gameStats)
			);

			return state.gameStats;
		},

		getBonusGameOptionOnId: (state) => {
			return (id) => state.bonusGameOptions.find((option) => option.id === id);
		},
	},

	actions: {
		setCurrentOption(id) {
			const newCurOption = this.getBonusGameOptionOnId(id);

			this.currentOption = newCurOption;
			this.setHouseOption();
		},

		setShowPlaceholder(val) {
			this.showPlaceholder = val;
		},

		setHouseOption() {
			const houseOptionId = getRandomIntegerBetween(1, 3);

			const newHouseOption = this.getBonusGameOptionOnId(houseOptionId);
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

			// player === rock

			if (playerOption === 'rock' && houseOption === 'scissors') {
				this.addWin();
				return;
			}
			if (playerOption === 'rock' && houseOption === 'lizard') {
				this.addWin();
				return;
			}
			if (playerOption === 'rock' && houseOption === 'paper') {
				this.addLost();
				return;
			}
			if (playerOption === 'rock' && houseOption === 'spock') {
				this.addLost();
				return;
			}

			// player === paper

			if (playerOption === 'paper' && houseOption === 'rock') {
				this.addWin();
				return;
			}
			if (playerOption === 'paper' && houseOption === 'spock') {
				this.addWin();
				return;
			}
			if (playerOption === 'paper' && houseOption === 'scissors') {
				this.addLost();
				return;
			}
			if (playerOption === 'paper' && houseOption === 'lizard') {
				this.addLost();
				return;
			}

			// player === scissors
			if (playerOption === 'scissors' && houseOption === 'paper') {
				this.addWin();
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'lizard') {
				this.addWin();
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'rock') {
				this.addLost();
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'spock') {
				this.addLost();
				return;
			}

			// player === lizard
			if (playerOption === 'lizard' && houseOption === 'spock') {
				this.addWin();
				return;
			}
			if (playerOption === 'lizard' && houseOption === 'paper') {
				this.addWin();
				return;
			}
			if (playerOption === 'lizard' && houseOption === 'scissors') {
				this.addLost();
				return;
			}
			if (playerOption === 'lizard' && houseOption === 'rock') {
				this.addLost();
				return;
			}

			// player === spock
			if (playerOption === 'spock' && houseOption === 'scissors') {
				this.addWin();
				return;
			}
			if (playerOption === 'spock' && houseOption === 'rock') {
				this.addWin();
				return;
			}
			if (playerOption === 'spock' && houseOption === 'lizard') {
				this.addLost();
				return;
			}
			if (playerOption === 'spock' && houseOption === 'paper') {
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
