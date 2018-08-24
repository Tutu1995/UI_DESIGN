<template>
    <div class="container">
        <div class="columns" style="margin-top:10px;margin-bottom:10px;">
            <SideMenu :myProduct="true"></SideMenu>
            <div class="column" style="max-width: 1024px;">
                <productlist :API_ENDPOINT="getAPIEndPoint()"></productlist>
            </div>

        </div>
    </div>
</template>

<script>
 import productlist from './productlist.vue'
import {API_ENDPOINT} from 'components/consts'

import SideMenu from 'components/SideMenu.vue'

  export default {
        components: {
            'productlist':productlist,
            'SideMenu': SideMenu,
        },
        mounted(){
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
               return "http://192.168.99.100:2222/api/v1.0/"
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
