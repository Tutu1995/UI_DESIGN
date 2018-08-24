<template>
  <div  class="flex-body">
    <div class="wrapper" style="flex: 1 0 auto">
      <bt-header hide-nav=true @chng-lang="switchLang"></bt-header>
      <div class="" style="height:50px;"></div>
      <initiate></initiate>
    </div>
    <bt-footer></bt-footer>
  </div>
</template>

<script>

import i18n from 'assets/lang/lang.js'

import initiate from 'components/initiate/app.vue'

import btheader from 'components/Header.vue'

import btfooter from 'components/Footer.vue'


export default {

  components: {
    'bt-header': btheader,
    'bt-footer': btfooter,
    'initiate': initiate,
  },
  mounted() {

  },
  watch:{
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
<style>
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
