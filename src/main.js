import { createApp } from 'vue';
import App from './App.vue';

// base components
import BaseContainer from '@/components/base/BaseContainer.vue';
console.log('BaseContainer: ', BaseContainer);

import router from './router';

const app = createApp(App);

app.component('BaseContainer', BaseContainer);

app.use(router);

app.mount('#app');
