function ctrl(SponsorService) {
  var vm = this;
  vm.success_msg = 0;
  SponsorService.getSponsoredSelect().then(function (response) {
    vm.sponsored_ad_select_normal = response.normal;
    vm.sponsored_ad_select_state = response.normal;
  }).catch(function (err) {
    throw err;
  });
  vm.submit = function () {
    var formData = new FormData();
    var sponsorData = {
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
    SponsorService.sponsorAdd(formData).then(function () {
      vm.success_msg = 1;
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);

    }).catch(function (err) {
      throw err;
    });
  }

}

module.exports = ['SponsorService', ctrl];
