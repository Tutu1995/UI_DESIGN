<template lang="html">
  <div class="card">
    <div class="card-content">
      <div class="level" >
          <div class="level-item">
            <div style="padding: 10px; background-color:#f8f8f8; max-height:800px;max-width:800px;overflow:auto;" :height="height+'px'">
                <img v-if="loading" :src="imgdata" :style="'height:'+height_6+'px;'" alt="QR code" style="max-width:none;">
                <div v-else id="QRsvg" v-html="svgData"></div>
              </div>
          </div>
        </div>

        <div class="level">
                  <div class="level-item">
                      <div class="select is-small" style="margin-right:5px;">
                          <select id="dropdown" v-model="size" v-on:change="change_size_dropdown(size)" style="padding-right:2em;">
                              <option v-for="opt in options_to_show" v-bind:value="opt">{{opt*sizeMultiplier}} pixels × {{opt*sizeMultiplier}} pixels</option>
                              <!-- <option value="customize">Customized size..</option> -->
                          </select>
                      </div>
                           <!-- <div class="dropdown is-hoverable is-right" :class="{'is-active' : isActive}">
                            <div class="dropdown-trigger">
                                <span class="icon smallicon hoverable has-text-info" @click="isActive = !isActive"> <i class="fas fa-info-circle"></i> </span>
                            </div>
                            <div class="dropdown-menu infodrop" role="menu">
                              <div class="dropdown-content">
                                <div class="dropdown-item">
                                  <div class="text is centered" style="font-size:small;">
                                      <p>Current QR code size:</p>
                                      <p>{{current_size}} pixels × {{current_size}} pixels</p>
                                      <p>{{length_in}} inches × {{length_in}} inches</p>
                                      <p>{{length_cm}} cm × {{length_cm}} cm</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div> -->
                  </div>
              </div>

          <!-- <div v-show="size=='customize'" class="level">
            <div class="level-item">
                <div class="text centered">
                    <p>Side length (pixels): </p>
                    <input v-model.number="customized_size" type="text" style="width:150px;" placeholder="e.g. 400" class="input"></input>
                    <button class="button text is centered" @click="change_size_customize(customized_size)">Submit</button>
                    <p class="help is-danger" v-show="no_need_to_refresh" style="color:red;">Already set to this size.</p>
                    <p v-show="size_is_illegal(customized_size)" class="help is-danger">To guarantee readability, side length should be between {{smallest_size}} pixels and {{largest_size}} pixels.</p>
                    </div>
                </div>
            </div> -->

          <div class="level">
            <div class="level-item">
              <p>QR Code Content:
                  <a :href="qrAddress">{{qrAddress}}</a>
                </p>
            </div>
          </div>

        <div class="level">
          <div class="level-item">
            <button type="button" class="button" name="button" @click="download()"
                style="display:inline-block;margin-right:25px;"><i style="margin-right:5px;" class="fas fa-download"></i>Download</button>

            <button type="button" class="button" name="button" @click="print()"
                style="display:inline-block;"><i style="margin-right:5px;" class="fas fa-print"></i>Print</button>
          </div>
          </div>
        </div>
      </div>
</template>


<script>
export default {
  props:['id','API_ENDPOINT'],
  data(){
    return {
      isActive: false,
      height:200,
      imgdata:"/assets/img/loading.gif",
      loading: true,
      qrAddress:'',
      customize:false,
      no_need_to_refresh:false,
      options_to_show:[1,2,3,4,5,6,7,8,9,10],
      size:3,
      current_size:null,
      customized_size:null,
      largest_size:5000,
      smallest_size:100,
      DPI:96,
      length_in:null,
      length_cm:null,
      svgData:null,
      sizeMultiplier:39
    }
  },
  computed:{
      height_6(){
          return this.height+6
      }
  },

  mounted(){
      this.set_qr(this.size);
      // this.compute_size();
  },
  // watch:{
  //     customized_size:function(){
  //         this.no_need_to_refresh=false;
  //     }
  // },
  methods:{
      set_qr: async function(size){
          this.loading = true
          this.height=size * this.sizeMultiplier;
          var res = await fetch(this.API_ENDPOINT+'qr?address='+this.id+'&size='+size)
              .then(response=>{ return response.json();
              });
          this.svgData = res.QR
          this.qrAddress=res.qrAddress;
          this.current_size=size;
          // this.size = this.current_size;
          // this.compute_size();
          // if (this.options_to_show.includes(this.customized_size) && this.customize){
          //     this.size=this.customized_size;
          // }
          this.loading=false
          // this.$emit('input', size);
      },
      // compute_size:function(){
        //     this.length_in = (this.current_size/this.DPI).toFixed(2);
        //     this.length_cm = (this.current_size/this.DPI*2.54).toFixed(2);
        // },
        change_size_dropdown: function(size){
            if (size=='customize')
            {
                this.customize=true;

            }
            else{
                this.customize = false;
                this.set_qr(size);
            }

        },
        // change_size_customize(customized_size){
        //   if(customized_size==this.current_size){
        //       this.no_need_to_refresh=true;
        //   }
        //   else if(!this.size_is_illegal(customized_size)){
        //     this.set_qr(customized_size);
        //   }
        // },
        // size_is_illegal: function(size){
        //     if (size==null){
        //         return false;
        //     }
        //     else{

        //         return (size<this.smallest_size || size>this.largest_size);
        //     }
        // },
        // downloadpng(){
        //   var link = document.createElement('a');
        //   link.setAttribute('href', this.imgdata);
        //   link.setAttribute('download', 'Product_QR_'+this.current_size+'px');
        //   link.click();
        // },
        download(svgEl, name) {
            var svgData = document.getElementById("QRsvg").outerHTML;
            var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "QRcode.svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        },
    //     ImagetoPrint:function (source) {
    // return "<html><head><script>function step1(){\n" +
    //         "setTimeout('step2()', 10);}\n" +
    //         "function step2(){window.print();window.close()}\n" +
    //         "</scri" + "pt></head><body onload='step1()'>\n" +
    //         "<img src='" + source + "' />";
    //       },
        // printpng(){
        //   popup = window.open();
        //   popup.document.write(this.ImagetoPrint(this.imgdata));
        //   popup.focus(); //required for IE
        //   popup.print();
        // },
        print(){
          var svgDom=document.getElementById("QRsvg")
          if (svgDom){
              var popup = window.open();
              popup.document.write(svgDom.outerHTML);
              // popup.focus(); //required for IE
              popup.print();
            }
        }
    },
}

</script>
