import { computed } from 'vue';
import { useStore } from '@/store/index.js';

export default function useMainStore() {
	const mainStore = useStore();
	console.log('mainStore: ', mainStore);

	const getCurrentOption = computed(() => {
		console.log('mainStore.getCurrentOption: ', mainStore.getCurrentOption);
		return mainStore.getCurrentOption;
	});

	const simpleGameOptions = computed(() => mainStore.getSimpleGameOptions);

	return {
		mainStore,
		// getCurrentOption: mainStore.getCurrentOption,
		getCurrentOption,
		simpleGameOptions,
	};
}
