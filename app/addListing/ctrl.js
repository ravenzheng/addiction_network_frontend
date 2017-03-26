function ctrl(service) {
  var vm = this;
  service.getStates().then(function (response) {
      vm.states=response;
    }).catch(function (err) {
      console.log(err);
    });
    vm.getCities = function () {
    var state=vm.state;
    service.getCities(state).then(function (response) {
      vm.cities=response;
    }).catch(function (err) {
      console.log(err);
    });
    }
  vm.submit = function () {
    var formData = new FormData();
    var data_signup = {
      'email': vm.email,
      'password': vm.password,
      'password_confirmation': vm.confirm_password,
      'first_name': vm.first_name,
      'last_name': vm.last_name,
      'company': vm.company,
      'phone': vm.phone,
    };
    for (var key in data_signup) {
      formData.append('user[' + key + ']', data_signup[key]);
    }
    if (vm.center_name != "") {
      var data_treat = {
        'center_name': vm.center_name,
        'description': vm.description,
        'center_web_link': vm.center_web_link,
        'listing_image': vm.listing_image,
        'heading_1': vm.heading_1,
        'heading_2': vm.heading_2,
        'heading_3': vm.heading_3,
        'heading_4': vm.heading_4,
        'content_1': vm.content_1,
        'content_2': vm.content_2,
        'content_3': vm.content_3,
        'content_4': vm.content_4,
        'address_line_1': vm.address_line_1,
        'address_line_2': vm.address_line_2,
        'city': vm.city,
        'pincode': vm.pincode,
        'state': vm.state,
        'phone': vm.intakephone,
        'email': vm.intakeemail,
        'featured': false,
        'listing_type': 'free'
      };
      for (var key in data_treat) {
        formData.append('treatment_center[' + key + ']', data_treat[key]);
      }
    }
    if (vm.image_data) {
      var image_data = vm.image_data
      var len = image_data.length;
      for (var i = 0; i < len; i++) {
        formData.append('treatment_center[image_data][]', image_data.item(i));
      }
    }
    var auth = '';
    service.getAuthtoken().then(function (response) {
      auth = response;
    }).catch(function (err) {
      alert(err);
    });
    service.addTreatmentCenterSignUp(auth, formData).then(function () {
      alert("Your Listing has been saved");
      location.reload(true);
    }).catch(function (err) {
      $("#email_err").html(err.data.user.email.errors);
      $("#pass_err").html(err.data.user.password.errors);
    });
  }
}

module.exports = ['addTreatmentCenterSignUpService', ctrl];
