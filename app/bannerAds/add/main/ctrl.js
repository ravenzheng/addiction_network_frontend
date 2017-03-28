function ctrl(AdvertisementService) {
  var vm = this;
  vm.success_msg = 0;
  vm.submit = function () {
    var formData = new FormData();
    var bannerData = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': vm.center_web_link
    };
    for (var key in bannerData) {
      formData.append('banner_ads[' + key + ']', bannerData[key]);
    }
    AdvertisementService.advertisementAdd(formData).then(function () {
      vm.success_msg = 1;
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);

    }).catch(function (err) {
      throw err;
    });
  }

}

module.exports = ['AdvertisementService', ctrl];
