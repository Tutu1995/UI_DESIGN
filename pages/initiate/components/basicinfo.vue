<template lang="html">

  <div class="card">
    <div class="card-content">

    <div class="column">
        <div class="columns is-1 is-variable" >
            <div class="column is-one-fifth" style="text-align:center;">
                <div style="height:86px; margin-bottom:10px;">
                    <figure v-if="!all_basicInfo.logoUploading">
                        <img v-if=all_basicInfo.logo_url style="margin:auto;max-height:86px; height:86px;" :src="all_basicInfo.logo_url"></img>
                        <img v-else src="../../../assets/img/logo-placeholder.jpg"
                            style="margin:auto; max-height:86px; height:86px;"
                            alt="Add your logo">
                    </figure>
                    <div v-if="all_basicInfo.logoUploading">
                      <i class="fa fa-spinner fa-pulse fa-1x fa-fw" style="height:86px;margin:auto;max-height:86px;"></i>
                    </div>

                </div>

                
                <p v-if="fileError" class="help is-danger">{{$t("helper_fileError1")}}</p>
                <p v-if="fileError" class="help is-danger">{{$t("helper_fileError2")}}</p>
                <div class="level" style="display:inline-flex;">
                    <div class="level-item" v-if="!all_basicInfo.logoUploading">
                        <div class="field">
                            <div class="file is-small">
                                <label class="file-label">
                                    <input type="file" id="file_to_upload" accept="image/*" v-on:change="handleFilesUpload"/>
                                    <span class="file-cta">
                                        <span class="file-icon" style="margin-right: 0em;">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label" v-if="!all_basicInfo.logoUploaded || all_basicInfo.logoUploading" style="margin-left:0.5em">
                                            {{$t("basicInfo_uploadLogo")}}
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div v-if="all_basicInfo.logoUploaded && !all_basicInfo.logoUploading" class="level-item" style="margin-left:5px;">
                        <button class="button is-text" style="border: solid 1px #DBDBDA; font-size:12px; padding-left:1em;padding-right:1em;" @click="deleteCurrentLogo();">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>



            <div class="column">
                <input class="input" type="text" autocomplete='company name' :placeholder="$t('basicInfo_name_placeholder')" :class="{'is-danger': all_basicInfo.nameEmptyError}" @change="dataEmit" v-model="all_basicInfo.name" @blur=nameEmptyAfterFinalize()>
                <p class="help is-danger" v-show="all_basicInfo.nameEmptyError">{{$t("helper_requiredField")}}</p>

                <input class="input" type="url" autocomplete='website' :placeholder="$t('basicInfo_website_placeholder')" :class="{'is-danger': !all_basicInfo.websiteValid }" @change="dataEmit" v-model="all_basicInfo.website" style="margin-top:10px;" @blur="validURL()" @focus="all_basicInfo.websiteValid = true;">
                <p class="help is-danger" v-show="!all_basicInfo.websiteValid">{{$t("helper_invalidURL")}}</p>

                <div class="field has-addons" style="margin-top:10px; margin-bottom:-2px;" >
                    <div class="control" style="width:100%;">
                        <input class="input" type="text" :class="{'is-danger': all_basicInfo.locationInvalid}" autocomplete='address-level2' :placeholder="$t('basicInfo_location_placeholder')" @change="dataEmit" v-model="all_basicInfo.address" @blur="validAddress">
                    </div>
                    <div class="control">
                        <a class="button gps" :class="{'gpsActive' : gpsActive}" @click="getLocation">
                        <span class="icon is-small">
                            <i class="fas fa-location-arrow"></i>
                        </span>
                        </a>
                    </div>
                </div>
                <p class="help is-danger" v-show="all_basicInfo.locationInvalid">{{$t("invalid_address_error")}}</p>
            </div>
        </div>
        <quill-editor v-model="all_basicInfo.description" :options="editorOptions" style="margin-top: 10px; border: solid 1px #ccc; border-radius: 4px;" @change="updateDesc($event)" ></quill-editor>
        <p class="help is-danger" v-show="all_basicInfo.descLimitError">{{$t("basicInfo_description_helper")}}</p>   
    </div>
    

  </div>
