<template lang="html">
<div>
<div class="is-centered" style="text-align:center;"><p class="is-title">{{$t('blockchain_text')}}</p></div>
    <div class="columns is-centered is-vcentered is-mobile" style="margin-top:10px">

        <label style="margin-bottom:0px;" class="label">{{$t("blockchain")}}
            <bt-dropinfo :values="[$t('blockchainhelp1'),$t('blockchainhelp2'),$t('blockchainhelp3')]" :islong=true></bt-dropinfo>
        </label>
        <div class="field">
            <div class="control">
                <bt-drop :options="bcOptions"  v-model="all_finalize.blockchain" @change="emitData"></bt-drop>
            </div>
          </div>
        </div>

        <div class="columns is-centered is-vcentered is-mobile" style="margin-top:10px">

            <div class="field">
                <div class="control">
                    <label class="checkbox">
                    <input type="checkbox" v-model="all_finalize.isAgreeTerms" @change="emitData">
                    {{$t("iagree")}}
                    </label>
                    <a v-on:click.stop="toggleTerms">{{$t("termsncond")}}</a>
                </div>
            </div>
            <bt-terms @close-modal="toggleTerms" @accept-terms="acceptTerms" v-if="termsToggle"></bt-terms>

        </div>

</div>

</template>

<script>
import modal from 'components/Modal.vue'
import {currencies, blockchains_info, urlRegEx, mailRegEx, API_ENDPOINT} from 'components/consts'
import btdropdown from 'components/Dropdown.vue'
import btdropdowninfo from 'components/DropdownInfo.vue'

  export default {
        components: {
            'bt-terms'  : modal,
            'bt-drop'   : btdropdown,
            'bt-dropinfo' : btdropdowninfo
        },
        mounted(){
          this.emitData();
        },
        data () {
            return {
                termsToggle: false,
                bcOptions: blockchains_info,
                all_finalize : {
                    isAgreeTerms : true,
                    blockchain: blockchains_info[0],
                }
            }
        },

        computed:{

        },

        methods:{
            toggleTerms () {
                this.termsToggle = !this.termsToggle;
                this.$emit('input', this.all_finalize);
            },

            acceptTerms () {
                this.all_finalize.isAgreeTerms = true;
                this.termsToggle = false;
                this.$emit('input', this.all_finalize);
            },

            emitData() {
                this.$emit('input', this.all_finalize);
            }
        }
    }
</script>

<style lang="css">
	.right,
	.table th.right{
		text-align: right;
	}
</style>
