<template lang="html">
<div class="">


  <div class="card">
    <div class="card-content">
      <input v-model="allProductInfoLinks.prodName" @change="emit()" class="input" type="text" :placeholder="$t('product_name')" @blur="prodNameEmptyFinalize()" :class="{'is-danger' : allProductInfoLinks.nameEmptyError}">
      <p class="help is-danger" v-show="allProductInfoLinks.nameEmptyError">{{$t("helper_requiredField")}}</p>

      <input class="input" type="url" autocomplete='website' :placeholder="$t('product_website')" style="margin-top:10px;" @change="emit()" v-model="allProductInfoLinks.prodWeb" @blur="validURL(allProductInfoLinks.prodWeb, 'web')" :class="{'is-danger': !allProductInfoLinks.webValid }" @focus="allProductInfoLinks.webValid = true">
      <p class="help is-danger" v-show="!allProductInfoLinks.webValid">{{$t("helper_invalidURL")}}</p>

      <quill-editor v-model="allProductInfoLinks.prodDesc" :options="editorOptions" style="margin-top: 10px; border: solid 1px #ccc; border-radius: 4px;" @change="updateDesc($event)"></quill-editor>
      <p class="help is-danger" v-show="allProductInfoLinks.descLimitError">{{$t("basicInfo_description_helper")}}</p>
      <p class="help is-danger" v-show="allProductInfoLinks.descEmptyError">{{$t("helper_requiredField")}}</p>

    </div>
  </div>

  <div class="card" >
    <div class="card-content">
      <div>
        <h2 class="title is-4" style="display:inline-block;">{{$t('prodinfo_media')}}</h2>
        <bt-dropinfo :values="[$t('productInfo_atLeast1Required')]" style="vertical-align:text-bottom;"></bt-dropinfo>
      </div>
      <p class="help is-danger" v-show="(allProductInfoLinks.pic_urls.length + allProductInfoLinks.videoLinks.length < 1) && validationError.productInfo_videoOrPic_missing" style="margin-bottom:20px;">{{$t('productInfo_atLeast1Required')}}</p>
      <div class="field" style="margin-top:10px;">
        <label class="label">{{$t('productInfo_addVideoLinks')}}<bt-dropinfo :values="[$t('productInfo_dropDown_video')]"></bt-dropinfo></label>
        <div class="control">
          <div v-if="(allProductInfoLinks.videoLinks.length<=maxVideoCount-1)" class="level" style="margin-bottom:0px;">
            <div class="level-item">
              <input @blur="validURL(newLink, 'video')" class="input" type="text" v-model.trim="newLink" :placeholder="[$t('productInfo_video_placeholder')]" style="margin-right:10px;" :class="{'is-danger' : !linkValid}" @focus="linkValid = true" @keyup.enter="addVideo()" />
              <button class="button" @click="addVideo()"><i class="fas fa-plus"></i></button>
            </div>
          </div>
          <p v-else class="help is-danger">{{$t("productInfo_video_reachMax",[maxVideoCount])}}</p>
          <p class="help is-danger" v-show="videoUnsupported">{{$t("helper_videoUnsupported")}}</p>
          <p v-show="!linkValid" class="help is-danger">{{$t('helper_invalidURL')}}</p>
        </div>
      </div>

      <!-- Videos Table -->
      <div class="centered is-mobile" v-if="allProductInfoLinks.videoLinks.length>0" >
        <div class="level is-mobile" v-for="(item, index) in allProductInfoLinks.videoLinks" style="border-bottom:solid #8080802b 1px;">
          <div class="">
            <div class="level-item">
              <span v-if="types[index]=='unknown'"><p class="help is-danger">Unsupported</p></span>
              <img v-else style="height:15px;vertical-align:middle;" :src="'../../../assets/img/socmedia/'+types[index]+'.png'" alt="">
              <a class="overflow-warpper" style="margin-left:10px;" :href="item" target="_blank">{{item}}</a>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <button  style="vertical-align:top;" class="button is-text imgsmall" @click="removeVideo(index)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="field" style="margin-top:35px; margin-bottom:30px;">
        <div v-if="(allProductInfoLinks.pic_urls.length<=maxPicCount-1)"  class="file" style="align-items:center;">
          <label class="file-label" style="margin-right:5px;">
            <input type="file" id="file_to_upload" ref="file_ref"
                  accept="image/*" multiple v-on:change="handleFilesUpload()">

              <span class="file-cta">
                <span class="file-icon"><i class="fas fa-cloud-upload-alt"></i>
                </span>
                <span class="file-label">{{$t('productInfo_choosePicture')}}</span>
              </span>
          </label>
          <bt-dropinfo :values="[$t('productInfo_dropDown_picture')]" :isup=true></bt-dropinfo>
        </div>
          <p v-show="allProductInfoLinks.pic_urls.length>maxPicCount-1||fileCountReachMaximum" class="help is-danger">{{$t('max_pic_allowed',[maxPicCount])}}</p>
          <p v-show="fileCountReachMaximum" class="help is-danger">{{$t('max_uploaded_warn',[maxPicCount])}}</p>
          <p v-show="errorFile.length>0" class="help is-danger">{{$t('upload_server_error',[errorFile])}}</p>
      </div>

      <div v-if="allProductInfoLinks.pic_urls.length > 0 || allProductInfoLinks.picUploading">
        <div class="columns is-multiline is-variable is-gapless" style="align-items:baseline;margin:auto;">
          <div class="column is-2" style="text-align:center;" v-for="(i,index) in allProductInfoLinks.pic_urls">
            <div>
              <figure>
              <img class="image" :id="'pic_'+index" v-bind:src="allProductInfoLinks.pic_urls[index]" style="height:80px; margin:auto;"></img>
              </figure>
            </div>
            <button class="button is-small is-text" style="border:none;" @click="deleteImage(index, i)">
                <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div v-if="allProductInfoLinks.picUploading" v-for="i in files" class="column is-2 is-variable is-gapless" style="text-align:center;">
            <div>
              <figure>
                <img class="image" style="height:80px;margin-auto" :src="uploadingGif"></img>
              </figure>
              <button class="button is-small is-text" style="border:none;display:hidden;">
                  <i></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import {currencies, blockchains, urlRegEx, mailRegEx, API_ENDPOINT} from 'components/consts'