</div>

</template>

<script>

import axios from 'axios';
import VueGeolocation from 'vue-browser-geolocation';
import Vue from 'vue';
import {urlRegEx, mailRegEx} from 'components/consts'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {DESC_LIMIT} from 'components/consts'

import { quillEditor } from 'vue-quill-editor'

Vue.use(VueGeolocation);

  export default {
  	components: {
        quillEditor
    },

    props: ['apiEndpoint', 'validationErrors'],

    data () {
      return {
        loading: false,
        files:[],
        fileError:false,
        dk:'',
        gpsActive: false,
        logoPlaceholder: "../../../assets/img/logo-placeholder.jpg",
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
        all_basicInfo : {
            name : '',
            location : '',
            description : '',
            descTxt : '',
            logo_url : null,
            address: '',
            locationInvalid: false,
            websiteValid : true,
            website : '',
            nameEmptyError : false,
            descLimitError : false,
            logoUploaded:false,
            logoUploading:false,
        },
      }
    },

    // computed: {
    //     editor() {
    //         return this.$refs.myTextEditor.quill;
    //     }
    // },
    mounted() {
        this.$emit('input', this.all_basicInfo);
    },

    methods:{

        getLocation() {
            this.gpsActive = true;
            this.$getLocation()
            .then(coordinates => {
                this.all_basicInfo.location = coordinates;
                this.getReverseGeocoding(this.all_basicInfo.location.lat, this.all_basicInfo.location.lng);
            });
        },

        dataEmit() {
            this.$emit('input', this.all_basicInfo);
        },

        submitFiles(){
          var formData = new FormData();
          for( var i = 0; i < this.files.length; i++ ){
            formData.append('file_' + i, this.files[i]);
          }
          axios.post(this.apiEndpoint + 'image?type=logo&qty='+this.files.length,
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          ).then(response=> {
            if (response.data[0].fileError==0){
              this.all_basicInfo.logo_url=response.data[0].url;
              this.dk=response.data[0].dk;
              this.all_basicInfo.logoUploaded=true;
              this.$emit('input', this.all_basicInfo);
            }
            else{
              this.fileError=true;
            }
            this.all_basicInfo.logoUploading=false;

            }).catch((error) => {
                console.log(error.response.data);
                this.all_basicInfo.logoUploading=false;
                this.serverError = "Something went wrong on the server.";
                console.log(this.serverError);
            });
        },
        handleFilesUpload(e){
          var uploadedFiles = e.target.files || e.dataTransfer.files;
          if (!uploadedFiles.length){
              return;
          }
        //   var uploadedFiles=this.$refs.file_ref.files;
          this.fileError = false;
          if (!this.all_basicInfo.logoUploading && uploadedFiles.length>0){
          this.files=[];
          this.all_basicInfo.logoUploading=true;
          this.$emit('input', this.all_basicInfo);
          for( var i = 0; i < uploadedFiles.length; i++ ){
            this.files.push( uploadedFiles[i] );
          }
          // console.log(this.files);
          if (this.all_basicInfo.logoUploaded){
            this.delete_previous_logo();
            // this.submitFiles() will be executed in delete_previous_logo()
          }
          this.submitFiles();

          }
        },
        delete_previous_logo(){
            this.all_basicInfo.logoUploading = true;
            var fileName=this.all_basicInfo.logo_url.split('blockterms.com/imgs/logo/')[1];
            axios.delete(this.apiEndpoint + 'image?type=logo&link=' + fileName + '&path='+ this.dk,{});
        },

        deleteCurrentLogo() {
            this.delete_previous_logo();
            this.all_basicInfo.logoUploading = false;
            this.all_basicInfo.logo_url = '';
            this.all_basicInfo.logoUploaded = false;
        },

        getReverseGeocoding(lat, lng) {
            var latlng = new google.maps.LatLng(lat, lng);
            // This is making the Geocode request
            var geocoder = new google.maps.Geocoder();
            var address = '';
            var country = '';
            var state = '';
            var city = '';
            geocoder.geocode({ 'latLng': latlng },  (results, status) => {
                if (status !== google.maps.GeocoderStatus.OK) {
                    alert(status);
                }
                // This is checking to see if the Geoeode Status is OK before proceeding
                if (status == google.maps.GeocoderStatus.OK) {
                    this.all_basicInfo.locationInvalid = false;
                    address = (results[4].formatted_address);
                    results.forEach((element) => {
                        element.address_components.forEach((element2) => {
                            element2.types.forEach((element3) => {
                                switch(element3){
                                    case 'administrative_area_level_1':
                                    state = element2.short_name;
                                    break;
                                    case 'locality':
                                    city = element2.long_name;
                                    break;
                                    case 'country':
                                    country = element2.long_name;
                                    break;
                                }
                            })
                        });
                    });
                    this.all_basicInfo.locationEmptyError = '';
                }

                this.all_basicInfo.address = city + ", " + state + ", " + country;
            });
        },

        validAddress() {
            this.gpsActive = false;
            var city = '';
            var state = '';
            var country = '';
            if(this.all_basicInfo.address == '') {
                this.all_basicInfo.locationInvalid = false;
            } else {
                axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.all_basicInfo.address + '&key=AIzaSyDKrA606IhNBh27Jn6YSF867ZgrgjScsjQ',
                {
                    headers: {
                    }
                }
                ).then(response=> {
                    console.log(this.locationIsLoading);
                    if (response.data.status=="OK") {
                        var results = response.data.results;
                        this.all_basicInfo.address = results[0].formatted_address;
                        this.all_basicInfo.location = results[0].geometry.location;
                        this.all_basicInfo.locationInvalid = false;

                    } else {
                        this.all_basicInfo.locationInvalid = true;
                    }
                });
            }
        },

        validURL(){
         if(this.all_basicInfo.website){
          this.all_basicInfo.websiteValid  = urlRegEx.test(this.all_basicInfo.website);
         }
         else{
           this.all_basicInfo.websiteValid  = true;
         }

      },

      nameEmptyAfterFinalize() {
        if(this.all_basicInfo.name != "" && this.validationErrors.basicInfo_name_missing) {
            this.all_basicInfo.nameEmptyError = false;
            this.validationErrors.basicInfo_name_missing == false;
        }
      },

      descEmptyAfterFinalize() {
        if(this.all_basicInfo.description != "" && this.validationErrors.basicInfo_description_missing) {
            this.validationErrors.basicInfo_description_missing = false;
        }
      },

    //   descOverLimit(description) {
    //     console.log("Length: -----"+ quill.text.length);
    //     if(description.length - 1) >= DESC_LIMIT) {
    //         this.all_basicInfo.descLimitError = true;
    //     } else {
    //         this.all_basicInfo.descLimitError = false;
    //     }
    //   },

      updateDesc(quill) {
        if(quill.text.length > DESC_LIMIT) {
            this.all_basicInfo.descLimitError = true;
        } else {
            this.all_basicInfo.descLimitError = false;
        }
        this.all_basicInfo.descTxt = quill.text;

      }
    },
  }

</script>

<style lang="css">
	.right,
	.table th.right{
		text-align: right;
	}

    .gps:hover {
        color: #3273dc;
    }
    .gpsActive {
        color: #3273dc;
    }

    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        border-color: #ccc;
        height: 143px;
        overflow: auto;
    }  

    .ql-toolbar.ql-snow .ql-formats {
        margin-right: 15px;
        margin-bottom: 10px;
    }

    .ql-toolbar.ql-snow {
        border:none !important;
        border-bottom: solid 1px #ccc !important;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        padding: 8px;
    }

    .ql-container.ql-snow { 
        border: none !important; 
        min-height: 172px;

    }

</style>
