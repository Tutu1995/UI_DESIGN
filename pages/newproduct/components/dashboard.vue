<template>
    <div class="container">
        <div class="columns" style="margin-top:10px;margin-bottom:10px;">
            <SideMenu :newProduct="true"></SideMenu>

            <div class="column" style="max-width: 1024px;">
                <init></init>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
import init from 'components/initiate/app.vue'

import SideMenu from 'components/SideMenu.vue'

import {API_ENDPOINT} from 'components/consts';

  export default {
    components: {
        'SideMenu': SideMenu,
        'init':init
    },
    created(){
      var data = {
      	"email":"sample@donotdelete.com",
      	"password":"Aa123456789#"
      }
      axios.post(this.getAPIEndPoint()+'user/login',data)
      .then((res)=> {
        console.log(res.data)
        localStorage.setItem("Authorization", 'Bearer ' + res.data.token)
      })
    },
    data () {
        return {
            menuExpanded: false,

        }
    },

    computed:{

    },

    methods:{
      getAPIEndPoint(){
        if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
          // return "http://blockterms.local:8000/api/v1.0/"
          return "http://localhost:2222/api/v1.0/"
        }
        return API_ENDPOINT
      },
    }
}
</script>

<style lang="css">
    @media only screen and (min-width: 1024px) {
        .burger-button {
            display: none;
        }

        .side-menu {
            display: block !important;
            width: max-content;
        }
        .burger-button-column {
            padding: 0px;
        }
    }

    a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:hover, .navbar-link.is-active {
        background-color: #ECF0F3;
        color: #3273dc;
    }

</style>
