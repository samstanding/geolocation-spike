app.controller('MapController', [ '$http', '$scope', function ($http) {
    console.log('in the map');
    let self = this;
    self.map;

    self.initMap = function () {
        console.log('in initMap');
        
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 8, lng: -1},
            zoom: 4,
            streetViewControl: false,
        })

        
    }

  self.initMap();
        
    }])
