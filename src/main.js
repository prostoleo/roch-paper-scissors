import { createApp } from 'vue';
import App from './App.vue';

// store
import { createPinia } from 'pinia';
const pinia = createPinia();

// base components
import BaseContainer from '@/components/base/BaseContainer.vue';

// router
import router from './router';

const app = createApp(App);

// components
app.component('BaseContainer', BaseContainer);

// usage
app.use(router);
app.use(pinia);

app.mount('#app');
