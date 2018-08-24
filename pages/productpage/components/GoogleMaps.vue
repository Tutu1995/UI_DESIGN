
<template lang="html">
  <div id="map" style="height: 480px;"></div>
</template>

<script>
export default {
  name: 'GoogleMaps',
  data () {
    return {
    }
  },
  props: ['data'],
  mounted () {
    // eslint-disable-next-line
    google.maps.event.addDomListener(window, 'load', this.initialize())
  },
  methods: {
    // scale is max |x| |y| in coordinate system to draw diagonalHatch
    constructDiagonalHatchSVGPath (scale, step) {
      // M20,-20 l-40,40
      // digonal
      // var path='M'+scale+','+(-scale)+' l'+(-scale*2)+','+scale*2+' ';
      var path = ''
      // lower right
      for (var i = -scale; i < scale; i += step) {
        // M20,0 l-20,20
        // M20,10 l-10,10
        // M20,-11 l-(20--11),20--11
        path += ' M' + scale + ',' + i +
              ' l' + (-(scale - i)) + ',' + (scale - i)
      }
      // upper left
      for (var j = scale - step; j > -scale; j -= step) {
        // M20,0 l-20,20
        // M20,10 l-10,10
        // M20,-11 l-(20--11),20--11
        path += ' M' + j + ',' + (-scale) +
              ' l' + (-(scale + j)) + ',' + (scale + j)
      }
      return path
    },
    generate_markers (type) {
      // this kind of structure will get rid of a lot of painful loops when determining duplicate locations
      var markers = {
        address: [],
        markers: []
      }
      this.data[type].forEach(function (item) {
        if (item['location']['address'] !== '' && item['location']['address'] !== null) {
          var infoWindow
          if (type === 'percentage_partnerships') {
            infoWindow = '<tr><td>' + item['name'] + '</td><td>' + item['value'] + '%' + '</td>'
          } else {
            infoWindow = '<tr><td>' + item['name'] + '</td><td>$' + item['value'] + '</td>'
          }
          if (markers.address.includes(item['location']['address'])) {
            var index = markers.address.indexOf(item['location']['address'])
            markers.markers[index]['infoWindow'] += infoWindow
            markers.markers[index].count++
          } else {
            markers['address'].push(item['location']['address'])
            markers['markers'].push({
              coords: item['location']['coords'],
              infoWindow: '<p>' + item['location']['address'] + "</p><table class='table' style='margin:0;'>" +
                          infoWindow,
              color: item['color'],
              type: type,
              count: 1
            })
          }
        }
      })
      return markers
    },
    initialize () {
      if (this.data['percentage_partnerships'].length > 0 || this.data['flatfees_partnerships'].length > 0) {
        // Initialize and add the map
        // eslint-disable-next-line
        var map = new google.maps.Map(document.getElementById('map'))
        // eslint-disable-next-line
        var bounds  = new google.maps.LatLngBounds()
        // Partnership
        var markers = this.generate_markers('percentage_partnerships')
        var ffMarkers = this.generate_markers('flatfees_partnerships')
        markers.address = markers.address.concat(ffMarkers.address)
        markers.markers = markers.markers.concat(ffMarkers.markers)

        for (var i = 0; i < markers.markers.length; i++) {
          var item = markers.markers[i]
          item.infoWindow += '</table>'
          if (item.type === 'percentage_partnerships') {
            // eslint-disable-next-line
            var marker = new google.maps.Marker({
              position: item['coords'],
              map: map,
              icon: {
                path: 'M-20,0 a20,20 0 1,0 40, 0a20,20 0 1,0 -40,0',
                fillColor: item['color'],
                fillOpacity: 0.8,
                strokeWeight: 0,
                scale: 1
              }
            })
          } else {
            // eslint-disable-next-line
            var marker = new google.maps.Marker({
              position: item['coords'],
              map: map,
              icon: {
                path: this.constructDiagonalHatchSVGPath(12, 4),
                fillColor: 'none',
                strokeWeight: 1.5,
                strokeColor: '#6D6C6C',
                strokeOpacity: 0.8,
                scale: 1
              }
            })
          }
          // eslint-disable-next-line
          bounds.extend(new google.maps.LatLng(marker.position.lat(), marker.position.lng()))
          // eslint-disable-next-line
          var infoWindow = new google.maps.InfoWindow()
          // eslint-disable-next-line
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infoWindow.setContent(markers.markers[i]['infoWindow'])
              infoWindow.open(map, marker)
            }
          })(marker, i))
        }
        // Center the map
        map.fitBounds(bounds)
        map.panToBounds(bounds)
      }
    }
  }
}
</script>
