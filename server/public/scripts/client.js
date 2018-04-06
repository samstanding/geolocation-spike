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
        $http({
            method: 'POST',
            url: '/location',
            data: {
                label: location.label,
                lat: crd.latitude,
                long: crd.longitude,
                accuracy: crd.accuracy
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
            maximumAge: 5 * 60 * 1000,
        }

        navigator.geolocation.getCurrentPosition(success, error, geoOptions)
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


