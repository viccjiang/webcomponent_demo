import { createApp } from 'vue';
import { register } from '@demo/ui-elements';
import App from './App.vue';

register();

createApp(App).mount('#app');
