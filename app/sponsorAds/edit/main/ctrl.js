function ctrl($stateParams, SponsorService) {
  var vm = this;
  var sponsor_id = $stateParams.id;
  vm.success_msg = 0;
  vm.submit = function () {
      var formData = new FormData();
      var data_sponsor = {
        "id": sponsor_id,
        'title': vm.title,
        'name': vm.name,
        'image': vm.image,
        'description': vm.description,
        'website': vm.website,
        'sponsored_listing_layout_ids': [vm.sponsored_listing_layout_ids]
      };
      for (var key in data_sponsor) {
        formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
      }
      SponsorService.editSponsor(formData, sponsor_id).then(function () {
        vm.success_msg = 1;
        setTimeout(function () {
          vm.success_msg = 0;
        }, 3000);

      }).catch(function (err) {
        console.log(err.message);
      });
    }
    //getting data
  editSponsor(vm, sponsor_id, SponsorService);

}
module.exports = ['$stateParams', 'SponsorService', ctrl];

function editSponsor(vm, sponsor_id, SponsorService) {
  var formData = new FormData();
  var data_sponsor = {
    "id": sponsor_id
  };
  for (var key in data_sponsor) {
    formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
  }
  SponsorService.editSponsor(formData, sponsor_id).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content != vm.oldcontent) {
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
    var count;
    count = response.banner_ads.sponsored_pages.length;
    for (var key in response.banner_ads.sponsored_pages) {
      ids[i] = String(response.banner_ads.sponsored_pages[key].id);
      i++;
    }
    vm.sponsored_listing_layout_ids = ids;

    SponsorService.getSponsoredSelect().then(function (response) {
      vm.sponsored_ad_select_normal = response.normal;
      vm.sponsored_ad_select_state = response.state;

    }).catch(function (err) {
      console.log('error: ' + err);
    });
  }).catch(function (err) {
    console.log('error: ' + err);
  });
}