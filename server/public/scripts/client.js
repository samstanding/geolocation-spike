const app = angular.module('myApp', []);

const appController = app.controller('AppController', ['$http', function ($http) {
    console.log('what up');
    let self = this;

    self.newLocation = {};
    self.locations = {
        list: []
    };

    

    self.getLocations = () => {
        $http({
            method: 'GET',
            url:'/location',
        }).then((response) => {
            self.locations.list = response.data.rows;
        }).catch((error) => {
            console.log('error on get', error);
        })
    }
    self.getLocations();

    self.findLocation = function (location) {
        console.log('in find location');
        success = function (pos) {
            console.log('in success');
            var crd = pos.coords;

            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
            let watchArray = [];
            watchArray.push({lat: crd.latitude, long: crd.longitude, accuracy: crd.accuracy});
            console.log(watchArray);
        $http({
            method: 'POST',
            url: '/location',
            data: {
                label: location.label,
                lat: watchArray[watchArray.length-1].lat,
                long: watchArray[watchArray.length-1].long,
                accuracy:  watchArray[watchArray.length-1].accuracy
            }
        }).then((response) => {
            console.log('sent location to db');
            self.getLocations();
        }).catch((error) => {
            console.log('error on post: ', error);
        })
    }
        error = function (err) {
            console.log('error on finding location: ', err);
        }
        let geoOptions = {
            timeout: 3000,
        }

        navigator.geolocation.watchPosition(success, error, geoOptions);
    }

    self.deleteLocation = (id) => {
        $http.delete(`/location/${id}`)
        .then((response) => {
            self.getLocations();
        }).catch((error) => {
            console.log('error on delete:', error);
            
        })
    }

}])


