
<template lang="html">
<div>
  <div v-if="loadingData" class="level">
    <div class="level-item centered" style="top:200px;max-width: 1000px;height:300px;">
      <i style="top:300px;" class="fa fa-spinner fa-pulse fa-1x fa-fw is-text"></i>
    </div>
  </div>
  <div v-else class="">
    <div v-if="data!=null" class="" style="max-width: 98%;">
      <!-- error message -->
        <div v-if="data.error" class="card notification has-text-weight-semibold has-text-centered" style="height:100%;">
          <div class="card-content">
            <span>{{data.message}}</span>
          </div>
        </div>
        <div v-else>
          <!-- tabs -->
          <div class="level" style="margin-bottom:0;margin-top:18px;">
            <div class="level-item">
              <div class="tabs">
                <ul>
                  <li :class="{'is-active':showtab.preview}"><a @click="switchToTab('preview')">Preview</a></li>
                  <li :class="{'is-active':showtab.edit}"><a @click="switchToTab('edit')">Edit</a></li>
                  <li :class="{'is-active':showtab.qrcode}"><a @click="switchToTab('qrcode')">QR Code</a></li>
                  <li :class="{'is-active':showtab.collaborators}"><a @click="switchToTab('collaborators')">Collaborators</a></li>
                </ul>
              </div>
            </div>
          </div>
          <!-- Preview -->
          <div class="" v-show="showtab.preview">
            <intro :data="data" :delete_http="delete_http"></intro>
            <gallery :data="data" :delete_http="delete_http"></gallery>
            <ownership :data="data"></ownership>
            <createtime :data="data"></createtime>
          </div>
          <!-- Edit -->
          <div class="" v-if="showtab.edit">
            <initiate :incomingData="data" :edit="true"></initiate>
          </div>
          <!-- QR Generate -->
          <div class="" v-if="showtab.qrcode">
            <qrgen :id="id" :API_ENDPOINT="this.getAPIEndPoint()"></qrgen>
          </div>
          <!-- Collaborators -->
          <div class="" v-if="showtab.collaborators">
            <collaborators :API_ENDPOINT="this.getAPIEndPoint()"
                :productID="id"></collaborators>
          </div>
        </div>
    </div>
    <div v-else class="">
      <article class="message is-danger">
        <div class="message-body">
          <div class="level">
            <div class="level-item">
              <span class="icon" style="margin-right:10px;">
                <i class="fas fa-exclamation-triangle is-text fa-2x"></i>
              </span>
              <p class="has-text-centered">Unauthorized Access or Server Error</p>
            </div>
          </div>
        </div>
      </article>
    </div>

  </div>

</div>
</template>

<script>

import axios from 'axios'

import {API_ENDPOINT} from 'components/consts';

import gallery from './gallery.vue'

import intro from './intro.vue'

import ownership from './ownership.vue'

import createtime from './createtime.vue'

import qrgen from './qrgen.vue'

import collaborators from './collaborators.vue'

import initiate from 'components/initiate/app.vue'

