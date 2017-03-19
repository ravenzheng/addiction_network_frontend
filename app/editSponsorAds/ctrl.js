function ctrl($routeParams, service) {
    var id = $routeParams.id;
    var title = $routeParams.title;
    var name = $routeParams.name;
    var description = $routeParams.description;
    var website = $routeParams.website;
    var vm = this;
    vm.catg = '';
    vm.onCatgUpdate = function(selected) {
        vm.catg = selected;
    };
    vm.title = title;
    vm.oldimage = [];
    var auth = '';

    function loadList() {
        service.getAuthtoken().then(function(response) {
            auth = response.user.auth_token;
            get_data();
        }).catch(function(err) {
            console.log('error: ' + err);
        });
    }
    loadList();

    function get_data() {
        var formData = new FormData();
        var data_sponsor = {
            "title": vm.title
        };
        for (var key in data_sponsor) {
            formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
        }
        service.getSponsorData(id, auth, formData).then(function(response) {
            vm.image = response.banner_ads.image;
            if (vm.image != vm.oldimage) {
                vm.oldimage = response.banner_ads.image;
            }
            vm.name = response.banner_ads.name;
            vm.description = response.banner_ads.description;
            vm.website = response.banner_ads.website;
        }).catch(function(err) {
            console.log('error: ' + err);
        });
    }

    vm.success_msg = 0;
    vm.submit = function() {
        service.getAuthtoken().then(function(response) {
            auth = response.user.auth_token;
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
        service.editSponsor(formData, auth, id).then(function(response) {
            vm.success_msg = 1;
            get_data();

        }).catch(function(err) {
            console.log('errorr: ' + err);
            for (var d = 0, len = err.length; d < len; d += 1) {
                if (mycli[d].id === myid) {
                    console.log('er: ' + err[d]);
                }
            }
        });
        }).catch(function(err) {
            console.log('error: ' + err);
        });
        
    }
}
module.exports = ['$routeParams', 'editSponsorAdsService', ctrl];
