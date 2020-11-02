import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './plugins/vuerouter';

Vue.config.productionTip = false


Vue.mixin({
  methods: {
    set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    get(key) {
      const data = localStorage.getItem(key);
      return JSON.parse(data);
    },
  },
});

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

