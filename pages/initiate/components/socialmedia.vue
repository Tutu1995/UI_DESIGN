<template lang="html">

<div class="card">
  <div class="card-content">


    <div class="field">
      <label class="label">{{$t("socialMedia_addSocialMediaLinks")}}<bt-dropinfo :values="[$t('socialMedia_dropDown')]" :isup=true></bt-dropinfo></label>
      <div class="control">
        <div class="level" style="margin-bottom:0px;">
          <div class="level-item">
            <input class="input" type="text" v-model.trim="current_link" :placeholder="[$t('socialMedia_placeholder')]" style="margin-right:10px;" @blur="validURL()" :class="{'is-danger' : !validUrl }" @keyup.enter="add_social_media_link" @focus="validUrl = true;"/>
              <button class="button" @click="add_social_media_link"><i class="fas fa-plus"></i></button>
          </div>
        </div>
          <p v-show="!validUrl" style="color:red;"class="help is-danger">{{$t("helper_invalidURL")}}</p>
      </div>
    </div>

      <div class="centered"  v-if="all_links.length>0" >

          <div class="level is-mobile" style="margin-top:10px;" v-for="(item, index) in all_links">
            <div class="">
              <div class="level-item">
                <span v-if="item.type=='unknown'"><i class="fas fa-external-link-alt"></i></span>
                <img v-else style="height:15px;vertical-align:middle;" :src="'../../../assets/img/socmedia/'+item.type+'.png'" alt="">
                <a class="overflow-warpper" style="margin-left:10px;" :href="appendUrl + item.url" target="_blank">{{item.url}}</a>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button  style="vertical-align:top;" class="button is-text imgsmall" @click="delete_link(index)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>

      </div>

    </div>
  </div>


</template>

<script>
import {currencies, blockchains, urlRegEx, mailRegEx, API_ENDPOINT} from 'components/consts'
import btdropdowninfo from 'components/DropdownInfo.vue'

  export default {
  	components: {
        'bt-dropinfo' : btdropdowninfo,
    },

    data () {
      return {
        appendUrl: '//'
        current_link:'',
        all_links:[],
        types:[],
        socialMediaTypes:[
          'twitter','facebook','yelp','instagram','linkedin','weibo','youtube','pinterest'
        ],
        validUrl: true
      }
    },


    methods:{
      determine_type(url){
        var type='unknown';
        var i=0;
        while(type=='unknown' && i < this.socialMediaTypes.length){
          var type = url.search(this.socialMediaTypes[i]+'.com')==-1 ? 'unknown' : this.socialMediaTypes[i];
          i++;
        }
        return type;
      },
      validURL(){
        if(this.current_link){
          this.validUrl = urlRegEx.test(this.current_link);
        } else {
          this.validUrl = true;
        }
      },

      delete_link: function(i){
        this.all_links.splice(i,1);
        this.$emit('input',this.all_links);
      },

      add_social_media_link: function(){
        this.validURL()
        if (this.validUrl && this.current_link){
        this.all_links.push({
                url:this.current_link,
                type:this.determine_type(this.current_link)});
        this.$emit('input',this.all_links);
        this.current_link='';
        }
      },

    },
  }
</script>

<style lang="css">
	.right,
	.table th.right{
		text-align: right;
	}
</style>
