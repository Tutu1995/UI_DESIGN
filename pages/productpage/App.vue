<template>
<div class="flex-body">
  <div class="flex-wrapper">
    <bt-header hide-nav=true @chng-lang="switchLang"></bt-header>
      <div class="container">
        <div class="columns" style="margin-top:10px;margin-bottom:10px;">
          <SideMenu :productPage="true"></SideMenu>
          <div class="column" style="max-width: 1024px;">
            <productpage></productpage>
          </div>
        </div>
      </div>
  </div>
  <bt-footer></bt-footer>
</div>
</template>

<script>

import i18n from 'assets/lang/lang'

import BigNumber from 'bignumber.js'

import productpage from './components/productpage.vue'

import btheader from 'components/Header.vue'

import btfooter from 'components/Footer.vue'

import SideMenu from 'components/SideMenu.vue'


export default {

  components: {
    'productpage': productpage,
    'SideMenu': SideMenu,
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
   .flex-wrapper{
     flex: 1 0 auto;
   }


  .footer {
    flex-shrink: 0;
  }
</style>
