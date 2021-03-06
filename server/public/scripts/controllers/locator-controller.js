app.controller('LocController', ['$http', '$scope', function ($http, $scope) {
    console.log('locator hears me');
    let self = this;
    
    self.alert = {
     signal: ''
    }

    self.findLocation = () => {
        console.log('in find locator location');

        success = (pos) => {
            let crd = pos.coords;
            console.log('all location info:', crd); 
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
            
        
           if (crd.latitude < target.latidude  && crd.longitude < target.longitude) {
                self.alert.signal = 'D-FACCCCC!!!!!';
            } 
            else {
                self.alert.signal = 'classroom';
            }
            console.log(self.alert);
            $scope.$apply();
        };
        
        error = (err) => {
            console.log('error in finding location: ', err);
            
        }

        target = {
            latidude: 44.978, 
            longitude: -93.2635
        }

        // options = {
        //     enableHighAccuracy: true
        // }

        navigator.geolocation.watchPosition(success, error);
    }

    self.findLocation();
}])



// current lat: 44.978169099999995
// current lng: -93.2633618