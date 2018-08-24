
<template>
  <div class="">
  <!-- Created/synced on  -->
  <div class="card">
    <div class="card-content">
    <div class="field">
      <label class="label">Created On</label>
      <p>{{ getLocalTime()}}</p>
      </div>
    <div v-if="data.is_public" class="field">
        <label class="label">Last Synced with <span class="capitalize">{{data.blockchain}}</span> Blockchain</label>
                <p v-if="data.is_synced">{{data.sync_time}}</p>
                <p v-else>On queue to sync with Blockchain.</p>
      </div>
    </div>
  </div>
  <!-- Created/synced on end  -->

</div>
</template>

<script>

export default {
  props: ['data'],
  methods: {
    getLocalTime () {
      var utc = this.data['create_time']
      var date = new Date(utc * 1000)
      // Hours part from the timestamp

      var numDate = date.getDate()
      var month = date.getMonth()
      var year = date.getFullYear()

      var monthList = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

      var hours = date.getHours()
      var minutes = '0' + date.getMinutes()
      var ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12
      hours = hours !== 0 ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes
      var formattedTime = monthList[month] + ' ' + numDate + ', ' + year + ', ' + hours + ':' + minutes.substr(-2) + ' ' + ampm
      return formattedTime
    }

  }

}

</script>
