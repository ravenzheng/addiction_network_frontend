function ctrl($stateParams, SponsorService) {
  var vm = this;
  var sponsor_id = $stateParams.id;

  //getting data
  getSponsorData(vm, sponsor_id, SponsorService);

}
module.exports = ['$stateParams', 'SponsorService', ctrl];

function getSponsorData(vm, sponser_id, SponsorService) {
  var formData = new FormData();
  var data_sponsor = {
    "id": sponser_id
  };
  for (var key in data_sponsor) {
    formData.append('sponsored_ad[' + key + ']', data_sponsor[key]);
  }
  SponsorService.editSponsor(formData,sponser_id).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content != vm.oldcontent) {
      vm.oldcontent = response.banner_ads.content;
    }
    vm.title = response.banner_ads.title;
    vm.name = response.banner_ads.name;
    vm.website = response.banner_ads.website;
    vm.image = response.banner_ads.image;
    vm.description = response.banner_ads.description;

  }).catch(function (err) {
    console.log('error: ' + err);
  });
}
