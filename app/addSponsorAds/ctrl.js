function ctrl($scope, service) {
    var vm = this;
    vm.success_msg = 0;
    vm.submit = function() {
        var formData = new FormData();
        var data_sponsor = {
            'title': vm.title,
            'name': vm.name,
            'image': vm.image,
            'description': vm.description,
            'website': vm.website,
            'Sponsored_listing_layout_ids': vm.Sponsored_listing_layout_ids

        };
        for (var key in data_sponsor) {
            formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
        }
        var auth = '';
        service.getAuthtoken().then(function(response) {
            auth = response;
            service.sponsorAdd(formData, auth).then(function(response) {
                vm.success_msg = 1;
                setTimeout(function() {
                    vm.success_msg = 0;
                }, 3000);

            }).catch(function(err) {
                console.log('error: ' + err);
            });
        }).catch(function(err) {
            alert(err);
        });
    }
}

module.exports = ['$scope', 'addSponsorAdsService', ctrl];