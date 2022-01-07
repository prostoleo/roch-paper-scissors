import { defineStore } from 'pinia';
import { ref, reactive, toRef, toRefs } from 'vue';

import getRandomIntegerBetween from '@/helpers/randomIntegerBetween.js';
// console.log('getRandomIntegerBetween: ', getRandomIntegerBetween);

export const useStore = defineStore('simpleGame', {
	state: () => {
		// return reactive({
		return {
			simpleGameOptions: [
				{
					id: 1,
					name: 'rock',
				},
				{
					id: 2,
					name: 'paper',
				},
				{
					id: 3,
					name: 'scissors',
				},
			],
			currentOption: null,
			houseOption: null,

			gameState: {
				isGameFinished: false,
				isPlayerWon: false,
				isHouseWon: false,
			},

			timeoutMs: 550,

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
			// console.log('this: ', this);
			const newCurOption = this.getSimpleGameOptionOnId(id);

			this.currentOption = newCurOption;
			// console.log('this.currentOption: ', this.currentOption);
			this.setHouseOption();
		},

		setShowPlaceholder(val) {
			this.showPlaceholder = val;
		},

		setHouseOption() {
			const houseOptionId = getRandomIntegerBetween(1, 3);
			// console.log('houseOptionId: ', houseOptionId);

			const newHouseOption = this.getSimpleGameOptionOnId(houseOptionId);
			// console.log('newHouseOption: ', newHouseOption);
			this.houseOption = newHouseOption;

			this.checkResult();
		},

		checkResult() {
			const { name: playerOption, id: playerId } = this.getCurrentOption;
			const { name: houseOption, id: houseId } = this.getHouseOption;

			// console.log({ playerOption, houseOption });

			if (playerOption === houseOption) {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.addDraw();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'rock' && houseOption === 'paper') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = false;
					this.gameState.isHouseWon = true;
					this.addLost();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'rock' && houseOption === 'scissors') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = true;
					this.gameState.isHouseWon = false;
					this.addWin();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'paper' && houseOption === 'rock') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = true;
					this.gameState.isHouseWon = false;
					this.addWin();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'paper' && houseOption === 'scissors') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = false;
					this.gameState.isHouseWon = true;
					this.addLost();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'paper') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = true;
					this.gameState.isHouseWon = false;
					this.addWin();
				}, this.getTimeoutMs);
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'rock') {
				setTimeout(() => {
					this.gameState.isGameFinished = true;
					this.gameState.isPlayerWon = false;
					this.gameState.isHouseWon = true;

					this.addLost();
				}, this.getTimeoutMs);
				return;
			}
		},

		addWin() {
			this.gameStats.won += 1;
		},
		addDraw() {
			this.gameStats.draw += 1;
		},
		addLost() {
			this.gameStats.lost += 1;
		},
	},
});
