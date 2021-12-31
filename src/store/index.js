import { defineStore } from 'pinia';
import { ref, reactive, toRef } from 'vue';

export const useStore = defineStore('simpleGame', {
	state: () => {
		return reactive({
			// return {
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
		});
	},

	getters: {
		getSimpleGameOptions(state) {
			return state.simpleGameOptions;
		},

		getCurrentOption(state) {
			return state.currentOption;
		},

		getSimpleGameOptionOnId: (state) => {
			return (id) => state.simpleGameOptions.find((option) => option.id === id);
		},
	},

	actions: {
		setCurrentOption(id) {
			console.log('this: ', this);
			this.currentOption = id;
			console.log('this.currentOption: ', this.currentOption);
		},
	},
});
