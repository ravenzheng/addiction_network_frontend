function ctrl($scope, $routeParams, service) {
    var id = $routeParams.id;
    var title = $routeParams.title;
    var name = $routeParams.name;
    var description = $routeParams.description;
    var website = $routeParams.website;
    var vm = this;
    vm.title = title;
    vm.name = name;
    vm.description = description;
    vm.website = website;
    var auth = '';
    service.getAuthtoken().then(function(response) {
        auth = response.user.auth_token;
    }).catch(function(err) {
        alert(err);
    });
    vm.success_msg = 0;
    vm.submit = function() {
        var formData = new FormData();
        var data_sponsor = {
            "title": vm.title,
            "name": vm.name,
            "image": vm.image,
            "description": vm.description,
            "website": vm.website,
            "payment_amount": "0",
            "Sponsored_listing_layout_ids": ""

        };
        for (var key in data_sponsor) {
            formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
        }
        service.sponsorEdit(formData, auth, id).then(function(response) {
            vm.success_msg = 1;

        }).catch(function(err) {
            alert(err);
        });

    }

}

module.exports = ['$scope', '$routeParams', 'editSponsorAdsService', ctrl];