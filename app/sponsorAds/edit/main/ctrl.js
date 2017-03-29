function ctrl($stateParams, SponsorService) {
  var vm = this;
  var sponsorID = $stateParams.id;
  vm.success_msg = 0;
  vm.submit = function () {
    var formData = new FormData();
    var sponsorData = {
      'id': sponsorID,
      'title': vm.title,
      'name': vm.name,
      'image': vm.image,
      'description': vm.description,
      'website': vm.website,
      'sponsored_listing_layout_ids': [vm.sponsored_listing_layout_ids]
    };
    for (var key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsor(formData, sponsorID).then(function () {
      vm.success_msg = 1;
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);
    }).catch(function (err) {
      throw err;
    });
  };
  // getting data
  editSponsor(vm, sponsorID, SponsorService);
}
module.exports = ['$stateParams', 'SponsorService', ctrl];

function editSponsor(vm, sponsorID, SponsorService) {
  var formData = new FormData();
  var sponsorData = {
    'id': sponsorID
  };
  for (var key in sponsorData) {
    formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
  }
  SponsorService.editSponsor(formData, sponsorID).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content !== vm.oldcontent) {
      vm.oldcontent = response.banner_ads.content;
    }
    vm.title = response.banner_ads.title;
    vm.name = response.banner_ads.name;
    vm.website = response.banner_ads.website;
    vm.image = response.banner_ads.image;
    vm.description = response.banner_ads.description;
    vm.payment_amount = response.banner_ads.payment_amount;

    var ids = [];
    var i = 0;
    for (key in response.banner_ads.sponsored_pages) {
      ids[i] = String(response.banner_ads.sponsored_pages[key].id);
      i++;
    }
    vm.sponsored_listing_layout_ids = ids;

    SponsorService.getSponsoredSelect().then(function (responseSponsor) {
      vm.sponsored_ad_select_normal = responseSponsor.normal;
      vm.sponsored_ad_select_state = responseSponsor.state;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }).catch(function (err) {
    throw err;
  });
}