export default {
  data () {
    return {
      responseStatus:null,
      // eslint-disable-next-line
      data: null,
      id: null,
      loadingData: true,
      showtab:{
        preview:true,
        edit:false,
        qrcode:false,
        collaborators:false
      }
    }
  },

  components: {
    'gallery': gallery,
    'intro': intro,
    'ownership': ownership,
    'createtime': createtime,
    'qrgen': qrgen,
    'initiate': initiate,
    'collaborators': collaborators,

  },

  created () {
    var urlParams = new URLSearchParams(window.location.search)
    this.id = urlParams.get('id')
    var tab = urlParams.get('tab')
    if (tab && this.showtab[tab]!=null){
      this.showtab['preview'] = false
      this.showtab[tab] = true
    }
    var headers = {
      headers:{
        'Authorization': localStorage.getItem('Authorization'),
        }
    }
    axios.get(this.getAPIEndPoint()+'product/'+this.id, headers)
    .then((response) =>{
      this.data = response.data.data
      if (!this.data.error){
        this.generate_color('percentage_partnerships')
        this.generate_color('flatfees_partnerships')
        this.data['flatfees_partnerships'].sort(this.sort('-value'))
        this.data['percentage_partnerships'].sort(this.sort('-value'))
      }
      this.loadingData=false;
    })
    .catch(error => {
      this.responseStatus = error.response.status
      this.loadingData=false
    })

  },

  methods: {
    switchToTab(tabToShow){
      for (var tab in this.showtab) {
        if (tab == tabToShow){
          this.showtab[tab] = true
        }
        else{
          this.showtab[tab] = false
        }
      }
    },
    getAPIEndPoint(){
      if (window.location.hostname == "127.0.0.1" || window.location.hostname == "localhost" ) {
        // return "http://blockterms.local:8000/api/v1.0/"
        return "http://localhost:2222/api/v1.0/"
      }
      return API_ENDPOINT
    },
    sort (property) {
      var sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result * sortOrder
      }
    },

    generate_color (partner) {
      var colorList = [
        '#F3C300',
        '#875692',
        '#F38400',
        '#BE0032',
        '#C2B280',
        '#848482',
        '#008856',
        '#E68FAC',
        '#0067A5',
        '#F99379',
        '#604E97',
        '#F6A600',
        '#B3446C',
        '#DCD300',
        '#882D17',
        '#8DB600',
        '#654522',
        '#E25822',
        '#2B3D26',
        '#A1CAF1'
      ]
      for (var i = 0, j = 0; i < this.data[partner].length; i++, j++) {
        if (j >= colorList.length) {
          j = 0
        }
        this.data[partner][i].color = colorList[j]
      }
    },

    delete_http (url) {
      if (url) {
        return url.split('//')[1]
      }
    }
  }
}
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-weight: 400;
  }

  .smallicon{
    font-size: 11px;
    justify-content: left;
  }

  .navbar-item img{
      max-height: 50px;
  }

  .navbar-burger{
      margin-top: auto;
      margin-bottom: auto;
      /* margin-right: 3px; */
  }

  .heroimg img{
      height: 300px;
  }

  .lite-text{
    font-weight: 300;
  }

  .flex-container{
    display: flex;
  }

  .thin-text{
    font-weight: 100;
  }

  .bold-text{
    font-weight: 700;
  }

  .italic-text{
    font-style: italic;
  }

  .fees,.perc{
    max-width: 200px;
  }

  .fees input,
  .perc input{
      text-align: right;
  }

  .icon.is-tiny img{
    width:1.25em;
    height:1.25em;
  }

  .support ul{
    /*text-align: left;*/
    list-style: none;
  }

  .footer{
    background-color: #f8f8f8;
  }

  .footer,
  .push {
    height: 170px;
  }

  .app{
    margin-top: 100px;
    padding-bottom: 100px;
  }

  #setup{
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .capitalize{
      text-transform: capitalize;
  }

  .address a{
      color: #3273dc !important;
  }

.social-media-icons{
  width: 24px;
  margin-right: 10px;
}

.centered{
  margin: auto;
  text-align: center
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.videoWrapper {
  position: relative;
  padding-bottom: 56.25%;
  margin-bottom:25px; /* 16:9 */
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  border:solid 1px #DEE0E4;
  width: 100%;
  height: 100%;
}
.img-gallery {
  position: absolute;
  border:solid 1px #DEE0E4;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  height:100%;

}

.thumbnail{
  width:auto;
  height:32px;
  margin-right:5px;
  border:solid 1px #DEE0E4;
}

.table{
  margin:auto;
  vertical-align: middle;
  margin-bottom: 30px;
}

.table td{
  vertical-align: middle !important;
}
.td-svg{
  text-align:center;
}

.td-data{
  text-align:right;
}
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
