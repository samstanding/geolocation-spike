app.controller('MapController', ['LocationService', '$scope', function (LocationService, $scope) {
    let self = this;

    self.getLocations = LocationService.getLocations;
    self.getLocations();
    self.locations = LocationService.locations;

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';


    self.findLocation = () => {
        console.log('in find location map');
        success = (pos) => {
            let crd = pos.coords;
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);

           
        let personMarker = new google.maps.Marker({
                position: new google.maps.LatLng(crd.latitude, crd.longitude),
                map: self.map,
                icon: '../../maps_marker.png',
            })
        $scope.$apply();
    }
    error = (err) => {
        console.log('error in finding location: ', err);
    }
    // options = {
    //     enableHighAccuracy: true
    // }
    navigator.geolocation.watchPosition(success, error);
}
self.findLocation();

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

    for (let i = 0; i < self.locations.list.length; i++) {


        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(self.locations.list[i].latitude, self.locations.list[i].longitude),
            map: self.map,
            title: self.locations.list[i].location_name,
        })

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                self.infowindow.setContent(self.locations.list[i].location_name);
                self.infowindow.open(self.map, marker);
            }
        })(marker, i));

    }



}

self.initMap();

}])