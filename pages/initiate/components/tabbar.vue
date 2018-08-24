<template lang="html">

    <!-- Form Navigation-->
    <div class="column" >
        <div class="tabs is-centered">
            <ul style="border-bottom:none;">
                <li v-for="tab in tabs"  :class="{'is-active' : tab.isActive}" >
                    <a @click="switchTab(tab)">
                        <span v-text="tab.Name"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
      	components: {

    },

    data () {
      return {
        loading: false,
        tabs: [
            {id:1, Name: "Basic Info", isActive:true},
            {id:2, Name: "Product Info", isActive:false},
            {id:3, Name: "Provenance", isActive:false},
            {id:4, Name: "Finalize", isActive:false}
        ]
      }
    },
    computed:{

    },

    methods:{
        switchTab(tab) {
           tab.isActive = true;
           this.tabs.forEach(tab2 => {
               if(tab2.id != tab.id) {
                   tab2.isActive = false;
               }
           });
           this.$emit('change-cur-tab', tab.id);
       }
    },
  }
</script>
