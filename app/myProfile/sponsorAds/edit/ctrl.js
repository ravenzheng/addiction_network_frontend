function ctrl($scope, $stateParams, $rootScope, $document, Status, SponsorService, TreatmentService) {
  var vm = this;
  vm.multiselectModelLayoutIds = [];
  vm.multiselectModelSettings = {
    scrollableHeight: '250px',
    showCheckAll: false,
    showUncheckAll: false,
    scrollable: true,
    enableSearch: true,
    checkBoxes: true
  };
  var sponsorID = $stateParams.id;
  vm.sponsoredAdNormalModel = [];
  vm.sponsoredAdStateModel = [];
  vm.sponsoredAdCountyModel = [];
  vm.sponsoredAdCityModel = [];

  vm.submit = function () {
    var sponsoredListingIds = [];
    var id = '';
    var i = 0;
    for (var key in vm.sponsoredAdNormalModel) {
      id = String(vm.sponsoredAdNormalModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdStateModel) {
      id = String(vm.sponsoredAdStateModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdCountyModel) {
      id = String(vm.sponsoredAdCountyModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }

    for (key in vm.sponsoredAdCityModel) {
      id = String(vm.sponsoredAdCityModel[key].id);
      sponsoredListingIds[i] = id;
      i++;
    }
    var formData = new FormData();
    var sponsorData = {
      'sponsored_listing_layout_ids': sponsoredListingIds
    };
    for (key in sponsorData) {
      formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
    }
    SponsorService.editSponsor(formData, sponsorID).then(function () {
      $rootScope.$emit(Status.SUCCEEDED, Status.SPONSOR_EDIT_SUCCEESS_MSG);
    }).catch(function (err) {
      $rootScope.$emit(Status.FAILED, Status.FAILURE_MSG);
      throw err;
    });
  };
  // getting data
  editSponsor(vm, sponsorID, SponsorService, TreatmentService);
}
module.exports = ['$scope', '$stateParams', '$rootScope', '$document', 'Status', 'SponsorService', 'TreatmentCenterService', ctrl];

function editSponsor(vm, sponsorID, SponsorService, TreatmentService) {
  var formData = new FormData();
  var sponsorData = {
    'id': sponsorID
  };
  for (var key in sponsorData) {
    formData.append('sponsored_ad[' + key + ']', sponsorData[key]);
  }

  SponsorService.editSponsor(formData, sponsorID).then(function (response) {
    // console.log(response.sponsored_ad);
    var ids = [];
    var i = 0;
    // var count = response.banner_ads.sponsored_pages.length;
    for (key in response.banner_ads.sponsored_pages) {
      ids[i] = {
        'id': response.banner_ads.sponsored_pages[key].id
      };
      i++;
    }
    vm.sponsored_listing_layout_ids = ids;
    vm.multiselectModelLayoutIds = ids;
  }).catch(function (err) {
    vm.error_message = err;
  });

  TreatmentService.queryDetail(sponsorID).then(function (result) {
    for (key in result) {
      vm[key] = result[key];
    }

    // vm.multiselectModelLayoutIds = ids;

    SponsorService.getSponsoredSelect().then(function (responseSponsor) {
      // generating data for multiselect
      var modifiedAdSelectDataNormal = [];
      var modifiedAdSelectDataState = [];
      var modifiedAdSelectDataCounty = [];
      var modifiedAdSelectDataCity = [];
      var i = 0;
      for (key in responseSponsor.normal) {
        // console.log(responseSponsor.normal[key].name);
        modifiedAdSelectDataNormal[i] = {
          id: responseSponsor.normal[key].id,
          label: responseSponsor.normal[key].name
        };
        i++;
      }

      i = 0;
      for (key in responseSponsor.state) {
        modifiedAdSelectDataState[i] = {
          id: responseSponsor.state[key].id,
          label: responseSponsor.state[key].name
        };
        i++;
      }

      i = 0;
      for (key in responseSponsor.county) {
        modifiedAdSelectDataCounty[i] = {
          id: responseSponsor.county[key].id,
          label: responseSponsor.county[key].name
        };
        i++;
      }

      i = 0;
      for (key in responseSponsor.city) {
        modifiedAdSelectDataCity[i] = {
          id: responseSponsor.city[key].id,
          label: responseSponsor.city[key].name
        };
        i++;
      }

      vm.sponsoredAdNormal = modifiedAdSelectDataNormal;
      vm.sponsoredAdState = modifiedAdSelectDataState;
      vm.sponsoredAdCounty = modifiedAdSelectDataCounty;
      vm.sponsoredAdCity = modifiedAdSelectDataCity;
    }).catch(function (err) {
      vm.error_message = err;
    });
  }).catch(function (err) {
    throw err;
  });
}
