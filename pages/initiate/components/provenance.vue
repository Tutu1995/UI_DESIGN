<template lang="html">
<div class="card" style="min-height: 490px;">
  <div class="card-content">

    <!-- main currency -->
    <div style="margin-top:10px;" class="columns is-centered is-vcentered">

      <p class="label" style="margin-top:auto;margin-right:15px;">{{$t("partner_currency")}}<bt-dropinfo :values="[$t('curhelp')]"></bt-dropinfo></p>

      <div class="field">
        <div class="select is-fullwidth">
          <select v-model="all_p.currency" @change="emit_all_p()">
            <option v-for="opt in options" :value="opt">{{opt.cc}}  ( {{opt.name}}, {{opt.symbol}}   )</option>
          </select>
        </div>
      </div>
    </div>
    <!-- main currency end -->

    <p class='title'>{{$t("title_add_partner")}}</p>

    <div class="columns is-vcentered">
      <!-- first column -->
      <div class="column is-two-thirds" style="margin-right:30px;">
          <!-- name -->
          <div class="field">
            <label class="label">{{$t("partner_name")}}</label>
            <div class="control">
              <input class="input" :class="{'is-danger':dangerInput.name}" type="text" v-model.trim="current_p.name" :placeholder="$t('partner_placeholder_name')" style="margin-right:10px;">
              <p v-show="dangerInput.name" class="help is-danger">{{$t("field_req_error")}}</p>
            </div>
          </div>
          <!-- name end -->
          <!-- location -->

          <div class="field">
            <label class="label">{{$t("partner_location")}}</label>
            <div class="control">
              <input class="input" :class="{'is-danger':dangerInput.location}" type="text" v-model.trim="current_p.location.address"
                     :placeholder="$t('partner_location_placeholder')"
                     style="margin-right:10px;"
                     @blur="validateLocation()">
            </div>
            <p class="help is-danger" v-show="dangerInput.location">{{$t("invalid_address_error")}}</p>
          </div>

          <!-- location end -->
          <!-- website -->
          <div class="field">
            <label class="label">{{$t("partner_web")}}</label>
            <div class="control">
              <input class="input" :class="{'is-danger':dangerInput.website}" type="url" v-model.trim="current_p.website" @blur="validURL()" :placeholder="$t('partner_placeholder_web')" style="margin-right:10px;" @focus="dangerInput.website = false;">
                  <p v-show="dangerInput.website" class="help is-danger">{{$t("invalid_url_error")}}</p>
            </div>
          </div>
          <!-- website end -->

      </div>
      <!-- first column end -->

      <!-- Second column -->
      <div class="column" style="margin-right:20px;">
        <!-- Partnership type -->
        <div class="field">
          <label class="label">{{$t("partner_own_struc")}}</label>
          <div class="select is-fullwidth">
            <select v-model="partnerType" @change="clear_value()">
              <option value="Percentage">{{$t("partner_percent")}}</option>
              <option value="Flatfee">{{$t("partner_fee")}}</option>
            </select>
          </div>
        </div>
        <!-- Partnership type end -->
        <!-- Percentage -->
        <div v-if="partnerType=='Percentage'" class="field">
          <label class="label">{{$t("partner_percent")}}<bt-dropinfo :values="[$t('partnershelp1'),$t('partnershelp2')]" :isup=true></bt-dropinfo></label>
          <div class="control">
            <input class="input" :class="{'is-danger':dangerInput.value||!percentageValid()}" type="text" v-model.number="current_p.value" :placeholder="$t('percent_required')" @keyup.enter="check_and_add_item()"/>
            <p v-show="dangerInput.value" class="help is-danger">{{$t("field_req_error")}}</p>
            <p v-show="!percentageValid()" class="help is-danger">{{$t("invalid_percent")}}</p>
          </div>
        </div>
        <!-- percentage end -->
        <!-- Flatfee -->
        <div v-if="partnerType=='Flatfee'" class="field">
          <label class="label">{{$t("partner_fee")}}<bt-dropinfo :values="[$t('flatfeeshelp1')]"></bt-dropinfo></label>
          <div class="control">
            <input class="input" :class="{'is-danger':dangerInput.value||!feeValid()}" @blur="feeEmpty()" type="text" v-model.trim="current_p.value" :placeholder="$t('fees_placeholder') + all_p.currency.symbol + $t('required_gen_placeholder')" @keyup.enter="check_and_add_item()" />
              <p v-show="dangerInput.value" class="help is-danger">{{$t("field_req_error")}}</p>
            <p v-show="!feeValid()" class="help is-danger">{{$t("field_req_error")}}</p>
          </div>
        </div>
          <!-- Flatfee end -->
      </div>
      <!-- second column end -->
    </div>
    <!-- columns end -->

    <!-- submit button -->
    <div class="columns is-centered">
      <div class="column is-narrow centered">
        <button class="button" @click="check_and_add_item()" type="button" name="button">{{$t("add_partner_button")}}</button>
        <p v-show="duplicatePartner" class="help is-danger has-text-centered">{{$t("duplicate_partner_error")}}</p>
      </div>
    </div>
    <!-- submit button end -->

    <!-- all ffp table -->
    <div v-show="all_p.flatfee.length>0" class="table-wrapper" style="overflow-x:auto;">
      <h2 class='subtitle'>{{$t("flatfee_partners_title")}}</h2>
      <table class="table centered" >
        <thead>
          <tr>
            <th>{{$t("partner_name")}}</th>
            <th style="text-align:right;">{{$t("partner_fee")}}</th>
            <th>{{$t("partner_web")}}</th>
            <th>{{$t("partner_location")}}</th>
            <th>{{$t("prov_delete")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in all_p.flatfee">
            <td :data-label="$t('partner_name')">{{item.name}}</td>
            <td class="td-align-right" :data-label="$t('partner_fee')">{{all_p.currency.symbol}} {{display_as_money_format(item.value)}}</td>
            <td :data-label="$t('partner_web')"><a :href="item.website" target="_blank"><p>{{item.website}}</p></a></td>
            <td :data-label="$t('partner_location')">{{item.location.address}}</td>
            <td :data-label="$t('prov_delete')">
              <button class="button is-text imgsmall" @click="delete_item(index,'flatfee')"><i class="fas fa-trash-alt" style="text-align:center;"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>{{$t("total_flatfee")}}: {{all_p.currency.symbol}} {{sumFlatfee()}}</p>
      <p>{{$t("total_count")}}: {{all_p.flatfee.length}}</p>
    </div>
    <!-- all ffp table end -->

    <!-- all pp table -->
    <div v-show="all_p.percentage.length>0" class="table-wrapper" style="overflow-x:auto;">
      <h2 class='subtitle'>{{$t("percentage_partners")}}</h2>
      <table class="table centered">
        <thead>
          <tr>
            <th>{{$t("partner_name")}}</th>
            <th style="text-align:right;">{{$t("partner_percent")}}</th>
            <th>{{$t("partner_web")}}</th>
            <th>{{$t("partner_location")}}</th>
            <th>{{$t("prov_delete")}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in all_p.percentage">
            <td :data-label="$t('partner_name')">{{item.name}}</td>
            <td class="td-align-right" :data-label="$t('partner_percent')">{{item.value}}%</td>
            <td :data-label="$t('partner_web')"><a :href="item.website" target="_blank"><p>{{item.website}}</p></a></td>
            <td :data-label="$t('partner_location')">{{item.location.address}}</td>
            <td :data-label="$t('prov_delete')"><button class="button is-text imgsmall" @click="delete_item(index,'percentage')" style="text-align:center;"><i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        </tbody>
      </table>
      <p v-show="sumPercentage()!=100" class="help is-danger">{{$t("percent100_error")}}</p>
      <p>{{$t("total_percentage")}}: {{sumPercentage()}}%</p>
      <p>{{$t("total_count")}}: {{all_p.percentage.length}}</p>
    </div>

    <!-- all pp table end -->
  </div>
</div>


</template>

<script>



import {currencies,world_currency, blockchains, urlRegEx, mailRegEx, API_ENDPOINT} from 'components/consts';



import btdropdowninfo from 'components/DropdownInfo.vue';
import axios from 'axios';

export default {

    components: {
        'bt-dropinfo' : btdropdowninfo
    },
    data () {
      return {
        current_p:{
          name : "" ,
          website: "" ,
          location : {
            address : "",
            coords : null
          } ,
          value : ""
        },
        partnerType:"Percentage",

        all_p:{
          percentage:[],
          flatfee:[],
          currency: world_currency[139],
          validLocation : false
        },
        dropD: false,
        value:null,
        options: world_currency,
        duplicatePartner : false,
        locationIsLoading : false,
        dangerInput : {
          name:false,
          website:false,
          location:false,
          value:false,
          percentage:false,
          flatfee:false,
        },
      }
    },
    mounted() {

      // this.$emit('input',this.all_p)


    },
    computed:{

    },


    methods:{
      clear_value(){
        this.current_p.value='';
      },
      get_money_input(n){
      if (n.search(',')==-1){
        return parseFloat(n);
      }
      else{
        var new_n='';
        var n_list=n.split(',');
        for (var i=0;i<n_list.length;i++){
          new_n+=n_list[i]
        }
        return parseFloat(new_n);
      }
    },
      display_as_money_format(n){
        var c = isNaN(c = Math.abs(c)) ? 2 : c;
        var d = ".";
        var t = ",";
        var s = n < 0 ? "-" : "";
        var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        // return this.all_p.currency.symbol
      },

      emit_all_p(){
        this.$emit('input',this.all_p);
      },
      validURL(){
         if(this.current_p.website){
          this.dangerInput.website = urlRegEx.test(this.current_p.website);
         } 
      },
      is_duplicate_partner(){
        var allP=[];
        var duplicated=false;
        if(this.partnerType=="Percentage"){
          allP=this.all_p.percentage;
        }
        else{
          allP=this.all_p.flatfee;
        }
        if (allP.length>0){
          allP.forEach((p) => {
             if(p.name==this.current_p.name &&
             p.website==this.current_p.website &&
             p.location.address == this.current_p.location.address ){
               duplicated=true;
             }
          });
        }
      return duplicated;
      },

      delete_item: function(i, type){
        this.all_p[type].splice(i,1);
        this.$emit('input',this.all_p);
      },

      check_and_add_item: function(){
        this.duplicatePartner=false;
        this.dangerInput.name=this.current_p.name=='';
        this.validURL();
        this.dangerInput.value=this.current_p.value=='';
        if (this.current_p.location.address === ''){
          this.add_item();
        }
        else{
           this.validateLocation(this.add_item);
        }
      },

      add_item: function(){

        if (!this.dangerInput.name && !this.dangerInput.website && !this.dangerInput.value && (!this.dangerInput.location || this.current_p.location.address =='')) {
          if (this.is_duplicate_partner()){
                this.duplicatePartner=true;
              }
          else{
                if (this.partnerType=='Percentage' && this.percentageValid()){
                    this.all_p.percentage.push(this.current_p);
                    this.$emit('input',this.all_p);
                    this.current_p = {
                      name : "" ,
                      website: "" ,
                      location : {
                        address : "",
                        coords : null
                      },
                      value : ""
                    };
                }
                else if (this.partnerType=='Flatfee' && this.feeValid()){
                    this.current_p.value=this.get_money_input(this.current_p.value);
                    this.all_p.flatfee.push(this.current_p);
                    this.$emit('input',this.all_p);
                    this.current_p=this.current_p = {
                      name : "" ,
                      website: "" ,
                      location : {
                        address : "",
                        coords : null
                      },
                      value : ""
                    };
                }

              }

        }

      },
      percentageValid(){
        var f = this.current_p.value;
        if(f){
          return this.isValidPercent(f)
        }
        return true;
      },
      feeValid(){
        var f = this.get_money_input(this.current_p.value)
        if(f){
          return this.isValidFlatfee(f)
        }
        return true
      },
      isValidPercent(n) {
        return !isNaN(parseFloat(n)) && isFinite(n) && n >0 && n <= 100;
      },
      isValidFlatfee(n) {
    		return !isNaN(parseFloat(n)) && isFinite(n) && n > 0 ;
    	},
      sumPercentage(){
        var sum=0;
        this.all_p.percentage.forEach(function(item){
          sum+=item.value;
        });
        return sum;
      },
      sumFlatfee(){
        var sum=0;
        this.all_p.flatfee.forEach(function(item){
          sum+=item.value;
        });
        return this.display_as_money_format(sum.toFixed(2));
      },

      validateLocation(callback=null) {
        this.locationIsLoading = true;

        if(this.current_p.location.address == '') {
          this.dangerInput.location = false;
        } else {

          axios.get('https://maps.googleapis.com/maps/api/geocode/json?&address=' + this.current_p.location.address + '&key=AIzaSyDKrA606IhNBh27Jn6YSF867ZgrgjScsjQ',
            {
              headers: {
              }
            }
          ).then(response=> {
            if (response.data.status=="OK"){
              var results = response.data.results;
              this.current_p.location.address = results[0].formatted_address;
              this.current_p.location.coords = results[0].geometry.location;
              this.dangerInput.location=false;
            } else {
              this.dangerInput.location=true;
            }
            this.locationIsLoading = false;
            if(callback){
              callback();
            }
          });
        }
      },

      nameEmpty() {
        if(this.current_p.name == '') {
          this.dangerInput.name = true;
        } else
          this.dangerInput.name = false;
      },

      feeEmpty() {
        if(this.current_p.value == '') {
          this.dangerInput.value = true;
        } else {
          this.dangerInput.value = false;
        }
      }
    },
  }
</script>

<style lang="css">
	.right,
	.table th.right{
		text-align: right;
	}

  select {
      -webkit-appearance: none;
      -moz-appearance: none;
      font-size: 40px;
  }
</style>
