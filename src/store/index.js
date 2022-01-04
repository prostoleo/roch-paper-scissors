import { defineStore } from 'pinia';
import { ref, reactive, toRef } from 'vue';

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
				this.gameState.isGameFinished = true;
				return;
			}
			if (playerOption === 'rock' && houseOption === 'paper') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = false;
				this.gameState.isHouseWon = true;
				return;
			}
			if (playerOption === 'rock' && houseOption === 'scissors') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = true;
				this.gameState.isHouseWon = false;
				return;
			}
			if (playerOption === 'paper' && houseOption === 'rock') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = true;
				this.gameState.isHouseWon = false;
				return;
			}
			if (playerOption === 'paper' && houseOption === 'scissors') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = false;
				this.gameState.isHouseWon = true;
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'paper') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = true;
				this.gameState.isHouseWon = false;
				return;
			}
			if (playerOption === 'scissors' && houseOption === 'rock') {
				this.gameState.isGameFinished = true;
				this.gameState.isPlayerWon = false;
				this.gameState.isHouseWon = true;
				return;
			}
		},
	},
});
