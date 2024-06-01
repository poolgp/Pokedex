import { createApp } from 'vue';
import App from './App.vue';

// Importa Bootstrap y BootstrapVueNext
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import BootstrapVueNext from 'bootstrap-vue-next';

// Importa Font Awesome
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App);

// Usa BootstrapVueNext
app.use(BootstrapVueNext);

// Monta la aplicación
app.mount('#app');
