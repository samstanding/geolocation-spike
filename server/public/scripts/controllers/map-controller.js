app.controller('MapController', [ '$http', '$scope', function ($http) {
    console.log('in the map');
    let self = this;
    self.map;
    self.marker;

    self.initMap = function () {
        console.log('in initMap');

        let myLatLng={lat: 44.978114, lng: -93.2633618};
        
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 44.978, lng: -93.263},
            zoom: 12,
            streetViewControl: false,
        })

        self.marker = new google.maps.Marker({
            position: myLatLng,
            map: self.map,
            title: 'me!'
        })
        console.log(self.marker);
        console.log(myLatLng);
        
        
    }

  self.initMap();
        
    }])
