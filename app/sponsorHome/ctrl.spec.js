describe('Sponsor Home Controller', function () {
  var componentName = 'sponsorHome',
    _$log,
    _$stateParams,
    _$window,
    _service,
    _$rootScope,
    _$q,
    ctrl;
  beforeEach(angular.mock.module('AddictionNetworkApp'));

  beforeEach(angular.mock.inject(function ($injector) {
    _$log = $injector.get('$log');
    _$stateParams = {
      slug: 'Rehab for Men'
    };
    _$window = $injector.get('$window');
    _service = $injector.get('TreatmentCenterService');
    _$rootScope = $injector.get('$rootScope');
    _$q = $injector.get('$q');
    spyOn(_$window, 'scrollTo');
    spyOn(_$log, 'error');

    var $componentController = $injector.get('$componentController');
    ctrl = $componentController(componentName, {
      $log: _$log,
      $stateParams: _$stateParams,
      $window: _$window,
      service: _service
    }, null);
  }));

  it('should call `$window.scrollTo` method when service is resolved', function () {
    spyOn(_service, 'querySponsoredListings').and.callFake(function () {
      var deferred = _$q.defer();
      deferred.resolve({
        data: []
      });
      return deferred.promise;
    });
    expect(_service.querySponsoredListings.calls.any()).toBeFalsy();
    ctrl.$onInit();
    expect(_service.querySponsoredListings).toHaveBeenCalled();
    _$rootScope.$digest();
    expect(_$window.scrollTo.calls.count()).toEqual(1);
    expect(_$log.error.calls.any()).toBeFalsy();
  });

  it('should call `$log.error` method when service is rejected', function () {
    spyOn(_service, 'querySponsoredListings').and.callFake(function () {
      var deferred = _$q.defer();
      deferred.reject('Oops!');
      return deferred.promise;
    });
    expect(_service.querySponsoredListings.calls.any()).toBeFalsy();
    ctrl.$onInit();
    expect(_service.querySponsoredListings).toHaveBeenCalled();
    _$rootScope.$digest();
    expect(_$window.scrollTo.calls.any()).toBeFalsy();
    expect(_$log.error.calls.count()).toEqual(1);
  });
});
