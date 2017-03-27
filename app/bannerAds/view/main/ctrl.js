function ctrl($stateParams, AdvertisementService) {
  var vm = this;
  var banner_id = $stateParams.id;

  //getting data
  getBannerData(vm, banner_id, AdvertisementService);

}
module.exports = ['$stateParams', 'AdvertisementService', ctrl];

function getBannerData(vm, banner_id, AdvertisementService) {

  var formData = new FormData();
  var data_banner = {
    "id": banner_id
  };
  for (var key in data_banner) {
    formData.append('banner_ads[' + key + ']', data_banner[key]);
  }
  AdvertisementService.getAdvertisementData(banner_id, formData).then(function (response) {
    vm.content = response.banner_ads.content;
    if (vm.content != vm.oldcontent) {
      vm.oldcontent = response.banner_ads.content;
    }
    vm.position = response.banner_ads.position;
    vm.name = response.banner_ads.name;
    vm.center_web_link = response.banner_ads.center_web_link;

  }).catch(function (err) {
    console.log('error: ' + err);
  });
}