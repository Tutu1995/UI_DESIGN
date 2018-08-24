<template lang="html">
  <div>


  <div class="" >
    <div class="">
      <div class="level">
        <div class="level-item">
          <div class="tabs is-boxed">
            <ul>
              <li class="is-active"><a>Preview</a></li>
              <li><a>Edit</a></li>
              <li><a>Generate QR Code</a></li>
              <li><a>Collaborators</a></li>
            </ul>
          </div>
          <!-- <button class="button option-button" type="button" name="button">View</button>
          <button class="button option-button" type="button" name="button">Edit</button>
          <button class="button option-button" type="button" name="button" @click="genQRExpanded=!genQRExpanded">Generate QR code for this Page</button> -->
        </div>
      </div>

    </div>
  </div>

    <SlideMe :active="genQRExpanded" :duration="300" :mydata='QRsize'>
      <div class="" style="padding:1px 1px;margin-bottom: 10px;">

        <qrgen v-model="QRsize" :id="id" :API_ENDPOINT="API_ENDPOINT"></qrgen>
      </div>

    </SlideMe>
</div>
</template>

<script>
import SlideMe from 'components/SlideMe.vue'

import qrgen from './qrgen.vue'

export default {
  data(){
    return {
      genQRExpanded:false,
      QRsize:200,
    }
  },
  props:['id','API_ENDPOINT'],
  components:{
    'qrgen': qrgen,
    'SlideMe': SlideMe
  }
}
</script>

<style lang="css">
  .option-button{
    margin:10px;
  }
</style>
