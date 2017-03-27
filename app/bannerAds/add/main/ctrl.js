function ctrl(AdvertisementService) {
  var vm = this;
  vm.success_msg = 0;
  vm.submit = function () {
    var formData = new FormData();
    var data_banner = {
      'position': vm.position,
      'name': vm.name,
      'content': vm.content,
      'center_web_link': vm.center_web_link
    };
    for (var key in data_banner) {
      formData.append('banner_ads[' + key + ']', data_banner[key]);
    }
    AdvertisementService.advertisementAdd(formData).then(function (response) {
      vm.success_msg = 1;
      setTimeout(function () {
        vm.success_msg = 0;
      }, 3000);

    }).catch(function (err) {
      console.log(err.message);
    });
  }

}

module.exports = ['AdvertisementService', ctrl];