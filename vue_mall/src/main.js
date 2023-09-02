import { createApp } from 'vue';
import route from '@/route/';
import App from './App.vue';
import globalDirective from '@/plugins/global_directive.js';

const app = createApp(App);
app.use(route);
app.use(globalDirective);
app.mount('#app');
