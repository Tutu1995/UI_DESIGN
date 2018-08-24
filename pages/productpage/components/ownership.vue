
<template>
      <!-- Box: Ownership info & map -->
      <div v-if="data.flatfees_partnerships.length>0||data.percentage_partnerships.length>0" class="card">
        <div class="card-content">
        <h4 class="title is-4 has-text-centered">Ownership</h4>
        <div class="level">
          <div class="level-item">
          <!-- rectangle svg -->
            <svg width="300" height="70" version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink">
              <pattern id="diagonalHatch" patternUnits="userSpaceOnUse" width="4" height="4">
                <path d="M-1,1 l2,-2
                        M0,4 l4,-4
                        M3,5 l2,-2"
                      style="stroke:black; stroke-width:0.2" />
              </pattern>
              <rect x="0" y="0" width="300" height="50" fill="#f3f3f2"></rect>

                <text id="currency_symbol" class="title is-5" :x="currency_symbol_position_x" y="33">{{data.currency_symbol}}</text>

                <!-- <image :xlink:href="'/assets/img/crypto/' + 'btc' + '.svg'" x="7.5" y="7.5" height="35px" width="35px"/> -->

              <rect v-for="(v, index) in svgData.starts" :x="svgData.starts[index]" y="0"
              :width="svgData.widths[index]" height="50" :fill="svgData.colors[index]"/>

              <text x="225" y="65" font-family="Verdana" font-size="14" font-weight="500">
              estb. {{estb_year()}}
              </text>
            </svg>
            </div>
           </div>
          <!-- rectangle svg end -->
          <!-- Integrated table -->

              <table class="table">
                <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Ownership</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="row in data.flatfees_partnerships">
                      <td class="td-svg">
                        <svg height="40" width="40"><rect height="40" width="40" viewBox="-1.2 -1.2 2.4 2.4"
                          fill="url(#diagonalHatch)"/></svg>
                      </td>
                      <td>
                        <a v-if="row.website" v-bind:href="row.website" target="_blank">{{row.name}}
                          <i style="height:12px;" class="fas fa-external-link-alt"></i></a>
                        <p v-else>{{row.name}}</p>
                        <p class="help">
                          <i v-if="row.location.address" class="fas fa-map-marker-alt"></i> {{row.location.address}}</p>
                      </td>
                      <td class="td-data">
                        <p>${{ display_as_money_format(row.value) }}</p>

                       <p class="help">Flat Fee</p></td>
                    </tr>

                    <tr v-for="row in data.percentage_partnerships">
                    <td class="td-svg">
                          <svg height="50" width="50" viewBox="-1.2 -1.2 2.4 2.4" style="transform: rotate(-90deg)"
                              v-bind:fill="row.color">
                          <path v-bind:d="get_d(row.value)"/>
                          <circle  r="1" fill=none v-bind:stroke="row.color" stroke-width=0.1 />
                          </svg>
                      </td>
                      <td>
                        <a v-if="row.website" v-bind:href="row.website" target="_blank">{{row.name}}
                          <i style="height:12px;" class="fas fa-external-link-alt"></i></a>
                        <p v-else>{{row.name}}</p>
                        <p class="help">
                          <i v-if="row.location.address" class="fas fa-map-marker-alt"></i> {{row.location.address}}</p>
                      </td>
                      <td class="td-data">{{row.value}}%</td>
                    </tr>

                  </tbody>
                </table>

                <!-- Integrated table end-->
          <!-- Map -->

          <GoogleMaps :data="data"></GoogleMaps>
          <!-- Map end -->
        </div>
      </div>

</template>

<script>
import GoogleMaps from './GoogleMaps.vue'

export default {
  components: {
    'GoogleMaps': GoogleMaps
  },
  data () {
    return { // eslint-disable-next-line
      svgData: {},
      currency_symbol_position_x: 0
    }
  },
  mounted () {
    this.svgData = this.svgRects()
    this.set_currency_symbol_position()
  },
  props: ['data'],
  methods: {
    svgRects () {
      var startsAt = 50
      var widthRem = 250
      var widthFf = 0
      var starts = []
      var widths = []
      var colors = []
      var itr = 0
      if (this.data['flatfees_partnerships'].length > 0) {
        itr = 1
        widthFf = 25
        starts.push(startsAt)
        widths.push(widthFf)
        colors.push('url(#diagonalHatch)')
        widthRem -= widthFf
      }
      for (var i = 0; i < this.data['percentage_partnerships'].length; i++) {
        if (itr === 0) {
          starts.push(startsAt)
        } else {
          starts.push(starts[itr - 1] + widths[itr - 1])
        }
        widths.push(widthRem * (this.data['percentage_partnerships'][i].value / 100))
        colors.push(this.data['percentage_partnerships'][i].color)
        itr++
      }

      return {
        starts: starts,
        widths: widths,
        colors: colors
      }
    },
    set_currency_symbol_position () {
      // use fixed width.
      // get the width of the symbol. if 1 have a fixed starting point, if 2 have a differnt
      switch (this.data['currency_symbol'].length) {
        case 1:
          this.currency_symbol_position_x = 19
          break
        case 2:
          this.currency_symbol_position_x = 12
          break
        default:
          this.currency_symbol_position_x = 7
      }
    },
    estb_year () {
      var date = new Date(this.data['create_time'] * 1000)
      return date.getFullYear()
    },

    get_d (percent) {
      const majorArc = percent > 50 ? 1 : 0
      return 'M 1,0 A 1 1 0 ' + majorArc + ' ' + 1 + ' ' + Math.cos(2 * Math.PI * percent / 100) +
              ' ' + Math.sin(2 * Math.PI * percent / 100) + ' L 0 0'
    },

    display_as_money_format (n) {
      var c = 2
      var d = '.'
      var t = ','
      var s = n < 0 ? '-' : ''
      var i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
      var j = i.length
      j = j > 3 ? j % 3 : 0
      return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '')
    }
  }

}

</script>
