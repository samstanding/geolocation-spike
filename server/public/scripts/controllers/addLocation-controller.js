app.controller('AppController', [ 'LocationService', function ( LocationService) {
    console.log('what up');
    let self = this;

    self.newLocation = {};
    self.locations = LocationService.locations;

    self.getLocations = LocationService.getLocations;
   
    self.getLocations();

    self.findLocation = LocationService.findLocation;

    self.deleteLocation = LocationService.deleteLocation;

}])


