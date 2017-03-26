function ctrl(AdvertisementService) {
      
  var list = this; 
    function list_banners() {
        AdvertisementService.advertisementList().then(function(response) {
            list.advertisement = response;            
        }).catch(function(err) {
            console.log('error: ' + err.data.errors);
        });
    }
    list_banners();
    
    list.actDect = function(id) {        
        console.clear();        
        AdvertisementService.updateStatus(id).then(function(response) {            
            
            if (response.active) {            
                list.active=response.active;
                $('#status-'+id).html("Deactivate");
            } else {               
                list.active=response.active;
                $('#status-'+id).html("Activate");
            }
          
        }).catch(function(err) {
            console.log('error: ' + err);
        });
    }  
    
}

module.exports = ['AdvertisementService', ctrl];