import axios from 'axios'
import uploadingGif from 'assets/img/load.gif'

import btdropdowninfo from 'components/DropdownInfo.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { DESC_LIMIT } from 'components/consts'

import { quillEditor } from 'vue-quill-editor'

  export default {
  	components: {
      'bt-dropinfo' : btdropdowninfo,
      quillEditor
    },
    mounted(){
        this.emit();
    },

    props : ['apiEndpoint', 'validationError'],

    data () {
      return {
        maxPicCount:10,
        maxVideoCount:10,
        loading : false,
        linkValid: true,
        fileCountReachMaximum : false,
        videoUnsupported : false,
        videoCount : 0,
        newLink : '',
        images : [],
        newImage : '',
        files:[],
        errorFile:[],
        dks:[],
        types:[],
        uploadingGif:uploadingGif,
        editorOptions: {
            debug: 'info',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean']                                         // remove formatting button
                ],
            },
            placeholder: 'Enter a description...',
            readOnly: true,
            theme: 'snow'
        },
        allProductInfoLinks:{
          prodName: "",
          prodWeb: "",
          prodDesc: "",
          prodDescTxt: "",
          nameEmptyError : false,
          descEmptyError : false,
          descLimitError : false,
          pic_urls:[],
          videoLinks : [],
          video:[],
          picUploading : false,
          webValid: true,
        }
      }
    },
    computed:{

    },

    methods:{

      prodNameEmptyFinalize() {
        if(this.allProductInfoLinks.prodName == "" && this.validationError.prodinfo_name_missing) {
          this.allProductInfoLinks.nameEmptyError = true;
        } else {
          this.allProductInfoLinks.nameEmptyError = false;
          this.validationError.prodinfo_name_missing = false;
        }
      },

      video_type: function(url){
        //currently supports youtube and vimeo
        var type='unknown';
        type = url.search('youtube.com/watch')==-1 ?
               url.search('vimeo.com/')==-1 ?
               url.search('youtu.be/')==-1 ?
               'unknown'
               : 'youtube_short'
               : 'vimeo'
               : 'youtube';
        return type;
      },
      emit(){
        this.$emit('input', this.allProductInfoLinks);
      },

      addVideo() {
        this.videoUnsupported = false
        this.validURL(this.newLink, 'video');
        if(this.newLink && this.linkValid && this.videoCount < this.maxVideoCount) {
          var type = this.video_type(this.newLink)
          if (type=='unknown'){
            this.videoUnsupported = true;
          }
          else{
            this.videoCount += 1;
            this.allProductInfoLinks.videoLinks.push(this.newLink);
            this.get_thumbnail_videoID(this.newLink,type);
            this.newLink = '';
            this.emit();
          }
        }
      },
      do_youtube(url,short=false){
        if (short)
        {
          var videoID = url.split('youtu.be/')[1];
        }else{
          var videoID = url.split('v=')[1];
        }
        var ampersandPosition = videoID.indexOf('&');
        if(ampersandPosition != -1) {
          videoID = videoID.substring(0, ampersandPosition);
        }
        this.allProductInfoLinks.video.push({
          url:'https://www.youtube.com/embed/'+videoID,
          type:'youtube',
          thumbnail:'https://img.youtube.com/vi/'+videoID+'/0.jpg',
        });
      },
      do_vimeo(url){
        var videoID=url.split('vimeo.com/')[1];
        axios.get('https://vimeo.com/api/v2/video/'+videoID+'.json').then((response)=>{
            // this.allProductInfoLinks.video.thumbnail.push(response.data[0]['thumbnail_small'])
            this.allProductInfoLinks.video.push({
              url:'https://player.vimeo.com/video/'+videoID,
              type:'vimeo',
              thumbnail:response.data[0]['thumbnail_small'],
            });

          });

      },
      get_thumbnail_videoID(url,type){
          switch(type){
            case 'youtube':
              this.do_youtube(url);
              this.types.push(type);
              break;
            case 'youtube_short':
              this.do_youtube(url,true);
              this.types.push('youtube');
              break;
            case 'vimeo':
              this.do_vimeo(url);
              this.types.push(type);
              break;
            default:
              break;
          }
      },

      removeVideo(index) {
        if(this.videoCount > 0) {
          this.videoCount -= 1;
          this.allProductInfoLinks.videoLinks.splice(index, 1);
          this.types.splice(index,1);
          this.emit();
        }
      },


      validURL(urlField, linkType){
        if(urlField) {
          if(linkType == 'video') {
            this.linkValid = urlRegEx.test(urlField);
          } else if(linkType == 'web') {
            this.allProductInfoLinks.webValid = urlRegEx.test(urlField);
          }
        } else {
          if(linkType == 'video') {
            this.linkValid = true;
          } else if(linkType == 'web') {
            this.allProductInfoLinks.webValid = true;
          }
        }
      },

      descEmptyAfterFinalize() {
        if(this.allProductInfoLinks.prodDesc != "" && this.validationError.prodinfo_desc_missing) {
            this.allProductInfoLinks.descEmptyError = false;
            this.validationError.prodinfo_desc_missing = false;
        }
      },

      updateDesc(quill) {
        if(quill.text.length > DESC_LIMIT) {
          this.allProductInfoLinks.descLimitError = true;
        } else {
          this.allProductInfoLinks.descLimitError = false;
        }
        this.allProductInfoLinks.prodDescTxt = quill.text;
      },

      submitFiles(){
        var formData = new FormData();

        for( var i = 0; i < this.files.length; i++ ){
          formData.append('file_' + i, this.files[i]);
        }

        axios.post(this.apiEndpoint + 'image?type=productinfo&qty='+this.files.length,
          formData,
          {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }
        ).then(response=> {
          for (var i=0;i<response.data.length;i++){
            if (response.data[i].fileError==0){
              this.allProductInfoLinks.pic_urls.push(response.data[i].url);
              this.dks.push(response.data[i].dk);
            }
            else {
              this.errorFile.push(i+1);
            }
          }
          this.emit();
          this.allProductInfoLinks.picUploading=false;

      }).catch((error) => {
        console.log(error);
        this.allProductInfoLinks.picUploading=false;
        this.serverError = "Something went wrong on the server.";
        console.log(this.serverError);
        this.emit();
      });
      },

      handleFilesUpload(){
        var uploadedFiles=this.$refs.file_ref.files;
        this.errorFile = [];
        if (!this.allProductInfoLinks.picUploading && uploadedFiles.length > 0) {
          if (this.allProductInfoLinks.pic_urls.length+this.$refs.file_ref.files.length>10){
            this.fileCountReachMaximum=true;
          }
            this.files=[];
            this.allProductInfoLinks.picUploading=true;
            for( var i = 0; i < (10 - this.allProductInfoLinks.pic_urls.length); i++ ){
              if(i < uploadedFiles.length) {
                this.files.push( uploadedFiles[i] );
              }
            // console.log(this.files);
          }
          this.emit();
          this.submitFiles();

        }
      },
      deleteImage(index,url) {
          document.getElementById('pic_'+index).src=this.uploadingGif;
          var filePath=url.split('blockterms.com/imgs/productinfo/')[1];
          axios.delete(this.apiEndpoint + 'image?type=productinfo&link=' + filePath +'&path='+this.dks[index], {})
          .then(response=> {
            this.allProductInfoLinks.pic_urls.splice( index, 1 );
            this.dks.splice( index, 1 );
            this.fileCountReachMaximum=false;
            this.emit();

        }).catch(function(error) {
           console.log(error.response.data);
        });
        },


    }
  }

</script>

<style lang="css">
	.right,
	.table th.right{
		text-align: right;
	}

.centered{
  margin: auto;
  text-align: center
}

.column {
  padding:0.2rem;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}


.img-g {
  position: absolute;
  border:solid 1px #A0A0A0;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  height:100%;
}
.img_delete {
  /* border:solid 1px #A0A0A0 !important;
  background-color: white !important;
  top: 11% !important;
  left: 87.5% !important;
  transform: translate(-50%, -50%) !important;
  -ms-transform: translate(-50%, -50%) !important;
  text-align: center !important;
  position: absolute !important;
  transition: .5s ease !important; */
  margin-left: 50px;
}

</style>
