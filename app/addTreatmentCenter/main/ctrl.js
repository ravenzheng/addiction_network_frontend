// JSON Body: {
//   treatment_center: {
//     center_name: ‘’,
//     description: ‘’,
//     center_web_link: ‘’,
//     listing_image: < image file > ,
//     heading_1: ,
//     heading_2: ,
//     heading_3: ‘’,
//     heading_4: ‘’,
//     content_1: ‘’,
//     content_2: ‘’,
//     content_3: ‘’,
//     content_4: ‘’,
//     address_line_1: ‘’,
//     address_line_2: ‘’,
//     city: ‘’,
//     pincode: ‘’,
//     state: ‘’,
//     phone: ‘’,
//     email: ‘’,
//     featured: < true / false > ,
//     image_data: [ < image file > , < image file > , < image file > ]
//
//   }
// }

function ctrl($scope, UserService, TreatmentCenterService) {
  console.log('add treatment center')
  var vm = this;
  vm.center_name = 'No 2 Center';
  vm.center_web_link = 'www.no2center.com';
  vm.address_line_1 = '1 Center Rd';
  vm.city = 'SLO';
  vm.description = 'This is an awesome center.';
  vm.submit = function () {
    console.log($scope.listing_image);
    var data = {
      'center_name': vm.center_name,
      'center_web_link': vm.center_web_link,
      'address': vm.address,
      'city': vm.city,
      'zipcode': vm.zipcode,
      'phone': vm.phone,
      'email': vm.email,
      'listing_image': vm.listing_image,
      'content_1': vm.content_1,
      'content_2': vm.content_2,
      'content_3': vm.content_3,
      'content_4': vm.content_4,
      'featured': false,
      'image_data': vm.image_data
    };

    var formData = new FormData();
    formData.append('treatmentcenter', data)

    var testEmail = 'best@test.com';
    var testPassword = '12345678';
    UserService.signIn(testEmail, testPassword).then(function (result) {
      var user = result.user;
      return TreatmentCenterService.add(user.auth_token, formData).then(function (result) {
        // redirect to url /featured-treatment-center
      })
    }).catch(function (error) {
      // todo, display the error message in the frontend page.
      console.log(error.message);
    });
  }
}

module.exports = ['$scope', 'UserService', 'TreatmentCenterService', ctrl];
