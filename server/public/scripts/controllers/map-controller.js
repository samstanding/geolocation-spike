app.controller('MapController', ['LocationService', '$scope', function ( LocationService, $scope) {
    let self = this;
    self.map;
    self.marker;

   
    self.getLocations = LocationService.getLocations;
    self.getLocations();
    self.locations = LocationService.locations;

    
    

    self.initMap = function () {
        console.log('in initMap');

        let myLatLng = {
            lat: 44.978114,
            lng: -93.2633618
        };

        self.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 44.978,
                lng: -93.263
            },
            zoom: 18,
            streetViewControl: false,
        })

        self.infowindow = new google.maps.InfoWindow();

        for (let i =0; i <self.locations.list.length; i ++) {
            console.log(self.locations.list[i]);
            
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(self.locations.list[i].latitude, self.locations.list[i].longitude),
                map: self.map,
                title: self.locations.list[i].location_name,
            })

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    self.infowindow.setContent(self.locations.list[i].location_name);
                    self.infowindow.open(self.map, marker );
                }
            }) (marker, i));

            
        }
        
        }

    self.initMap();

}])