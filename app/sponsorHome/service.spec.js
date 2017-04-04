describe('SSponsoredListingService', function () {
  var $httpBackend,
    endPoint,
    $rootScope,
    service;

  beforeEach(angular.mock.module('AddictionNetworkApp'));

  beforeEach(angular.mock.inject(['$injector', function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    endPoint = $injector.get('endPoint');
    $rootScope = $injector.get('$rootScope');
    service = $injector.get('SponsoredListingService');
  }]));
  // After every spec, do the following:
  afterEach(function () {
    // Make sure we have flushed all of our requests.
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have method `queryByType`.', function () {
    expect(angular.isFunction(service.queryByType)).toBe(true);
  });

  describe('queryByType', function () {
    var requestURL,
      type,
      data;
    beforeEach(function () {
      requestURL = endPoint + '/sponsored_listings';
      type = 'new listing';
      data = {
        'sponsored_listing_type': type
      };
    });

    it('should get sponsor listings when backend is fine.', function () {
      var mockResponse = [];
      $httpBackend.whenPOST(requestURL, data).respond(mockResponse);
      service.queryByType(type).then(function (result) {
        expect(result.data).toEqual(mockResponse);
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });

    it('should throw error when backend is broken.', function () {
      $httpBackend.whenPOST(requestURL, data).respond(500, '');
      service.queryByType(type).catch(function (res) {
        expect(res.status).toEqual(500);
        expect(res.data).toEqual('');
      });
      $httpBackend.flush();
      $rootScope.$digest();
    });
  });
});
