<template>
<div class="flex-body">
    <div style="flex: 1 0 auto;">
    <bt-header hide-nav=true @chng-lang="switchLang"></bt-header>
    <dashboard></dashboard>
    </div>
  <bt-footer></bt-footer>

</div>
</template>

<script>

import i18n from 'assets/lang/lang'

import BigNumber from 'bignumber.js'

import dashboard from './components/dashboard.vue'

import btheader from 'components/Header.vue'

import btfooter from 'components/Footer.vue'


export default {

  components: {
    'dashboard': dashboard,
    'bt-header' : btheader,
    'bt-footer' : btfooter,
  },
  mounted() {

  },

  data() {
    return {

    }
  },

  computed: {

  },
  methods: {
    switchLang (lang) {
      i18n.locale = lang
    },


  },



}

</script>

<style lang="css">
html, body, .flex-body {
  height: 100%;
  background-color: #ECF0F3;
}

 .flex-body {
  display: flex;
  flex-direction: column;
}

.footer {
  flex-shrink: 0;
}

</style>
