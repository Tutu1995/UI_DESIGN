
<template>
  <div class="card">
    <div class="card-content">
      <div class="has-text-centered" style="margin-bottom:10px;">
        <div class="" style="margin-bottom:25px;">
          <img v-if="data.logo" class="centered image" :src="data.logo" style="height:128px;" alt="" v-show="data.logo != null"/>
          <h3 class="title is-3" style="margin-bottom:0;">{{data.name}}</h3>
          <a class="help" v-if="data.website" v-bind:href="data.website" target="_blank">{{ delete_http(data.website) }}</a>
          <p class="help" v-if="data.location != null && data.location != ''">
            <i class="fas fa-map-marker-alt"></i>
            {{data.location}}
          </p>
        </div>
          <p v-html="data.description" style="width:90%;margin:auto;text-align:justify;"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['delete_http', 'data'],
  methods: {

  }
}

</script>
