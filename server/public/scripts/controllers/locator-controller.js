app.controller('LocController', ['$http', function ($http) {
    console.log('locator hears me');
    let self = this;

    let string;
    

    self.findLocation = () => {
        console.log('in find location');

        success = (pos) => {
            let crd = pos.coords;
            console.log('all location info:', crd); 
            console.log('your current position is: ');
            console.log(`Latitude: ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`more or less ${crd.accuracy} meters`);
            if (crd.latitude < target.latidude  && crd.longitude > target.longitude) {
                string = 'D-FACCCCC!!!!!';
                navigator.geolocation.clearWatch(id)
            }

        }
        
        error = (err) => {
            console.log('error in finding location: ', err);
            
        }

        target = {
            latidude: 44.978, 
            longitude: -93.2635
        }

        options = {
            enableHighAccuracy: true
        }

        navigator.geolocation.watchPosition(success, error, options);
    }

    self.findLocation();
}])



// current lat: 44.978169099999995
// current lng: -93.2633618