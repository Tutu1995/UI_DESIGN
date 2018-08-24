import Vue from 'vue'
import App from './app.vue'
import i18n from 'assets/lang/lang'


export var app = new Vue({
  el: '#app',
  i18n,
  render: h => h(App)
})
