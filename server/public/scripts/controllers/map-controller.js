app.controller('MapController', ['LocationService', '$scope', function (LocationService, $scope) {
    let self = this;

    self.getLocations = LocationService.getLocations;
    self.getLocations();
    self.locations = LocationService.locations;

    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

    let markerStore = {marker: null};

    navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
        var lastCheckedPosition,
            locationEventCount = 0,
            watchID,
            timerID;
    
        options = options || {};
    
        var checkLocation = function (position) {
            lastCheckedPosition = position;
            locationEventCount = locationEventCount + 1;
            // We ignore the first event unless it's the only one received because some devices seem to send a cached
            // location even when maxaimumAge is set to zero
            if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
                clearTimeout(timerID);
                navigator.geolocation.clearWatch(watchID);
                foundPosition(position);
            } else {
                geoprogress(position);
            }
        };
    
        var stopTrying = function () {
            navigator.geolocation.clearWatch(watchID);
            foundPosition(lastCheckedPosition);
        };
    
        var onError = function (error) {
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            geolocationError(error);
        };
    
        var foundPosition = function (position) {
            geolocationSuccess(position);
        };
    
        if (!options.maxWait)            options.maxWait = 120000; // Default 10 seconds
        if (!options.desiredAccuracy)    options.desiredAccuracy = 45; // Default 20 meters
        if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait
    
        options.maximumAge = 0; // Force current locations only
        options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)
    
        watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
        timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
    };

    self.findLocation = () => {
        console.log('in find location map');
        success = (pos) => {
            let crd = pos.coords;
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);

            
            console.log(markerStore);
            
        if (markerStore.marker !== null) {
            markerStore.marker.setPosition(new google.maps.LatLng(crd.latitude, crd.longitude));
        } 
         else {
            let personMarker = new google.maps.Marker({
                position: new google.maps.LatLng(crd.latitude, crd.longitude),
                map: self.map,
                icon:image,
            })
            console.log(personMarker);
            markerStore.marker = personMarker;
        }
        $scope.$apply();
    }
    error = (err) => {
        console.log('error in finding location: ', err);
    }

    geoprogress = () => console.log('locating in progress');
    

    options = {
        enableHighAccuracy: true,
        accuracy: 45,
        maxWait: 1500000
    }
    navigator.geolocation.getAccurateCurrentPosition(success, error, geoprogress,options);
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