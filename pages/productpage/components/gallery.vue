
<template>
  <div class="card">
    <div class="card-content">
      <h4 class="title is-4" >{{data.product_name}}</h4>

      <!-- Gallery -->
      <div class="">
      <div class="videoWrapper">
          <transition name="slide-fade">
            <iframe v-if="data.imgs[image_to_show_in_gallery].type!='image'"  frameborder="0" allow="autoplay; encrypted-media"
                    id="video" width="800" height="480" :key="image_to_show_in_gallery"
                    :src="data.imgs[image_to_show_in_gallery]['url']"></iframe>
            <img v-else :key="image_to_show_in_gallery" id="video" class="img-gallery"
                        :src="data.imgs[image_to_show_in_gallery]['thumbnail']"/>

          </transition>
      </div>

          <div class="columns" style="margin-bottom:10px;">
          <div class="centered">
              <img v-if="data.imgs[index].thumbnail" class="thumbnail"
                   v-bind:src="data.imgs[index].thumbnail" :key="index" v-for="(i,index) in data.imgs" v-on:click="change_pic(index)"/>
             </div>
           </div>
         </div>
        <!-- Gallery end-->
        <div class="" style="margin-top:25px;">
          <p v-html="data.product_description" style="text-align:justify;"></p>
          <p v-if="data.product_webpage!=null" style="margin-top:10px;" class="help">For more information visit <a :href="data.product_webpage" target="_blank">{{ delete_http(data.product_webpage) }}</a></p>
        </div>
      <!-- Social media -->
      <div class="level-left">
        <div class="level-item">
            <a class="social-media-icons" :key="item.url" v-for="item in data.social_media_links" v-bind:href="item.url" target="_blank">
              <figure >
                <span v-if="item.type=='unknown'"><i class="fas fa-external-link-alt"></i></span>
                <img v-else v-bind:src="soc_media_icons[item.type]" v-bind:alt="item.url">
              </figure>
            </a>
          </div>
      </div>

      <!-- Social media end -->
  </div>
  </div>
</template>

<script>

import facebook from 'assets/img/socmedia/facebook.png'
import instagram from 'assets/img/socmedia/instagram.png'
import linkedin from 'assets/img/socmedia/linkedin.png'
import pinterest from 'assets/img/socmedia/pinterest.png'
import twitter from 'assets/img/socmedia/twitter.png'
import vimeo from 'assets/img/socmedia/vimeo.png'
import weibo from 'assets/img/socmedia/weibo.png'
import yelp from 'assets/img/socmedia/yelp.png'
import youtube from 'assets/img/socmedia/youtube.png'

export default {
  data () {
    return {
      soc_media_icons: {
        facebook: facebook,
        instagram: instagram,
        linkedin: linkedin,
        pinterest: pinterest,
        twitter: twitter,
        vimeo: vimeo,
        weibo: weibo,
        yelp: yelp,
        youtube: youtube
      },
      image_to_show_in_gallery: 0,
      video_indicator: [false]
    }
  },
  props: ['delete_http', 'data'],
  methods: {
    change_pic (index) {
      this.image_to_show_in_gallery = index
    }
  }
}

</script>
